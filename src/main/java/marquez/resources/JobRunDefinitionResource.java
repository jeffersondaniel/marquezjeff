package marquez.resources;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.UUID;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import marquez.api.Job;
import marquez.api.JobRunDefinition;
import marquez.api.JobVersion;
import marquez.api.entities.*;
import marquez.db.dao.JobDAO;
import marquez.db.dao.JobRunDefinitionDAO;
import marquez.db.dao.JobVersionDAO;

@Path("/job_run_definition")
public final class JobRunDefinitionResource extends BaseResource {
  private JobVersionDAO jobVersionDAO;
  private JobRunDefinitionDAO jobRunDefDAO;
  private JobDAO jobDAO;

  public JobRunDefinitionResource(
      final JobRunDefinitionDAO jobRunDefDAO,
      final JobVersionDAO jobVersionDAO,
      final JobDAO jobDAO) {
    this.jobRunDefDAO = jobRunDefDAO;
    this.jobVersionDAO = jobVersionDAO;
    this.jobDAO = jobDAO;
  }

  @POST
  @Consumes(APPLICATION_JSON)
  @Timed
  public Response create(@Valid CreateJobRunDefinitionRequest request) {

    // find or create the job
    UUID jobGuid; 
    Job matchingJob = this.jobDAO.findByName(request.getName());
    if (matchingJob == null) {
      jobGuid = UUID.randomUUID();
      Job newJob = new Job(jobGuid, request.getName(), request.getOwnerName(), null, null, null);
      this.jobDAO.insert(newJob);
    } else {
      jobGuid = matchingJob.getGuid();
    }

    // find or create the job version
    JobRunDefinition reqJrd = JobRunDefinition.create(request);
    UUID computedVersion = reqJrd.computeVersionGuid();
    JobVersion matchingJobVersion = this.jobVersionDAO.findByVersion(computedVersion);

    UUID jobVersionGuid;
    if (matchingJobVersion == null) {
      // insert new job version
      jobVersionGuid = UUID.randomUUID();
      this.jobVersionDAO.insert(jobVersionGuid, computedVersion, jobGuid, request.getURI());
    } else {
      jobVersionGuid = matchingJobVersion.getGuid();
    }

    // insert new Job Run Definition
    UUID jobRunDefGuid = UUID.randomUUID();
    this.jobRunDefDAO.insert(
        jobRunDefGuid, jobVersionGuid, request.getRunArgsJson());

    CreateJobRunDefinitionResponse res = new CreateJobRunDefinitionResponse(jobRunDefGuid);
    try {
      String jsonRes = mapper.writeValueAsString(res);
      return Response.ok(jsonRes, APPLICATION_JSON).build();
    } catch (JsonProcessingException e) {
      return Response.serverError().build();
    }
  }
}
