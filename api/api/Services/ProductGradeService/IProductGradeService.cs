using api.DTOs.ProductGradeDTOs;

namespace api.Services.ProductGradeService
{
    public interface IProductGradeService
    {
        Task<ServiceResponse<List<ProductGrade>>> GetAllProductGrades();
        Task<ServiceResponse<ProductGrade?>> GetProductGradeById(long productGradeId);
        Task<ServiceResponse<List<ProductGrade>>> GetProductGradesByProductId(Guid productId);
        Task<ServiceResponse<List<ProductGrade>>> GetProductGradesByUserId(int userId);
        Task<ServiceResponse<float>> GetProductAverageGradeByProductId(Guid productId);
        Task<ServiceResponse<ProductGrade?>> GetProductGradeByProductIdAndUserId(Guid productId, int userId);
        Task<ServiceResponse<string?>> AddProductGrade(AddProductGradeDTO productGrade);
        Task<ServiceResponse<string?>> UpdateProductGrade(ProductGrade newProductGrade);
        Task<ServiceResponse<string?>> DeleteProductGrade(long productGradeId);
    }
}
