namespace api.Models
{
    public class OrderLine
    {
        public long OrderLineId { get; set; }
        public int OrderLineQuantity { get; set; } = 1;
        public float DiscountPercentage { get; set; } = 0;

        public int OrderId { get; set; }
        public Guid ProductId { get; set; }
    }
}
