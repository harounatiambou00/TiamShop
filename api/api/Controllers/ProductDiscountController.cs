using api.DTOs.ProductDiscountDTOs;
using api.Services.ProductDiscountService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/product-discounts")]
    [ApiController]
    public class ProductDiscountController : ControllerBase
    {
        private readonly IProductDiscountService _productDiscountService;

        public ProductDiscountController(IProductDiscountService productDiscountService)
        {
            _productDiscountService = productDiscountService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<ProductDiscount>>>> GetAllProductDiscounts()
        {
            return await _productDiscountService.GetAllProductDiscounts();  
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<ProductDiscount?>>> GetProductDiscountById(long productDiscountId)
        {
            return await _productDiscountService.GetProductDiscountById(productDiscountId);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<string?>>> AddProductDiscount(AddProductDiscountDTO productDiscount)
        {
            return await _productDiscountService.AddProductDiscount(productDiscount);
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<string?>>> UpdateProductDiscount(ProductDiscount newProductDiscount)
        {
            return await _productDiscountService.UpdateProductDiscount(newProductDiscount);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<string?>>> DeleteProductDiscount(long productDiscountId)
        {
            return await _productDiscountService.DeleteProductDiscount(productDiscountId);
        }
    }
}
