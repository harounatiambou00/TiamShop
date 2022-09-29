namespace api.Services.NeighborhoodService
{
    public class NeighborhoodService : INeighborhoodService
    {
        public Task<ServiceResponse<string?>> CreateNeighborhood(string name, int cityId)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> DeleteNeighborhood(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<Neighborhood?>> GetNeighborhoodById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<GetUserDTO[]?>> GetRelatedUsers(int neighborhoodId)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<string?>> UpdateNeighborhood(Neighborhood newNeighborhood)
        {
            throw new NotImplementedException();
        }
    }
}
