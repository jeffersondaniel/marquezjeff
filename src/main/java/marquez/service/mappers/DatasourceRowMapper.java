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

package marquez.service.mappers;

import java.util.UUID;
import lombok.NonNull;
import marquez.common.models.ConnectionUrl;
import marquez.common.models.DatasourceName;
import marquez.db.models.DatasourceRow;
import marquez.service.models.DbTableVersion;

public final class DatasourceRowMapper {
  private DatasourceRowMapper() {}

  public static DatasourceRow map(@NonNull DbTableVersion dbTableVersion) {
    return DatasourceRow.builder()
        .uuid(UUID.randomUUID())
        .name(dbTableVersion.getConnectionUrl().getDatasource().getValue())
        .connectionUrl(dbTableVersion.getConnectionUrl().getRawValue())
        .build();
  }

  public static DatasourceRow map(
      @NonNull UUID uuid,
      @NonNull ConnectionUrl connectionUrl,
      @NonNull DatasourceName datasourceName) {
    return DatasourceRow.builder()
        .uuid(uuid)
        .name(datasourceName.getValue())
        .connectionUrl(connectionUrl.getRawValue())
        .build();
  }
}
