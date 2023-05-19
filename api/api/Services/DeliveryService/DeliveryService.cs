using api.DTOs.DeliveryDTOs;
using api.Helpers;
using api.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Security.Cryptography.Xml;

namespace api.Services.DeliveryService
{
    public class DeliveryService : IDeliveryService
    {
        private readonly string _connectionString;
        private readonly IUserService _userService;
        private readonly IUserTypeService _userTypeService;

        public DeliveryService(IConfiguration config, IUserService userService, IUserTypeService userTypeService)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
            _userService = userService;
            _userTypeService = userTypeService;
        }

        public async Task<ServiceResponse<string?>> AssignDeliveryToDeliverer(AssignDeliveryToDelivererDTO request)
        {
            var getAdminResponse = await _userService.GetAdminByGuid(request.AdminGuid);
            var admin = getAdminResponse.Data;
            if (getAdminResponse == null || !getAdminResponse.Success || admin == null)
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "ADMIN_NOT_FOUND"
                };
            else
            {
                var getDelivererResponse = await _userService.GetUserById(request.DelivererId);
                var deliverer = getDelivererResponse.Data;
                if(getDelivererResponse == null || !getDelivererResponse.Success || deliverer == null)
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "DELIVERER_NOT_FOUND"
                    };
                else
                {
                    var getDeliveryResponse = await GetDeliveryById(request.DeliveryId);
                    var delivery = getDeliveryResponse.Data;
                    if(delivery == null || !getDeliveryResponse.Success)
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = false,
                            Message = "DELIVERY_NOT_FOUND"
                        };
                    else
                    {
                        var updateDeliveryResponse = await UpdateDelivery(new UpdateDeliveryDTO()
                        {
                            DeliveryId = delivery.DeliveryId,
                            DeliveryStatus = delivery.DeliveryStatus,
                            AssignedTo = deliverer.UserId,
                            DeliveredAt = delivery.DeliveredAt
                        });
                        return updateDeliveryResponse;
                    }
                }
            }
        }

        public async Task<ServiceResponse<string?>> CreateDelivery(CreateDeliveryDTO request)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    if(request.AssignedTo != null)
                    {
                        var getDeliveryManResponse = await _userService.GetUserById((int)request.AssignedTo);
                        if(getDeliveryManResponse != null)
                        {
                            if(!getDeliveryManResponse.Success || getDeliveryManResponse.Data == null) 
                                return new ServiceResponse<string?>
                                {
                                    Data = null,
                                    Success = false,
                                    Message = "DELIVERY_MAN_NOT_FOUND"
                                };
                        }
                    }
                    string sql = "EXEC dbo.CreateDelivery @DeliveryReference, @DeliveryStatus, @AssignedTo";
                    string reference = GenerateRandomString.Generate(12);
                    var getDeliveryByReferenceResponse = await GetDeliveryByReference(reference);
                    while (getDeliveryByReferenceResponse.Success)
                    {
                        reference = GenerateRandomString.Generate(12);
                        getDeliveryByReferenceResponse = await GetDeliveryByReference(reference);
                    }

                    string status = "TODO";
                    if (request.DeliveryStatus == "IN_PROGRESS" || request.DeliveryStatus == "DONE") status = request.DeliveryStatus;
                    var dictionary = new Dictionary<string, object?>
                    {
                        {"@DeliveryReference", reference.ToUpper() },
                        {"@DeliveryStatus",  status},
                        {"@AssignedTo", request.AssignedTo }
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(sql, parameters);
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = true,
                        Message = "DELIVERY_CREATED_SUCCESSFULLY"
                    };
                }
                catch (Exception e)
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message
                    };
                }

            }
        }

        public async Task<ServiceResponse<string?>> DeleteDelivery(long id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string sql = "EXEC dbo.DeleteDelivery @DeliveryId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@DeliveryId", id},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(sql, dictionary);

                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = true,
                        Message = ""
                    };
                }
                catch (Exception ex)
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = ex.Message
                    };
                }
            }
        }

        public async Task<ServiceResponse<List<Delivery>>> GetAllDeliveries()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetAllDeliveries";
                    var deliveries = await connection.QueryAsync<Delivery>(query);

                    return new ServiceResponse<List<Delivery>>
                    {
                        Data = deliveries.AsList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch (Exception ex)
                {
                    return new ServiceResponse<List<Delivery>>
                    {
                        Data = null,
                        Success = false,
                        Message = ex.Message
                    };
                }
            }
        }

        public async Task<ServiceResponse<List<Delivery>>> GetDeliveriesAffectedToDeliverer(int delivererId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "SELECT * FROM dbo.tblDeliveries WHERE AssignedTo = @DelivererId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@DelivererId", delivererId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var deliveries = await connection.QueryAsync<Delivery>(query, parameters);
                    return new ServiceResponse<List<Delivery>>
                    {
                        Data = deliveries.AsList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch (Exception ex)
                {
                    return new ServiceResponse<List<Delivery>>
                    {
                        Data = null,
                        Success = false,
                        Message = ex.Message
                    };
                }
            }
        }

        public async Task<ServiceResponse<Delivery?>> GetDeliveryById(long id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string sql = "EXEC dbo.GetDeliveryById @DeliveryId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@DeliveryId", id},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var delivery = await connection.QueryFirstAsync<Delivery>(sql, parameters);
                    if (delivery != null)
                    {
                        return new ServiceResponse<Delivery?>
                        {
                            Data = delivery,
                            Success = true,
                            Message = "DELIVERY_FOUND"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<Delivery?>
                        {
                            Data = null,
                            Success = false,
                            Message = "DELIVERY_NOT_FOUND"
                        };
                    }
                }
                catch (Exception e)
                {
                    return new ServiceResponse<Delivery?>
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message
                    };
                }

            }
        }

        public async Task<ServiceResponse<Delivery?>> GetDeliveryByReference(string reference)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string sql = "EXEC dbo.GetDeliveryByReference @DeliveryReference";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"DeliveryReference", reference},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var delivery = await connection.QueryFirstAsync<Delivery>(sql, parameters);
                    if(delivery != null)
                    {
                        return new ServiceResponse<Delivery?>
                        {
                            Data = delivery,
                            Success = true,
                            Message = "DELIVERY_FOUND"
                        };
                    }else
                    {
                        return new ServiceResponse<Delivery?>
                        {
                            Data = null,
                            Success = false,
                            Message = "DELIVERY_NOT_FOUND"
                        };
                    }
                }
                catch (Exception e)
                {
                    return new ServiceResponse<Delivery?>
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message
                    };
                }

            }
        }

        public async Task<ServiceResponse<string?>> UpdateDelivery(UpdateDeliveryDTO request)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    var getDeliveryResponse = await GetDeliveryById(request.DeliveryId);
                    if(getDeliveryResponse.Success && getDeliveryResponse.Data != null)
                    {
                        if (request.AssignedTo != null)
                        {
                            var getDeliveryManResponse = await _userService.GetUserById((int)request.AssignedTo);
                            if (getDeliveryManResponse != null)
                            {
                                if (!getDeliveryManResponse.Success || getDeliveryManResponse.Data == null)
                                    return new ServiceResponse<string?>
                                    {
                                        Data = null,
                                        Success = false,
                                        Message = "DELIVERY_MAN_NOT_FOUND"
                                    };
                            }
                        }
                        string sql = "EXEC dbo.UpdateDelivery @DeliveryId, @DeliveryReference, @DeliveryStatus, @DeliveredAt, @AssignedTo";

                        string status;
                        if (request.DeliveryStatus == "IN_PROGRESS" || request.DeliveryStatus == "DONE" || request.DeliveryStatus == "TODO") status = request.DeliveryStatus;
                        else status = "TODO";
                        var dictionary = new Dictionary<string, object?>
                        {
                            {"@DeliveryId",  request.DeliveryId},
                            {"@DeliveryReference", getDeliveryResponse.Data.DeliveryReference },
                            {"@DeliveryStatus",  status},
                            {"@DeliveredAt",  request.DeliveredAt},
                            {"@AssignedTo", request.AssignedTo }
                        };
                        var parameters = new DynamicParameters(dictionary);
                        var affectedRows = await connection.ExecuteAsync(sql, parameters);
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = true,
                            Message = "DELIVERY_UPDATED_SUCCESSFULLY"
                        };
                    }else
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "DELIVERY_NOT_FOUND"
                        };
                    }
                }
                catch (Exception e)
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message
                    };
                }

            }
        }
    }
}
