using Org.BouncyCastle.Utilities;

namespace api.DTOs.ImageDTO
{
    public class AddImageDTO
    {
        public string ImageName { get; set; } = String.Empty;
        public string ImageDescription { get; set; } = String.Empty;
        public string ImageExtension { get; set; } = String.Empty;
        public byte[] ImageBytes { get; set; } = { };
        public float ImageSize { get; set; }
    }
}
