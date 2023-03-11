using api.DTOs.OrderDTOs;

namespace api.Services.OrderService
{
    public interface IOrderService
    {
        Task<ServiceResponse<List<Order>>> GetAllOrders();
        Task<ServiceResponse<List<Order>>> GetOrdersOfClient(int clientId);
        Task<ServiceResponse<Order?>> GetOrderById(long orderId);
        Task<ServiceResponse<Order?>> GetOrderByReference(string reference);
        Task<ServiceResponse<List<Order>>> GetOrdersOfDelivery(long deliveryId);
        Task<ServiceResponse<List<OrderLine>>> GetOrderLinesOfOrder(long orderId);
        Task<ServiceResponse<List<Order>>> GetOrdersByOrdererPhoneNumber(string phoneNumber);
        Task<ServiceResponse<List<Order>>> GetOrdersByOrdererEmail(string email);
        Task<ServiceResponse<string?>> DeleteOrder(long orderId);
        Task<ServiceResponse<string?>> UpdateOrder(UpdateOrderDTO request);
        Task<ServiceResponse<long?>> CreateOrder(CreateOrderDTO request);
    }
}
