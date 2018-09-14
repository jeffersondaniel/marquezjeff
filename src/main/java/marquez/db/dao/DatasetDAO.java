package marquez.db.dao;

import marquez.api.Dataset;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.SqlQuery;

import java.util.List;
import java.util.UUID;

public interface DatasetDAO {
  @SqlQuery("SELECT * FROM datasets WHERE guid = :guid")
  Dataset findByGuid(@Bind("guid") UUID guid);

  @SqlQuery("SELECT * FROM datasets")
  List<Dataset> findAll();
}
