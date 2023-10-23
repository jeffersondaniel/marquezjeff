/*
 * Copyright 2018-2023 contributors to the Marquez project
 * SPDX-License-Identifier: Apache-2.0
 */

package marquez.db;

import static marquez.db.DatasetDaoTest.DATASET;
import static marquez.db.LineageTestUtils.NAMESPACE;
import static marquez.db.LineageTestUtils.PRODUCER_URL;
import static marquez.db.LineageTestUtils.SCHEMA_URL;
import static marquez.db.LineageTestUtils.newDatasetFacet;
import static marquez.db.LineageTestUtils.writeDownstreamLineage;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import com.google.common.base.Functions;
import java.sql.SQLException;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import marquez.api.JdbiUtils;
import marquez.common.models.JobType;
import marquez.db.LineageDao.SimpleLineageEdge;
import marquez.db.LineageTestUtils.DatasetConsumerJob;
import marquez.db.LineageTestUtils.JobLineage;
import marquez.db.models.JobRow;
import marquez.db.models.NamespaceRow;
import marquez.db.models.UpdateLineageRow;
import marquez.jdbi.MarquezJdbiExternalPostgresExtension;
import marquez.service.models.DatasetData;
import marquez.service.models.JobData;
import marquez.service.models.LineageEvent;
import marquez.service.models.LineageEvent.Dataset;
import marquez.service.models.LineageEvent.JobFacet;
import marquez.service.models.LineageEvent.SchemaField;
import marquez.service.models.LineageEvent.SourceCodeLocationJobFacet;
import marquez.service.models.Run;
import org.assertj.core.api.InstanceOfAssertFactories;
import org.assertj.core.api.ObjectAssert;
import org.jdbi.v3.core.Jdbi;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.postgresql.util.PGobject;

@ExtendWith(MarquezJdbiExternalPostgresExtension.class)
public class LineageDaoTest {

  private static DatasetDao datasetDao;
  private static LineageDao lineageDao;
  private static OpenLineageDao openLineageDao;
  private final Dataset dataset =
      new Dataset(
          NAMESPACE,
          "commonDataset",
          newDatasetFacet(
              new SchemaField("firstname", "string", "the first name"),
              new SchemaField("lastname", "string", "the last name"),
              new SchemaField("birthdate", "date", "the date of birth")));
  private final JobFacet jobFacet = new JobFacet(null, null, null, LineageTestUtils.EMPTY_MAP);

  static Jdbi jdbi;

  @BeforeAll
  public static void setUpOnce(Jdbi jdbi) {
    LineageDaoTest.jdbi = jdbi;
    datasetDao = jdbi.onDemand(DatasetDao.class);
    lineageDao = jdbi.onDemand(LineageDao.class);
    openLineageDao = jdbi.onDemand(OpenLineageDao.class);
  }

  @AfterEach
  public void tearDown(Jdbi jdbi) {
    JdbiUtils.cleanDatabase(jdbi);
  }

  @Test
  public void testGetLineage() {

    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "COMPLETE",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(dataset));
    List<JobLineage> jobRows =
        writeDownstreamLineage(
            openLineageDao,
            new LinkedList<>(
                Arrays.asList(
                    new DatasetConsumerJob("readJob", 20, Optional.of("outputData")),
                    new DatasetConsumerJob("downstreamJob", 1, Optional.empty()))),
            jobFacet,
            dataset);

    // don't expect a failed job in the returned lineage
    UpdateLineageRow failedJobRow =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "readJobFailed",
            "FAILED",
            jobFacet,
            Arrays.asList(dataset),
            Arrays.asList());

    // don't expect a disjoint job in the returned lineage
    UpdateLineageRow disjointJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeRandomDataset",
            "COMPLETE",
            jobFacet,
            Arrays.asList(
                new Dataset(
                    NAMESPACE,
                    "randomDataset",
                    newDatasetFacet(
                        new SchemaField("firstname", "string", "the first name"),
                        new SchemaField("lastname", "string", "the last name")))),
            Arrays.asList());
    // fetch the first "readJob" lineage.
    Set<JobData> connectedJobs =
        lineageDao.getLineage(new HashSet<>(Arrays.asList(jobRows.get(0).getId())), 2);

    // 20 readJobs + 1 downstreamJob for each (20) + 1 write job = 41
    assertThat(connectedJobs).size().isEqualTo(41);

    Set<UUID> jobIds = connectedJobs.stream().map(JobData::getUuid).collect(Collectors.toSet());
    // expect the job that wrote "commonDataset", which is readJob0's input
    assertThat(jobIds).contains(writeJob.getJob().getUuid());

    // expect all downstream jobs
    Set<UUID> readJobUUIDs =
        jobRows.stream()
            .flatMap(row -> Stream.concat(Stream.of(row), row.getDownstreamJobs().stream()))
            .map(JobLineage::getId)
            .collect(Collectors.toSet());
    assertThat(jobIds).containsAll(readJobUUIDs);

    // expect that the failed job that reads the same input dataset is not present
    assertThat(jobIds).doesNotContain(failedJobRow.getJob().getUuid());

    // expect that the disjoint job that reads a random dataset is not present
    assertThat(jobIds).doesNotContain(disjointJob.getJob().getUuid());

    Map<UUID, JobData> actualJobRows =
        connectedJobs.stream().collect(Collectors.toMap(JobData::getUuid, Functions.identity()));
    for (JobLineage expected : jobRows) {
      JobData job = actualJobRows.get(expected.getId());
      assertThat(job.getInputUuids())
          .containsAll(
              expected.getInput().map(ds -> ds.getDatasetRow().getUuid()).stream()::iterator);
      assertThat(job.getOutputUuids())
          .containsAll(
              expected.getOutput().map(ds -> ds.getDatasetRow().getUuid()).stream()::iterator);
    }

    Collection<SimpleLineageEdge> directLineageFromParent =
        lineageDao.getDirectLineageFromParent(
            disjointJob.getJob().getNamespaceName(), disjointJob.getJob().getName());
    assertNotNull(directLineageFromParent);
    assertTrue(directLineageFromParent.toString(), directLineageFromParent.size() == 0);
  }

  @Test
  public void testGetLineageForSymlinkedJob() throws SQLException {

    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "COMPLETE",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(dataset));
    List<JobLineage> jobRows =
        writeDownstreamLineage(
            openLineageDao,
            new LinkedList<>(
                Arrays.asList(
                    new DatasetConsumerJob("readJob", 20, Optional.of("outputData")),
                    new DatasetConsumerJob("downstreamJob", 1, Optional.empty()))),
            jobFacet,
            dataset);

    NamespaceRow namespaceRow =
        jdbi.onDemand(NamespaceDao.class)
            .findNamespaceByName(writeJob.getJob().getNamespaceName())
            .get();

    PGobject inputs = new PGobject();
    inputs.setType("json");
    inputs.setValue("[]");

    String symlinkTargetJobName = "A_new_write_job";
    JobRow targetJob =
        jdbi.onDemand(JobDao.class)
            .upsertJob(
                UUID.randomUUID(),
                JobType.valueOf(writeJob.getJob().getType()),
                Instant.now(),
                namespaceRow.getUuid(),
                writeJob.getJob().getNamespaceName(),
                symlinkTargetJobName,
                writeJob.getJob().getDescription().orElse(null),
                writeJob.getJob().getLocation(),
                null,
                inputs);
    jdbi.onDemand(JobDao.class)
        .upsertJob(
            writeJob.getJob().getUuid(),
            JobType.valueOf(writeJob.getJob().getType()),
            Instant.now(),
            namespaceRow.getUuid(),
            writeJob.getJob().getNamespaceName(),
            writeJob.getJob().getName(),
            writeJob.getJob().getDescription().orElse(null),
            writeJob.getJob().getLocation(),
            targetJob.getUuid(),
            inputs);

    // fetch the first "targetJob" lineage.
    Set<JobData> connectedJobs =
        lineageDao.getLineage(new HashSet<>(Arrays.asList(targetJob.getUuid())), 2);

    // 20 readJobs + 1 downstreamJob for each (20) + 1 write job = 41
    assertThat(connectedJobs).size().isEqualTo(41);

    Set<UUID> jobIds = connectedJobs.stream().map(JobData::getUuid).collect(Collectors.toSet());
    // expect the job that wrote "commonDataset", which is readJob0's input
    assertThat(jobIds).contains(targetJob.getUuid());

    // expect all downstream jobs
    Set<UUID> readJobUUIDs =
        jobRows.stream()
            .flatMap(row -> Stream.concat(Stream.of(row), row.getDownstreamJobs().stream()))
            .map(JobLineage::getId)
            .collect(Collectors.toSet());
    assertThat(jobIds).containsAll(readJobUUIDs);

    Map<UUID, JobData> actualJobRows =
        connectedJobs.stream().collect(Collectors.toMap(JobData::getUuid, Functions.identity()));
    for (JobLineage expected : jobRows) {
      JobData job = actualJobRows.get(expected.getId());
      assertThat(job.getInputUuids())
          .containsAll(
              expected.getInput().map(ds -> ds.getDatasetRow().getUuid()).stream()::iterator);
      assertThat(job.getOutputUuids())
          .containsAll(
              expected.getOutput().map(ds -> ds.getDatasetRow().getUuid()).stream()::iterator);
    }
    Set<UUID> lineageForOriginalJob =
        lineageDao.getLineage(new HashSet<>(Arrays.asList(writeJob.getJob().getUuid())), 2).stream()
            .map(JobData::getUuid)
            .collect(Collectors.toSet());
    assertThat(lineageForOriginalJob).isEqualTo(jobIds);

    UpdateLineageRow updatedTargetJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            symlinkTargetJobName,
            "COMPLETE",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(
                new Dataset(
                    NAMESPACE,
                    "a_new_dataset",
                    newDatasetFacet(new SchemaField("firstname", "string", "the first name")))));
    assertThat(updatedTargetJob.getJob().getUuid()).isEqualTo(targetJob.getUuid());

    // get lineage for original job - the old datasets/jobs should no longer be present
    assertThat(
            lineageDao
                .getLineage(new HashSet<>(Arrays.asList(writeJob.getJob().getUuid())), 2)
                .stream()
                .map(JobData::getUuid)
                .collect(Collectors.toSet()))
        .hasSize(1)
        .containsExactlyInAnyOrder(targetJob.getUuid());

    // fetching lineage for target job should yield the same results
    assertThat(
            lineageDao.getLineage(new HashSet<>(Arrays.asList(targetJob.getUuid())), 2).stream()
                .map(JobData::getUuid)
                .collect(Collectors.toSet()))
        .hasSize(1)
        .containsExactlyInAnyOrder(targetJob.getUuid());
  }

  @Test
  public void testGetLineageWithJobThatHasNoDownstreamConsumers() {

    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "COMPLETE",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(dataset));
    Set<UUID> lineage =
        lineageDao.getLineage(Collections.singleton(writeJob.getJob().getUuid()), 2).stream()
            .map(JobData::getUuid)
            .collect(Collectors.toSet());
    assertThat(lineage).hasSize(1).contains(writeJob.getJob().getUuid());
  }

  @Test
  public void testGetDirectLineageFromParent() {
    FacetTestUtils.createLineageWithFacets(openLineageDao);
    Collection<SimpleLineageEdge> directLineageFromParent =
        lineageDao.getDirectLineageFromParent("namespace", "name");
    assertTrue(directLineageFromParent.toString(), directLineageFromParent.size() == 2);
  }

  @Test
  public void testGetLineageWithJobThatHasNoDatasets() {

    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao, "writeJob", "COMPLETE", jobFacet, Arrays.asList(), Arrays.asList());
    Set<UUID> lineage =
        lineageDao.getLineage(Collections.singleton(writeJob.getJob().getUuid()), 2).stream()
            .map(JobData::getUuid)
            .collect(Collectors.toSet());

    assertThat(lineage).hasSize(1).first().isEqualTo(writeJob.getJob().getUuid());
  }

  @Test
  public void testGetLineageWithNewJobInRunningState() {

    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "RUNNING",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(dataset));
    Set<JobData> lineage =
        lineageDao.getLineage(Collections.singleton(writeJob.getJob().getUuid()), 2);

    // assert the job does exist
    ObjectAssert<JobData> writeAssert = assertThat(lineage).hasSize(1).first();
    writeAssert.extracting(JobData::getUuid).isEqualTo(writeJob.getJob().getUuid());

    // job in running state doesn't yet have any datasets in its lineage
    writeAssert
        .extracting(JobData::getOutputUuids, InstanceOfAssertFactories.iterable(UUID.class))
        .isEmpty();
    writeAssert
        .extracting(JobData::getInputUuids, InstanceOfAssertFactories.iterable(UUID.class))
        .isEmpty();
  }

  /**
   * Validate a job that consumes a dataset, but shares no datasets with any other job returns only
   * the consumed dataset
   */
  @Test
  public void testGetLineageWithJobThatSharesNoDatasets() {
    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "COMPLETE",
            jobFacet,
            Arrays.asList(dataset),
            Arrays.asList());

    // write a new dataset with a different name
    Dataset anotherDataset =
        new Dataset(
            NAMESPACE,
            "anUncommonDataset",
            newDatasetFacet(
                new SchemaField("firstname", "string", "the first name"),
                new SchemaField("lastname", "string", "the last name"),
                new SchemaField("birthdate", "date", "the date of birth")));
    // write a bunch of jobs that share nothing with the writeJob
    writeDownstreamLineage(
        openLineageDao,
        Arrays.asList(new DatasetConsumerJob("consumer", 5, Optional.empty())),
        jobFacet,
        anotherDataset);

    // Validate that finalConsumer job only has a single dataset
    Set<UUID> jobIds = Collections.singleton(writeJob.getJob().getUuid());
    Set<JobData> finalConsumer = lineageDao.getLineage(jobIds, 2);
    assertThat(finalConsumer).hasSize(1).flatMap(JobData::getUuid).hasSize(1).containsAll(jobIds);
  }

  /** A failed consumer job doesn't show up in the datasets out edges */
  @Test
  public void testGetLineageWithFailedConsumer() {
    JobFacet jobFacet = new JobFacet(null, null, null, LineageTestUtils.EMPTY_MAP);

    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "COMPLETE",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(dataset));
    LineageTestUtils.createLineageRow(
        openLineageDao,
        "failedConsumer",
        "FAILED",
        jobFacet,
        Arrays.asList(dataset),
        Arrays.asList());
    Set<JobData> lineage =
        lineageDao.getLineage(Collections.singleton(writeJob.getJob().getUuid()), 2);

    assertThat(lineage)
        .hasSize(1)
        .extracting(JobData::getUuid)
        .contains(writeJob.getJob().getUuid());
  }

  /**
   * Test that a job with multiple versions will only return the datasets touched by the latest
   * version.
   */
  @Test
  public void testGetInputDatasetsWithJobThatHasMultipleVersions() {

    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "COMPLETE",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(dataset));

    writeDownstreamLineage(
        openLineageDao,
        new LinkedList<>(
            Arrays.asList(
                new DatasetConsumerJob("readJob", 3, Optional.of("outputData")),
                new DatasetConsumerJob("downstreamJob", 1, Optional.empty()))),
        jobFacet,
        dataset);

    JobFacet newVersionFacet =
        JobFacet.builder()
            .sourceCodeLocation(
                SourceCodeLocationJobFacet.builder().url("git@github:location").build())
            .additional(LineageTestUtils.EMPTY_MAP)
            .build();

    // readJobV2 produces outputData2 and not outputData
    List<JobLineage> newRows =
        writeDownstreamLineage(
            openLineageDao,
            new LinkedList<>(
                Arrays.asList(
                    new DatasetConsumerJob("readJob", 3, Optional.of("outputData2")),
                    new DatasetConsumerJob("downstreamJob", 1, Optional.empty()))),
            newVersionFacet,
            dataset);

    Set<JobData> lineage =
        lineageDao.getLineage(
            new HashSet<>(
                Arrays.asList(
                    newRows.get(0).getId(), newRows.get(0).getDownstreamJobs().get(0).getId())),
            2);
    assertThat(lineage)
        .hasSize(7)
        .extracting(JobData::getUuid)
        .containsAll(
            newRows.stream()
                    .flatMap(r -> Stream.concat(Stream.of(r), r.getDownstreamJobs().stream()))
                    .map(JobLineage::getId)
                ::iterator);
    assertThat(lineage)
        .filteredOn(r -> r.getName().getValue().equals("readJob0<-commonDataset"))
        .hasSize(1)
        .first()
        .extracting(JobData::getOutputUuids, InstanceOfAssertFactories.iterable(UUID.class))
        .hasSize(1)
        .first()
        .isEqualTo(newRows.get(0).getOutput().get().getDatasetRow().getUuid());

    assertThat(lineage)
        .filteredOn(
            r ->
                r.getName()
                    .getValue()
                    .equals("downstreamJob0<-outputData2<-readJob0<-commonDataset"))
        .hasSize(1)
        .first()
        .extracting(JobData::getInputUuids, InstanceOfAssertFactories.iterable(UUID.class))
        .hasSize(1)
        .first()
        .isEqualTo(
            newRows.get(0).getDownstreamJobs().get(0).getInput().get().getDatasetRow().getUuid());
    assertThat(lineage)
        .filteredOn(
            r ->
                r.getName()
                    .getValue()
                    .equals("downstreamJob0<-outputData2<-readJob0<-commonDataset"))
        .hasSize(1)
        .first()
        .extracting(JobData::getOutputUuids, InstanceOfAssertFactories.iterable(UUID.class))
        .isEmpty();
  }

  /** A failed producer job doesn't show up in the lineage */
  @Test
  public void testGetLineageWithFailedProducer() {
    JobFacet jobFacet = new JobFacet(null, null, null, LineageTestUtils.EMPTY_MAP);

    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "COMPLETE",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(dataset));
    LineageTestUtils.createLineageRow(
        openLineageDao,
        "failedProducer",
        "FAILED",
        jobFacet,
        Arrays.asList(),
        Arrays.asList(dataset));
    Set<JobData> inputDatasets =
        lineageDao.getLineage(Collections.singleton(writeJob.getJob().getUuid()), 2);
    assertThat(inputDatasets)
        .hasSize(1)
        .flatMap(JobData::getUuid)
        .hasSize(1)
        .contains(writeJob.getJob().getUuid());
  }

  /** A failed producer job doesn't show up in the lineage */
  @Test
  public void testGetLineageChangedJobVersion() {
    JobFacet jobFacet = new JobFacet(null, null, null, LineageTestUtils.EMPTY_MAP);

    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "COMPLETE",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(dataset));
    LineageTestUtils.createLineageRow(
        openLineageDao, "writeJob", "COMPLETE", jobFacet, Arrays.asList(), Arrays.asList());

    // the new job is still returned, even though it isn't connected
    Set<JobData> jobData =
        lineageDao.getLineage(Collections.singleton(writeJob.getJob().getUuid()), 2);
    assertThat(jobData)
        .hasSize(1)
        .first()
        .matches(jd -> jd.getUuid().equals(writeJob.getJob().getUuid()))
        .extracting(JobData::getOutputUuids, InstanceOfAssertFactories.iterable(UUID.class))
        .isEmpty();
  }

  @Test
  public void testGetJobFromInputOrOutput() {
    JobFacet jobFacet = new JobFacet(null, null, null, LineageTestUtils.EMPTY_MAP);

    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "COMPLETE",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(dataset));
    LineageTestUtils.createLineageRow(
        openLineageDao,
        "consumerJob",
        "COMPLETE",
        jobFacet,
        Arrays.asList(dataset),
        Arrays.asList());
    Optional<UUID> jobNode =
        lineageDao.getJobFromInputOrOutput(dataset.getName(), dataset.getNamespace());
    assertThat(jobNode).isPresent().get().isEqualTo(writeJob.getJob().getUuid());
  }

  @Test
  public void testGetJobFromInputOrOutputPrefersRecentOutputJob() {
    JobFacet jobFacet = new JobFacet(null, null, null, LineageTestUtils.EMPTY_MAP);

    // add some consumer jobs prior to the write so we know that the sort isn't simply picking
    // the first job created
    for (int i = 0; i < 5; i++) {
      LineageTestUtils.createLineageRow(
          openLineageDao,
          "consumerJob" + i,
          "COMPLETE",
          jobFacet,
          Arrays.asList(dataset),
          Arrays.asList());
    }
    // older write job- should be ignored.
    LineageTestUtils.createLineageRow(
        openLineageDao,
        "olderWriteJob",
        "COMPLETE",
        jobFacet,
        Arrays.asList(),
        Arrays.asList(dataset));

    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "COMPLETE",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(dataset));
    LineageTestUtils.createLineageRow(
        openLineageDao,
        "consumerJob",
        "COMPLETE",
        jobFacet,
        Arrays.asList(dataset),
        Arrays.asList());
    Optional<UUID> jobNode =
        lineageDao.getJobFromInputOrOutput(dataset.getName(), dataset.getNamespace());
    assertThat(jobNode).isPresent().get().isEqualTo(writeJob.getJob().getUuid());
  }

  @Test
  public void testGetDatasetData() {
    LineageTestUtils.createLineageRow(
        openLineageDao, "writeJob", "COMPLETE", jobFacet, Arrays.asList(), Arrays.asList(dataset));
    List<JobLineage> newRows =
        writeDownstreamLineage(
            openLineageDao,
            new LinkedList<>(
                Arrays.asList(
                    new DatasetConsumerJob("readJob", 3, Optional.of("outputData2")),
                    new DatasetConsumerJob("downstreamJob", 1, Optional.empty()))),
            jobFacet,
            dataset);
    Set<DatasetData> datasetData =
        lineageDao.getDatasetData(
            newRows.stream()
                .map(j -> j.getOutput().get().getDatasetRow().getUuid())
                .collect(Collectors.toSet()));
    assertThat(datasetData)
        .hasSize(3)
        .extracting(ds -> ds.getName().getValue())
        .allMatch(str -> str.contains("outputData2"));
  }

  @Test
  public void testGetDatasetDatalifecycleStateReturned() {
    Dataset dataset =
        new Dataset(
            NAMESPACE,
            DATASET,
            LineageEvent.DatasetFacets.builder()
                .lifecycleStateChange(
                    new LineageEvent.LifecycleStateChangeFacet(PRODUCER_URL, SCHEMA_URL, "CREATE"))
                .build());

    UpdateLineageRow row =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "COMPLETE",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(dataset));

    Set<DatasetData> datasetData =
        lineageDao.getDatasetData(
            Collections.singleton(row.getOutputs().get().get(0).getDatasetRow().getUuid()));

    assertThat(datasetData)
        .extracting(ds -> ds.getLastLifecycleState().orElse(""))
        .anyMatch(str -> str.contains("CREATE"));
  }

  @Test
  public void testGetDatasetDataDoesNotReturnDeletedDataset() {
    Dataset dataset =
        new Dataset(
            NAMESPACE,
            DATASET,
            LineageEvent.DatasetFacets.builder()
                .lifecycleStateChange(
                    new LineageEvent.LifecycleStateChangeFacet(PRODUCER_URL, SCHEMA_URL, "CREATE"))
                .build());

    String deleteName = DATASET + "-delete";
    Dataset toDelete =
        new Dataset(
            NAMESPACE,
            deleteName,
            LineageEvent.DatasetFacets.builder()
                .lifecycleStateChange(
                    new LineageEvent.LifecycleStateChangeFacet(PRODUCER_URL, SCHEMA_URL, "CREATE"))
                .build());

    UpdateLineageRow row =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "COMPLETE",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(dataset, toDelete));

    Set<DatasetData> datasetData =
        lineageDao.getDatasetData(
            Set.of(
                row.getOutputs().get().get(0).getDatasetRow().getUuid(),
                row.getOutputs().get().get(1).getDatasetRow().getUuid()));

    assertThat(datasetData)
        .hasSize(2)
        .extracting(ds -> ds.getName().getValue())
        .anyMatch(str -> str.contains(deleteName));

    datasetDao.delete(NAMESPACE, deleteName);

    datasetData =
        lineageDao.getDatasetData(
            Set.of(
                row.getOutputs().get().get(0).getDatasetRow().getUuid(),
                row.getOutputs().get().get(1).getDatasetRow().getUuid()));

    assertThat(datasetData)
        .hasSize(1)
        .extracting(ds -> ds.getName().getValue())
        .allMatch(str -> str.contains(DATASET));
  }

  @Test
  public void testGetCurrentRuns() {
    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao,
            "writeJob",
            "COMPLETE",
            jobFacet,
            Arrays.asList(),
            Arrays.asList(dataset));
    List<JobLineage> newRows =
        writeDownstreamLineage(
            openLineageDao,
            new LinkedList<>(
                Arrays.asList(
                    new DatasetConsumerJob("readJob", 3, Optional.of("outputData2")),
                    new DatasetConsumerJob("downstreamJob", 1, Optional.empty()))),
            jobFacet,
            dataset);

    Set<UUID> expectedRunIds =
        Stream.concat(
                Stream.of(writeJob.getRun().getUuid()), newRows.stream().map(JobLineage::getRunId))
            .collect(Collectors.toSet());
    Set<UUID> jobids =
        Stream.concat(
                Stream.of(writeJob.getJob().getUuid()), newRows.stream().map(JobLineage::getId))
            .collect(Collectors.toSet());

    List<Run> currentRuns = lineageDao.getCurrentRuns(jobids);

    // assert the job does exist
    assertThat(currentRuns)
        .hasSize(expectedRunIds.size())
        .extracting(r -> r.getId().getValue())
        .containsAll(expectedRunIds);
  }

  @Test
  public void testGetCurrentRunsWithFailedJob() {
    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao, "writeJob", "FAIL", jobFacet, Arrays.asList(), Arrays.asList(dataset));

    Set<UUID> jobids = Collections.singleton(writeJob.getJob().getUuid());

    List<Run> currentRuns = lineageDao.getCurrentRuns(jobids);

    // assert the job does exist
    assertThat(currentRuns)
        .hasSize(1)
        .extracting(r -> r.getId().getValue())
        .contains(writeJob.getRun().getUuid());
  }

  @Test
  public void testGetCurrentRunsWithFacetsGetsLatestRun() {
    for (int i = 0; i < 5; i++) {
      LineageTestUtils.createLineageRow(
          openLineageDao,
          "writeJob",
          "COMPLETE",
          jobFacet,
          Arrays.asList(),
          Arrays.asList(dataset));
    }

    List<JobLineage> newRows =
        writeDownstreamLineage(
            openLineageDao,
            new LinkedList<>(
                Arrays.asList(
                    new DatasetConsumerJob("readJob", 3, Optional.of("outputData2")),
                    new DatasetConsumerJob("downstreamJob", 1, Optional.empty()))),
            jobFacet,
            dataset);
    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao, "writeJob", "FAIL", jobFacet, Arrays.asList(), Arrays.asList(dataset));

    Set<UUID> expectedRunIds =
        Stream.concat(
                Stream.of(writeJob.getRun().getUuid()), newRows.stream().map(JobLineage::getRunId))
            .collect(Collectors.toSet());
    Set<UUID> jobids =
        Stream.concat(
                Stream.of(writeJob.getJob().getUuid()), newRows.stream().map(JobLineage::getId))
            .collect(Collectors.toSet());

    List<Run> currentRuns = lineageDao.getCurrentRunsWithFacets(jobids);

    // assert the job does exist
    assertThat(currentRuns)
        .hasSize(expectedRunIds.size())
        .extracting(r -> r.getId().getValue())
        .containsAll(expectedRunIds);

    // assert that run_args, input/output versions, and run facets are fetched from the dao.
    for (Run run : currentRuns) {
      assertThat(run.getArgs()).hasSize(2);
      assertThat(run.getOutputDatasetVersions()).hasSize(1);
      assertThat(run.getFacets()).hasSize(1);
    }
  }

  @Test
  public void testGetCurrentRunsGetsLatestRun() {
    for (int i = 0; i < 5; i++) {
      LineageTestUtils.createLineageRow(
          openLineageDao,
          "writeJob",
          "COMPLETE",
          jobFacet,
          Arrays.asList(),
          Arrays.asList(dataset));
    }

    List<JobLineage> newRows =
        writeDownstreamLineage(
            openLineageDao,
            new LinkedList<>(
                Arrays.asList(
                    new DatasetConsumerJob("readJob", 3, Optional.of("outputData2")),
                    new DatasetConsumerJob("downstreamJob", 1, Optional.empty()))),
            jobFacet,
            dataset);
    UpdateLineageRow writeJob =
        LineageTestUtils.createLineageRow(
            openLineageDao, "writeJob", "FAIL", jobFacet, Arrays.asList(), Arrays.asList(dataset));

    Set<UUID> expectedRunIds =
        Stream.concat(
                Stream.of(writeJob.getRun().getUuid()), newRows.stream().map(JobLineage::getRunId))
            .collect(Collectors.toSet());
    Set<UUID> jobids =
        Stream.concat(
                Stream.of(writeJob.getJob().getUuid()), newRows.stream().map(JobLineage::getId))
            .collect(Collectors.toSet());

    List<Run> currentRuns = lineageDao.getCurrentRuns(jobids);

    // assert the job does exist
    assertThat(currentRuns)
        .hasSize(expectedRunIds.size())
        .extracting(r -> r.getId().getValue())
        .containsAll(expectedRunIds);
  }
}
