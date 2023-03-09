using Dapper;
using Microsoft.Data.SqlClient;

namespace api.Services.UserTypeService
{
    public class UserTypeService : IUserTypeService
    {
        private readonly string _connectionString;

        public UserTypeService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }
        public Task<ServiceResponse<string?>> CreateUserType(string userTypeName)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> DeleteUserType(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<GetUserDTO>>> GetRelatedUsers(int userTypeId)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<UserType?>> GetUserTypeById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<UserType?>> GetUserTypeByName(string name)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "SELECT * FROM dbo.tblUserTypes WHERE UserTypeName = @UserTypeName";
                    var dictionary = new Dictionary<string, object>
                    {
                        { "@UserTypeName", name }
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var userType = await connection.QuerySingleAsync<UserType>(query, parameters);
                    return new ServiceResponse<UserType?>
                    {
                        Data = userType != null ? userType : null,
                        Success = userType != null,
                        Message = userType != null ? "USERTYPE_FOUND" : "USERTYPE_NOT_FOUND"
                    };
                }
                catch
                {
                    return new ServiceResponse<UserType?>
                    {
                        Data = null,
                        Success = false,
                        Message = "USERTYPE_NOT_FOUND"
                    };
                }
            }
        }

        public Task<ServiceResponse<UserType?>> UpdateUserType(string newUserTypeName)
        {
            throw new NotImplementedException();
        }
    }
}
