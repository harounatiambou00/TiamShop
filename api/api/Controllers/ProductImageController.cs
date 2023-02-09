using api.DTOs.ImageDTO;
using api.DTOs.ProductImageDTOs;
using api.Models;
using api.Services.ProductImageService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/product-images")]
    [ApiController]
    public class ProductImageController : ControllerBase
    {
        private readonly IProductImageService _productImageService;
        private readonly IImageService _imageService;

        public ProductImageController(IProductImageService productImageService, IImageService imageService)
        {
            _productImageService = productImageService;
            _imageService = imageService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<ProductImage?>>> GetProductImageById(long productImageId)
        {
            return await _productImageService.GetProductImageById(productImageId);
        }

        [HttpGet("get-image-of-product-images")]
        public async Task<ActionResult<ServiceResponse<Image?>>> GetImageOfProductImage(long productImageId)
        {
            return await _productImageService.GetImageOfProductImage(productImageId);
        }

        [HttpGet("get-product-of-product-images")]
        public async Task<ActionResult<ServiceResponse<Product?>>> GetProductOfProductImage(long productImageId)
        {
            return await _productImageService.GetProductOfProductImage(productImageId);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<string?>>> AddProductImage(AddProductImageDTO productImage)
        {
            return await _productImageService.AddProductImage(productImage);
        }

        [HttpPost("add-product-image-with-file")]
        public async Task<ActionResult<ServiceResponse<string?>>> AddProductImageWithFile([FromForm]Guid productId, IFormFile file)        
        {
            string filePath = Path.GetTempFileName();
            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }
            byte[] imageData = await System.IO.File.ReadAllBytesAsync(filePath);
            AddImageDTO image = new AddImageDTO()
            {
                ImageName = DateTime.Now.ToString() + "-" + file.FileName,
                ImageDescription = file.FileName,
                ImageExtension = file.ContentType,
                ImageBytes = imageData,
                ImageSize = (float)file.Length / 8,
            };
            var addImageResponse = await _imageService.AddImage(image);
            if(addImageResponse.Success && addImageResponse.Data != null)
            {
                return await _productImageService.AddProductImage(
                        new AddProductImageDTO()
                        {
                            ProductId = productId,
                            ImageId = (long)addImageResponse.Data,
                        }
                    );
            }
            else
            {
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = addImageResponse.Message
                };
            }
            
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<string?>>> UpdateProductImage(ProductImage newProductImage)
        {
            return await _productImageService.UpdateProductImage(newProductImage);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<string?>>> DeleteProductImage(long productImageId)
        {
            return await _productImageService.DeleteProductImage(productImageId);
        }

        [HttpDelete("delete-product-image-and-related-image-by-productId-and-imageId")]
        public async Task<ActionResult<ServiceResponse<string?>>> DeleteProductImageAndRelatedImage(Guid productId, long imageId)
        {
            var getProductImageResponse = await _productImageService.GetProductImageByProductIdAndImageId(productId, imageId);
            if (getProductImageResponse.Success && getProductImageResponse.Data != null)
            {
                await _productImageService.DeleteProductImage(getProductImageResponse.Data.ProductImageId);
                return await _imageService.DeleteImage(getProductImageResponse.Data.ImageId); 
            }
            else
            {
                return new ServiceResponse<string?>()
                {
                    Data= null,
                    Success= false,
                    Message=getProductImageResponse.Message
                };
            }
        }
    }
}
