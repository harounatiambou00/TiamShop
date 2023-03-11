using api.DTOs.OrderLineDTOs;
using api.Services.OrderLineService;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/order-lines")]
    [ApiController]
    public class OrderLineController : ControllerBase
    {
        private readonly IOrderLineService _orderLineService;

        public OrderLineController(IOrderLineService orderLineService)
        {
            _orderLineService = orderLineService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<OrderLine?>>> GetOrderLineById(long id)
        {
            return await _orderLineService.GetOrderLineById(id);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<string?>>> CreateOrderLine(CreateOrderLineDTO request)
        {
            return await _orderLineService.CreateOrderLine(request);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<string?>>> DeleteOrderLine(long id)
        {
            return await _orderLineService.DeleteOrderLine(id);
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<string?>>> UpdateOrderLine(UpdateOrderLineDTO request)
        {
            return await _orderLineService.UpdateOrderLine(request);
        }
    }
}
