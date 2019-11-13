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

package marquez.common.models;

import static marquez.common.Utils.VERSION_JOINER;
import static marquez.common.base.MorePreconditions.checkNotBlank;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.Optional;
import javax.annotation.Nullable;
import lombok.NonNull;
import lombok.Value;

@Value
public class DbColumn {
  String name;
  String type;
  @Nullable String description;

  @JsonCreator
  public DbColumn(
      @NonNull final String name, @NonNull final String type, @Nullable final String description) {
    this.name = checkNotBlank(name);
    this.type = checkNotBlank(type);
    this.description = description;
  }

  public String getColumnUUID() {
    return VERSION_JOINER.join(getName(), getType(), getDescription());
  }

  public Optional<String> getDescription() {
    return Optional.ofNullable(description);
  }
}
