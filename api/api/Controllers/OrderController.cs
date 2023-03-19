using api.DTOs.OrderDTOs;
using api.Services.DeliveryService;
using api.Services.OrderLineService;
using api.Services.OrderService;
using api.Services.ProductService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IProductService _productService;
        private readonly IOrderLineService _orderLineService;
        private readonly IUserService _userService;
        private readonly IDeliveryService _deliveryService;
        private readonly IEmailService _emailService;

        public OrderController(IOrderService orderService, IProductService productService, IOrderLineService orderLineService, IUserService userService, IDeliveryService deliveryService, IEmailService emailService)
        {
            _orderService = orderService;
            _productService = productService;
            _orderLineService = orderLineService;
            _userService = userService;
            _deliveryService = deliveryService;
            _emailService = emailService;
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
                    //If the order was initialy rejected or not answered, we have to reduce the products quantities before validating the order
                    if(order.ValidatedAt == null)
                    {
                        var getOrderLinesResponse = await _orderService.GetOrderLinesOfOrder(order.OrderId);
                        if (getOrderLinesResponse != null && getOrderLinesResponse.Success && getOrderLinesResponse.Data != null)
                        {
                            int i = 0;
                            while (i < getOrderLinesResponse.Data.Count)
                            {
                                var validateLineResponse = await _orderLineService.ValidateOrderLine(getOrderLinesResponse.Data[i].OrderLineId);
                                if (validateLineResponse == null || !validateLineResponse.Success)
                                {
                                    //If one of the lines is not validated successfully, we have to undo the ones that succeded
                                    int j = 0;
                                    while (j < i)
                                    {
                                        await _orderLineService.RejectOrderLine(getOrderLinesResponse.Data[j].OrderLineId);
                                        j++;
                                    }
                                    return new ServiceResponse<string?>()
                                    {
                                        Data = null,
                                        Success = false,
                                        Message = getOrderLinesResponse.Data[i].ProductId + "_IS_OUT_OF_STOCK"
                                    };
                                }
                                i++;
                            }
                        }
                        else return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = false,
                            Message = "SOMETHING_WENT_WRONG"
                        };
                    }

                    order.AdminWhoValidatedItId = admin.UserId;
                    order.AdminWhoRejectedItId = null;
                    order.ValidatedAt = DateTime.Now;
                    order.RejectedAt = null;
                    var updateOrderResponse = await _orderService.UpdateOrder(new UpdateOrderDTO()
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

                    //If the order has been validated successfully we send an email to the orderer
                    if (updateOrderResponse.Success)
                    {
                        var getLinesResponse = await _orderService.GetOrderLinesOfOrder(order.OrderId);
                        var lines = getLinesResponse.Data;
                        var emailBody = "";
                        emailBody += "<div style=\"background-color: #FFFFFF; padding-left: 50px; padding-right: 50px; font-family: Verdana, sans-serif; padding-bottom: 25px\">";
                        emailBody += "<img src=\"https://radiant-bunny-7569fa.netlify.app/static/media/logo.9d6669f6aa0e3090ebc9.png\" style=\"height: 100px; width: 100px; margin-top: 10px\"/>";
                        emailBody += "<h3 style=\"opacity: 0.9;\">Bonjour " + order.OrdererFirstName.ToLower() + " " + order.OrdererLastName.ToUpper() + "</h3>";
                        emailBody += "<p>Nous vous remercions d'avoir fait vos courses sur Tiamshop.</p>";
                        emailBody += "<div style=\"height: 4px; width: 40px; background-color: black; border-radius: 50px\"></div>";
                        emailBody += "<h3 style=\"width: fit-content; background-color: #dcfce7; color: #166534; padding-left: 10px; padding-right: 10px; border-radius: 50px\">Votre commande a été validée.</h3>";
                        emailBody += "<h4 style=\"opacity: 0.9;\">Détails de la commande </h4>";
                        emailBody += "<div style=\"border: 2px solid #dddddd; padding: 10px\">";
                        emailBody += "<span> <h4 style=\"display: inline\">Commande: </h4>" + order.OrderReference.ToUpper() + " passée le " + order.OrderDate.Day + "/" + order.OrderDate.Month + "/" + order.OrderDate.Year + " à " + order.OrderDate.Hour + ":" + order.OrderDate.Minute + ":" + order.OrderDate.Second + "</span>";
                        emailBody += "<div style=\"margin-top: 10px\"> <h4 style=\"display: inline\">Paiement: </h4> Paiement comptant à la livraison (Cash on delivery)</div>";
                        emailBody += "</div>";
                        emailBody += "<div style=\"margin-top: 25px\">";
                        emailBody += "<table style=\"width: 100%\">";
                        emailBody += "<tr>";
                        emailBody += "<th style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">N°</th>";
                        emailBody += "<th style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">Produit</th>";
                        emailBody += "<th style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">Quantité</th>";
                        emailBody += "<th style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">Réduction</th>";
                        emailBody += "<th style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">Total</th>";
                        emailBody += "</tr>";
                        for(int i = 0; i < lines.Count; i++)
                        {
                            var getProductResponse = await _productService.GetProductById(lines[i].ProductId);
                            var product = getProductResponse.Data;
                            if(product != null)
                            {
                                emailBody += "<tr>";
                                emailBody += "<td style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">" + i + 1 + "</td>";
                                emailBody += "<td style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">" + product.ProductName + "</td>";
                                emailBody += "<td style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">" + lines[i].Quantity + "</td>";
                                emailBody += "<td style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">" + lines[i].DiscountPercentage * product.ProductPrice + " FCFA</td>";
                                emailBody += "<td style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">" + (product.ProductPrice - (product.ProductPrice * lines[i].DiscountPercentage / 100)) * lines[i].Quantity  + " FCFA</td>";
                                emailBody += "</tr>";
                            }
                        }

                        emailBody += "</table>";
                        emailBody += "</div>";
                        emailBody += "<div style=\"margin-top: 25px; text-align: center\">";
                        emailBody += "<small>";
                        emailBody += "Pour suivre votre commande et télécharger votre facture sur notre site, rendez-vous dans la rubrique « Mes commandes ou me reçus » de votre compte client.";
                        emailBody += "</small>";
                        emailBody += "</div>";
                        emailBody += "</div>";
                        var sendValidationEmailResponse = await _emailService.SendEmail(order.OrdererEmail, "[Tiamshop] Votre commande a été validée", emailBody);
                        if (!sendValidationEmailResponse.Success) return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = true,
                            Message = "ORDER_VALIDATED_SUCCESSFULLY_BUT_SOMETHING_WENT_WRONG_WHILE_SENDING_THE_EMAIL"
                        };

                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = true,
                            Message = "ORDER_VALIDATED_SUCCESSFULLY"
                        };

                    }
                    else return updateOrderResponse;

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

                    //If the order was initialy validated, we have to reduce the products quantities before validating the order
                    if (order.ValidatedAt == null)
                    {
                        var getOrderLinesResponse = await _orderService.GetOrderLinesOfOrder(order.OrderId);
                        if (getOrderLinesResponse != null && getOrderLinesResponse.Success && getOrderLinesResponse.Data != null)
                        {
                            int i = 0;
                            while (i < getOrderLinesResponse.Data.Count)
                            {
                                var rejectLineResponse = await _orderLineService.RejectOrderLine(getOrderLinesResponse.Data[i].OrderLineId);
                                if (rejectLineResponse == null || !rejectLineResponse.Success)
                                {
                                    //If one of the lines is not rejected successfully, we have to undo the ones that succeded
                                    int j = 0;
                                    while (j < i)
                                    {
                                        await _orderLineService.ValidateOrderLine(getOrderLinesResponse.Data[j].OrderLineId);
                                        j++;
                                    }
                                    return new ServiceResponse<string?>()
                                    {
                                        Data = null,
                                        Success = false,
                                        Message = getOrderLinesResponse.Data[i].ProductId + "_IS_OUT_OF_STOCK"
                                    };
                                }
                                i++;
                            }
                        }
                        else return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = false,
                            Message = "SOMETHING_WENT_WRONG"
                        };
                    }

                    order.AdminWhoValidatedItId = null;
                    order.AdminWhoRejectedItId = admin.UserId;
                    order.ValidatedAt = null;
                    order.RejectedAt = DateTime.Now;
                    var updateOrderResponse = await _orderService.UpdateOrder(new UpdateOrderDTO()
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

                    //If the order has been validated successfully we send an email to the orderer
                    if (updateOrderResponse.Success)
                    {
                        var getLinesResponse = await _orderService.GetOrderLinesOfOrder(order.OrderId);
                        var lines = getLinesResponse.Data;
                        var emailBody = "";
                        emailBody += "<div style=\"background-color: #FFFFFF; padding-left: 50px; padding-right: 50px; font-family: Verdana, sans-serif; padding-bottom: 25px\">";
                        emailBody += "<img src=\"https://radiant-bunny-7569fa.netlify.app/static/media/logo.9d6669f6aa0e3090ebc9.png\" style=\"height: 100px; width: 100px; margin-top: 10px\"/>";
                        emailBody += "<h3 style=\"opacity: 0.9;\">Bonjour " + order.OrdererFirstName.ToLower() + " " + order.OrdererLastName.ToUpper() + "</h3>";
                        emailBody += "<p>Nous vous remercions d'avoir fait vos courses sur Tiamshop.</p>";
                        emailBody += "<div style=\"height: 4px; width: 40px; background-color: black; border-radius: 50px\"></div>";
                        emailBody += "<h3 style=\"width: fit-content; background-color: #fee2e2; color: #991b1b; padding-left: 10px; padding-right: 10px; border-radius: 50px\">Votre commande a été annulée.</h3>";
                        emailBody += "<h4 style=\"opacity: 0.9;\">Détails de la commande </h4>";
                        emailBody += "<div style=\"border: 2px solid #dddddd; padding: 10px\">";
                        emailBody += "<span> <h4 style=\"display: inline\">Commande: </h4>" + order.OrderReference.ToUpper() + " passée le " + order.OrderDate.Day + "/" + order.OrderDate.Month + "/" + order.OrderDate.Year + " à " + order.OrderDate.Hour + ":" + order.OrderDate.Minute + ":" + order.OrderDate.Second + "</span>";
                        emailBody += "<div style=\"margin-top: 10px\"> <h4 style=\"display: inline\">Paiement: </h4> Paiement comptant à la livraison (Cash on delivery)</div>";
                        emailBody += "</div>";
                        emailBody += "<div style=\"margin-top: 25px\">";
                        emailBody += "<table style=\"width: 100%\">";
                        emailBody += "<tr>";
                        emailBody += "<th style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">N°</th>";
                        emailBody += "<th style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">Produit</th>";
                        emailBody += "<th style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">Quantité</th>";
                        emailBody += "<th style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">Réduction</th>";
                        emailBody += "<th style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">Total</th>";
                        emailBody += "</tr>";
                        for (int i = 0; i < lines.Count; i++)
                        {
                            var getProductResponse = await _productService.GetProductById(lines[i].ProductId);
                            var product = getProductResponse.Data;
                            if (product != null)
                            {
                                emailBody += "<tr>";
                                emailBody += "<td style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">" + i + 1 + "</td>";
                                emailBody += "<td style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">" + product.ProductName + "</td>";
                                emailBody += "<td style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">" + lines[i].Quantity + "</td>";
                                emailBody += "<td style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">" + lines[i].DiscountPercentage * product.ProductPrice + " FCFA</td>";
                                emailBody += "<td style=\"padding: 5px; border: 1px solid #dddddd; text-align: center\">" + (product.ProductPrice - (product.ProductPrice * lines[i].DiscountPercentage / 100)) * lines[i].Quantity + " FCFA</td>";
                                emailBody += "</tr>";
                            }
                        }

                        emailBody += "</table>";
                        emailBody += "</div>";
                        emailBody += "<div style=\"margin-top: 25px; text-align: center\">";
                        emailBody += "<small>";
                        emailBody += "Pour suivre votre commande et télécharger votre facture sur notre site, rendez-vous dans la rubrique « Mes commandes ou me reçus » de votre compte client.";
                        emailBody += "</small>";
                        emailBody += "</div>";
                        emailBody += "</div>";
                        var sendValidationEmailResponse = await _emailService.SendEmail(order.OrdererEmail, "[Tiamshop] Votre commande a été validée", emailBody);
                        if (!sendValidationEmailResponse.Success) return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = true,
                            Message = "ORDER_VALIDATED_SUCCESSFULLY_BUT_SOMETHING_WENT_WRONG_WHILE_SENDING_THE_EMAIL"
                        };

                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = true,
                            Message = "ORDER_VALIDATED_SUCCESSFULLY"
                        };

                    }
                    else return updateOrderResponse;
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
        public async Task<ActionResult<ServiceResponse<string?>>> PutOrderInADelivery(PutOrderInDeliveryDTO request)
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

            var getDeliveryResponse = await _deliveryService.GetDeliveryById(request.DeliveryId);
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
