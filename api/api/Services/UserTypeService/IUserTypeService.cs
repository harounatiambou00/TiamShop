
namespace api.Services.UserTypeService
{
    public interface IUserTypeService
    {
        Task<ServiceResponse<string?>> CreateUserType(string userTypeName);
        Task<ServiceResponse<UserType?>> GetUserTypeById(int id);
        Task<ServiceResponse<UserType?>> GetUserTypeByName(string name);
        Task<ServiceResponse<UserType?>> UpdateUserType(string newUserTypeName);
        Task<ServiceResponse<string?>> DeleteUserType(int id);
        Task<ServiceResponse<List<GetUserDTO>>> GetRelatedUsers(int userTypeId);
    }
}
