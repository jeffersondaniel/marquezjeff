/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package marquez;

import com.codahale.metrics.jdbi3.InstrumentedSqlLogger;
import com.fasterxml.jackson.databind.SerializationFeature;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.db.ManagedDataSource;
import io.dropwizard.jdbi3.JdbiFactory;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.prometheus.client.CollectorRegistry;
import io.prometheus.client.dropwizard.DropwizardExports;
import io.prometheus.client.exporter.MetricsServlet;
import io.prometheus.client.hotspot.DefaultExports;
import io.sentry.Sentry;
import java.util.EnumSet;
import javax.servlet.DispatcherType;
import javax.sql.DataSource;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import marquez.cli.SeedCommand;
import marquez.db.DbMigration;
import marquez.sentry.TracingContainerResponseFilter;
import marquez.sentry.TracingSQLLogger;
import marquez.sentry.TracingServletFilter;
import org.flywaydb.core.api.FlywayException;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.SqlLogger;
import org.jdbi.v3.postgres.PostgresPlugin;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;

@Slf4j
public final class MarquezApp extends Application<MarquezConfig> {
  private static final String APP_NAME = "MarquezApp";
  private static final String DB_SOURCE_NAME = APP_NAME + "-source";
  private static final String DB_POSTGRES = "postgresql";
  private static final boolean ERROR_ON_UNDEFINED = false;

  // Monitoring
  private static final String PROMETHEUS = "prometheus";
  private static final String PROMETHEUS_ENDPOINT = "/metrics";

  public static void main(final String[] args) throws Exception {
    new MarquezApp().run(args);
  }

  @Override
  public String getName() {
    return APP_NAME;
  }

  @Override
  public void initialize(@NonNull Bootstrap<MarquezConfig> bootstrap) {
    // Enable metric collection for prometheus.
    CollectorRegistry.defaultRegistry.register(
        new DropwizardExports(bootstrap.getMetricRegistry()));
    DefaultExports.initialize(); // Add metrics for CPU, JVM memory, etc.

    // Enable variable substitution with environment variables.
    bootstrap.setConfigurationSourceProvider(
        new SubstitutingSourceProvider(
            bootstrap.getConfigurationSourceProvider(),
            new EnvironmentVariableSubstitutor(ERROR_ON_UNDEFINED)));

    // Add CLI commands
    bootstrap.addCommand(new SeedCommand());

    bootstrap.getObjectMapper().disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    bootstrap.addBundle(
        new AssetsBundle(
            "/assets",
            "/graphql-playground",
            "graphql-playground/index.htm",
            "graphql-playground"));
  }

  @Override
  public void run(@NonNull MarquezConfig config, @NonNull Environment env) {
    final DataSourceFactory sourceFactory = config.getDataSourceFactory();
    final DataSource source = sourceFactory.build(env.metrics(), DB_SOURCE_NAME);

    log.info("Running startup actions...");

    try {
      DbMigration.migrateDbOrError(config.getFlywayFactory(), source, config.isMigrateOnStartup());
    } catch (FlywayException errorOnDbMigrate) {
      log.info("Stopping app...");
      // Propagate throwable up the stack.
      onFatalError(errorOnDbMigrate); // Signal app termination.
    }

    if (isSentryEnabled(config)) {
      Sentry.init(
          options -> {
            options.setTracesSampleRate(config.getSentry().getTracesSampleRate());
            options.setEnvironment(config.getSentry().getEnvironment());
            options.setDsn(config.getSentry().getDsn());
            options.setDebug(config.getSentry().isDebug());
          });

      env.servlets()
          .addFilter("tracing-filter", new TracingServletFilter())
          .addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");
      env.jersey().register(new TracingContainerResponseFilter());
    }

    registerResources(config, env, source);
    registerServlets(env);
  }

  private boolean isSentryEnabled(MarquezConfig config) {
    return config.getSentry() != null
        && !config.getSentry().getDsn().equals(SentryConfig.DEFAULT_DSN);
  }

  public void registerResources(
      @NonNull MarquezConfig config, @NonNull Environment env, @NonNull DataSource source) {
    final JdbiFactory factory = new JdbiFactory();
    final Jdbi jdbi =
        factory
            .build(env, config.getDataSourceFactory(), (ManagedDataSource) source, DB_POSTGRES)
            .installPlugin(new SqlObjectPlugin())
            .installPlugin(new PostgresPlugin());
    SqlLogger sqlLogger = new InstrumentedSqlLogger(env.metrics());
    if (isSentryEnabled(config)) {
      sqlLogger = new TracingSQLLogger(sqlLogger);
    }
    jdbi.setSqlLogger(sqlLogger);

    final MarquezContext context =
        MarquezContext.builder().jdbi(jdbi).tags(config.getTags()).build();

    if (config.getGraphql().isEnabled()) {
      env.servlets()
          .addServlet("api/v1-beta/graphql", context.getGraphqlServlet())
          .addMapping("/api/v1-beta/graphql", "/api/v1/schema.json");
    }

    log.debug("Registering resources...");
    for (final Object resource : context.getResources()) {
      env.jersey().register(resource);
    }
  }

  private void registerServlets(@NonNull Environment env) {
    log.debug("Registering servlets...");

    // Expose metrics for monitoring.
    env.servlets().addServlet(PROMETHEUS, new MetricsServlet()).addMapping(PROMETHEUS_ENDPOINT);
  }
}
