using api.DTOs.BrandDTOs;
using api.DTOs.CategoryDTOs;

namespace api.Services.CategoryService
{
    public interface ICategoryService
    {
        Task<ServiceResponse<List<Category>>> GetAllCategories();
        Task<ServiceResponse<List<SubCategory>>> GetSubCategoriesOfCategory(int categoryId);
        Task<ServiceResponse<Category?>> GetCategoryById(int categoryId);
        Task<ServiceResponse<Category?>> GetCategoryByName(string categoryName);
        Task<ServiceResponse<Image?>> GetImageOfCategory(int categoryId);
        Task<ServiceResponse<string?>> AddCategory(AddCategoryDTO category);
        Task<ServiceResponse<string?>> UpdateCategory(Category newCategory);
        Task<ServiceResponse<string?>> DeleteCategory(int categoryId);
    }
}
