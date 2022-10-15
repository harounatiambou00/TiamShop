using Dapper;
using Microsoft.Data.SqlClient;

namespace api.Services.NeighborhoodService
{
    public class NeighborhoodService : INeighborhoodService
    {

        private readonly string _connectionString;
        public NeighborhoodService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        public Task<ServiceResponse<string?>> CreateNeighborhood(string name, int cityId)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> DeleteNeighborhood(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<Neighborhood?>> GetNeighborhoodById(int id)
        {
            using(var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    string query = "SELECT * FROM dbo.tblNeighborhoods WHERE NeighborhoodId = @NeighborhoodId";
                    var dictionary = new Dictionary<string, object>
                    {
                        { "@NeighborhoodId", id }
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var neighborhood = connection.QueryFirstOrDefault<Neighborhood>(query, parameters);
                    if(neighborhood == null)
                    {
                        return new ServiceResponse<Neighborhood?>
                        {
                            Data = null,
                            Success = false,
                            Message = "NEIGHBORHOOD_DOES_NOT_EXIST"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<Neighborhood?>
                        {
                            Data = neighborhood,
                            Success = true,
                            Message = "NEIGHBORHOOD_FOUND"
                        };
                    }
                }
                catch
                {
                    return new ServiceResponse<Neighborhood?>
                    {
                        Data = null,
                        Success = false,
                        Message = "NEIGHBORHOOD_DOES_NOT_EXIST"
                    };
                }
            }
        }

        public Task<ServiceResponse<GetUserDTO[]?>> GetRelatedUsers(int neighborhoodId)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> UpdateNeighborhood(Neighborhood newNeighborhood)
        {
            throw new NotImplementedException();
        }
    }
}
