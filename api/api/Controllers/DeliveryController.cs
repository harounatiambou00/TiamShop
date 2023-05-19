using api.DTOs.DeliveryDTOs;
using api.Services.DeliveryService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/deliveries")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        private readonly IDeliveryService _deliveryService;

        public DeliveryController(IDeliveryService deliveryService)
        {
            _deliveryService = deliveryService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Delivery>>>> GetAllDeliveries()
        {
            return await _deliveryService.GetAllDeliveries();
        }

        [HttpGet("get-affected-deliveries/{delivererId}")]
        public async Task<ActionResult<ServiceResponse<List<Delivery>>>> GetDeliveriesAffectedToDeliverer(int delivererId)
        {
            return await _deliveryService.GetDeliveriesAffectedToDeliverer(delivererId);
        }

        [HttpGet("get-delivery-by-reference/{reference}")]
        public async Task<ActionResult<ServiceResponse<Delivery?>>> GetDeliveryByReference(string reference)
        {
            return await _deliveryService.GetDeliveryByReference(reference);
        }

        [HttpGet("get-delivery-by-id/{id}")]
        public async Task<ActionResult<ServiceResponse<Delivery?>>> GetDeliveryById(long id)
        {
            return await _deliveryService.GetDeliveryById(id);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<string?>>> CreateDelivery(CreateDeliveryDTO request)
        {
            return await _deliveryService.CreateDelivery(request);
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<string?>>> UpdateDelivery(UpdateDeliveryDTO request)
        {
            return await _deliveryService.UpdateDelivery(request);
        }

        [HttpPut("assign-delivery-to-deliverer")]
        public async Task<ActionResult<ServiceResponse<string?>>> AssignDeliveryToDeliverer(AssignDeliveryToDelivererDTO request)
        {
            return await _deliveryService.AssignDeliveryToDeliverer(request);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<string?>>> DeleteDelivery(long id)
        {
            return await _deliveryService.DeleteDelivery(id);
        }

    }
}
