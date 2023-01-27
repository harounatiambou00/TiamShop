using api.DTOs.ImageDTO;
using api.DTOs.ProductDiscountDTOs;
using api.DTOs.ProductDTOs;
using api.Models;
using api.Services.BrandService;
using api.Services.ProductCaracteristicService;
using api.Services.ProductDiscountService;
using api.Services.ProductImageService;
using api.Services.SubCategoryService;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Reflection.PortableExecutable;
using static System.Net.Mime.MediaTypeNames;
using Image = api.Models.Image;

namespace api.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly string _connectionString;
        private readonly IImageService _imageService;

        public ProductService(IConfiguration config, IImageService imageService)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
            _imageService = imageService;
        }

        public async Task<ServiceResponse<Product?>> AddProduct(AddProductDTO newProduct)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();

                    Product product = new Product(newProduct.ProductName, newProduct.ProductDescription, newProduct.ProductPrice, newProduct.ProductQuantity, newProduct.Waranty, newProduct.Color, newProduct.ProductPrincipalImageId, newProduct.BrandId, newProduct.SubCategoryId, null);

                    string SQL = "EXEC dbo.InsertProduct " +
                        "@ProductId," +
                        "@ProductReference, " +
                        "@ProductName, " +
                        "@ProductDescription, " +
                        "@ProductPrice, " +
                        "@ProductQuantity, " +
                        "@ProductPrincipalImageId, " +
                        "@CreatedAt, " +
                        "@Waranty, " +
                        "@Color, " +
                        "@BrandId, " +
                        "@SubCategoryId";

                    var dictionary = new Dictionary<string, object?>
                                {
                                    {"@ProductId", product.ProductId},
                                    {"@ProductReference", product.ProductReference},
                                    {"@ProductName", product.ProductName },
                                    {"@ProductDescription", product.ProductDescription},
                                    {"@ProductPrice", product.ProductPrice},
                                    {"@ProductQuantity", product.ProductQuantity},
                                    {"@ProductPrincipalImageId", product.ProductPrincipalImageId},
                                    {"@CreatedAt", product.CreatedAt},
                                    {"@Waranty", product.Waranty},
                                    {"@Color", product.Color},
                                    {"@BrandId", product.BrandId},
                                    {"@SubCategoryId", product.SubCategoryId},
                                };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(SQL, parameters);

                    //We will create a row of in the ProductDiscount for the product
                    //If the the percentage = 0, the startDate will be null.
                    var addProductDiscountResponse = await AddProductDiscountAfterAddingProduct(
                            new AddProductDiscountDTO()
                            {
                                ProductDiscountPercentage = newProduct.ProductDiscountPercentage,
                                ProductDiscountStartDate = newProduct.ProductDiscountPercentage == 0 ? null : DateTime.Now,
                                ProductDiscountEndDate = newProduct.ProductDiscountEndDate,
                                ProductId = product.ProductId,
                            }
                        );
                    if (addProductDiscountResponse.Success && addProductDiscountResponse.Data != null)
                    {
                        ProductDiscount insertedProductDiscount = addProductDiscountResponse.Data;
                        return new ServiceResponse<Product?>()
                        {
                            Data = product,
                            Success = affectedRows == 1,
                            Message = affectedRows == 1 ? "PRODUCT_ADDED_SUCCESSFULLY" : "SOMETHING_WENT_WRONG"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<Product?>()
                        {
                            Data = product,
                            Success = affectedRows == 1,
                            Message = affectedRows == 1 ? "PRODUCT_ADDED_SUCCESSFULLY_BUT_SOMETHING_WENT_WRONG_WHILE_ADDING_THE_PRODUCT_DISCOUNT" : "SOMETHING_WENT_WRONG"
                        };
                    }
                }
                catch (Exception e)
                {
                    return new ServiceResponse<Product?>()
                    {
                        Data = null,
                        Success = false,
                        Message = e.ToString(),
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> DeleteProduct(Guid productId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    var getProductResponse = await GetProductById(productId);
                    if (getProductResponse.Success && getProductResponse.Data != null)
                    {
                        string SQL = "EXEC dbo.DeleteProduct @ProductId";
                        var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductId", productId},
                        };
                        var parameters = new DynamicParameters(dictionary);
                        var affectedRows = await connection.ExecuteAsync(SQL, parameters);
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = affectedRows == 1,
                            Message = affectedRows >= 1 ? "PRODUCT_DELETED_SUCCESSFULLY" : "PRODUCT_NOT_FOUND"
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

        public async Task<ServiceResponse<List<Product>>> GetAllProducts()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.GetAllProducts";
                    var products = await connection.QueryAsync<Product>(SQL);
                    return new ServiceResponse<List<Product>>()
                    {
                        Data = products.ToList(),
                        Success = true
                    };

                }
                catch (Exception e)
                {
                    return new ServiceResponse<List<Product>>()
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message,
                    };
                }
            }
        }

        public async Task<ServiceResponse<Image?>> GetPrincipalImageOfProduct(Guid productId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.GetPrincipalImageOfProduct @ProductId";
                    var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductId", productId},
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

        public async Task<ServiceResponse<Product?>> GetProductById(Guid productId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.GetProductById @ProductId";
                    var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductId", productId},
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

        public async Task<ServiceResponse<List<Image>>> GetProductImages(Guid productId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.GetImagesOfProduct @ProductId";
                    var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductId", productId},
                        };
                    var parameters = new DynamicParameters(dictionary);
                    var images = await connection.QueryAsync<Image>(SQL, parameters);
                    return new ServiceResponse<List<Image>>()
                    {
                        Data = images.ToList(),
                        Success = true,
                        Message = ""
                    };

                }
                catch (Exception e)
                {
                    return new ServiceResponse<List<Image>>()
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message,
                    };
                }
            }
        }

        public async Task<ServiceResponse<Product?>> GetProductByReference(string productReference)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.GetProductByReference @ProductReference";
                    var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductReference", productReference},
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

        public async Task<ServiceResponse<Product?>> UpdateProduct(UpdateProductDTO newProduct)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    var getProductResponse = await GetProductById(newProduct.ProductId);
                    if (getProductResponse.Success && getProductResponse.Data != null)
                    {
                        if(newProduct.ProductPrincipalImageId != null)
                        {
                            //Check if the prinipalImage exists
                            var getPrincipalImageResponse = await _imageService.GetImageById((long)newProduct.ProductPrincipalImageId);
                            if (!getPrincipalImageResponse.Success)
                            {
                                return new ServiceResponse<Product?>()
                                {
                                    Data = null,
                                    Success = false,
                                    Message = "PRODUCT_PRINCIPAL_IMAGE_NOT_FOUND"
                                };
                            }
                        }
                        string SQL = "EXEC dbo.UpdateProduct " +
                                "@ProductId," +
                                "@ProductReference, " +
                                "@ProductName, " +
                                "@ProductDescription, " +
                                "@ProductPrice, " +
                                "@ProductQuantity, " +
                                "@ProductPrincipalImageId, " +
                                "@Waranty, " +
                                "@Color, " +
                                "@BrandId, " +
                                "@SubCategoryId";

                        var dictionary = new Dictionary<string, object?>
                                {
                                    {"@ProductId", newProduct.ProductId},
                                    {"@ProductReference", Product.generateReference(newProduct.ProductName, newProduct.ProductId)},
                                    {"@ProductName", newProduct.ProductName },
                                    {"@ProductDescription", newProduct.ProductDescription},
                                    {"@ProductPrice", newProduct.ProductPrice},
                                    {"@ProductQuantity", newProduct.ProductQuantity},
                                    {"@ProductPrincipalImageId", newProduct.ProductPrincipalImageId != null ? newProduct.ProductPrincipalImageId : getProductResponse.Data.ProductPrincipalImageId},
                                    {"@Waranty", newProduct.Waranty},
                                    {"@Color", newProduct.Color},
                                    {"@BrandId", newProduct.BrandId},
                                    {"@SubCategoryId", newProduct.SubCategoryId},
                                };
                        var parameters = new DynamicParameters(dictionary);
                        Product? product = await connection.QueryFirstAsync<Product>(SQL, parameters);
                        return new ServiceResponse<Product?>()
                        {
                            Data = product,
                            Success = product != null,
                            Message = product != null ? "PRODUCT_UPDATED_SUCCESSFULLY" : "SOMETHING_WENT_WRONG"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<Product?>()
                        {
                            Data = null,
                            Success = false,
                            Message = "PRODUCT_NOT_FOUND"
                        };
                    }
                }
                catch (Exception e)
                {
                    return new ServiceResponse<Product?>()
                    {
                        Data = null,
                        Success = false,
                        Message = e.ToString(),
                    };
                }
            }
        }

        private async Task<ServiceResponse<ProductDiscount?>> AddProductDiscountAfterAddingProduct(AddProductDiscountDTO productDiscount)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    var getProductResponse = await GetProductById(productDiscount.ProductId);
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
                        ProductDiscount? insertedProductDiscount = await connection.QueryFirstAsync<ProductDiscount>(SQL, parameters);
                        if (insertedProductDiscount != null)
                        {
                            var setProductDiscountIdOfProductResponse = await SetProductDiscountIdOfProduct(productDiscount.ProductId, insertedProductDiscount.ProductDiscountId);
                            return new ServiceResponse<ProductDiscount?>()
                            {
                                Data = insertedProductDiscount,
                                Success = setProductDiscountIdOfProductResponse.Success,
                                Message = setProductDiscountIdOfProductResponse.Message
                            };
                        }
                        return new ServiceResponse<ProductDiscount?>()
                        {
                            Data = insertedProductDiscount,
                            Success = insertedProductDiscount != null,
                            Message = insertedProductDiscount != null ? "PRODUCT_DISCOUNT_ADDED_SUCCESSFULLY" : "SOMETHING_WENT_WRONG_WHILE_ADDING_PRODUCT_DISCOUNT"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<ProductDiscount?>()
                        {
                            Data = null,
                            Success = false,
                            Message = "PRODUCT_NOT_FOUND"
                        };
                    }

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

        private async Task<ServiceResponse<string?>> SetProductDiscountIdOfProduct(Guid productId, long productDiscountId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "UPDATE dbo.tblProducts SET ProductDiscountId = @ProductDiscountId WHERE ProductId = @ProductId";
                    var dictionary = new Dictionary<string, object?>
                        {
                            {"@ProductDiscountId", productDiscountId},
                            {"@ProductId", productId},
                        };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(SQL, parameters);
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = affectedRows >= 1,
                        Message = affectedRows >= 1 ? "PRODUCTDISCOUNTID_OF_PRODUCT_SET_SUCCESSFULLY" : "SOMETHING_WENT_WRONG"
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

        public async Task<ServiceResponse<List<ProductCaracteristic>>> GetCaracteristicsOfProduct(Guid productId)
        {
            using(var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    var sql = @"SELECT * FROM dbo.tblProductCaracteristics WHERE ProductID = @ProductId";
                    var dictionnary = new Dictionary<string, object?>
                    {
                        { "@ProductId", productId }
                    };
                    var parameters = new DynamicParameters(dictionnary);
                    var caracteristics = await connection.QueryAsync<ProductCaracteristic>(sql, parameters);
                    return new ServiceResponse<List<ProductCaracteristic>>()
                    {
                        Data = caracteristics.AsList(),
                        Success = true,
                        Message = ""
                    };
                }catch(Exception e)
                {
                    return new ServiceResponse<List<ProductCaracteristic>>()
                    {
                        Data = {},
                        Success = false,
                        Message = e.ToString()
                    };
                }
            }
        }
    }
}
