using System.ComponentModel.DataAnnotations;

namespace api.DTOs.OrderLineDTOs
{
    public class CreateOrderLineDTO
    {
        public int Quantity { get; set; } = 1;

        public long OrderId { get; set; }
        public Guid ProductId { get; set; }
    }
}
