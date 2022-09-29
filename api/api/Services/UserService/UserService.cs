namespace api.Services.UserService
{
    public class UserService : IUserService
    {
        public Task<ServiceResponse<string?>> CreateAdmin(CreateAdminDTO request)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> ForgotPassword(string email)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<GetUserDTO?>> GetAdminByGuid(string guid)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<GetUserDTO[]>>> GetAllAdmins()
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<GetUserDTO[]>>> GetAllClients()
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<GetUserDTO[]>>> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<GetUserDTO?>> GetLoggedAdmin()
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<GetUserDTO?>> GetLoogedClient()
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<GetUserDTO?>> GetUserByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<GetUserDTO?>> GetUserById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<GetUserDTO?>> GetUserByPhoneNumber(string phoneNumber)
        {
            throw new NotImplementedException();
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

        public Task<ServiceResponse<string?>> UpdateUser(UpdateUserDTO request)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> VerifyEmail(string token)
        {
            throw new NotImplementedException();
        }
    }
}
