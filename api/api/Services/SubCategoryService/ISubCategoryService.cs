using api.DTOs.SubCategoryDTOs;

namespace api.Services.SubCategoryService
{
    public interface ISubCategoryService
    {
        Task<ServiceResponse<List<SubCategory>>> GetAllSubCategories();
        Task<ServiceResponse<SubCategory?>> GetSubCategoryById(int subCategoryId);
        Task<ServiceResponse<SubCategory?>> GetSubCategoryByName(string subCategoryName);
        Task<ServiceResponse<Image?>> GetImageOfSubCategory(int subCategoryId);
        Task<ServiceResponse<string?>> AddSubCategory(AddSubCategoryDTO subCategory);
        Task<ServiceResponse<string?>> UpdateSubCategory(SubCategory newSubCategory);
        Task<ServiceResponse<string?>> DeleteSubCategory(int subCategoryId);
    }
}
