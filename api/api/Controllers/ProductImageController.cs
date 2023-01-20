using api.DTOs.ProductImageDTOs;
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

        public ProductImageController(IProductImageService productImageService)
        {
            _productImageService = productImageService;
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
    }
}
