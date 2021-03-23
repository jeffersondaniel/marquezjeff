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

package marquez.db;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.Value;
import marquez.common.models.Field;
import marquez.db.mappers.DatasetFieldMapper;
import marquez.db.mappers.DatasetFieldRowMapper;
import marquez.db.models.DatasetFieldRow;
import marquez.db.models.TagRow;
import marquez.service.models.Dataset;
import org.jdbi.v3.sqlobject.config.RegisterRowMapper;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.SqlBatch;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterRowMapper(DatasetFieldRowMapper.class)
@RegisterRowMapper(DatasetFieldMapper.class)
public interface DatasetFieldDao extends BaseDao {
  @SqlQuery(
      "SELECT EXISTS ("
          + "SELECT 1 FROM dataset_fields AS df "
          + "INNER JOIN datasets AS d "
          + "  ON d.uuid = df.dataset_uuid AND d.name = :datasetName AND d.namespace_name = :namespaceName "
          + "WHERE df.name = :name)")
  boolean exists(String namespaceName, String datasetName, String name);

  default Dataset updateTags(
      String namespaceName, String datasetName, String fieldName, String tagName) {
    Instant now = Instant.now();
    TagRow tag = createTagDao().upsert(UUID.randomUUID(), now, tagName);
    UUID datasetUuid = createDatasetDao().getUuid(namespaceName, datasetName).get();
    UUID fieldUuid = createDatasetFieldDao().findUuid(datasetUuid, fieldName).get();

    updateTags(fieldUuid, tag.getUuid(), now);
    return createDatasetDao().find(namespaceName, datasetName).get();
  }

  @SqlUpdate(
      "INSERT INTO dataset_fields_tag_mapping (dataset_field_uuid, tag_uuid, tagged_at) "
          + "VALUES (:rowUuid, :tagUuid, :taggedAt)")
  void updateTags(UUID rowUuid, UUID tagUuid, Instant taggedAt);

  @SqlBatch(
      "INSERT INTO dataset_fields_tag_mapping (dataset_field_uuid, tag_uuid, tagged_at) "
          + "VALUES (:datasetFieldUuid, :tagUuid, :taggedAt) ON CONFLICT DO NOTHING")
  void updateTags(@BindBean List<DatasetFieldTag> datasetFieldTag);

  @SqlQuery(
      "SELECT uuid "
          + "FROM dataset_fields "
          + "WHERE dataset_uuid = :datasetUuid AND name = :name")
  Optional<UUID> findUuid(UUID datasetUuid, String name);

  @SqlQuery(
      "SELECT f.*, "
          + "ARRAY(SELECT t.name "
          + "      FROM dataset_fields_tag_mapping m "
          + "      INNER JOIN tags t on t.uuid = m.tag_uuid "
          + "      WHERE m.dataset_field_uuid = f.uuid) AS tags "
          + "FROM dataset_fields f "
          + "INNER JOIN dataset_versions_field_mapping fm on fm.dataset_field_uuid = f.uuid "
          + "WHERE fm.dataset_version_uuid = :datasetVersionUuid")
  List<Field> find(UUID datasetVersionUuid);

  @SqlQuery(
      "INSERT INTO dataset_fields ("
          + "uuid, "
          + "type, "
          + "created_at, "
          + "updated_at, "
          + "dataset_uuid, "
          + "name, "
          + "description"
          + ") VALUES ("
          + ":uuid, "
          + ":type, "
          + ":now, "
          + ":now, "
          + ":datasetUuid, "
          + ":name, "
          + ":description) "
          + "ON CONFLICT(dataset_uuid, name, type) "
          + "DO UPDATE SET "
          + "updated_at = EXCLUDED.updated_at, "
          + "description = EXCLUDED.description "
          + "RETURNING *")
  DatasetFieldRow upsert(
      UUID uuid, Instant now, String name, String type, String description, UUID datasetUuid);

  @SqlBatch(
      "INSERT INTO dataset_versions_field_mapping (dataset_version_uuid, dataset_field_uuid) "
          + "VALUES (:datasetVersionUuid, :datasetFieldUuid) ON CONFLICT DO NOTHING")
  void updateFieldMapping(@BindBean List<DatasetFieldMapping> datasetFieldMappings);

  @Value
  class DatasetFieldMapping {
    UUID datasetVersionUuid;
    UUID datasetFieldUuid;
  }

  @Value
  class DatasetFieldTag {
    UUID datasetFieldUuid;
    UUID tagUuid;
    Instant taggedAt;
  }
}
