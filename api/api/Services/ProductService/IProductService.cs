using api.DTOs.ProductDiscountDTOs;
using api.DTOs.ProductDTOs;

namespace api.Services.ProductService
{
    public interface IProductService
    {
        Task<ServiceResponse<List<Product>>> GetAllProducts();
        Task<ServiceResponse<Product?>> GetProductById(Guid productId);
        Task<ServiceResponse<Product?>> GetProductByReference(string productReference);
        Task<ServiceResponse<Image?>> GetPrincipalImageOfProduct(Guid productId);
        Task<ServiceResponse<List<ProductCaracteristic>>> GetCaracteristicsOfProduct(Guid productId);
        Task<ServiceResponse<List<Image>>> GetProductImages(Guid productId);
        Task<ServiceResponse<Product?>> AddProduct(AddProductDTO product);
        Task<ServiceResponse<Product?>> UpdateProduct(UpdateProductDTO newProduct);
        Task<ServiceResponse<string?>> DeleteProduct(Guid productId);
    }
}