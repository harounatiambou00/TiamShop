using Org.BouncyCastle.Math;

namespace api.Models
{
    public class Brand
    {
        public int BrandId { get; set; }
        public string BrandName { get; set; } = String.Empty;
        public DateTime? PartnershipDate { get; set; } = null;   
        public string BrandWebsiteLink { get; set; } = String.Empty;
        public Int64 BrandImageId { get; set; }
    }

}
