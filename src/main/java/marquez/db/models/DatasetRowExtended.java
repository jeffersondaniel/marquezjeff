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

package marquez.db.models;

import java.time.Instant;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public final class DatasetRowExtended {
  private UUID uuid;
  private Instant createdAt;
  private Instant updatedAt;
  private UUID namespaceUuid;
  private UUID datasourceUuid;
  private String name;
  private String urn;
  private String datasourceUrn;
  private String description;
  private UUID currentVersionUuid;
}
