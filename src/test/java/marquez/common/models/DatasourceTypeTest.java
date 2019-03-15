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

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

public class DatasourceTypeTest {

  @Test
  public void testToValue() {
    final String expectedValue = "postgresql";
    assertThat(DatasourceType.POSTGRESQL.toString()).isEqualTo(expectedValue);
  }

  @Test
  public void testValueOf_validValue() {
    final String datasourceType = "mysql";
    final DatasourceType myDatasourceType = DatasourceType.valueOf(datasourceType.toUpperCase());
    assertThat(myDatasourceType.toString()).isEqualTo(datasourceType);
  }

  @Test(expected = IllegalArgumentException.class)
  public void testValueOf_invalidValue() {
    final String datasourceType = "mysql_";
    final DatasourceType myDatasourceType = DatasourceType.valueOf(datasourceType.toUpperCase());
    assertThat(myDatasourceType.toString()).isEqualTo(datasourceType);
  }
}
