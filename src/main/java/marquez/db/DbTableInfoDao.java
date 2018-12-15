package marquez.db;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import marquez.common.models.Db;
import marquez.common.models.DbSchema;
import marquez.db.mappers.DbTableInfoRowMapper;
import marquez.db.models.DbTableInfoRow;
import org.jdbi.v3.sqlobject.config.RegisterRowMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterRowMapper(DbTableInfoRowMapper.class)
public interface DbTableInfoDao {
  @SqlUpdate(
      "INSERT INTO db_table_info (uuid, db, db_schema) "
          + "VALUES (:uuid, :db.value, :dbSchema.value)")
  void insert(
      @Bind("uuid") UUID uuid, @BindBean("db") Db db, @BindBean("dbSchema") DbSchema dbSchema);

  @SqlQuery("SELECT * FROM db_table_info WHERE uuid = :uuid")
  Optional<DbTableInfoRow> findBy(@Bind("uuid") UUID uuid);

  @SqlQuery("SELECT * FROM db_table_info LIMIT :limit OFFSET :offset")
  List<DbTableInfoRow> findAll(@Bind("limit") Integer limit, @Bind("offset") Integer offset);
}
