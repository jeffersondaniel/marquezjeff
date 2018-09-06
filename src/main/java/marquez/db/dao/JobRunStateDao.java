package marquez.db.dao;

import marquez.api.JobRun;
import marquez.api.JobRunState;
import org.jdbi.v3.core.Handle;
import org.jdbi.v3.sqlobject.SqlObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public interface JobRunStateDao extends SqlObject {
    static final Logger LOG = LoggerFactory.getLogger(JobRunStateDao.class);

    default void insert(final JobRunState jobRunState) {
        try (final Handle handle = getHandle()) {
            handle.useTransaction(
                    h -> {
                        h.createUpdate(
                                "INSERT INTO job_run_states (transitioned_at, job_run_guid, state)"
                                        + " VALUES (:transitionedAt, :jobRunGuid, :state)")
                                .bindBean(jobRunState)
                                .execute();
                        h.commit();
                    });
        } catch (Exception e) {
            // TODO: Add better error handling
            LOG.error(e.getMessage());
        }
    }
}
