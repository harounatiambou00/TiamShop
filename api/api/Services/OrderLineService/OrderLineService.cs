using api.DTOs.OrderLineDTOs;
using api.Services.OrderService;
using api.Services.ProductDiscountService;
using api.Services.ProductService;
using Dapper;
using Microsoft.Data.SqlClient;

namespace api.Services.OrderLineService
{
    public class OrderLineService : IOrderLineService
    {
        private readonly string _connectionString;
        private readonly IProductDiscountService _productDiscountService;
        private readonly IOrderService _orderService;
        private readonly IProductService _productService;

        public OrderLineService(IConfiguration config, IProductDiscountService productDiscountService, IOrderService orderService, IProductService productService)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
            _productDiscountService = productDiscountService;
            _orderService = orderService;
            _productService = productService;
        }

        public async Task<ServiceResponse<string?>> CreateOrderLine(CreateOrderLineDTO request)
        {
            var getProductResponse = await _productService.GetProductById(request.ProductId);
            if (!getProductResponse.Success)
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "PRODUCT_NOT_FOUND"
                };
            else
            {
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
                    var product = getProductResponse.Data;
                    if(product != null)
                    {
                        float discountPercentage = 0;
                        if (product.ProductDiscountId != null)
                        {
                            var getProductDiscountResponse = await _productDiscountService.GetProductDiscountById((long)product.ProductDiscountId);
                            if (getProductDiscountResponse.Data != null) discountPercentage = getProductDiscountResponse.Data.ProductDiscountPercentage;

                            using (var connection = new SqlConnection(_connectionString))
                            {
                                try
                                {
                                    connection.Open();
                                    string query = "EXEC dbo.CreateOrderLine @Quantity, @DiscountPercentage, @OrderId, @ProductId";
                                    var dictionary = new Dictionary<string, object?>
                                        {
                                            {"@Quantity", request.Quantity},
                                            {"@DiscountPercentage", discountPercentage},
                                            {"@OrderId", request.OrderId},
                                            {"@ProductId", request.ProductId},
                                        };
                                    var parameters = new DynamicParameters(dictionary);
                                    var affectedRows = await connection.ExecuteAsync(query, parameters);

                                    return new ServiceResponse<string?>()
                                    {
                                        Data = null,
                                        Success = true,
                                        Message = "ORDERLINE_CREATED_SUCCESSFULLY"
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
                        else
                        {
                            return new ServiceResponse<string?>()
                            {
                                Data = null,
                                Success = false,
                                Message = "PRODUCT_DISCOUNT_NOT_FOUND"
                            };
                        }
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
            }
        }

        public async Task<ServiceResponse<string?>> DeleteOrderLine(long id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.DeleteOrderLine @OrderLineId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@OrderLineId", id},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(query, parameters);
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = affectedRows > 0,
                        Message = affectedRows > 0 ? "ORDERLINE_DELETED_SUCCESSFULLY" : "ORDERLINE_NOT_FOUND"
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

        public async Task<ServiceResponse<OrderLine?>> GetOrderLineById(long id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetOrderLineById @OrderLineId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@OrderLineId", id},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var orderLine = await connection.QueryFirstOrDefaultAsync<OrderLine>(query, parameters);
                    return new ServiceResponse<OrderLine?>()
                    {
                        Data = orderLine != null ? orderLine : null,
                        Success = orderLine != null,
                        Message = orderLine != null ? "ORDERLINE_FOUND" : "ORDERLINE_NOT_FOUND"
                    };
                }
                catch
                {
                    return new ServiceResponse<OrderLine?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMETHING_WENT_WRONG"
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> RejectOrderLine(long id)
        {
            var getOrderLineResponse = await GetOrderLineById(id);
            if (getOrderLineResponse != null && getOrderLineResponse.Success && getOrderLineResponse.Data != null)
            {
                var getProductResponse = await _productService.GetProductById(getOrderLineResponse.Data.ProductId);
                if (getProductResponse != null && getProductResponse.Success && getProductResponse.Data != null)
                {
                    var product = getProductResponse.Data;
                    var getProductDiscountResponse = await _productDiscountService.GetProductDiscountById((long)product.ProductDiscountId);
                    if (getProductDiscountResponse != null && getProductDiscountResponse.Success && getProductDiscountResponse.Data != null)
                    {
                        var updateProductResponse = await _productService.UpdateProduct(new DTOs.ProductDTOs.UpdateProductDTO()
                        {
                            ProductId = product.ProductId,
                            ProductName = product.ProductName,
                            ProductDescription = product.ProductDescription,
                            ProductPrice = product.ProductPrice,
                            ProductPrincipalImageId = product.ProductPrincipalImageId,
                            ProductQuantity = product.ProductQuantity + getOrderLineResponse.Data.Quantity,
                            Color = product.Color,
                            Waranty = product.Waranty,
                            BrandId = product.BrandId,
                            ProductDiscountStartDate = getProductDiscountResponse.Data.ProductDiscountStartDate,
                            ProductDiscountEndDate = getProductDiscountResponse.Data.ProductDiscountEndDate,
                            ProductDiscountPercentage = getProductDiscountResponse.Data.ProductDiscountPercentage,
                            SubCategoryId = product.SubCategoryId
                        });
                        if (updateProductResponse.Success)
                            return new ServiceResponse<string?>()
                            {
                                Data = null,
                                Success = true,
                                Message = "ORDERLINE_REJECTED_SUCCESSFULLY"
                            };
                        else
                            return new ServiceResponse<string?>()
                            {
                                Data = null,
                                Success = true,
                                Message = "SOMETHING_WENT_WRONG_WHILE_UPDATING_THE_PRODUCT"
                            };
                    }
                    else return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "PRODUCT_DISCOUNT_NOT_FOUND"
                    };
                }
                else return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "THE_PRODUCT_HAS_BEEN_DELETED"
                };
            }
            else return new ServiceResponse<string?>()
            {
                Data = null,
                Success = false,
                Message = "ORDERLINE_NOT_FOUND"
            };
        }

        public async Task<ServiceResponse<string?>> UpdateOrderLine(UpdateOrderLineDTO request)
        {
            var getOrderLineResponse = await GetOrderLineById(request.OrderLineId);
            if (getOrderLineResponse.Success && getOrderLineResponse.Data != null)
            {
                var orderLine = getOrderLineResponse.Data;
                var getProductResponse = await _productService.GetProductById(request.ProductId);
                if (!getProductResponse.Success)
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "PRODUCT_NOT_FOUND"
                    };
                else
                {
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
                        var product = getProductResponse.Data;
                        if (product != null)
                        {
                            if (request.Quantity > product.ProductQuantity)
                            {
                                return new ServiceResponse<string?>()
                                {
                                    Data = null,
                                    Success = false,
                                    Message = "TOO_MUCH_QUANTITY"
                                };
                            }
                            else
                            {
                                float discountPercentage = 0;
                                if (product.ProductDiscountId != null)
                                {
                                    var getProductDiscountResponse = await _productDiscountService.GetProductDiscountById((long)product.ProductDiscountId);
                                    if (getProductDiscountResponse.Data != null) discountPercentage = getProductDiscountResponse.Data.ProductDiscountPercentage;

                                    using (var connection = new SqlConnection(_connectionString))
                                    {
                                        try
                                        {
                                            connection.Open();
                                            string query = "EXEC dbo.UpdateOrderLine @OrderLineId, @Quantity, @DiscountPercentage, @OrderId, @ProductId";
                                            var dictionary = new Dictionary<string, object?>
                                            {
                                                {"@OrderLineId", request.OrderLineId},
                                                {"@Quantity", request.Quantity},
                                                {"@DiscountPercentage", discountPercentage},
                                                {"@OrderId", request.OrderId},
                                                {"@ProductId", request.ProductId},
                                            };
                                            var parameters = new DynamicParameters(dictionary);
                                            var affectedRows = await connection.ExecuteAsync(query, parameters);

                                            var updateProductResponse = await _productService.UpdateProduct(new DTOs.ProductDTOs.UpdateProductDTO()
                                            {
                                                ProductId = product.ProductId,
                                                ProductName = product.ProductName,
                                                ProductDescription = product.ProductDescription,
                                                ProductPrice = product.ProductPrice,
                                                ProductPrincipalImageId = product.ProductPrincipalImageId,
                                                ProductQuantity = product.ProductQuantity + orderLine.Quantity - request.Quantity,
                                                Color = product.Color,
                                                Waranty = product.Waranty,
                                                BrandId = product.BrandId,
                                                ProductDiscountStartDate = getProductDiscountResponse.Data.ProductDiscountStartDate,
                                                ProductDiscountEndDate = getProductDiscountResponse.Data.ProductDiscountEndDate,
                                                ProductDiscountPercentage = getProductDiscountResponse.Data.ProductDiscountPercentage,
                                                SubCategoryId = product.SubCategoryId
                                            });
                                            if (updateProductResponse.Success)
                                                return new ServiceResponse<string?>()
                                                {
                                                    Data = null,
                                                    Success = true,
                                                    Message = "ORDERLINE_CREATED_SUCCESSFULLY"
                                                };
                                            else
                                                return new ServiceResponse<string?>()
                                                {
                                                    Data = null,
                                                    Success = true,
                                                    Message = "ORDERLINE_CREATED_SUCCESSFULLY_BUT_SOMETHING_WENT_WRONG_WHILE_UPDATING_THE_PRODUCT_QUANTITY"
                                                };

                                        }
                                        catch(Exception e)
                                        {
                                            return new ServiceResponse<string?>()
                                            {
                                                Data = null,
                                                Success = false,
                                                Message = e.Message
                                            };
                                        }
                                    }
                                }
                                else
                                {
                                    return new ServiceResponse<string?>()
                                    {
                                        Data = null,
                                        Success = false,
                                        Message = "PRODUCT_DISCOUNT_NOT_FOUND"
                                    };
                                }
                            }
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
                }
            }
            else
            {
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "ORDERLINE_NOT_FOUND"
                };
            }
        }

        public async Task<ServiceResponse<string?>> ValidateOrderLine(long id)
        {
            var getOrderLineResponse = await GetOrderLineById(id);
            if (getOrderLineResponse != null && getOrderLineResponse.Success && getOrderLineResponse.Data != null)
            {
                var getProductResponse = await _productService.GetProductById(getOrderLineResponse.Data.ProductId);
                if(getProductResponse != null && getProductResponse.Success && getProductResponse.Data != null)
                {
                    var product = getProductResponse.Data;
                    var getProductDiscountResponse = await _productDiscountService.GetProductDiscountById((long)product.ProductDiscountId);
                    if(getProductDiscountResponse != null && getProductDiscountResponse.Success && getProductDiscountResponse.Data != null)
                    {
                        var updateProductResponse = await _productService.UpdateProduct(new DTOs.ProductDTOs.UpdateProductDTO()
                        {
                            ProductId = product.ProductId,
                            ProductName = product.ProductName,
                            ProductDescription = product.ProductDescription,
                            ProductPrice = product.ProductPrice,
                            ProductPrincipalImageId = product.ProductPrincipalImageId,
                            ProductQuantity = product.ProductQuantity - getOrderLineResponse.Data.Quantity,
                            Color = product.Color,
                            Waranty = product.Waranty,
                            BrandId = product.BrandId,
                            ProductDiscountStartDate = getProductDiscountResponse.Data.ProductDiscountStartDate,
                            ProductDiscountEndDate = getProductDiscountResponse.Data.ProductDiscountEndDate,
                            ProductDiscountPercentage = getProductDiscountResponse.Data.ProductDiscountPercentage,
                            SubCategoryId = product.SubCategoryId
                        });
                        if (updateProductResponse.Success)
                            return new ServiceResponse<string?>()
                            {
                                Data = null,
                                Success = true,
                                Message = "ORDERLINE_VALIDATED_SUCCESSFULLY"
                            };
                        else
                            return new ServiceResponse<string?>()
                            {
                                Data = null,
                                Success = true,
                                Message = "SOMETHING_WENT_WRONG_WHILE_UPDATING_THE_PRODUCT"
                            };
                    }
                    else return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "PRODUCT_DISCOUNT_NOT_FOUND"
                    };
                }
                else return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "THE_PRODUCT_HAS_BEEN_DELETED"
                };
            }
            else return new ServiceResponse<string?>()
            {
                Data = null,
                Success = false,
                Message = "ORDERLINE_NOT_FOUND"
            };
        }
    }
}
