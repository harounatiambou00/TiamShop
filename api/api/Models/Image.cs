using Org.BouncyCastle.Math;
using Org.BouncyCastle.Utilities;

namespace api.Models
{
    public class Image
    {
        public Int64 ImageId { get; set; }
        public string ImageName { get; set; } = String.Empty;
        public string ImageDescription { get; set; } = String.Empty;
        public string ImageExtension { get; set; } = String.Empty;
        public byte[] ImageBytes { get; set; } = { };
        public float ImageSize { get; set; }

        public Image(Int64 imageId, string imageName, string imageDescription, string imageExtension, byte[] imageBytes, float imageSize)
        {
            ImageId = imageId;
            ImageName = imageName;
            ImageDescription = imageDescription;
            ImageExtension = imageExtension;
            ImageBytes = imageBytes;
            ImageSize = imageSize;
        }

        public Image()
        {

        }
    }

}
