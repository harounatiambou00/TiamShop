using api.DTOs.OrderLineDTOs;

namespace api.Services.OrderLineService
{
    public interface IOrderLineService
    {
        Task<ServiceResponse<OrderLine?>> GetOrderLineById(long id);
        Task<ServiceResponse<string?>> CreateOrderLine(CreateOrderLineDTO request);
        Task<ServiceResponse<string?>> UpdateOrderLine(UpdateOrderLineDTO request);
        Task<ServiceResponse<string?>> DeleteOrderLine(long id);
        Task<ServiceResponse<string?>> ValidateOrderLine(long id);
        Task<ServiceResponse<string?>> RejectOrderLine(long id);
    }
}
