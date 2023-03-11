namespace api.DTOs.OrderLineDTOs
{
    public class UpdateOrderLineDTO
    {
        public long OrderLineId { get; set; }
        public int Quantity { get; set; } = 1;
        public long OrderId { get; set; }
        public Guid ProductId { get; set; }
    }
}
