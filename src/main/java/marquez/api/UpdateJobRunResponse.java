package marquez.api;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.NotBlank;

import java.util.UUID;

public final class UpdateJobRunResponse {
  private final UUID externalGuid;

  @JsonCreator
  public UpdateJobRunResponse(@JsonProperty("job_run_id") @NotBlank final UUID externalGuid) {
    this.externalGuid = externalGuid;
  }

  @JsonProperty("job_run_id")
  public UUID getExternalGuid() {
    return externalGuid;
  }
}
