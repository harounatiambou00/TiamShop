namespace api.DTOs.ProductDTOs
{
    public class GetProductAndOtherRelatedInformationDTO
    {
        public Guid ProductId { get; set; }
        public string ProductReference { get; set; }
        public string ProductName { get; set; } = String.Empty;
        public string ProductDescription { get; set; } = String.Empty;
        public Double ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Waranty { get; set; } = String.Empty;
        public string Color { get; set; } = String.Empty;

        public Int64? ProductPrincipalImageId { get; set; }
        public int BrandId { get; set; }
        public int SubCategoryId { get; set; }
        public long? ProductDiscountId { get; set; }

        public List<Image> Images { get; set; } = new List<Image>();
        public List<ProductCaracteristic> Caracteristics { get; set; } = new List<ProductCaracteristic>();
        public float ProductDiscountPercentage { get; set; }
        public DateTime? ProductDiscountEndDate { get; set; }
        public float Rating { get; set; } = 0;
        public int NumberOfVotes { get; set; } = 0;
    }
}
