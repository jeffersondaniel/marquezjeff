/*
 * Copyright 2018-2023 contributors to the Marquez project
 * SPDX-License-Identifier: Apache-2.0
 */

package marquez.db;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import javax.validation.constraints.NotNull;
import marquez.common.models.DatasetName;
import marquez.common.models.JobName;
import marquez.common.models.NamespaceName;
import marquez.common.models.RunId;
import marquez.db.mappers.DatasetDataMapper;
import marquez.db.mappers.JobDataMapper;
import marquez.db.mappers.JobRowMapper;
import marquez.db.mappers.RunMapper;
import marquez.db.mappers.UpstreamRunRowMapper;
import marquez.service.models.DatasetData;
import marquez.service.models.JobData;
import marquez.service.models.Run;
import org.jdbi.v3.sqlobject.config.RegisterRowMapper;
import org.jdbi.v3.sqlobject.customizer.BindList;
import org.jdbi.v3.sqlobject.statement.SqlQuery;

@RegisterRowMapper(DatasetDataMapper.class)
@RegisterRowMapper(JobDataMapper.class)
@RegisterRowMapper(RunMapper.class)
@RegisterRowMapper(JobRowMapper.class)
@RegisterRowMapper(UpstreamRunRowMapper.class)
public interface LineageDao {

  public record JobSummary(NamespaceName namespace, JobName name, UUID version) {}

  public record RunSummary(RunId id, Instant start, Instant end, String status) {}

  public record DatasetSummary(
      NamespaceName namespace, DatasetName name, UUID version, RunId producedByRunId) {}

  public record UpstreamRunRow(JobSummary job, RunSummary run, DatasetSummary input) {}

  /**
   * Fetch all of the jobs that consume or produce the datasets that are consumed or produced by the
   * input jobIds. This returns a single layer from the BFS using datasets as edges. Jobs that have
   * no input or output datasets will have no results. Jobs that have no upstream producers or
   * downstream consumers will have the original jobIds returned.
   *
   * @param jobIds
   * @return
   */
  @SqlQuery(
      """
      WITH RECURSIVE
           -- Find the current version of a job or its symlink target if the target has no
           -- current_version_uuid. This ensures that we don't lose lineage for a job after it is
           -- symlinked to another job but before that target job has run successfully.
          job_current_version AS (
              SELECT COALESCE(j.symlink_target_uuid, j.uuid) AS job_uuid,
                     COALESCE(s.current_version_uuid, j.current_version_uuid) AS job_version_uuid
              FROM jobs j
              LEFT JOIN jobs s ON s.uuid=j.symlink_target_uuid
              WHERE s.current_version_uuid IS NULL
          ),
          job_io AS (
              SELECT j.job_uuid,
                     ARRAY_AGG(DISTINCT io.dataset_uuid) FILTER (WHERE io_type='INPUT') AS inputs,
                     ARRAY_AGG(DISTINCT io.dataset_uuid) FILTER (WHERE io_type='OUTPUT') AS outputs
              FROM job_versions_io_mapping io
              INNER JOIN job_current_version j ON io.job_version_uuid=j.job_version_uuid
              GROUP BY j.job_uuid
          ),
          lineage(job_uuid, inputs, outputs) AS (
              SELECT v.job_uuid AS job_uuid,
                     COALESCE(inputs, Array[]::uuid[]) AS inputs,
                     COALESCE(outputs, Array[]::uuid[]) AS outputs,
                     0 AS depth
              FROM jobs j
              INNER JOIN job_current_version v ON (j.symlink_target_uuid IS NULL AND j.uuid=v.job_uuid) OR v.job_uuid=j.symlink_target_uuid
              LEFT JOIN job_io io ON io.job_uuid=v.job_uuid
              WHERE j.uuid IN (<jobIds>) OR j.symlink_target_uuid IN (<jobIds>)
              UNION
              SELECT io.job_uuid, io.inputs, io.outputs, l.depth + 1
              FROM job_io io,
                  lineage l
              WHERE io.job_uuid != l.job_uuid AND
                  array_cat(io.inputs, io.outputs) && array_cat(l.inputs, l.outputs)
                AND depth < :depth)
      SELECT DISTINCT ON (j.uuid) j.*, inputs AS input_uuids, outputs AS output_uuids
      FROM lineage l2
      INNER JOIN jobs_view j ON j.uuid=l2.job_uuid;
  """)
  Set<JobData> getLineage(@BindList Set<UUID> jobIds, int depth);

  @SqlQuery(
      """
      SELECT ds.*, dv.fields, dv.lifecycle_state
      FROM datasets_view ds
      LEFT JOIN dataset_versions dv on dv.uuid = ds.current_version_uuid
      WHERE ds.uuid IN (<dsUuids>)""")
  Set<DatasetData> getDatasetData(@BindList Set<UUID> dsUuids);

  @SqlQuery(
      """
      SELECT ds.*, dv.fields, dv.lifecycle_state
      FROM datasets_view ds
      LEFT JOIN dataset_versions dv on dv.uuid = ds.current_version_uuid
      WHERE ds.name = :datasetName AND ds.namespace_name = :namespaceName""")
  DatasetData getDatasetData(String namespaceName, String datasetName);

  @SqlQuery(
      """
      SELECT j.uuid FROM jobs j
      INNER JOIN job_versions jv ON jv.job_uuid = j.uuid
      INNER JOIN job_versions_io_mapping io ON io.job_version_uuid = jv.uuid
      INNER JOIN datasets_view ds ON ds.uuid = io.dataset_uuid
      WHERE ds.name = :datasetName AND ds.namespace_name = :namespaceName
      ORDER BY io_type DESC, jv.created_at DESC
      LIMIT 1""")
  Optional<UUID> getJobFromInputOrOutput(String datasetName, String namespaceName);

  @SqlQuery(
      "WITH latest_runs AS (\n"
          + "    SELECT DISTINCT on(r.job_name, r.namespace_name) r.*, jv.version\n"
          + "    FROM runs_view r\n"
          + "    INNER JOIN job_versions jv ON jv.uuid=r.job_version_uuid\n"
          + "    INNER JOIN jobs_view j ON j.uuid=jv.job_uuid\n"
          + "    WHERE j.uuid in (<jobUuid>) OR j.symlink_target_uuid IN (<jobUuid>)\n"
          + "    ORDER BY r.job_name, r.namespace_name, created_at DESC\n"
          + ")\n"
          + "SELECT r.*, ra.args, f.facets,\n"
          + "  r.version AS job_version, ri.input_versions, ro.output_versions\n"
          + "  from latest_runs AS r\n"
          + "LEFT JOIN run_args AS ra ON ra.uuid = r.run_args_uuid\n"
          + "LEFT JOIN LATERAL (\n"
          + "    SELECT im.run_uuid,\n"
          + "           JSON_AGG(json_build_object('namespace', dv.namespace_name,\n"
          + "                                      'name', dv.dataset_name,\n"
          + "                                      'version', dv.version)) AS input_versions\n"
          + "    FROM runs_input_mapping im\n"
          + "    INNER JOIN dataset_versions dv on im.dataset_version_uuid = dv.uuid\n"
          + "    WHERE im.run_uuid=r.uuid\n"
          + "    GROUP BY im.run_uuid\n"
          + ") ri ON ri.run_uuid=r.uuid\n"
          + "LEFT JOIN LATERAL (\n"
          + "    SELECT rf.run_uuid, JSON_AGG(rf.facet ORDER BY rf.lineage_event_time ASC) AS facets\n"
          + "    FROM run_facets_view AS rf\n"
          + "    WHERE rf.run_uuid=r.uuid\n"
          + "    GROUP BY rf.run_uuid\n"
          + ") AS f ON r.uuid=f.run_uuid\n"
          + "LEFT JOIN LATERAL (\n"
          + "    SELECT run_uuid, JSON_AGG(json_build_object('namespace', namespace_name,\n"
          + "                                                'name', dataset_name,\n"
          + "                                                'version', version)) AS output_versions\n"
          + "    FROM dataset_versions\n"
          + "    WHERE run_uuid=r.uuid\n"
          + "    GROUP BY run_uuid\n"
          + ") ro ON ro.run_uuid=r.uuid")
  List<Run> getCurrentRunsWithFacets(@BindList Collection<UUID> jobUuid);

  @SqlQuery(
      """
      SELECT DISTINCT on(r.job_name, r.namespace_name) r.*, jv.version as job_version
      FROM runs_view r
      INNER JOIN job_versions jv ON jv.uuid=r.job_version_uuid
      INNER JOIN jobs_view j ON j.uuid=jv.job_uuid
      WHERE j.uuid in (<jobUuid>) OR j.symlink_target_uuid IN (<jobUuid>)
      ORDER BY r.job_name, r.namespace_name, created_at DESC""")
  List<Run> getCurrentRuns(@BindList Collection<UUID> jobUuid);

  @SqlQuery(
      """
WITH RECURSIVE
  upstream_runs(
          r_uuid, started_at, ended_at, state,
          job_uuid, job_version_uuid, job_namespace, job_name,
          dataset_uuid, dataset_version_uuid, dataset_namespace, dataset_name,
          u_r_uuid, depth) AS (
    SELECT
          r.uuid, r.started_at, r.ended_at, r.current_run_state,
          r.job_uuid, r.job_version_uuid, r.namespace_name, r.job_name,
          dv.dataset_uuid, dv."version", dv.namespace_name, dv.dataset_name,
          dv.run_uuid,
          0 AS depth
    FROM runs r
    LEFT JOIN runs_input_mapping rim ON rim.run_uuid = r.uuid
    LEFT JOIN dataset_versions dv ON dv.uuid = rim.dataset_version_uuid
    LEFT JOIN runs r1 ON r1.uuid = dv.run_uuid
    WHERE r.uuid = :runId
  UNION
    SELECT
          ur.u_r_uuid, r2.started_at, r2.ended_at, r2.current_run_state,
          r2.job_uuid, r2.job_version_uuid, r2.namespace_name, r2.job_name,
          dv2.dataset_uuid, dv2."version", dv2.namespace_name, dv2.dataset_name,
          dv2.run_uuid,
          ur.depth + 1 AS depth
    FROM upstream_runs ur
    INNER JOIN runs r2 ON r2.uuid = ur.u_r_uuid
    LEFT JOIN runs_input_mapping rim2 ON rim2.run_uuid = ur.u_r_uuid
    LEFT JOIN dataset_versions dv2 ON dv2.uuid = rim2.dataset_version_uuid
    WHERE ur.u_r_uuid IS NOT NULL AND depth < :depth
  )
SELECT * FROM upstream_runs ORDER BY depth ASC;
;
""")
  List<UpstreamRunRow> getUpstreamRuns(@NotNull UUID runId, int depth);
}
