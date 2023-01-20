using api.DTOs.ProductDiscountDTOs;

namespace api.Services.ProductDiscountService
{
    public interface IProductDiscountService
    {
        Task<ServiceResponse<List<ProductDiscount>>> GetAllProductDiscounts();
        Task<ServiceResponse<ProductDiscount?>> GetProductDiscountById(long productDiscountId);
        Task<ServiceResponse<string?>> AddProductDiscount(AddProductDiscountDTO productDiscount);
        Task<ServiceResponse<string?>> UpdateProductDiscount(ProductDiscount newProductDiscount);
        Task<ServiceResponse<string?>> DeleteProductDiscount(long productDiscountId);
    }
}
