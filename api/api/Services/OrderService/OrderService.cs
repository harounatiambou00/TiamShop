using api.DTOs.OrderDTOs;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly string _connectionString;
        private readonly IUserService _userService;
        private readonly INeighborhoodService _neighborhoodService;

        public OrderService(IConfiguration config, IUserService userService, INeighborhoodService neighborhoodService)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
            _userService = userService;
            _neighborhoodService = neighborhoodService;
        }

        public async Task<ServiceResponse<long?>> CreateOrder(CreateOrderDTO request)
        {
            if(request.ClientId != null)
            {
                var getClientResponse = await _userService.GetUserById((int)request.ClientId);
                if (!getClientResponse.Success)
                    return new ServiceResponse<long?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "CLIENT_NOT_FOUND"
                    };

            }

            var getNeighborhoodResponse = await _neighborhoodService.GetNeighborhoodById(request.NeighborhoodId);
            if (!getNeighborhoodResponse.Success)
                return new ServiceResponse<long?>()
                {
                    Data = null,
                    Success = false,
                    Message = "NEIGHBORHOOD_NOT_FOUND"
                };

            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();

                    var cmd = new SqlCommand("dbo.CreateOrder", connection);
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Define the input parameters
                    cmd.Parameters.AddWithValue("@OrderReference", Order.generateReference(request.OrdererFirstName, request.OrdererLastName, request.OrdererEmail));
                    cmd.Parameters.AddWithValue("@OrderDate", DateTime.Now);
                    cmd.Parameters.AddWithValue("@OrdererFirstName", request.OrdererFirstName);
                    cmd.Parameters.AddWithValue("@OrdererLastName", request.OrdererLastName);
                    cmd.Parameters.AddWithValue("@OrdererEmail", request.OrdererEmail);
                    cmd.Parameters.AddWithValue("@OrdererPhoneNumber", request.OrdererPhoneNumber);
                    cmd.Parameters.AddWithValue("@OrdererCompleteAddress", request.OrdererCompleteAddress);
                    cmd.Parameters.AddWithValue("@NeighborhoodId", request.NeighborhoodId);
                    cmd.Parameters.AddWithValue("@ClientId", request.ClientId);

                    // Define the output parameter
                    var outputParam = new SqlParameter("@OrderId", SqlDbType.BigInt);
                    outputParam.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(outputParam);

                    await cmd.ExecuteNonQueryAsync();

                    // Get the value of the output parameter
                    var orderId = outputParam.Value;

                    return new ServiceResponse<long?>()
                    {
                        Data = orderId != null ? (long)orderId : null,
                        Success = orderId != null,
                        Message = orderId != null ? "ORDER_CREATED_SUCCESSFULLY" : "SOMETHING_WENT_WRONG",
                    };
                }
                catch(Exception _)
                {
                    return new ServiceResponse<long?>()
                    {
                        Data = null,
                        Success = false,
                        Message = _.ToString(),
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> DeleteOrder(long orderId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.DeleteOrder @OrderId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@OrderId", orderId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(query, parameters);
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = affectedRows > 0,
                        Message = affectedRows > 0 ? "ORDER_DELETED_SUCCESSFULLY" : "ORDER_NOT_FOUND"
                    };
                }
                catch
                {
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMETHING_WENT_WRONG"
                    };
                }
            }
        }

        public async Task<ServiceResponse<List<Order>>> GetAllOrders()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetAllOrders";
                    var orders = await connection.QueryAsync<Order>(query);
                    return new ServiceResponse<List<Order>>()
                    {
                        Data = orders.ToList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch
                {
                    return new ServiceResponse<List<Order>>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMETHING_WENT_WRONG"
                    };
                }
            }
        }

        public async Task<ServiceResponse<Order?>> GetOrderById(long orderId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetOrderById @OrderId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@OrderId", orderId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var order = await connection.QueryFirstOrDefaultAsync<Order>(query, parameters);
                    return new ServiceResponse<Order?>()
                    {
                        Data = order != null? order : null,
                        Success = order != null,
                        Message = order != null ? "ORDER_FOUND" : "ORDER_NOT_FOUND"
                    };
                }
                catch
                {
                    return new ServiceResponse<Order?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMETHING_WENT_WRONG"
                    };
                }
            }
        }

        public async Task<ServiceResponse<Order?>> GetOrderByReference(string reference)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetOrderByReference @OrderReference";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@OrderReference", reference},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var order = await connection.QueryFirstOrDefaultAsync<Order>(query, parameters);
                    return new ServiceResponse<Order?>()
                    {
                        Data = order != null ? order : null,
                        Success = order != null,
                        Message = order != null ? "ORDER_FOUND" : "ORDER_NOT_FOUND"
                    };
                }
                catch
                {
                    return new ServiceResponse<Order?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMETHING_WENT_WRONG"
                    };
                }
            }
        }

        public async Task<ServiceResponse<List<OrderLine>>> GetOrderLinesOfOrder(long orderId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetOrderLinesOfOrder @OrderId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@OrderId", orderId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var orderLines = await connection.QueryAsync<OrderLine>(query, parameters);
                    return new ServiceResponse<List<OrderLine>>()
                    {
                        Data = orderLines.ToList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch
                {
                    return new ServiceResponse<List<OrderLine>>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMETHING_WENT_WRONG"
                    };
                }
            }
        }

        public async Task<ServiceResponse<List<Order>>> GetOrdersByOrdererEmail(string email)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetOrdersByOrdererEmail @OrdererEmail";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@OrdererEmail", email},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var orders = await connection.QueryAsync<Order>(query, parameters);
                    return new ServiceResponse<List<Order>>()
                    {
                        Data = orders.ToList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch
                {
                    return new ServiceResponse<List<Order>>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMETHING_WENT_WRONG"
                    };
                }
            }
        }

        public async Task<ServiceResponse<List<Order>>> GetOrdersByOrdererPhoneNumber(string phoneNumber)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetOrdersByOrdererPhoneNumber @PhoneNumber";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@PhoneNumber", phoneNumber},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var orders = await connection.QueryAsync<Order>(query, parameters);
                    return new ServiceResponse<List<Order>>()
                    {
                        Data = orders.ToList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch
                {
                    return new ServiceResponse<List<Order>>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMETHING_WENT_WRONG"
                    };
                }
            }
        }

        public async Task<ServiceResponse<List<Order>>> GetOrdersOfClient(int clientId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetOrdersOfAClient @ClientId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@ClientId", clientId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var orders = await connection.QueryAsync<Order>(query, parameters);
                    return new ServiceResponse<List<Order>>()
                    {
                        Data = orders.ToList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch
                {
                    return new ServiceResponse<List<Order>>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMETHING_WENT_WRONG"
                    };
                }
            }
        }

        public async Task<ServiceResponse<List<Order>>> GetOrdersOfDelivery(long deliveryId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetOrdersOfDelivery @DeliveryId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@DeliveryId", deliveryId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var orders = await connection.QueryAsync<Order>(query, parameters);
                    return new ServiceResponse<List<Order>>()
                    {
                        Data = orders.ToList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch
                {
                    return new ServiceResponse<List<Order>>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMETHING_WENT_WRONG"
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> UpdateOrder(UpdateOrderDTO request)
        {
            var getOrderResponse = await GetOrderById(request.OrderId);
            if (getOrderResponse == null || !getOrderResponse.Success || getOrderResponse.Data == null)
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "ORDER_NOT_FOUND"
                };
            else
            {
                if (request.ClientId != null)
                {
                    var getClientResponse = await _userService.GetUserById((int)request.ClientId);
                    if (!getClientResponse.Success)
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = false,
                            Message = "CLIENT_NOT_FOUND"
                        };

                }

                if (request.AdminWhoValidatedItId != null)
                {
                    var getAdminWhoValidatedItResponse = await _userService.GetUserById((int)request.AdminWhoValidatedItId);
                    if (!getAdminWhoValidatedItResponse.Success)
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = false,
                            Message = "ADMIN_NOT_FOUND"
                        };
                }

                if (request.AdminWhoRejectedItId != null)
                {
                    var getAdminWhoRejectedItResponse = await _userService.GetUserById((int)request.AdminWhoRejectedItId);
                    if (!getAdminWhoRejectedItResponse.Success)
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = false,
                            Message = "ADMIN_NOT_FOUND"
                        };
                }

                var getNeighborhoodResponse = await _neighborhoodService.GetNeighborhoodById(request.NeighborhoodId);
                if (!getNeighborhoodResponse.Success)
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "NEIGHBORHOOD_NOT_FOUND"
                    };
                using (var connection = new SqlConnection(_connectionString))
                {
                    try
                    {
                        connection.Open();
                        string query = "EXEC dbo.UpdateOrder @OrderId, @OrderReference, @OrderDate, @OrdererFirstName, @OrdererLastName, @OrdererEmail, @OrdererPhoneNumber, @OrdererCompleteAdress, @ValidatedAt, @RejectedAt, @DeliveredAt, @NeighborhoodId, @ClientId, @AdminWhoValidatedItId, @AdminWhoRejectedItId, @DeliveryId";
                        var dictionary = new Dictionary<string, object>
                    {
                        {"@OrderId", request.OrderId},
                        {"@OrderReference", getOrderResponse.Data.OrderReference},
                        {"@OrderDate", getOrderResponse.Data.OrderDate},
                        {"@OrdererFirstName", request.OrdererFirstName},
                        {"@OrdererLastName", request.OrdererLastName},
                        {"@OrdererEmail", request.OrdererEmail},
                        {"@OrdererPhoneNumber", request.OrdererPhoneNumber},
                        {"@OrdererCompleteAdress", request.OrdererCompleteAddress},
                        {"@ValidatedAt", request.ValidatedAt},
                        {"@RejectedAt", request.RejectedAt},
                        {"@DeliveredAt", request.DeliveredAt},
                        {"@NeighborhoodId", request.NeighborhoodId},
                        {"@ClientId", request.ClientId},
                        {"@AdminWhoValidatedItId", request.AdminWhoValidatedItId},
                        {"@AdminWhoRejectedItId", request.AdminWhoRejectedItId},
                        {"@DeliveryId", request.DeliveryId},
                    };
                        var parameters = new DynamicParameters(dictionary);
                        var affectedRows = await connection.ExecuteAsync(query, parameters);
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = affectedRows > 0,
                            Message = affectedRows > 0 ? "ORDER_UPDATED_SUCCESSFULLY" : "ORDER_NOT_FOUND"
                        };
                    }
                    catch
                    {
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = false,
                            Message = "SOMETHING_WENT_WRONG"
                        };
                    }
                }
            }
        }
    }
}
