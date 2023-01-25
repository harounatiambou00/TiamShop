using api.DTOs.ImageDTO;
using api.DTOs.ProductDiscountDTOs;
using api.DTOs.ProductDTOs;
using api.Models;
using api.Services.BrandService;
using api.Services.ProductCaracteristicService;
using api.Services.ProductDiscountService;
using api.Services.ProductImageService;
using api.Services.ProductService;
using api.Services.SubCategoryService;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IImageService _imageService;
        private readonly IProductDiscountService _productDiscountService;
        private readonly IProductService _productService;
        private readonly IProductImageService _productImageService;
        private readonly IBrandService _brandService;
        private readonly ISubCategoryService _subCategoryService;
        private readonly IProductCarateristicService _productCaracteristicService;

        public ProductController(IImageService imageService, IProductDiscountService productDiscountService, IProductService productService, IProductImageService productImageService, IBrandService brandService, ISubCategoryService subCategoryService, IProductCarateristicService productCaracteristicService)
        {
            _imageService = imageService;
            _productDiscountService = productDiscountService;
            _productService = productService;
            _productImageService = productImageService;
            _brandService = brandService;
            _subCategoryService = subCategoryService;
            _productCaracteristicService = productCaracteristicService;
        }

        [HttpGet("get-all-products")]
        public async Task<ActionResult<ServiceResponse<List<Product>>>> GetAllProducts()
        {
            return await _productService.GetAllProducts();  
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<string?>>> AddProduct([FromForm] AddProductDTO newProduct)
        {
            var getSubCategoryResponse = await _subCategoryService.GetSubCategoryById(newProduct.SubCategoryId);
            if (getSubCategoryResponse.Success)
            {
                var getBrandResponse = await _brandService.GetBrandById(newProduct.BrandId);
                if (getBrandResponse.Success)
                {
                        List<string> filePaths = new List<string>();
                        // Loop through the files and get the temporary file path
                        foreach (var image in newProduct.images)
                        {
                            var fileName = Path.GetFileName(image.FileName);
                            var tempPath = Path.Combine(Path.GetTempPath(), fileName);
                            filePaths.Add(tempPath);
                        }

                        //This will contain the ids of the images to be added to ProductImage rows.
                        List<Int64?> imageIds = new List<Int64?>();
                        foreach (var image in newProduct.images)
                        {
                            var fileName = Path.GetFileName(image.FileName);
                            var tempPath = Path.Combine(Path.GetTempPath(), fileName);
                            using (var stream = new FileStream(tempPath, FileMode.Create))
                            {
                                await image.CopyToAsync(stream);
                            }
                            byte[] imageData = await System.IO.File.ReadAllBytesAsync(tempPath);
                            AddImageDTO request = new AddImageDTO()
                            {
                                ImageName = DateTime.Now.ToString() + "-" + image.FileName,
                                ImageDescription = image.FileName,
                                ImageExtension = image.ContentType,
                                ImageBytes = imageData,
                                ImageSize = (float)image.Length / 8,
                            };
                            var addImageResponse = await _imageService.AddImage(request);
                            //If the image has been added, we add it's id to the list of ids
                            if (addImageResponse.Data != null)
                                imageIds.Add(addImageResponse.Data);
                        }

                        //The first image will be the pricipal image of the product to be added.
                        newProduct.ProductPrincipalImageId = imageIds[0];

                        var addProductResponse = await _productService.AddProduct(newProduct);
                        if (addProductResponse.Success && addProductResponse.Data != null)
                        {
                            Product addedProduct = addProductResponse.Data;
                            //Foreach imageId, we create a productImage row with the addProduct's Id
                            foreach(var imageId in imageIds)
                            {
                                if(imageId != null)
                                {
                                    var addProductImageResponse = await
                                    _productImageService.AddProductImage(
                                        new DTOs.ProductImageDTOs.AddProductImageDTO()
                                        {
                                            ProductId = (Guid)addedProduct.ProductId,
                                            ImageId = (Int64)imageId
                                        });

                                    if (!addProductImageResponse.Success)
                                    {
                                        return new ServiceResponse<string?>()
                                        {
                                            Data = null,
                                            Success = false,
                                            Message = addProductImageResponse.Message
                                        };
                                    }
                                }
                            }
                            return new ServiceResponse<string?>()
                            {
                                Data = addedProduct.ProductId.ToString(),
                                Success = true,
                                Message = "PRODUCT_ADDED_SUCCESSFULLY"
                            };
                        }
                        else
                        {
                            return new ServiceResponse<string?>()
                            {
                                Data = null,
                                Success = addProductResponse.Success,
                                Message = addProductResponse.Message
                            };
                        }
                }
                else
                {
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "BRAND_NOT_FOUND"
                    };
                }
            }
            else
            {
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "SUBCATEGORY_NOT_FOUND"
                };
            }
        }

        [HttpGet("get-product-by-id/{productId}")]
        public async Task<ActionResult<ServiceResponse<Product?>>> GetProductById(Guid productId)
        {
            return await _productService.GetProductById(productId);
        }

        [HttpGet("get-product-by-reference/{productReference}")]
        public async Task<ActionResult<ServiceResponse<Product?>>> GetProductByReference(string productReference)
        {
            return await _productService.GetProductByReference(productReference);
        }

        [HttpGet("get-product-images/{productId}")]
        public async Task<ActionResult<ServiceResponse<List<Image>>>> GetProductImages(Guid productId)
        {
            return await _productService.GetProductImages(productId);
        }

        [HttpGet("get-principal-image-of-product/{productId}")]
        public async Task<ActionResult<ServiceResponse<Image?>>> GetProductPrincipalImage(Guid productId)
        {
            return await _productService.GetPrincipalImageOfProduct(productId);
        }

        [HttpDelete("{productId}")]
        public async Task<ActionResult<ServiceResponse<string?>>> DeleteProduct(Guid productId)
        {
            return await _productService.DeleteProduct(productId);
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<string?>>> UpdateProduct([FromForm] UpdateProductDTO newProduct)
        {
            var getSubCategoryResponse = await _subCategoryService.GetSubCategoryById(newProduct.SubCategoryId);
            if (getSubCategoryResponse.Success)
            {
                var getBrandResponse = await _brandService.GetBrandById(newProduct.BrandId);
                if (getBrandResponse.Success)
                {
                    var updateProductResponse = await _productService.UpdateProduct(newProduct);
                    if (updateProductResponse.Success && updateProductResponse.Data != null && updateProductResponse.Data.ProductDiscountId != null)
                    {
                        Product updatedProduct = updateProductResponse.Data;
                        var updateProductDiscountResponse = await _productDiscountService.UpdateProductDiscount(
                                new ProductDiscount()
                                {
                                    ProductDiscountId = (long)updatedProduct.ProductDiscountId, 
                                    ProductDiscountPercentage = newProduct.ProductDiscountPercentage,
                                    ProductDiscountStartDate = newProduct.ProductDiscountPercentage == 0 ? null : newProduct.ProductDiscountStartDate,
                                    ProductDiscountEndDate = newProduct.ProductDiscountEndDate,
                                    ProductId = updatedProduct.ProductId,
                                }
                            );
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = updateProductDiscountResponse.Success,
                            Message = updateProductDiscountResponse.Success ? "PRODUCT_UPDATED_SUCCESSFULLY" : "PRODUCT_UPDATED_SUCCESSFULLY_BUT_SOMTHING_WENT_WRONG_WHILE_UPDATING_THE_PRODUCT_DISCOUNT"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = updateProductResponse.Success,
                            Message = updateProductResponse.Message
                        };
                    }
                }
                else
                {
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "BRAND_NOT_FOUND"
                    };
                }
            }
            else
            {
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "SUBCATEGORY_NOT_FOUND"
                };
            }
        }

    }
}
