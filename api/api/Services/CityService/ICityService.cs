namespace api.Services.CityService
{
    public interface ICityService
    {
        Task<ServiceResponse<string?>> CreateCity(string name, int cityId);
        Task<ServiceResponse<City?>> GetCityById(int id);
        Task<ServiceResponse<string?>> UpdateCity(City newCity);
        Task<ServiceResponse<string?>> DeleteCity(int id);
        Task<ServiceResponse<GetUserDTO[]?>> GetRelatedUsers(int cityId);
    }
}
