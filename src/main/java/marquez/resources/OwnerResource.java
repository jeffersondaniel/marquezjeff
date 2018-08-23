package marquez.resources;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import com.codahale.metrics.annotation.Timed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.PathParam;
import marquez.api.Owner;
import marquez.db.dao.OwnerDAO;

@Path("/owners")
public class OwnerResource extends BaseResource{
  private final OwnerDAO dao;

  public OwnerResource(final OwnerDAO dao) {
    this.dao = dao;
  }

  @POST
  @Consumes(APPLICATION_JSON)
  @Timed
  public Response create(final Owner owner) {
    dao.insert(owner);
    return Response.created(buildURI(Owner.class, owner.getName())).build();
  }

  @Path("{owner}")
  @DELETE
  @Consumes(APPLICATION_JSON)
  public void deleteOwner(@PathParam("owner") String name) {
    dao.delete(name);
  }
}
