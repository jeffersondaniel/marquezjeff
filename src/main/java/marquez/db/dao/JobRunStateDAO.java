package marquez.db.dao;

import java.sql.Timestamp;
import java.util.UUID;
import marquez.api.JobRunState;
import org.jdbi.v3.sqlobject.SqlObject;
import org.jdbi.v3.sqlobject.config.RegisterRowMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RegisterRowMapper(JobRunStateRow.class)
public interface JobRunStateDAO extends SqlObject {
  static final Logger LOG = LoggerFactory.getLogger(JobRunStateDAO.class);

  @SqlUpdate(
      "INSERT INTO job_run_states (guid, job_run_guid, transitioned_at, state)"
          + "VALUES (:guid, :job_run_guid, :transitioned_at, :state)")
  void insert(
      @Bind("guid") final UUID guid,
      @Bind("transitioned_at") final Timestamp transitionedAt,
      @Bind("job_run_guid") UUID job_run_guid,
      @Bind("state") final Integer state);

  @SqlQuery("SELECT * FROM job_run_states WHERE guid = :guid")
  JobRunState findJobRunStateById(@Bind("guid") UUID guid);

  @SqlQuery(
      "SELECT * FROM job_run_states WHERE job_run_guid = :jobRunGuid ORDER by transitioned_at DESC")
  JobRunState findJobLatestJobRunStateByJobRun(@Bind("jobRunGuid") UUID jobRunGuid);
}
