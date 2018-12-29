package marquez.db.models;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@RequiredArgsConstructor
@EqualsAndHashCode
@ToString
@Builder
public final class JobRow {
  @Getter @NonNull private final UUID uuid;
  @Getter @NonNull private final Instant createdAt;
  @Getter @NonNull private final Instant updatedAt;
  @Getter @NonNull private final UUID namespaceUuid;
  @Getter @NonNull private final String job;
  @Getter @NonNull private final UUID currentVersionUuid;
  private final String description;

  public Optional<String> getDescription() {
    return Optional.ofNullable(description);
  }
}
