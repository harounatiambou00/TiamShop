namespace api.DTOs.ProductDTOs
{
    public class AddProductDTO
    {
        public List<IFormFile> images { get; set; } = new List<IFormFile>();
        public string ProductName { get; set; } = String.Empty;
        public string ProductDescription { get; set; } = String.Empty;
        public Double ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public string Waranty { get; set; } = String.Empty;
        public string Color { get; set; } = String.Empty;
        public float ProductDiscountPercentage { get; set; } = 0;
        public DateTime? ProductDiscountEndDate { get; set; }

        public Int64? ProductPrincipalImageId { get; set; }
        public int BrandId { get; set; }
        public int SubCategoryId { get; set; }
    }
}
