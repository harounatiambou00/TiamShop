namespace api.Services.UserTypeService
{
    public class UserTypeService : IUserTypeService
    {
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

        public Task<ServiceResponse<UserType?>> UpdateUserType(string newUserTypeName)
        {
            throw new NotImplementedException();
        }
    }
}
