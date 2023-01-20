using api.DTOs.ProductCaracteristicDTOs;
using api.DTOs.SubCategoryDTOs;

namespace api.Services.ProductCaracteristicService
{
    public interface IProductCarateristicService
    {
        Task<ServiceResponse<List<ProductCaracteristic>>> GetAllProductCaracteristics();
        Task<ServiceResponse<ProductCaracteristic?>> GetProductCaracteristicById(long productCarateristicId);
        Task<ServiceResponse<string?>> AddProductCaracteristic(AddProductCaracteristicDTO productCracteristic);
        Task<ServiceResponse<string?>> UpdateProductCaracteristic(ProductCaracteristic newProductCracteristic);
        Task<ServiceResponse<string?>> DeleteProductCaracteristic(long productCracteristicId);
    }
}
