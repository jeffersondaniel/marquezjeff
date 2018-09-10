package marquez.db.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;
import marquez.api.Job;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

final class JobRow implements RowMapper<Job> {
  @Override
  public Job map(final ResultSet rs, final StatementContext ctx) throws SQLException {
    return new Job(
        UUID.fromString(rs.getString("guid")),
        rs.getString("name"),
        rs.getString("ownerName"),
        rs.getTimestamp("nominal_time"),
        rs.getString("category"),
        rs.getString("description"));
  }
}
