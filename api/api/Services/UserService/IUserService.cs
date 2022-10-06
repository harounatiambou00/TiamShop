﻿namespace api.Services.UserService
{
    public interface IUserService
    {
        Task<ServiceResponse<List<GetUserDTO>>> GetAllUsers();
        Task<ServiceResponse<List<GetUserDTO>>> GetAllClients();
        Task<ServiceResponse<List<GetUserDTO>>> GetAllAdmins();
        Task<ServiceResponse<GetUserDTO?>> GetUserById(int id);
        Task<ServiceResponse<GetUserDTO?>> GetAdminByGuid(string guid);
        Task<ServiceResponse<GetUserDTO?>> GetUserByEmail(string email);
        Task<ServiceResponse<GetUserDTO?>> GetUserByPhoneNumber(string phoneNumber);
        Task<ServiceResponse<GetUserDTO?>> GetLoogedClient(string token);
        Task<ServiceResponse<GetUserDTO?>> GetLoggedAdmin(string token);
        Task<ServiceResponse<string?>> SignUpClient(SignUpClientDTO request);
        Task<ServiceResponse<string?>> CreateAdmin(CreateAdminDTO request);
        Task<ServiceResponse<string?>> CreateClient(SignUpClientDTO request);
        Task<ServiceResponse<string?>> UpdateUser(UpdateUserDTO request);
        Task<ServiceResponse<string?>> DeleteUser(int id);  
        Task<ServiceResponse<string?>> LoginClient(LoginClientDTO request);
        Task<ServiceResponse<string?>> LoginAdmin(LoginAdminDTO request);
        Task<ServiceResponse<string?>> VerifyEmail(string token);
        Task<ServiceResponse<string?>> ForgotPassword(string email);
        Task<ServiceResponse<string?>> ResetPassword(ResetPasswordDTO request);
        Task<ServiceResponse<string?>> SendVerificationEmail(SendVerificationEmailDTO request);
    }
}
