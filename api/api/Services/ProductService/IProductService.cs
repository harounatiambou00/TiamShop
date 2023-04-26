using api.DTOs.ProductDiscountDTOs;
using api.DTOs.ProductDTOs;

namespace api.Services.ProductService
{
    public interface IProductService
    {
        Task<ServiceResponse<List<Product>>> GetAllProducts();
        Task<ServiceResponse<List<GetProductAndOtherRelatedInformationDTO>>> SearchForAProduct(List<GetProductAndOtherRelatedInformationDTO> allProducts, SearchProductDTO filters);
        Task<ServiceResponse<Product?>> GetProductById(Guid productId);
        Task<ServiceResponse<Category?>> GetProductCategory(Guid productId);
        Task<ServiceResponse<Product?>> GetProductByReference(string productReference);
        Task<ServiceResponse<Image?>> GetPrincipalImageOfProduct(Guid productId);
        Task<ServiceResponse<List<ProductCaracteristic>>> GetCaracteristicsOfProduct(Guid productId);
        Task<ServiceResponse<List<Image>>> GetProductImages(Guid productId);
        Task<ServiceResponse<Product?>> AddProduct(AddProductDTO product);
        Task<ServiceResponse<Product?>> UpdateProduct(UpdateProductDTO newProduct);
        Task<ServiceResponse<string?>> DeleteProduct(Guid productId);
        Task<ServiceResponse<List<Product>>> GetBestSellers(int? limit);
        Task<ServiceResponse<List<Product>>> RecommandationProducts();
        Task<ServiceResponse<List<Product>>> GetTenNewestProducts();
        Task<ServiceResponse<List<Product>>> GetProductsOnDiscount(int? limit = null);
        Task<ServiceResponse<List<Product>>> GetProductsOfSubCategory(long subCategoryId ,int? limit = null);
    }
}