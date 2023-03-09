using api.DTOs.UserDTOs.Deliverers;

namespace api.Services.UserService
{
    public interface IUserService
    {
        Task<ServiceResponse<List<GetUserDTO>>> GetAllUsers();
        Task<ServiceResponse<List<GetUserDTO>>> GetAllClients();
        Task<ServiceResponse<List<GetUserDTO>>> GetAllAdmins();
        Task<ServiceResponse<List<GetUserDTO>>> GetAllDeliverers();
        Task<ServiceResponse<GetUserDTO?>> GetUserById(int id);
        Task<ServiceResponse<GetUserDTO?>> GetAdminByGuid(string guid);
        Task<ServiceResponse<GetUserDTO?>> GetUserByEmail(string email);
        Task<ServiceResponse<GetUserDTO?>> GetUserByPhoneNumber(string phoneNumber);
        Task<ServiceResponse<string?>> SignUpClient(SignUpClientDTO request);
        Task<ServiceResponse<string?>> CreateAdmin(CreateAdminDTO request);
        //return the password
        Task<ServiceResponse<string?>> CreateDeliverer(CreateDelivererDTO request);
        Task<ServiceResponse<string?>> CreateClient(SignUpClientDTO request);
        Task<ServiceResponse<string?>> UpdateUser(UpdateUserDTO request);
        Task<ServiceResponse<string?>> DeleteUser(int id);  
        Task<ServiceResponse<string?>> LoginClientWithEmail(LoginClientWithEmailDTO request);
        Task<ServiceResponse<string?>> LoginClientWithPhoneNumber(LoginClientWithPhoneNumberDTO request);
        Task<ServiceResponse<string?>> LoginDelivererWithEmail(LoginDelivererWithEmail request);
        Task<ServiceResponse<string?>> LoginDelivererWithPhoneNumber(LoginDelivererWihPhoneNumber request);
        Task<ServiceResponse<string?>> LoginAdmin(LoginAdminDTO request);
        Task<ServiceResponse<string?>> VerifyEmail(string token);
        Task<ServiceResponse<string?>> RecoverPasswordWithEmail(string email);
        Task<ServiceResponse<string?>> RecoverPasswordWithPhoneNumber(string phoneNumber);
        Task<ServiceResponse<string?>> ResetPassword(ResetPasswordDTO request);
        Task<ServiceResponse<string?>> SendVerificationEmail(SendVerificationEmailDTO request);
    }
}
