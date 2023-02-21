using api.DTOs.BrandDTOs;
using api.DTOs.CategoryDTOs;
using api.DTOs.ImageDTO;
using api.Services.BrandService;
using api.Services.CategoryService;
using api.Services.SubCategoryService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly ISubCategoryService _subCategoryService;
        private readonly IImageService _imageService;

        public CategoryController(ICategoryService categoryService, ISubCategoryService subCategoryService, IImageService imageService)
        {
            _categoryService = categoryService;
            _subCategoryService = subCategoryService;
            _imageService = imageService;
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<string?>>> AddCategory(IFormFile imageFile, [FromForm] AddCategoryDTO category)
        {
            string filePath = Path.GetTempFileName();
            using (var stream = System.IO.File.Create(filePath))
            {
                await imageFile.CopyToAsync(stream);
            }
            byte[] imageData = await System.IO.File.ReadAllBytesAsync(filePath);
            AddImageDTO request = new AddImageDTO()
            {
                ImageName = DateTime.Now.ToString() + "-" + imageFile.FileName,
                ImageDescription = category.CategoryTitle + "'s image.",
                ImageExtension = imageFile.ContentType,
                ImageBytes = imageData,
                ImageSize = (float)imageFile.Length / 8,
            };
            var addImageResponse = await _imageService.AddImage(request);
            if (addImageResponse.Success)
            {
                category.CategoryImageId = addImageResponse.Data;
                return await _categoryService.AddCategory(category);
            }
            else
            {
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "SOMETHING_WENT_WRONG_WHILE_ADDING_IMAGE"
                };
            }
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Category>>>> GetAllCategories()
        {
            return await _categoryService.GetAllCategories();
        }

        [HttpGet("get-category-by-id/{id}")]
        public async Task<ActionResult<ServiceResponse<Category?>>> GetCategoryById(int id)
        {
            return await _categoryService.GetCategoryById(id);
        }

        [HttpGet("get-category-by-name/{categoryName}")]
        public async Task<ActionResult<ServiceResponse<Category?>>> GetCategoryByName(string categoryName)
        {
            return await _categoryService.GetCategoryByName(categoryName);
        }

        [HttpGet("get-subcategories/{id}")]
        public async Task<ActionResult<ServiceResponse<List<SubCategory>>>> GetSubCategories(int id)
        {
            return await _categoryService.GetSubCategoriesOfCategory(id);
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<string?>>> UpdateCategory(IFormFile? newImageFile,[FromForm] Category category)
        {
            if (newImageFile != null)
            {
                string filePath = Path.GetTempFileName();
                using (var stream = System.IO.File.Create(filePath))
                {
                    await newImageFile.CopyToAsync(stream);
                }
                byte[] imageData = await System.IO.File.ReadAllBytesAsync(filePath);
                Image request = new Image()
                {
                    ImageId = category.CategoryImageId,
                    ImageName = DateTime.Now.ToString() + "-" + newImageFile.FileName,
                    ImageDescription = category.CategoryName + "'s image",
                    ImageExtension = newImageFile.ContentType,
                    ImageBytes = imageData,
                    ImageSize = (float)newImageFile.Length / 8,
                };

                var updateImageResponse = await _imageService.UpdateImage(request);
                if (!updateImageResponse.Success)
                {
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMTHING_WENT_WRONG_WHILE_UPDATING_THE_IMAGE"
                    };
                }
                
            }
            return await _categoryService.UpdateCategory(category);
        }

        [HttpDelete("{categoryId}")]
        public async Task<ActionResult<ServiceResponse<string?>>> DeleteCategory(int categoryId)
        {
            var getCategoryResponse = await _categoryService.GetCategoryById(categoryId);
            if (getCategoryResponse.Success && getCategoryResponse.Data != null)
            {
                var getSubCategoriesResponse = await _subCategoryService.GetAllSubCategories();
                if (getSubCategoriesResponse.Success && getSubCategoriesResponse.Data != null)
                {
                    List<SubCategory> subCategories = getSubCategoriesResponse.Data;
                    foreach (SubCategory subCategory in subCategories.Where((s) => s.CategoryId == categoryId))
                    {
                        var deleteSuBCategoryResponse = await _subCategoryService.DeleteSubCategory(subCategory.SubCategoryId);
                        if (!deleteSuBCategoryResponse.Success)
                        {
                            return new ServiceResponse<string?>()
                            {
                                Data = null,
                                Success = false,
                                Message = "SOMETHING_WENT_WRONG_WHILE_DELETING_SUBCATEGORIES"
                            };
                        }
                    }


                }
                var deleteCategoryResponse = await _categoryService.DeleteCategory(categoryId);
                if (deleteCategoryResponse.Success && deleteCategoryResponse.Data != null)
                {
                    var deleteImageResponse = await _imageService.DeleteImage(getCategoryResponse.Data.CategoryImageId);
                    if (!deleteImageResponse.Success)
                    {
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = false,
                            Message = "CATEGORY_DELETED_SUCCESFULLLY_BUT_SOMETHING_WENT_WRONG_WHILE_DELETING_THE_IMAGE"
                        };
                    }
                }
                return deleteCategoryResponse;
            }
            else
            {
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "CATEGORY_NOT_FOUND"
                };
            }
        }
    }
}
