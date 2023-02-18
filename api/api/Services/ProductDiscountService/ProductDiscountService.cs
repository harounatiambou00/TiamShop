using api.DTOs.ProductDiscountDTOs;
using api.Models;
using api.Services.ProductService;
using Dapper;
using Microsoft.Data.SqlClient;

namespace api.Services.ProductDiscountService
{
    public class ProductDiscountService : IProductDiscountService
    {
        private readonly string _connectionString;
        private readonly IProductService _productService;

        public ProductDiscountService(IConfiguration config, IProductService productService)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
            _productService = productService;
        }

        public async Task<ServiceResponse<string?>> AddProductDiscount(AddProductDiscountDTO productDiscount)
        {
            using(var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    var getProductResponse = await _productService.GetProductById(productDiscount.ProductId);
                    if (getProductResponse.Success)
                    {
                        string SQL = "EXEC dbo.InsertProductDiscount @ProductDiscountPercentage, @ProductDiscountStartDate, @ProductDiscountEndDate, @ProductId";
                        var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductDiscountPercentage", productDiscount.ProductDiscountPercentage},
                            {"@ProductDiscountStartDate", productDiscount.ProductDiscountStartDate == null ? DateTime.Now : productDiscount.ProductDiscountStartDate},
                            {"@ProductDiscountEndDate", productDiscount.ProductDiscountEndDate},
                            {"@ProductId", productDiscount.ProductId},
                        };
                        var parameters = new DynamicParameters(dictionary);
                        var affectedRows = await connection.ExecuteAsync(SQL, parameters);
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = affectedRows == 1,
                            Message = affectedRows == 1 ? "PRODUCT_DISCOUNT_ADDED_SUCCESSFULLY" : "SOMETHING_WENT_WRONG"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = false,
                            Message = "PRODUCT_NOT_FOUND"
                        };
                    }

                }catch(Exception e)
                {
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message,
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> DeleteProductDiscount(long productDiscountId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.DeleteProductDiscount @ProductDiscountId";
                    var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductDiscountId", productDiscountId},
                        };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(SQL, parameters);
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = affectedRows >= 1,
                        Message = affectedRows >= 1 ? "PRODUCT_DISCOUNT_DELETED_SUCCESSFULLY" : "PRODUCT_DISCOUNT_NOT_FOUND"
                    };

                }
                catch (Exception e)
                {
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message,
                    };
                }
            }
        }

        public async Task<ServiceResponse<List<ProductDiscount>>> GetAllProductDiscounts()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.GetAllProductDiscounts";
                    var productDiscounts = await connection.QueryAsync<ProductDiscount>(SQL);
                    return new ServiceResponse<List<ProductDiscount>>()
                    {
                        Data = productDiscounts.ToList(),
                        Success = true
                    };

                }
                catch (Exception e)
                {
                    return new ServiceResponse<List<ProductDiscount>>()
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message,
                    };
                }
            }
        }

        public async Task<ServiceResponse<ProductDiscount?>> GetProductDiscountById(long productDiscountId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.GetProductDiscountById @ProductDiscountId";
                    var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductDiscountId", productDiscountId},
                        };
                    var parameters = new DynamicParameters(dictionary);
                    var productDiscount = await connection.QueryFirstAsync<ProductDiscount>(SQL, parameters);
                    return new ServiceResponse<ProductDiscount?>()
                    {
                        Data = productDiscount == null ? null : productDiscount,
                        Success = productDiscount == null ? false : true,
                        Message = productDiscount == null ? "PRODUCT_DISCOUNT_NOT_FOUND" : "PRODUCT_DISCOUNT_FOUND_SUCCESSFULLY"
                    };

                }
                catch (Exception e)
                {
                    return new ServiceResponse<ProductDiscount?>()
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message,
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> UpdateProductDiscount(ProductDiscount newProductDiscount)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    var getProductResponse = await _productService.GetProductById(newProductDiscount.ProductId);
                    if (getProductResponse.Success)
                    {
                        string SQL = "EXEC dbo.UpdateProductDiscount @ProductDiscountId, @ProductDiscountPercentage, @ProductDiscountStartDate, @ProductDiscountEndDate, @ProductId";
                        var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductDiscountId", newProductDiscount.ProductDiscountId},
                            {"@ProductDiscountPercentage", newProductDiscount.ProductDiscountPercentage},
                            {"@ProductDiscountStartDate", newProductDiscount.ProductDiscountStartDate == null ? DateTime.Now : newProductDiscount.ProductDiscountStartDate},
                            {"@ProductDiscountEndDate", newProductDiscount.ProductDiscountEndDate},
                            {"@ProductId", newProductDiscount.ProductId},
                        };
                        var parameters = new DynamicParameters(dictionary);
                        var affectedRows = await connection.ExecuteAsync(SQL, parameters);
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = affectedRows >= 1,
                            Message = affectedRows >= 1 ? "PRODUCT_DISCOUNT_UPDATED_SUCCESSFULLY" : "SOMETHING_WENT_WRONG"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = false,
                            Message = "PRODUCT_NOT_FOUND"
                        };
                    }

                }
                catch (Exception e)
                {
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message,
                    };
                }
            }
        }
    }
}
