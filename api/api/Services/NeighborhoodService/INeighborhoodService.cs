namespace api.Services.NeighborhoodService
{
    public interface INeighborhoodService
    {
        Task<ServiceResponse<string?>> CreateNeighborhood(string name, int cityId);
        Task<ServiceResponse<Neighborhood?>> GetNeighborhoodById(int id);
        Task<ServiceResponse<string?>> UpdateNeighborhood(Neighborhood newNeighborhood);
        Task<ServiceResponse<string?>> DeleteNeighborhood(int id);
        Task<ServiceResponse<GetUserDTO[]?>> GetRelatedUsers(int neighborhoodId);
    }
}
