using api.DTOs.ProductCaracteristicDTOs;
using api.Services.BrandService;
using api.Services.ProductCaracteristicService;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    [Route("api/product-caracteristics")]
    [ApiController]
    public class ProductCaracteristicController : ControllerBase
    {
        private readonly IProductCarateristicService _productCaracteristicService;

        public ProductCaracteristicController(IProductCarateristicService productCaracteristicService)
        {
            _productCaracteristicService = productCaracteristicService;
        }

        // GET: api/<ProductCaracteristicController>
        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<ProductCaracteristic>>>> Get()
        {
            return await _productCaracteristicService.GetAllProductCaracteristics();
        }

        // GET api/<ProductCaracteristicController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<ProductCaracteristic?>>> Get(long id)
        {
            return await _productCaracteristicService.GetProductCaracteristicById(id);  
        }

        // POST api/<ProductCaracteristicController>
        [HttpPost]
        public async Task<ActionResult<ServiceResponse<string?>>> Post(AddProductCaracteristicDTO productCaracteristic)
        {
            return await _productCaracteristicService.AddProductCaracteristic(productCaracteristic);
        }

        // PUT api/<ProductCaracteristicController>/
        [HttpPut]
        public async Task<ActionResult<ServiceResponse<string?>>> Put(ProductCaracteristic newProductCaracteristic)
        {
            return await _productCaracteristicService.UpdateProductCaracteristic(newProductCaracteristic);
        }

        // DELETE api/<ProductCaracteristicController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<string?>>> Delete(long id)
        {
            return await _productCaracteristicService.DeleteProductCaracteristic(id);
        }
    }
}
