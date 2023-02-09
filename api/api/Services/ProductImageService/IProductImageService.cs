using api.DTOs.ImageDTO;
using api.DTOs.ProductImageDTOs;

namespace api.Services.ProductImageService
{
    public interface IProductImageService
    {
        Task<ServiceResponse<ProductImage?>> GetProductImageById(long productImageId);
        Task<ServiceResponse<ProductImage?>> GetProductImageByProductIdAndImageId(Guid productId, long imageId);
        Task<ServiceResponse<Product?>> GetProductOfProductImage(long productImageId);
        Task<ServiceResponse<Image?>> GetImageOfProductImage(long productImageId);
        Task<ServiceResponse<string?>> AddProductImage(AddProductImageDTO productImage);
        Task<ServiceResponse<string?>> UpdateProductImage(ProductImage productImage);
        Task<ServiceResponse<string?>> DeleteProductImage(long productImageId);
    }
}
