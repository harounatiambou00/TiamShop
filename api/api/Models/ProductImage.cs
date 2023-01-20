namespace api.Models
{
    public class ProductImage
    {
        public long ProductImageId { get; set; }
        public Guid ProductId { get; set; }
        public long ImageId { get; set; }
    }
}
