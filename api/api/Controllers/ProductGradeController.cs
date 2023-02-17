using api.DTOs.ProductGradeDTOs;
using api.Services.ProductGradeService;
using api.Services.ProductService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/product-grades")]
    [ApiController]
    public class ProductGradeController : ControllerBase
    {
        private readonly IProductGradeService _productGradeService;
        private readonly IUserService _userService;
        private readonly IProductService _productService;

        public ProductGradeController(IProductGradeService productGradeService, IUserService userService, IProductService productService)
        {
            _productGradeService = productGradeService;
            _userService = userService;
            _productService = productService;
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<string?>>> AddProductGrade(AddProductGradeDTO productGrade)
        {
            return await _productGradeService.AddProductGrade(productGrade);
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<ProductGrade>>>> GetAllProductGrades()
        {
            return await _productGradeService.GetAllProductGrades();
        }

        [HttpGet("{productGradeId}")]
        public async Task<ActionResult<ServiceResponse<ProductGrade?>>> GetProductGradeById(long productGradeId)
        {
            return await _productGradeService.GetProductGradeById(productGradeId);
        }

        [HttpGet("get-product-grades-by-product-id/{productId}")]
        public async Task<ActionResult<ServiceResponse<List<ProductGrade>>>> GetProductGradesByProductId(Guid productId)
        {
            return await _productGradeService.GetProductGradesByProductId(productId);
        }

        [HttpPost("get-product-grades-by-product-id-and-user-id")]
        public async Task<ActionResult<ServiceResponse<ProductGrade?>>> GetProductGradeByProductIdAndUserId(GetProductGradeByProductIdAndUserIdDTO request)
        {
            return await _productGradeService.GetProductGradeByProductIdAndUserId(request.ProductId, request.UserId);
        }

        [HttpGet("get-product-average-grade-by-product-id/{productId}")]
        public async Task<ActionResult<ServiceResponse<float>>> GetProductAverageGradeByProductId(Guid productId)
        {
            return await _productGradeService.GetProductAverageGradeByProductId(productId);
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<string?>>> UpdateProductGrade(ProductGrade productGrade)
        {
            var getProductResponse = await _productService.GetProductById(productGrade.ProductId);
            if(getProductResponse.Success == false || getProductResponse.Data == null)
            {
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "PRODUCT_NOT_NOT_FOUND"
                };
            }
            var getUserResponse = await _userService.GetUserById(productGrade.UserId);
            if (getUserResponse.Success == false || getUserResponse.Data == null)
            {
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "USER_NOT_NOT_FOUND"
                };
            }
            return await _productGradeService.UpdateProductGrade(productGrade);
        }

        [HttpDelete("{productGradeId}")]
        public async Task<ActionResult<ServiceResponse<string?>>> DeleteProductGrade(long productGradeId)
        {
            return await _productGradeService.DeleteProductGrade(productGradeId);
        }

    }
}
