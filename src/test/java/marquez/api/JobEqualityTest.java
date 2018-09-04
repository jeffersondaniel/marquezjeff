package marquez.api;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;
import org.junit.BeforeClass;
import org.junit.Test;

public class JobEqualityTest {

  private static final UUID JOB_UUID = UUID.randomUUID();
  private static final String JOB_NAME = "myJob";
  private static final String OWNER_NAME = "myOwner";
  private static final Timestamp NOMINAL_TIME = Timestamp.from(Instant.now());
  private static final String CATEGORY = "myCategory";
  private static final String DESCRIPTION = "the first job";

  private static Job JOB;

  @BeforeClass
  public static void setupTestJob() {
    JOB = new Job(JOB_UUID, JOB_NAME, OWNER_NAME, NOMINAL_TIME, CATEGORY, DESCRIPTION);
  }

  @Test
  public void testJobEquality() {
    Job j2 = new Job(JOB_UUID, JOB_NAME, OWNER_NAME, NOMINAL_TIME, CATEGORY, DESCRIPTION);
    assertThat(JOB.equals(JOB));
    assertThat(JOB.equals(j2));
    assertThat(j2.equals(JOB));
  }

  @Test
  public void testHashCodeEquality() {
    Job j2 = new Job(JOB_UUID, JOB_NAME, OWNER_NAME, NOMINAL_TIME, CATEGORY, DESCRIPTION);
    assertEquals(JOB.hashCode(), j2.hashCode());
  }

  @Test
  public void testJobInequalityOnUUID() {
    Job j2 = new Job(UUID.randomUUID(), JOB_NAME, OWNER_NAME, NOMINAL_TIME, CATEGORY, DESCRIPTION);
    assertThat(!JOB.equals(j2));
    assertThat(JOB.equals(JOB));
  }

  @Test
  public void testJobInequalityOnNonIDField() {
    Job j2 = new Job(JOB_UUID, "some other name", OWNER_NAME, NOMINAL_TIME, CATEGORY, DESCRIPTION);
    assertThat(!JOB.equals(j2));
    assertThat(JOB.equals(JOB));
  }

  @Test
  public void testJobHashcodeInequality() {
    Job j2 = new Job(UUID.randomUUID(), JOB_NAME, OWNER_NAME, NOMINAL_TIME, CATEGORY, DESCRIPTION);
    assertNotEquals(JOB.hashCode(), j2.hashCode());
  }

  @Test
  public void testJobHashcodeInequalityOnNonIdField() {
    Job j2 =
        new Job(JOB_UUID, "some other job name", OWNER_NAME, NOMINAL_TIME, CATEGORY, DESCRIPTION);
    assertNotEquals(JOB.hashCode(), j2.hashCode());
  }
}
