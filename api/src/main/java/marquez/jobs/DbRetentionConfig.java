/*
 * Copyright 2018-2023 contributors to the Marquez project
 * SPDX-License-Identifier: Apache-2.0
 */

package marquez.jobs;

import lombok.Getter;
import lombok.Setter;

public class DbRetentionConfig {
  public static final boolean DEFAULT_ENABLED = false;
  public static final int DEFAULT_RETENTION_IN_DAYS = 7;

  @Getter @Setter private boolean enabled = DEFAULT_ENABLED;
  @Getter @Setter private int retentionInDays = DEFAULT_RETENTION_IN_DAYS;
}
