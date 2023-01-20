namespace api.Models
{
    public class ProductDiscount
    {
        public long ProductDiscountId { get; set; }
        public float ProductDiscountPercentage { get; set; } = 0;
        public DateTime? ProductDiscountStartDate { get; set; }
        public DateTime? ProductDiscountEndDate { get; set; }
        public Guid ProductId { get; set; }
    }
}
