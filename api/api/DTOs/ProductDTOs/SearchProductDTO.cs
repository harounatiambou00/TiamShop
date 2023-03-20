using System.ComponentModel.DataAnnotations;

namespace api.DTOs.ProductDTOs
{
    public class SearchProductDTO
    {
        public string Criteria { get; set; } = String.Empty;
        public bool? OnlyAvailableProducts { get; set; } = false;
        public string? SortBy { get; set; } = "correspondance";
        public string? Category { get; set; } = "all";
        public string? Rating { get; set; } = "all";
        public int? BrandId { get; set; } = null;
        public ulong? MinPrice { get; set; } = null;
        public ulong? MaxPrice { get; set; } = null;
        public string? Discount { get; set; } = null;
    }
}
