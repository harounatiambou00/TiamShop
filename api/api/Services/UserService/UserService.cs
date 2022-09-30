using Dapper;
using Microsoft.Data.SqlClient;
using System;

namespace api.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly string _connectionString;
        public UserService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        public async Task<ServiceResponse<string?>> CreateAdmin(CreateAdminDTO request)
        {

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "INSERT INTO dbo.tblUsers " +
                    "VALUES(@UserGuid, @FirstName, @LastName, @Email, @PhoneNumber, @CompleteAddress, @BirthDate, @CreatedAt, @VerificationToken, @VerifiedAt, @HashedPassword, @PasswordSalt, @ResetPasswordToken, @ResetPasswordTokenExpiresAt, @JobTitle, @JobDescription, @UserTypeId, @NeighborhoodId)";

                User user = new User(request.Email, request.PhoneNumber, request.Password, request.FirstName, request.LastName, request.CompleteAddress, request.BirthDate, request.JobTitle, request.JobDescription);

                var dictionary = new Dictionary<string, object>
                {
                    {"@UserGuid", user.UserGuid},
                    {"@FirstName", user.FirstName},
                    {"@LastName", user.LastName},
                    {"@Email", user.Email},
                    {"@PhoneNumber", user.PhoneNumber},
                    {"@CompleteAddress", user.CompleteAddress},
                    {"@BirthDate", user.BirthDate},
                    {"@CreatedAt", user.CreatedAt},
                    {"@VerificationToken", user.VerificationToken},
                    {"@VerifiedAt", user.VerifiedAt},
                    {"@HashedPassword", user.HashedPassword},
                    {"@PasswordSalt", user.PasswordSalt},
                    {"@ResetPasswordToken", user.ResetPasswordToken},
                    {"@ResetPasswordTokenExpiresAt", user.ResetPasswordTokenExpiresAt},
                    {"@JobTitle", user.JobTitle},
                    {"@JobDescription", user.JobDescription},
                    {"@UserTypeId", request.UserTypeId},
                    {"@NeighborhoodId", request.NeighborhoodId},
                };
                var parameters = new DynamicParameters(dictionary);
                var affectedRows = connection.Execute(query, parameters);
                if(affectedRows == 1)
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = true, 
                        Message = "ADMIN_CREATED_SUCCESSFULLY"
                    };
                }
                else
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = "ADMIN_CREATION_FAILED"
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> DeleteUser(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "DELETE FROM dbo.tblUsers WHERE UserId = @UserId";
                var dictionary = new Dictionary<string, object>
                {
                    { "@UserId", id }
                };
                var parameters = new DynamicParameters(dictionary);
                var affectedRows = connection.Execute(query, parameters);
                if (affectedRows == 0)
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = "USER_NOT_FOUND"
                    };
                }
                else { 
               
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = true,
                        Message = "USER_DELETED_SUCCESSFULLY"
                    };
                }

            }
        }

        public Task<ServiceResponse<string?>> ForgotPassword(string email)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<GetUserDTO?>> GetAdminByGuid(string guid)
        {
            using(var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "SELECT * FROM dbo.tblUsers WHERE UserGuid = @UserGuid";
                var dictionary = new Dictionary<string, object>
                {
                    { "@UserGuid", guid }
                };
                var parameters = new DynamicParameters(dictionary);
                var user = connection.QuerySingle<User>(query, parameters);
                if(user == null)
                {
                    return new ServiceResponse<GetUserDTO?>
                    {
                        Data = null,
                        Success = false,
                        Message = "Admin_NOT_FOUND"
                    };
                }
                else
                {
                    GetUserDTO data = new GetUserDTO
                    {
                        UserId = user.UserId,
                        UserGuid = user.UserGuid,  
                        FirstName = user.FirstName,
                        LastName = user.LastName,   
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        CompleteAddress = user.CompleteAddress, 
                        BirthDate = user.BirthDate,
                        JobTitle = user.JobTitle,   
                        JobDescription = user.JobDescription
                    };
                    return new ServiceResponse<GetUserDTO?>
                    {
                        Data = data,
                        Success = true,
                        Message = "Admin_FOUND"
                    };
                }

            }
        }

        public async Task<ServiceResponse<List<GetUserDTO>>> GetAllAdmins()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                string query = "SELECT * FROM dbo.tblUsers WHERE UserTypeId = 2";

                var users = connection.Query<User>(query);
                users = users.ToList();

                List<GetUserDTO> data = new List<GetUserDTO>();
                foreach (var user in users)
                {
                    data.Add(
                            new GetUserDTO
                            {
                                UserId = user.UserId,
                                UserGuid = user.UserGuid,
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                Email = user.Email,
                                PhoneNumber = user.PhoneNumber,
                                CompleteAddress = user.CompleteAddress,
                                BirthDate = user.BirthDate,
                                JobTitle = user.JobTitle,
                                JobDescription = user.JobDescription,
                            }
                        );
                }
                var response = new ServiceResponse<List<GetUserDTO>>
                {
                    Data = data,
                    Success = true,
                    Message = ""
                };

                return response;
            }
        }

        public async Task<ServiceResponse<List<GetUserDTO>>> GetAllClients()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                string query = "SELECT * FROM dbo.tblUsers WHERE UserTypeId = 1";

                var users = connection.Query<User>(query);
                users = users.ToList();

                List<GetUserDTO> data = new List<GetUserDTO>();
                foreach (var user in users)
                {
                    data.Add(
                            new GetUserDTO
                            {
                                UserId = user.UserId,
                                UserGuid = user.UserGuid,
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                Email = user.Email,
                                PhoneNumber = user.PhoneNumber,
                                CompleteAddress = user.CompleteAddress,
                                BirthDate = user.BirthDate,
                                JobTitle = user.JobTitle,
                                JobDescription = user.JobDescription,
                            }
                        );
                }
                var response = new ServiceResponse<List<GetUserDTO>>
                {
                    Data = data,
                    Success = true,
                    Message = ""
                };

                return response;
            }
        }

        public async Task<ServiceResponse<List<GetUserDTO>>> GetAllUsers()
        {
            using(var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                string query = "SELECT * FROM dbo.tblUsers";

                var users = connection.Query<User>(query);
                users = users.ToList();

                List<GetUserDTO> data = new List<GetUserDTO>();
                foreach(var user in users)
                {
                    data.Add(
                            new GetUserDTO
                            {
                                UserId = user.UserId,
                                UserGuid = user.UserGuid,
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                Email = user.Email,
                                PhoneNumber = user.PhoneNumber,
                                CompleteAddress = user.CompleteAddress, 
                                BirthDate = user.BirthDate,
                                JobTitle = user.JobTitle,   
                                JobDescription = user.JobDescription,
                            }
                        );
                }
                var response = new ServiceResponse<List<GetUserDTO>>
                {
                    Data = data,
                    Success = true,
                    Message = ""
                };

                return response;
            }
        }


        public Task<ServiceResponse<GetUserDTO?>> GetLoggedAdmin()
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<GetUserDTO?>> GetLoogedClient()
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<GetUserDTO?>> GetUserByEmail(string email)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "SELECT * FROM dbo.tblUsers WHERE Email = @Email";
                var dictionary = new Dictionary<string, object>
                {
                    { "@Email", email }
                };
                var parameters = new DynamicParameters(dictionary);
                var user = connection.QuerySingle<User>(query, parameters);
                if (user == null)
                {
                    return new ServiceResponse<GetUserDTO?>
                    {
                        Data = null,
                        Success = false,
                        Message = "USER_NOT_FOUND"
                    };
                }
                else
                {
                    GetUserDTO data = new GetUserDTO
                    {
                        UserId = user.UserId,
                        UserGuid = user.UserGuid,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        CompleteAddress = user.CompleteAddress,
                        BirthDate = user.BirthDate,
                        JobTitle = user.JobTitle,
                        JobDescription = user.JobDescription
                    };
                    return new ServiceResponse<GetUserDTO?>
                    {
                        Data = data,
                        Success = true,
                        Message = "USER_FOUND"
                    };
                }

            }
        }

        public async Task<ServiceResponse<GetUserDTO?>> GetUserById(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "SELECT * FROM dbo.tblUsers WHERE UserId = @UserId";
                var dictionary = new Dictionary<string, object>
                {
                    { "@UserId", id }
                };
                var parameters = new DynamicParameters(dictionary);
                var user = connection.QuerySingle<User>(query, parameters);
                if (user == null)
                {
                    return new ServiceResponse<GetUserDTO?>
                    {
                        Data = null,
                        Success = false,
                        Message = "USER_NOT_FOUND"
                    };
                }
                else
                {
                    GetUserDTO data = new GetUserDTO
                    {
                        UserId = user.UserId,
                        UserGuid = user.UserGuid,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        CompleteAddress = user.CompleteAddress,
                        BirthDate = user.BirthDate,
                        JobTitle = user.JobTitle,
                        JobDescription = user.JobDescription
                    };
                    return new ServiceResponse<GetUserDTO?>
                    {
                        Data = data,
                        Success = true,
                        Message = "USER_FOUND"
                    };
                }
            }
        }

        public async Task<ServiceResponse<GetUserDTO?>> GetUserByPhoneNumber(string phoneNumber)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "SELECT * FROM dbo.tblUsers WHERE PhoneNumber = @PhoneNumber";
                var dictionary = new Dictionary<string, object>
                {
                    { "@PhoneNumber", phoneNumber }
                };
                var parameters = new DynamicParameters(dictionary);
                var user = connection.QuerySingle<User>(query, parameters);
                if (user == null)
                {
                    return new ServiceResponse<GetUserDTO?>
                    {
                        Data = null,
                        Success = false,
                        Message = "USER_NOT_FOUND"
                    };
                }
                else
                {
                    GetUserDTO data = new GetUserDTO
                    {
                        UserId = user.UserId,
                        UserGuid = user.UserGuid,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        CompleteAddress = user.CompleteAddress,
                        BirthDate = user.BirthDate,
                        JobTitle = user.JobTitle,   
                        JobDescription = user.JobDescription
                    };
                    return new ServiceResponse<GetUserDTO?>
                    {
                        Data = data,
                        Success = true,
                        Message = "USER_FOUND"
                    };
                }

            }
        }

        public Task<ServiceResponse<string?>> LoginAdmin(LoginAdminDTO request)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> LoginClient(LoginClientDTO request)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> ResetPassword(ResetPasswordDTO request)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> SendVerificationEmail(SendVerificationEmailDTO request)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> SignUpClient(SignUpClientDTO request)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<string?>> UpdateUser(UpdateUserDTO request)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string query = "UPDATE dbo.tblUsers " +
                    "SET  FirstName = @FirstName, LastName = @LastName, Email = @Email, PhoneNumber = @PhoneNumber, CompleteAddress = @CompleteAddress, BirthDate = @BirthDate " +
                    "WHERE UserId = @UserId ";
                var dictionary = new Dictionary<string, object>
                {
                    { "@UserId", request.UserId },
                    { "@FirstName", request.FirstName },
                    { "@LastName", request.LastName },
                    { "@Email", request.Email },
                    { "@PhoneNumber", request.PhoneNumber },
                    { "@CompleteAddress", request.CompleteAddress },
                    { "@BirthDate", request.BirthDate }
                };
                var parameters = new DynamicParameters(dictionary);
                var affectedRows = connection.Execute(query, parameters);
                if (affectedRows == 0)
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = "USER_NOT_FOUND"
                    };
                }
                else
                {

                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = true,
                        Message = "USER_UPDATED_SUCCESSFULLY"
                    };
                }

            }
        }

        public Task<ServiceResponse<string?>> VerifyEmail(string token)
        {
            throw new NotImplementedException();
        }
    }
}
