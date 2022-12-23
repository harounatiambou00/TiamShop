using api.DTOs.ImageDTO;
using Org.BouncyCastle.Math;

namespace api.Services.ImageService
{
    public interface IImageService
    {
        Task<ServiceResponse<List<Image>>> GetAllImages();
        Task<ServiceResponse<Image?>> GetImageById(Int64 imageId); 
        Task<ServiceResponse<Int64?>> AddImage(AddImageDTO image);
        Task<ServiceResponse<string?>> UpdateImage(Image newImage);
        Task<ServiceResponse<string?>> DeleteImage(Int64 id);
    }
}
