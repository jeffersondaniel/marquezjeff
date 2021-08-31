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

package marquez.client.models;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.ImmutableSet;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import javax.annotation.Nullable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NonNull;
import lombok.ToString;
import marquez.client.Utils;

@EqualsAndHashCode
@ToString
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.EXISTING_PROPERTY,
    property = "type")
@JsonSubTypes({
  @JsonSubTypes.Type(value = DbTable.class, name = "DB_TABLE"),
  @JsonSubTypes.Type(value = Stream.class, name = "STREAM")
})
public abstract class Dataset {
  @Getter @NonNull private final DatasetId id;
  @Getter @NonNull private final DatasetType type;
  @Getter @NonNull private final String name;
  @Getter @NonNull private final String physicalName;
  @Getter @NonNull private final Instant createdAt;
  @Getter @NonNull private final Instant updatedAt;
  @Getter @NonNull private final String namespace;
  @Getter @NonNull private final String sourceName;
  @Getter @NonNull private final List<Field> fields;
  @Getter @NonNull private final Set<String> tags;
  @Nullable private final Instant lastModifiedAt;
  @Nullable private final String description;
  @Getter private final Map<String, Object> facets;
  @Getter private final Optional<UUID> currentVersionUuid;

  public Dataset(
      @NonNull final DatasetId id,
      @NonNull final DatasetType type,
      @NonNull final String name,
      @NonNull final String physicalName,
      @NonNull final Instant createdAt,
      @NonNull final Instant updatedAt,
      @NonNull final String namespace,
      @NonNull final String sourceName,
      @Nullable final List<Field> fields,
      @Nullable final Set<String> tags,
      @Nullable final Instant lastModifiedAt,
      @Nullable final String description,
      @Nullable final Map<String, Object> facets,
      @Nullable final UUID currentVersionUuid) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.physicalName = physicalName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.namespace = namespace;
    this.sourceName = sourceName;
    this.fields = (fields == null) ? ImmutableList.of() : ImmutableList.copyOf(fields);
    this.tags = (tags == null) ? ImmutableSet.of() : ImmutableSet.copyOf(tags);
    this.lastModifiedAt = lastModifiedAt;
    this.description = description;
    this.facets = (facets == null) ? ImmutableMap.of() : ImmutableMap.copyOf(facets);
    this.currentVersionUuid = Optional.ofNullable(currentVersionUuid);
  }

  public Optional<Instant> getLastModifiedAt() {
    return Optional.ofNullable(lastModifiedAt);
  }

  public Optional<String> getDescription() {
    return Optional.ofNullable(description);
  }

  public boolean hasFacets() {
    return !facets.isEmpty();
  }

  public static Dataset fromJson(@NonNull final String json) {
    return Utils.fromJson(json, new TypeReference<Dataset>() {});
  }
}
