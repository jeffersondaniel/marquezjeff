package marquez.db.v2;

import static java.util.concurrent.TimeUnit.MILLISECONDS;

import com.google.common.collect.ImmutableList;
import io.dropwizard.lifecycle.Managed;
import io.openlineage.server.OpenLineage;
import java.sql.SQLException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.atomic.AtomicBoolean;
import javax.validation.constraints.NotNull;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import marquez.common.models.DatasetId;
import marquez.common.models.JobId;
import marquez.common.models.NamespaceName;
import marquez.common.models.RunId;
import marquez.common.models.SourceName;
import marquez.common.models.TagName;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.async.JdbiExecutor;
import org.jdbi.v3.core.statement.SqlLogger;
import org.jdbi.v3.core.statement.StatementContext;
import org.jdbi.v3.jackson2.Jackson2Plugin;
import org.jdbi.v3.postgres.PostgresPlugin;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;

/** ... */
@Slf4j
public class MetadataDb {
  private final ConcurrentLinkedQueue<BatchSqlWriteCall> nonBlockingDbCallQueue;
  private final JdbiExecutor nonBlockingDbCallExecutor;

  /* ... */
  private MetadataDb(@NonNull final ManagedConnectionPool connectionPool) {
    this.nonBlockingDbCallQueue = new ConcurrentLinkedQueue<>();
    this.nonBlockingDbCallExecutor =
        JdbiExecutor.create(
            Jdbi.create(connectionPool)
                .installPlugin(new SqlObjectPlugin())
                .installPlugin(new PostgresPlugin())
                .installPlugin(new Jackson2Plugin())
                .setSqlLogger(LogDbCalls.newInstance()),
            Executors.newFixedThreadPool(connectionPool.getMaximumPoolSize()));
    // ...
    new MetadataDb.BatchSqlWriter(nonBlockingDbCallQueue, nonBlockingDbCallExecutor).start();
  }

  /* ... */
  public static MetadataDb newInstance(@NonNull final ManagedConnectionPool connectionPool) {
    return new MetadataDb(connectionPool);
  }

  /* ... */
  public void writeBatchOf(@NotNull ImmutableList<OpenLineage.RunEvent> olRunEvents) {
    for (final OpenLineage.RunEvent olRunEvent : olRunEvents) {
      write(olRunEvent);
    }
  }

  /* ... */
  public void write(@NotNull OpenLineage.RunEvent olRunEvent) {
    nonBlockingDbCallQueue.offer(BatchSqlWriteCall.newCallFor(olRunEvent));
    log.info("nonBlockingDbCallQueue.size(): {}", nonBlockingDbCallQueue.size());
  }

  public CompletableFuture<Void> listEventsOf() {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.listNamespaces()");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> getNamespace(@NonNull NamespaceName namespaceName) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.get(DatasetId)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> listNamespaces() {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.listNamespaces()");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> softDeleteNamespace(@NonNull NamespaceName namespaceName) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException(
                  "MetadataDb.softDeleteNamespace(NamespaceName)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> getSource(@NonNull SourceName sourceName) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.getSource(SourceName)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> listSources() {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.listSources()");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> getDataset(@NonNull DatasetId datasetId) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.get(DatasetId)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> listDatasetsFor(@NonNull NamespaceName namespaceName) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.listDatasetsFor(NamespaceName)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> listDatasetVersionsFor(@NonNull DatasetId datasetId) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException(
                  "MetadataDb.listDatasetVersionsFor(DatasetId)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> softDeleteDataset(@NonNull DatasetId datasetId) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.softDeleteDataset(DatasetId)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> tagDatasetWith(@NonNull TagName tagName) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.tagDatasetWith(TagName)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> tagDatasetFieldWith(@NonNull TagName tagName) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.tagDatasetFieldWith(TagName)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> getJob(@NonNull JobId jobId) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.getJob(JobId)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> listJobsFor(@NonNull NamespaceName namespaceName) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.listJobsFor(NamespaceName)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> listJobVersionsFor(@NonNull JobId jobId) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.listJobVersionsFor(JobId)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> softDeleteJob(@NonNull JobId jobId) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.softDeleteJob(DatasetId)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> tagJobWith(@NonNull TagName tagName) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.tagJobWith(TagName)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> getRun(@NonNull RunId runId) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException("MetadataDb.getRun(RunId)");
            })
        .toCompletableFuture();
  }

  public CompletableFuture<Void> listRunsFor(
      @NonNull NamespaceName namespaceName, @NonNull JobId jobId) {
    return nonBlockingDbCallExecutor
        .useHandle(
            nonBlockingHandle -> {
              throw new UnsupportedOperationException(
                  "MetadataDb.listRunsFor(NamespaceName, JobId)");
            })
        .toCompletableFuture();
  }

  /* ... */
  static final class BatchSqlWriter implements Managed {
    private final ConcurrentLinkedQueue<BatchSqlWriteCall> nonBlockingDbCallQueue;
    private final JdbiExecutor nonBlockingDbCall;

    private final ScheduledExecutorService pollDbCallQueueScheduler;
    private final int initialPollDelayMs;
    private final int pollPeriodMs;
    private final AtomicBoolean isPolling;

    /* ... */
    public BatchSqlWriter(
        @NonNull final ConcurrentLinkedQueue<BatchSqlWriteCall> nonBlockingDbCallQueue,
        @NonNull final JdbiExecutor nonBlockingDbCall) {
      this.nonBlockingDbCallQueue = nonBlockingDbCallQueue;
      this.nonBlockingDbCall = nonBlockingDbCall;
      this.pollDbCallQueueScheduler = Executors.newSingleThreadScheduledExecutor();
      this.initialPollDelayMs = 1000;
      this.pollPeriodMs = 2000;
      this.isPolling = new AtomicBoolean(false);
    }

    @Override
    public void start() {
      log.info("BatchSqlWriter.start()...");
      pollDbCallQueueScheduler.scheduleAtFixedRate(
          () -> {
            // ...
            if (isPolling.get()) {
              log.info("BatchSqlWriter.polling...skipping");
              return;
            }
            // ...
            isPolling.set(true);
            log.info("BatchSqlWriter.polling...attempting");
            try {
              while (true) {
                final BatchSqlWriteCall batchSqlWriteCall = nonBlockingDbCallQueue.poll();
                log.info("BatchSqlWriter.polled: {}", batchSqlWriteCall);
                if (batchSqlWriteCall == null) {
                  break;
                }
                try {
                  nonBlockingDbCall.useHandle(batchSqlWriteCall);
                } catch (Exception e) {
                  log.info("BatchSqlWriter.polling...error", e);
                }
              }
            } finally {
              isPolling.set(false);
            }
          },
          initialPollDelayMs,
          pollPeriodMs,
          MILLISECONDS);
    }

    @Override
    public void stop() {
      pollDbCallQueueScheduler.shutdown();
    }
  }

  /** ... */
  static class LogDbCalls implements SqlLogger {
    private LogDbCalls() {}

    static LogDbCalls newInstance() {
      return new LogDbCalls();
    }

    @Override
    public void logBeforeExecution(@NonNull StatementContext context) {
      log.info("logBeforeExecution()");
    }

    public void logAfterExecution(StatementContext context) {
      log.info("logAfterExecution()");
    }

    @Override
    public void logException(@NonNull StatementContext context, SQLException e) {
      log.info("logException()", e);
    }
  }
}
