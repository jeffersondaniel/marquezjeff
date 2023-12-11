package marquez.api;

import static marquez.common.models.CommonModelGenerator.newDescription;
import static marquez.common.models.CommonModelGenerator.newTagName;
import static marquez.service.models.ServiceModelGenerator.newTag;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.Set;
import marquez.client.models.Tag;
import org.junit.jupiter.api.Test;

public class TagResourceTest extends BaseResourceIntegrationTest {
  @Test
  public void testApp_createTag() {
    // (1) List tags.
    final Set<Tag> tagsBefore = MARQUEZ_CLIENT.listTags();

    // (2) Add new tag.
    final Tag newTag = MARQUEZ_CLIENT.createTag(newTagName().getValue(), newDescription());

    // (3) List tags; ensure new tag has been added.
    final Set<Tag> tagsAfter = MARQUEZ_CLIENT.listTags();
    assertThat(tagsAfter).hasSize(tagsBefore.size() + 1);
    assertThat(tagsAfter).contains(newTag);
  }

  @Test
  public void testApp_listTags() {
    // (1) List tags.
    final Set<Tag> tags = MARQUEZ_CLIENT.listTags();

    // (2) Ensure tags 'PII', 'SENSITIVE' defined in 'config.test.yml' are present.
    assertThat(tags).contains(PII, SENSITIVE);
  }
}
