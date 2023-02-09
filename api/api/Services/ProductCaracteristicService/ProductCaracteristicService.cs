using api.DTOs.ProductCaracteristicDTOs;
using api.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using static System.Net.Mime.MediaTypeNames;

namespace api.Services.ProductCaracteristicService
{
    public class ProductCaracteristicService : IProductCarateristicService
    {
        private readonly string _connectionString;
        public ProductCaracteristicService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        public async Task<ServiceResponse<string?>> AddProductCaracteristic(AddProductCaracteristicDTO productCracteristic)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string sql = "EXEC dbo.InsertProductCaracteristic @ProductCaracteristicKey, @ProductCaracteristicValue, @ProductID";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@ProductCaracteristicKey", productCracteristic.ProductCaracteristicKey},
                        {"@ProductCaracteristicValue", productCracteristic.ProductCaracteristicValue},
                        {"@ProductID", productCracteristic.ProductID},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(sql, parameters);
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = true,
                        Message = "PRODUCT_CARACTERISTIC_CREATED_SUCCESSFULLY"
                    };
                }
                catch(Exception e)
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

        public async Task<ServiceResponse<string?>> DeleteProductCaracteristic(Int64 productCracteristicId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string sql = "EXEC dbo.DeleteProductCaracteristic @ProductCaracteristicId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@ProductCaracteristicId", productCracteristicId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(sql, parameters);
                    if (affectedRows == 1)
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = true,
                            Message = "PRODUCT_CARACTERISTIC_DELETED_SUCCESSFULLY"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "PRODUCT_CARACTERISTIC_NOT_FOUND"
                        };
                    }
                }
                catch
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = "PRODUCT_CARACTERISTIC_DELETION_FAILED"
                    };
                }

            }
        }

        public async Task<ServiceResponse<List<ProductCaracteristic>>> GetAllProductCaracteristics()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetAllProductCaracteristics";
                    var productCarateristics = await connection.QueryAsync<ProductCaracteristic>(query);

                    return new ServiceResponse<List<ProductCaracteristic>>
                    {
                        Data = productCarateristics.AsList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch (Exception ex)
                {
                    return new ServiceResponse<List<ProductCaracteristic>>
                    {
                        Data = null,
                        Success = false,
                        Message = ex.Message
                    };
                }
            }
        }

        public async Task<ServiceResponse<ProductCaracteristic?>> GetProductCaracteristicById(long productCarateristicId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetProductCaracteristicById @ProductCaracteristicsId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@ProductCaracteristicsId", productCarateristicId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    ProductCaracteristic? productCarateristic = await connection.QueryFirstAsync<ProductCaracteristic>(query, parameters);

                    return new ServiceResponse<ProductCaracteristic?>
                    {
                        Data = productCarateristic,
                        Success = productCarateristic != null,
                        Message = productCarateristic == null ? "PRODUCT_CARACTERISTIC_NOT_FOUND" : "PRODUCT_CARACTERISTIC_FOUND_SUCCESSFULLY"
                    };
                }
                catch (Exception e)
                {
                    return new ServiceResponse<ProductCaracteristic?>
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> UpdateProductCaracteristic(ProductCaracteristic newProductCracteristic)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string sql = "EXEC dbo.UpdateProductCaracteristic @ProductCaracteristicId, @ProductCaracteristicKey, @ProductCaracteristicValue, @ProductID";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@ProductCaracteristicId", newProductCracteristic.ProductCaracteristicId},
                        {"@ProductCaracteristicKey", newProductCracteristic.ProductCaracteristicKey},
                        {"@ProductCaracteristicValue", newProductCracteristic.ProductCaracteristicValue},
                        {"@ProductID", newProductCracteristic.ProductID},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(sql, parameters);
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = true,
                        Message = "PRODUCT_CARACTERISTIC_UPDATED_SUCCESSFULLY"
                    };
                }
                catch(Exception e)
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
