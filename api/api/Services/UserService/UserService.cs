using Dapper;
using Microsoft.Data.SqlClient;
using System;

namespace api.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly string _connectionString;
        private readonly IJwtService _jwtService;
        private readonly IEmailService _emailService;

        public UserService(IConfiguration config, IJwtService jwtService, IEmailService emailService)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
            _jwtService = jwtService;
            _emailService = emailService;
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
                    {"@UserTypeId", 2},
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

        public async Task<ServiceResponse<string?>> CreateClient(SignUpClientDTO request)
        {
            if (request.Email != null && request.Password != null && request.PhoneNumber != null)
            {
                var clientEmailExists = await GetUserByEmail(request.Email);
                if (!clientEmailExists.Success)
                {
                    var clientPhoneNumberExists = await GetUserByPhoneNumber(request.PhoneNumber);
                    if (!clientPhoneNumberExists.Success)
                    {
                        if (request.Password.Length >= 8)
                        {
                            using(var connection = new SqlConnection(_connectionString))
                            {
                                string sql = "INSERT INTO dbo.tblUsers (FirstName, LastName, Email, PhoneNumber, CompleteAddress, BirthDate, CreatedAt, VerificationToken, VerifiedAt, HashedPassword, PasswordSalt, UserTypeId, NeighborhoodId) " +
                                "VALUES(@FirstName, @LastName, @Email, @PhoneNumber, @CompleteAddress, @BirthDate, @CreatedAt, @VerificationToken, @VerifiedAt, @HashedPassword, @PasswordSalt, @UserTypeId, @NeighborhoodId) ";

                                User user = new User(request.Email, request.PhoneNumber, request.Password, request.FirstName, request.LastName, request.CompleteAddress, request.BirthDate);

                                var dictionary = new Dictionary<string, object>
                                {
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
                                    {"@UserTypeId", 1},
                                    {"@NeighborhoodId", request.NeighborhoodId},
                                };
                                var parameters = new DynamicParameters(dictionary);
                                var affectedRows = connection.Execute(sql, parameters);
                                if (affectedRows == 1)
                                {
                                    return new ServiceResponse<string?>
                                    {
                                        Data = user.VerificationToken,
                                        Success = true,
                                        Message = "CLIENT_CREATED_SUCCESSFULLY"
                                    };
                                }
                                else
                                {
                                    return new ServiceResponse<string?>
                                    {
                                        Data = null,
                                        Success = false,
                                        Message = "CLIENT_CREATION_FAILED"
                                    };
                                }
                            }
                        }
                        else
                        {
                            return new ServiceResponse<string?>
                            {
                                Data = null,
                                Success = false,
                                Message = "THE_PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS"
                            };
                        }
                    }
                    else
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "THIS_PHONE_NUMBER_IS_ALREADY_TAKEN"
                        };
                    }
                }
                else
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = "THIS_EMAIL_ADDRESS_IS_ALREADY_TAKEN"
                    };
                }
            }
            else
            {
                return new ServiceResponse<string?>
                {
                    Data = null,
                    Success = false,
                    Message = "REQUIRED_FIELDS_ARE_NOT_COMPLETLY_FILLED"
                };
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
                try
                {
                    connection.Open();
                    string query = "SELECT * FROM dbo.tblUsers WHERE UserGuid = @UserGuid";
                    var dictionary = new Dictionary<string, object>
                {
                    { "@UserGuid", guid }
                };
                    var parameters = new DynamicParameters(dictionary);
                    var user = connection.QueryFirstOrDefault<User>(query, parameters);
                    if (user == null)
                    {
                        return new ServiceResponse<GetUserDTO?>
                        {
                            Data = null,
                            Success = false,
                            Message = "ADMIN_NOT_FOUND"
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
                            Message = "ADMIN_FOUND"
                        };
                    }
                }
                catch
                {
                    return new ServiceResponse<GetUserDTO?>
                    {
                        Data = null,
                        Success = false,
                        Message = "ADMIN_NOT_FOUND"
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


        public async Task<ServiceResponse<GetUserDTO?>> GetLoggedAdmin(string token)
        {
            var validatedAdminLoginJWT = _jwtService.Verify(token);
            int userId = int.Parse(validatedAdminLoginJWT.Issuer);
            if(validatedAdminLoginJWT.ValidTo < DateTime.Now)
            {
                return new ServiceResponse<GetUserDTO?>
                {
                    Data = null,
                    Success = false,
                    Message = "TOKEN_EXPIRED"
                };
            }
            else
            {
                var user = GetUserById(userId).Result.Data;
                if(user == null)
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
                    return new ServiceResponse<GetUserDTO?>
                    {
                        Data = user,
                        Success = true,
                        Message = "USER_FOUND_SUCCESSFULLY"
                    };
                }
            }
        }

        public Task<ServiceResponse<GetUserDTO?>> GetLoogedClient(string token)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<GetUserDTO?>> GetUserByEmail(string email)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
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
                catch
                {
                    return new ServiceResponse<GetUserDTO?>
                    {
                        Data = null,
                        Success = false,
                        Message = "USER_NOT_FOUND"
                    };
                }
            }
        }

        public async Task<ServiceResponse<GetUserDTO?>> GetUserById(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
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
                }catch
                {
                    return new ServiceResponse<GetUserDTO?>
                    {
                        Data = null,
                        Success = false,
                        Message = "USER_NOT_FOUND"
                    };
                }
            }
        }

        public async Task<ServiceResponse<GetUserDTO?>> GetUserByPhoneNumber(string phoneNumber)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
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
                catch
                {
                    return new ServiceResponse<GetUserDTO?>
                    {
                        Data = null,
                        Success = false,
                        Message = "USER_NOT_FOUND"
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> LoginAdmin(LoginAdminDTO request)
        {
            var response = await GetAdminByGuid(request.UserGuid);
            if(response != null)
            {
                var user = response.Data;
                if (response.Success)
                {
                    if(user.Email == request.Email)
                    {
                        using (var connection = new SqlConnection(_connectionString))
                        {
                            connection.Open();
                            string getPasswordSQL = "SELECT HashedPassword FROM dbo.tblUsers WHERE UserGuid = @UserGuid";
                            var dictionary = new Dictionary<string, object>
                            {
                                { "@UserGuid", request.UserGuid }
                            };
                            var parameters = new DynamicParameters(dictionary);
                            var hashedPassword = connection.ExecuteScalar(getPasswordSQL, parameters);
                            if (BCrypt.Net.BCrypt.Verify(request.Password, hashedPassword.ToString()))
                            {
                                return new ServiceResponse<string?>
                                {
                                    Data = _jwtService.GenerateToken(user.UserId, false),
                                    Success = true,
                                    Message = "TOKEN_GENERATED_SUCCESSFULLY"
                                };
                            }
                            else
                            {
                                return new ServiceResponse<string?>
                                {
                                    Data = null,
                                    Success = false,
                                    Message = "INCORRECT_PASSWORD"
                                };
                            }
                        }
                    }
                    else
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "INCORRECT_EMAIL"
                        };
                    }
                }
                else
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = "ADMIN_NOT_FOUND"
                    };
                }
            }
            else
            {
                return new ServiceResponse<string?>
                {
                    Data = null,
                    Success = false,
                    Message = "ADMIN_NOT_FOUND"
                };
            }

        }

        public async Task<ServiceResponse<string?>> LoginClientWithEmail(LoginClientWithEmailDTO request)
        {
            var response = await GetUserByEmail(request.Email);
            if (response != null)
            {
                if (response.Success)
                {
                    var user = response.Data;
                    if (user.Email == request.Email)
                    {
                        using (var connection = new SqlConnection(_connectionString))
                        {
                            connection.Open();
                            string getPasswordSQL = "SELECT HashedPassword FROM dbo.tblUsers WHERE Email = @Email";
                            var dictionary = new Dictionary<string, object>
                            {
                                { "@Email", request.Email }
                            };
                            var parameters = new DynamicParameters(dictionary);
                            var hashedPassword = connection.ExecuteScalar(getPasswordSQL, parameters);
                            if (BCrypt.Net.BCrypt.Verify(request.Password, hashedPassword.ToString()))
                            {
                                return new ServiceResponse<string?>
                                {
                                    Data = _jwtService.GenerateToken(user.UserId, true),
                                    Success = true,
                                    Message = "TOKEN_GENERATED_SUCCESSFULLY"
                                };
                            }
                            else
                            {
                                return new ServiceResponse<string?>
                                {
                                    Data = null,
                                    Success = false,
                                    Message = "INCORRECT_PASSWORD"
                                };
                            }
                        }
                    }
                    else
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "INCORRECT_EMAIL"
                        };
                    }
                }
                else
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = "CLIENT_NOT_FOUND"
                    };
                }
            }
            else
            {
                return new ServiceResponse<string?>
                {
                    Data = null,
                    Success = false,
                    Message = "CLIENT" +
                    "_NOT_FOUND"
                };
            }
        }

        public async Task<ServiceResponse<string?>> LoginClientWithPhoneNumber(LoginClientWithPhoneNumberDTO request)
        {
            var response = await GetUserByPhoneNumber(request.PhoneNumber);
            if (response != null)
            {
                if (response.Success)
                {
                    var user = response.Data;
                    if (user.PhoneNumber == request.PhoneNumber)
                    {
                        using (var connection = new SqlConnection(_connectionString))
                        {
                            connection.Open();
                            string getPasswordSQL = "SELECT HashedPassword FROM dbo.tblUsers WHERE PhoneNumber = @PhoneNumber";
                            var dictionary = new Dictionary<string, object>
                            {
                                { "@PhoneNumber", request.PhoneNumber }
                            };
                            var parameters = new DynamicParameters(dictionary);
                            var hashedPassword = connection.ExecuteScalar(getPasswordSQL, parameters);
                            if (BCrypt.Net.BCrypt.Verify(request.Password, hashedPassword.ToString()))
                            {
                                return new ServiceResponse<string?>
                                {
                                    Data = _jwtService.GenerateToken(user.UserId, true),
                                    Success = true,
                                    Message = "TOKEN_GENERATED_SUCCESSFULLY"
                                };
                            }
                            else
                            {
                                return new ServiceResponse<string?>
                                {
                                    Data = null,
                                    Success = false,
                                    Message = "INCORRECT_PASSWORD"
                                };
                            }
                        }
                    }
                    else
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "INCORRECT_PHONE_NUMBER"
                        };
                    }
                }
                else
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = "CLIENT_NOT_FOUND"
                    };
                }
            }
            else
            {
                return new ServiceResponse<string?>
                {
                    Data = null,
                    Success = false,
                    Message = "CLIENT_NOT_FOUND"
                };
            }
        }

        public Task<ServiceResponse<string?>> ResetPassword(ResetPasswordDTO request)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> SendVerificationEmail(SendVerificationEmailDTO request)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<string?>> SignUpClient(SignUpClientDTO request)
        {
            var response = await CreateClient(request);
            if (response.Success)
            {
                return new ServiceResponse<string?>
                {
                    Data = response.Data,
                    Success = true,
                    Message = "CLIENT_REGISTERED_SUCCESSFULLY"
                };
            }
            else
            {
                return response;
            }
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

        public async Task<ServiceResponse<string?>> VerifyEmail(string token)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "UPDATE dbo.tblUsers SET VerifiedAt = @VerifiedAt, VerificationToken = NULL WHERE VerificationToken = @VerificationToken";
                    var dictionary = new Dictionary<string, object>
                    {
                        { "@VerifiedAt", DateTime.Now },
                        { "@VerificationToken", token }
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = connection.Execute(query, parameters);
                    if(affectedRows == 0)
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "CLIENT_NOT_FOUND"
                        };
                    }else
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = true,
                            Message = "CLIENT_VERIFIED_SUCCESSFULLY"
                        };
                    }
                }
                catch
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = "CLIENT_NOT_FOUND"
                    };
                }
            }
        }
    }
}
