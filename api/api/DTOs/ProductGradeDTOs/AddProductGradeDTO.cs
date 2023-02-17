namespace api.DTOs.ProductGradeDTOs
{
    public class AddProductGradeDTO
    {
        public Int16 Grade { get; set; }
        public Guid ProductId { get; set; }
        public int UserId { get; set; }
    }
}
