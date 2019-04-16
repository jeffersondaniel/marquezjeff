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

import static marquez.common.models.CommonModelGenerator.newDatasetUrn;
import static marquez.db.models.DbModelGenerator.newDatasetRowWith;
import static marquez.db.models.DbModelGenerator.newDatasetRowsWith;
import static marquez.db.models.DbModelGenerator.newDatasourceRow;
import static marquez.db.models.DbModelGenerator.newNamespaceRow;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.UUID;
import marquez.DataAccessTests;
import marquez.IntegrationTests;
import marquez.common.models.DatasetUrn;
import marquez.common.models.NamespaceName;
import marquez.db.models.DatasetRow;
import marquez.db.models.DatasourceRow;
import marquez.db.models.NamespaceRow;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;
import org.jdbi.v3.testing.JdbiRule;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.experimental.categories.Category;

@Category({DataAccessTests.class, IntegrationTests.class})
public class DatasetDaoTest {
  private static final int LIMIT = 100;
  private static final int OFFSET = 0;

  @ClassRule
  public static final JdbiRule dbRule =
      JdbiRule.embeddedPostgres().withPlugin(new SqlObjectPlugin()).migrateWithFlyway();

  private static NamespaceDao namespaceDao;
  private static DatasourceDao datasourceDao;
  private static DatasetDao datasetDao;

  private static DatasourceRow datasourceRow;
  private static NamespaceRow namespaceRow;

  @BeforeClass
  public static void setUpOnce() {
    final Jdbi jdbi = dbRule.getJdbi();
    namespaceDao = jdbi.onDemand(NamespaceDao.class);
    datasourceDao = jdbi.onDemand(DatasourceDao.class);
    datasetDao = jdbi.onDemand(DatasetDao.class);

    datasourceRow = newDatasourceRow();
    namespaceRow = newNamespaceRow();

    namespaceDao.insert(namespaceRow);
    datasourceDao.insert(datasourceRow);
  }

  @Test
  public void testInsert() {
    final int rowsBefore = datasetDao.count();

    final DatasetRow newDatasetRow =
        newDatasetRowWith(namespaceRow.getUuid(), datasourceRow.getUuid());
    datasetDao.insert(newDatasetRow);

    final int rowsAfter = datasetDao.count();
    assertThat(rowsAfter).isEqualTo(rowsBefore + 1);
  }

  @Test
  public void testInsertAndGet() {
    final DatasetRow newDatasetRow =
        newDatasetRowWith(namespaceRow.getUuid(), datasourceRow.getUuid());
    final DatasetRow datasetRow = datasetDao.insertAndGet(newDatasetRow).orElse(null);
    assertThat(datasetRow).isNotNull();
    assertThat(datasetRow.getUuid()).isEqualTo(newDatasetRow.getUuid());
  }

  @Test
  public void testUpdateCurrentVersionUuid() {
    final DatasetRow newDatasetRow =
        newDatasetRowWith(namespaceRow.getUuid(), datasourceRow.getUuid());
    final DatasetRow datasetRow = datasetDao.insertAndGet(newDatasetRow).orElse(null);
    assertThat(datasetRow.getCurrentVersionUuid()).isNull();

    final UUID currentVersionUuid = UUID.randomUUID();
    datasetDao.updateCurrentVersionUuid(datasetRow.getUuid(), currentVersionUuid);

    final DatasetRow datasetRowWithVersion = datasetDao.findBy(datasetRow.getUuid()).orElse(null);
    assertThat(datasetRowWithVersion.getCurrentVersionUuid()).isNotNull();
    assertThat(datasetRowWithVersion.getCurrentVersionUuid()).isEqualTo(currentVersionUuid);
  }

  @Test
  public void testExists() {
    final DatasetUrn datasetUrn = newDatasetUrn();
    final DatasetRow newDatasetRow =
        newDatasetRowWith(namespaceRow.getUuid(), datasourceRow.getUuid(), datasetUrn);
    datasetDao.insert(newDatasetRow);

    final boolean exists = datasetDao.exists(datasetUrn);
    assertThat(exists).isTrue();
  }

  @Test
  public void testFindBy_uuid() {
    final UUID uuid = UUID.randomUUID();
    final DatasetRow newDatasetRow =
        newDatasetRowWith(uuid, namespaceRow.getUuid(), datasourceRow.getUuid());
    datasetDao.insert(newDatasetRow);

    final DatasetRow datasetRow = datasetDao.findBy(uuid).orElse(null);
    assertThat(datasetRow).isNotNull();
    assertThat(datasetRow.getUuid()).isEqualTo(uuid);
  }

  @Test
  public void testFindBy_urn() {
    final DatasetUrn datasetUrn = newDatasetUrn();
    final DatasetRow newDatasetRow =
        newDatasetRowWith(namespaceRow.getUuid(), datasourceRow.getUuid(), datasetUrn);
    datasetDao.insert(newDatasetRow);

    final DatasetRow datasetRow = datasetDao.findBy(datasetUrn).orElse(null);
    assertThat(datasetRow).isNotNull();
    assertThat(datasetRow.getUrn()).isEqualTo(datasetUrn.getValue());
  }

  @Test
  public void testFindAll() {
    final int totalDatasetRows = datasetDao.count();
    final int rowsToInsert = 4;
    final List<DatasetRow> newDatasetRows =
        newDatasetRowsWith(namespaceRow.getUuid(), datasourceRow.getUuid(), rowsToInsert);
    newDatasetRows.forEach(newDatasetRow -> datasetDao.insert(newDatasetRow));

    final List<DatasetRow> datasetRows =
        datasetDao.findAll(NamespaceName.fromString(namespaceRow.getName()), LIMIT, OFFSET);
    assertThat(datasetRows).isNotNull();
    assertThat(datasetRows).hasSize(totalDatasetRows + rowsToInsert);
  }

  @Test
  public void testFindAll_limitOnly() {
    final List<DatasetRow> newDatasetRows =
        newDatasetRowsWith(namespaceRow.getUuid(), datasourceRow.getUuid(), 4);
    newDatasetRows.forEach(newDatasetRow -> datasetDao.insert(newDatasetRow));

    final List<DatasetRow> datasetRows =
        datasetDao.findAll(NamespaceName.fromString(namespaceRow.getName()), 2, OFFSET);
    assertThat(datasetRows).isNotNull();
    assertThat(datasetRows).hasSize(2);
    assertThat(datasetRows.get(0).getUuid()).isEqualTo(newDatasetRows.get(0).getUuid());
    assertThat(datasetRows.get(1).getUuid()).isEqualTo(newDatasetRows.get(1).getUuid());
  }

  @Test
  public void testFindAll_offsetOnly() {

    final List<DatasetRow> newDatasetRows =
        newDatasetRowsWith(namespaceRow.getUuid(), datasourceRow.getUuid(), 4);
    newDatasetRows.forEach(newDatasetRow -> datasetDao.insert(newDatasetRow));

    final int totalDatasetRows = datasetDao.count();
    final int offset = 2;
    final List<DatasetRow> datasetRows =
        datasetDao.findAll(NamespaceName.fromString(namespaceRow.getName()), LIMIT, offset);

    final List<DatasetRow> datasetRowsNoOffset =
        datasetDao.findAll(NamespaceName.fromString(namespaceRow.getName()), LIMIT, 0);

    assertThat(datasetRows).isNotNull();
    assertThat(datasetRows).hasSize(totalDatasetRows - offset);

    int x = 0;
    while (x < totalDatasetRows - offset) {
      assertThat(datasetRowsNoOffset.get(x + offset).getUuid())
          .isEqualTo(datasetRows.get(x).getUuid());
      x++;
    }
  }
}
