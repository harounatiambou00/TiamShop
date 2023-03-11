using api.DTOs.OrderDTOs;
using api.Services.DeliveryService;
using api.Services.OrderLineService;
using api.Services.OrderService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IOrderLineService _orderLineService;
        private readonly IUserService _userService;
        private readonly IDeliveryService _deliveryService;

        public OrderController(IOrderService orderService, IOrderLineService orderLineService, IUserService userService, IDeliveryService deliveryService)
        {
            _orderService = orderService;
            _orderLineService = orderLineService;
            _userService = userService;
            _deliveryService = deliveryService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Order>>>> GetAllOrders()
        {
            return await _orderService.GetAllOrders();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Order?>>> GetOrderById(long id)
        {
            return await _orderService.GetOrderById(id);
        }

        [HttpGet("get-lines-of-order/{id}")]
        public async Task<ActionResult<ServiceResponse<List<OrderLine>>>> GetOrderLinesOfOrder(long id)
        {
            return await _orderService.GetOrderLinesOfOrder(id);
        }

        [HttpGet("get-order-by-reference/{reference}")]
        public async Task<ActionResult<ServiceResponse<Order?>>> GetOrderByReference(string reference)
        {
            return await _orderService.GetOrderByReference(reference);
        }

        [HttpGet("get-orders-by-orderer-email/{email}")]
        public async Task<ActionResult<ServiceResponse<List<Order>>>> GetOrdersByOrdererEmail(string email)
        {
            return await _orderService.GetOrdersByOrdererEmail(email);
        }

        [HttpGet("get-orders-by-orderer-phone-number/{phoneNumber}")]
        public async Task<ActionResult<ServiceResponse<List<Order>>>> GetOrdersByOrdererPhoneNumber(string phoneNumber)
        {
            return await _orderService.GetOrdersByOrdererPhoneNumber(phoneNumber);
        }

        [HttpGet("get-orders-of-a-client/{clientId}")]
        public async Task<ActionResult<ServiceResponse<List<Order>>>> GetOrdersOfClient(int clientId)
        {
            return await _orderService.GetOrdersOfClient(clientId);
        }

        [HttpGet("get-orders-of-a-delivery/{deliveryId}")]
        public async Task<ActionResult<ServiceResponse<List<Order>>>> GetOrdersOfDelivery(long deliveryId)
        {
            return await _orderService.GetOrdersOfDelivery(deliveryId);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<string?>>> DeleteOrder(long id)
        {
            return await _orderService.DeleteOrder(id);
        }

        [HttpPut("validate-order")]
        public async Task<ActionResult<ServiceResponse<string?>>> ValidateOrder(ValidateOrRejectOrderDTO request)
        {
            var getAdminResponse = await _userService.GetAdminByGuid(request.AdminGuid);
            if (!getAdminResponse.Success)
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "ADMIN_NOT_FOUND"
                };

            var getOrderResponse = await _orderService.GetOrderById(request.OrderId);
            if (!getOrderResponse.Success)
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "ORDER_NOT_FOUND"
                };
            else
            {
                var order = getOrderResponse.Data;
                var admin = getAdminResponse.Data;
                if(order != null && admin != null)
                {
                    order.AdminWhoValidatedItId = admin.UserId;
                    order.AdminWhoRejectedItId = null;
                    order.ValidatedAt = DateTime.Now;
                    order.RejectedAt = null;
                    return await _orderService.UpdateOrder(new UpdateOrderDTO()
                    {
                        OrderId = order.OrderId,
                        OrdererFirstName =order.OrdererFirstName,
                        OrdererLastName = order.OrdererLastName,
                        OrdererEmail = order.OrdererEmail,
                        OrdererPhoneNumber = order.OrdererPhoneNumber,
                        OrdererCompleteAddress = order.OrdererCompleteAddress,
                        ValidatedAt = order.ValidatedAt,
                        RejectedAt = order.RejectedAt,
                        DeliveredAt = order.DeliveredAt,
                        ClientId = order.ClientId,
                        AdminWhoRejectedItId = order.AdminWhoRejectedItId,
                        AdminWhoValidatedItId = order.AdminWhoValidatedItId,
                        DeliveryId = order.DeliveryId,
                        NeighborhoodId = order.NeighborhoodId,
                    });
                }
                else return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "SOMETHING_WENT_WRONG"
                };
            }
        }

        [HttpPut("reject-order")]
        public async Task<ActionResult<ServiceResponse<string?>>> RejectOrder(ValidateOrRejectOrderDTO request)
        {
            var getAdminResponse = await _userService.GetAdminByGuid(request.AdminGuid);
            if (!getAdminResponse.Success)
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "ADMIN_NOT_FOUND"
                };

            var getOrderResponse = await _orderService.GetOrderById(request.OrderId);
            if (!getOrderResponse.Success)
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "ORDER_NOT_FOUND"
                };
            else
            {
                var order = getOrderResponse.Data;
                var admin = getAdminResponse.Data;
                if (order != null && admin != null)
                {
                    order.AdminWhoValidatedItId = null;
                    order.AdminWhoRejectedItId = admin.UserId;
                    order.ValidatedAt = null;
                    order.RejectedAt = DateTime.Now;
                    return await _orderService.UpdateOrder(new UpdateOrderDTO()
                    {
                        OrderId = order.OrderId,
                        OrdererFirstName = order.OrdererFirstName,
                        OrdererLastName = order.OrdererLastName,
                        OrdererEmail = order.OrdererEmail,
                        OrdererPhoneNumber = order.OrdererPhoneNumber,
                        OrdererCompleteAddress = order.OrdererCompleteAddress,
                        ValidatedAt = order.ValidatedAt,
                        RejectedAt = order.RejectedAt,
                        DeliveredAt = order.DeliveredAt,
                        ClientId = order.ClientId,
                        AdminWhoRejectedItId = order.AdminWhoRejectedItId,
                        AdminWhoValidatedItId = order.AdminWhoValidatedItId,
                        DeliveryId = order.DeliveryId,
                        NeighborhoodId = order.NeighborhoodId,
                    });
                }
                else return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "SOMETHING_WENT_WRONG"
                };
            }
        }

        [HttpPut("put-order-in-delivery")]
        public async Task<ActionResult<ServiceResponse<string?>>> PutOrderInADelivery(string adminGuid, long orderId, long deliveryId)
        {
            var getAdminResponse = await _userService.GetAdminByGuid(adminGuid);
            if (!getAdminResponse.Success)
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "ADMIN_NOT_FOUND"
                };

            var getOrderResponse = await _orderService.GetOrderById(orderId);
            if (!getOrderResponse.Success)
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "ORDER_NOT_FOUND"
                };

            var getDeliveryResponse = await _deliveryService.GetDeliveryById(deliveryId);
            if (!getDeliveryResponse.Success)
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "DELIVERY_NOT_FOUND"
                };
            else
            {
                var order = getOrderResponse.Data;
                var admin = getAdminResponse.Data;
                var delivery = getDeliveryResponse.Data;
                if (order != null && admin != null && delivery != null)
                {
                    order.DeliveryId = delivery.DeliveryId;
                    order.DeliveredAt = delivery.DeliveredAt;
                    return await _orderService.UpdateOrder(new UpdateOrderDTO()
                    {
                        OrderId = order.OrderId,
                        OrdererFirstName = order.OrdererFirstName,
                        OrdererLastName = order.OrdererLastName,
                        OrdererEmail = order.OrdererEmail,
                        OrdererPhoneNumber = order.OrdererPhoneNumber,
                        OrdererCompleteAddress = order.OrdererCompleteAddress,
                        ValidatedAt = order.ValidatedAt,
                        RejectedAt = order.RejectedAt,
                        DeliveredAt = order.DeliveredAt,
                        ClientId = order.ClientId,
                        AdminWhoRejectedItId = order.AdminWhoRejectedItId,
                        AdminWhoValidatedItId = order.AdminWhoValidatedItId,
                        DeliveryId = order.DeliveryId,
                        NeighborhoodId = order.NeighborhoodId,
                    });
                }
                else return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "SOMETHING_WENT_WRONG"
                };
            }
        }

        [HttpPost("create-order-for-visitor")]
        public async Task<ActionResult<ServiceResponse<string?>>> CreateOrderForVisitor(CreateOrderForVisitorDTO request)
        {
            if (request.Lines.Count == 0)
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "YOU_HAVE_TO_ADD_AT_LEAST_ONE_LINE"
                };
            else
            {
                var createOrderResponse = await _orderService.CreateOrder(new CreateOrderDTO() {
                    OrdererFirstName = request.OrdererFirstName,
                    OrdererLastName = request.OrdererLastName,
                    OrdererEmail = request.OrdererEmail,
                    OrdererPhoneNumber = request.OrdererPhoneNumber,
                    OrdererCompleteAddress = request.OrdererCompleteAddress,
                    ClientId = null,
                    NeighborhoodId = request.NeighborhoodId
                });
                if(createOrderResponse.Success && createOrderResponse.Data != null)
                {
                    var orderId = (long)createOrderResponse.Data;
                    for(int i = 0; i < request.Lines.Count; i++)
                    {
                        var createOrderLines = await _orderLineService.CreateOrderLine(new DTOs.OrderLineDTOs.CreateOrderLineDTO()
                        {
                            Quantity = request.Lines[i].Quantity,
                            OrderId = orderId,
                            ProductId = request.Lines[i].ProductId,
                        });
                    }

                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = true,
                        Message = "ORDER_CREATED_SUCCESSFULLY"
                    };
                }

                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = createOrderResponse.Success,
                    Message = createOrderResponse.Message
                };
            }
        }


        [HttpPost("create-order-for-client")]
        public async Task<ActionResult<ServiceResponse<string?>>> CreateOrderForClient(CreateOrderForClientDTO request)
        {
            if (request.Lines.Count == 0)
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "YOU_HAVE_TO_ADD_AT_LEAST_ONE_LINE"
                };
            else
            {
                var getClientResponse = await _userService.GetUserById(request.ClientId);

                if(getClientResponse == null || !getClientResponse.Success || getClientResponse.Data == null)
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "CLIENT_NOT_FOUND"
                    };
               else
                {
                    var client = (GetUserDTO)getClientResponse.Data;
                    var createOrderResponse = await _orderService.CreateOrder(new CreateOrderDTO()
                    {
                        OrdererFirstName = client.FirstName,
                        OrdererLastName = client.LastName,
                        OrdererEmail = client.Email,
                        OrdererPhoneNumber = client.PhoneNumber,
                        OrdererCompleteAddress = request.OrdererCompleteAddress,
                        ClientId = request.ClientId,
                        NeighborhoodId = request.NeighborhoodId
                    });
                    if (createOrderResponse.Success && createOrderResponse.Data != null)
                    {
                        var orderId = (long)createOrderResponse.Data;
                        for (int i = 0; i < request.Lines.Count; i++)
                        {
                            var createOrderLines = await _orderLineService.CreateOrderLine(new DTOs.OrderLineDTOs.CreateOrderLineDTO()
                            {
                                Quantity = request.Lines[i].Quantity,
                                OrderId = orderId,
                                ProductId = request.Lines[i].ProductId,
                            });
                        }

                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = true,
                            Message = "ORDER_CREATED_SUCCESSFULLY"
                        };
                    }

                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = createOrderResponse.Success,
                        Message = createOrderResponse.Message
                    };
                }
            }
        }
    }
}
