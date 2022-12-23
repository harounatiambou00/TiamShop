using System.Numerics;

namespace api.DTOs.BrandDTOs
{
    public class AddBrandDTO
    {
        public string BrandName { get; set; } = String.Empty;
        public DateTime? PartnershipDate { get; set; } = null;
        public string? BrandWebsiteLink { get; set; } = String.Empty;
        public Int64? BrandImageId { get; set; }
    }
}
