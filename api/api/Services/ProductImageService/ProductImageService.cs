using api.DTOs.ProductImageDTOs;
using api.Models;
using api.Services.ProductService;
using Dapper;
using Microsoft.Data.SqlClient;

namespace api.Services.ProductImageService
{
    public class ProductImageService : IProductImageService
    {

        private readonly string _connectionString;
        private readonly IProductService _productService;
        private readonly IImageService _imageService;

        public ProductImageService(IConfiguration config, IProductService productService, IImageService imageService)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
            _productService = productService;
            _imageService = imageService;
        }

        public async Task<ServiceResponse<string?>> AddProductImage(AddProductImageDTO productImage)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    var getProductResponse = await _productService.GetProductById(productImage.ProductId);
                    if (getProductResponse.Success)
                    {
                        var getImageResponse = await _imageService.GetImageById(productImage.ImageId);
                        if (getImageResponse.Success)
                        {
                            string SQL = "EXEC dbo.InsertProductImage @ProductId, @ImageId";
                            var dictionary = new Dictionary<string, object?>
                            {
                                {"@ProductId", productImage.ProductId},
                                {"@ImageId", productImage.ImageId},
                            };
                            var parameters = new DynamicParameters(dictionary);
                            var affectedRows = await connection.ExecuteAsync(SQL, parameters);
                            return new ServiceResponse<string?>()
                            {
                                Data = null,
                                Success = affectedRows == 1,
                                Message = affectedRows == 1 ? "PRODUCT_IMAGE_ADDED_SUCCESSFULLY" : "SOMETHING_WENT_WRONG"
                            };
                        }
                        else
                        {
                            return new ServiceResponse<string?>()
                            {
                                Data = null,
                                Success = false,
                                Message = "IMAGE_NOT_FOUND"
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

        public async Task<ServiceResponse<string?>> DeleteProductImage(long productImageId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.DeleteProductImage @ProductImageId";
                    var dictionary = new Dictionary<string, object?>
                            {
                                {"@ProductImageId", productImageId},
                            };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(SQL, parameters);
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = affectedRows == 1,
                        Message = affectedRows == 1 ? "PRODUCT_IMAGE_DELETED_SUCCESSFULLY" : "SOMETHING_WENT_WRONG"
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

        public async Task<ServiceResponse<ProductImage?>> GetProductImageById(long productImageId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.GetProductImageById @ProductImageId";
                    var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductDiscountId", productImageId},
                        };
                    var parameters = new DynamicParameters(dictionary);
                    var productImage = await connection.QueryFirstAsync<ProductImage>(SQL, parameters);
                    return new ServiceResponse<ProductImage?>()
                    {
                        Data = productImage == null ? null : productImage,
                        Success = productImage == null ? false : true,
                        Message = productImage == null ? "PRODUCT_IMAGE_NOT_FOUND" : "PRODUCT_IMAGE_FOUND_SUCCESSFULLY"
                    };

                }
                catch (Exception e)
                {
                    return new ServiceResponse<ProductImage?>()
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message,
                    };
                }
            }
        }

        public async Task<ServiceResponse<Image?>> GetImageOfProductImage(long productImageId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.GetImageOfProductImage @ProductImageId";
                    var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductDiscountId", productImageId},
                        };
                    var parameters = new DynamicParameters(dictionary);
                    var image = await connection.QueryFirstAsync<Image>(SQL, parameters);
                    return new ServiceResponse<Image?>()
                    {
                        Data = image == null ? null : image,
                        Success = image == null ? false : true,
                        Message = image == null ? "IMAGE_NOT_FOUND" : "IMAGE_FOUND_SUCCESSFULLY"
                    };

                }
                catch (Exception e)
                {
                    return new ServiceResponse<Image?>()
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message,
                    };
                }
            }
        }

        public async Task<ServiceResponse<Product?>> GetProductOfProductImage(long productImageId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.GetProductOfProductImage @ProductImageId";
                    var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductDiscountId", productImageId},
                        };
                    var parameters = new DynamicParameters(dictionary);
                    var product = await connection.QueryFirstAsync<Product>(SQL, parameters);
                    return new ServiceResponse<Product?>()
                    {
                        Data = product == null ? null : product,
                        Success = product == null ? false : true,
                        Message = product == null ? "PRODUCT_NOT_FOUND" : "PRODUCT_FOUND_SUCCESSFULLY"
                    };

                }
                catch (Exception e)
                {
                    return new ServiceResponse<Product?>()
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message,
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> UpdateProductImage(ProductImage productImage)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.UpdateProductImage @ProductImageId, @ProductId, @ImageId";
                    var dictionary = new Dictionary<string, object?>
                            {
                                {"@ProductImageId", productImage.ProductImageId},
                                {"@ProductId", productImage.ProductId},
                                {"@ImageId", productImage.ImageId},
                            };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(SQL, parameters);
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = affectedRows == 1,
                        Message = affectedRows == 1 ? "PRODUCT_IMAGE_UPDATED_SUCCESSFULLY" : "PRODUCT_IMAGE_NOT_FOUND"
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

        public async Task<ServiceResponse<ProductImage?>> GetProductImageByProductIdAndImageId(Guid productId, long imageId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "Select * FROM dbo.tblProductImages WHERE ProductId=@ProductId AND ImageId=@ImageId;";
                    var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductId", productId},
                            {"@ImageId", imageId},
                        };
                    var parameters = new DynamicParameters(dictionary);
                    var productImage = await connection.QueryFirstAsync<ProductImage>(SQL, parameters);
                    return new ServiceResponse<ProductImage?>()
                    {
                        Data = productImage == null ? null : productImage,
                        Success = productImage == null ? false : true,
                        Message = productImage == null ? "PRODUCT_IMAGE_NOT_FOUND" : "PRODUCT_IMAGE_FOUND_SUCCESSFULLY"
                    };

                }
                catch (Exception e)
                {
                    return new ServiceResponse<ProductImage?>()
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
