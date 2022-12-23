using api.DTOs.BrandDTOs;
using api.DTOs.ImageDTO;

namespace api.Services.BrandService
{
    public interface IBrandService
    {
        Task<ServiceResponse<List<Brand>>> GetAllBrands();
        Task<ServiceResponse<Brand?>> GetBrandById(int brandId);
        Task<ServiceResponse<Brand?>> GetBrandByName(string brandName);
        Task<ServiceResponse<Image?>> GetImageOfBrand(int brandId);
        Task<ServiceResponse<string?>> AddBrand(AddBrandDTO brand);
        Task<ServiceResponse<string?>> UpdateBrand(Brand newBrand);
        Task<ServiceResponse<string?>> DeleteBrand(int brandId);
    }
}
