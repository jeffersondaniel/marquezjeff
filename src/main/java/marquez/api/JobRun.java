package marquez.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.sql.Timestamp;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public final class JobRun {
  @JsonProperty("runId")
  @NotBlank
  private UUID guid;

  @JsonProperty("startedAt")
  private Timestamp nominalStartTime;

  @JsonProperty("endedAt")
  private Timestamp nominalEndTime;

  @JsonProperty("runArgs")
  private String runArgs;

  @JsonProperty("runState")
  private String currentState;
}
