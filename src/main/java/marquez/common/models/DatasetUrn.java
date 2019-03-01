package marquez.common.models;

import java.util.regex.Pattern;
import lombok.EqualsAndHashCode;
import lombok.NonNull;
import lombok.ToString;

@EqualsAndHashCode
@ToString
public final class DatasetUrn extends Urn {
  private static final int NUM_COMPONENTS = 2;
  private static final Pattern REGEX = Urn.buildPattern(NUM_COMPONENTS);

  public static DatasetUrn of(@NonNull Namespace namespace, @NonNull Dataset dataset) {
    final String value = of(namespace.getValue(), dataset.getValue());
    return of(value);
  }

  public static DatasetUrn of(String value) {
    return new DatasetUrn(value);
  }

  public DatasetUrn(@NonNull String value) {
    super(value, REGEX);
  }
}
