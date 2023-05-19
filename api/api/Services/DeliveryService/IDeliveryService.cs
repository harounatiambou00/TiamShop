using api.DTOs.DeliveryDTOs;

namespace api.Services.DeliveryService
{
    public interface IDeliveryService
    {
        Task<ServiceResponse<List<Delivery>>> GetAllDeliveries();
        Task<ServiceResponse<List<Delivery>>> GetDeliveriesAffectedToDeliverer(int delivererId);
        Task<ServiceResponse<Delivery?>> GetDeliveryById(long id);
        Task<ServiceResponse<Delivery?>> GetDeliveryByReference(string reference);
        Task<ServiceResponse<string?>> CreateDelivery(CreateDeliveryDTO request);
        Task<ServiceResponse<string?>> DeleteDelivery(long id);
        Task<ServiceResponse<string?>> UpdateDelivery(UpdateDeliveryDTO request);
        Task<ServiceResponse<string?>> AssignDeliveryToDeliverer(AssignDeliveryToDelivererDTO request);
    }
}
