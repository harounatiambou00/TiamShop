using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;


namespace api.Controllers
{
    [Route("api/neighborhoods")]
    [ApiController]
    public class NeighborhoodController : ControllerBase
    {
        private readonly string _connectionString;
        private readonly INeighborhoodService _neighborhoodService;

        public NeighborhoodController(IConfiguration config, INeighborhoodService neighborhoodService)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
            _neighborhoodService = neighborhoodService;
        }

        // GET: api/<NeighborhoodController>
        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Neighborhood>>>> Get()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                string query = "SELECT * FROM dbo.tblNeighborhoods";

                var neighborhoods = await connection.QueryAsync<Neighborhood>(query);
                neighborhoods = neighborhoods.ToList();

                List<Neighborhood> data = new List<Neighborhood>();
                foreach (var neighborhood in neighborhoods)
                {
                    data.Add(
                            new Neighborhood
                            {
                               NeighborhoodId = neighborhood.NeighborhoodId,
                               NeighborhoodName = neighborhood.NeighborhoodName,
                            }
                        );
                }
                var response = new ServiceResponse<List<Neighborhood>>
                {
                    Data = data,
                    Success = true,
                    Message = ""
                };

                return response;
            }
        }

        // GET api/<NeighborhoodController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Neighborhood?>>> Get(int id)
        {
            return await _neighborhoodService.GetNeighborhoodById(id);
        }

        // POST api/<NeighborhoodController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<NeighborhoodController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<NeighborhoodController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
