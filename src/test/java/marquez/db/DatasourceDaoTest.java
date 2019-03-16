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

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import marquez.db.models.DatasourceRow;
import marquez.service.models.Generator;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.UnableToExecuteStatementException;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;
import org.jdbi.v3.testing.JdbiRule;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Test;

public class DatasourceDaoTest {
  private static DatasourceDao datasourceDAO;

  @ClassRule
  public static final JdbiRule dbRule =
      JdbiRule.embeddedPostgres().withPlugin(new SqlObjectPlugin()).migrateWithFlyway();

  @BeforeClass
  public static void setup() {
    final Jdbi jdbi = dbRule.getJdbi();
    datasourceDAO = jdbi.onDemand(DatasourceDao.class);

    datasourceDAO.insert(Generator.genDatasourceRow());
    datasourceDAO.insert(Generator.genDatasourceRow());
    datasourceDAO.insert(Generator.genDatasourceRow());
  }

  @Test
  public void testCreate() {
    final DatasourceRow datasourceRow = Generator.genDatasourceRow();
    datasourceDAO.insert(datasourceRow);

    final Optional<DatasourceRow> returnedRow = datasourceDAO.findBy(datasourceRow.getUuid());
    assertThat(returnedRow).isPresent();

    final DatasourceRow row = returnedRow.get();
    assertThat(row.getConnectionUrl()).isEqualTo(datasourceRow.getConnectionUrl());
    assertThat(row.getName()).isEqualTo(datasourceRow.getName());
    assertThat(row.getCreatedAt()).isPresent();
  }

  @Test(expected = UnableToExecuteStatementException.class)
  public void testInsertDuplicateRow() {
    final DatasourceRow datasourceRow = Generator.genDatasourceRow();
    datasourceDAO.insert(datasourceRow);

    final Optional<DatasourceRow> returnedRow = datasourceDAO.findBy(datasourceRow.getUuid());
    assertThat(returnedRow).isPresent();

    datasourceDAO.insert(datasourceRow);
  }

  @Test
  public void testDatasourceNotPresent() {
    final Optional<DatasourceRow> returnedRow = datasourceDAO.findBy(UUID.randomUUID());
    assertThat(returnedRow).isNotPresent();
  }

  @Test
  public void testLimit() {
    final List<DatasourceRow> returnedRows = datasourceDAO.findAll(2, 0);
    assertThat(returnedRows.size()).isEqualTo(2);
  }

  @Test
  public void testOffset() {
    final List<DatasourceRow> returnedRows = datasourceDAO.findAll(100, 0);
    final int returnedRowCount = returnedRows.size();

    final int offset = 1;

    final List<DatasourceRow> returnedRowsWithOffset = datasourceDAO.findAll(100, offset);
    final int returnedRowsWithOffsetSize = returnedRowsWithOffset.size();
    assertThat(returnedRowCount - returnedRowsWithOffsetSize).isEqualTo(offset);
  }
}
