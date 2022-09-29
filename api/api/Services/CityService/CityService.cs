namespace api.Services.CityService
{
    public class CityService : ICityService
    {
        public Task<ServiceResponse<string?>> CreateCity(string name, int cityId)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> DeleteCity(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<City?>> GetCityById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<GetUserDTO[]?>> GetRelatedUsers(int cityId)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> UpdateCity(City newCity)
        {
            throw new NotImplementedException();
        }
    }
}
