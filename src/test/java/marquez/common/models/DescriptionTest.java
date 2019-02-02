package marquez.common.models;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class DescriptionTest {
  @Test
  public void testNewDescription() {
    final String description = "marquez";
    assertEquals(description, Description.fromString(description).getValue());
  }

  @Test(expected = NullPointerException.class)
  public void testDescriptionNull() {
    final String nullDescription = null;
    Description.fromString(nullDescription);
  }
}
