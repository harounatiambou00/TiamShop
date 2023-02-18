using api.DTOs.CategoryDTOs;
using api.DTOs.ImageDTO;
using api.DTOs.SubCategoryDTOs;
using api.Services.CategoryService;
using api.Services.SubCategoryService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/sub-categories")]
    [ApiController]
    public class SubCategoryController : ControllerBase
    {
        private readonly ISubCategoryService _subCategoryService;
        private readonly ICategoryService _categoryService;
        private readonly IImageService _imageService;

        public SubCategoryController(ISubCategoryService subCategoryService, IImageService imageService, ICategoryService categoryService)
        {
            _subCategoryService = subCategoryService;
            _imageService = imageService;
            _categoryService = categoryService;
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<string?>>> AddSubCategory(IFormFile imageFile, [FromForm] AddSubCategoryDTO subCategory)
        {
            var getCorrespondingCategoryResponse = await _categoryService.GetCategoryById(subCategory.CategoryId);
            if (getCorrespondingCategoryResponse.Data != null && getCorrespondingCategoryResponse.Success)
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
                    ImageDescription = subCategory.SubCategoryTitle + "'s image.",
                    ImageExtension = imageFile.ContentType,
                    ImageBytes = imageData,
                    ImageSize = (float)imageFile.Length / 8,
                };
                var addImageResponse = await _imageService.AddImage(request);
                if (addImageResponse.Success)
                {
                    subCategory.SubCategoryImageId = addImageResponse.Data;
                    return await _subCategoryService.AddSubCategory(subCategory);
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
            else
            {
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "THIS_CATEGORY_DOESNT_EXIST"
                };
            }
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<SubCategory>>>> GetAllSubCategories()
        {
            return await _subCategoryService.GetAllSubCategories();
        }

        [HttpGet("get-subcategory-by-id/{id}")]
        public async Task<ActionResult<ServiceResponse<SubCategory?>>> GetSubCategoryById(int id)
        {
            return await _subCategoryService.GetSubCategoryById(id);
        }

        [HttpGet("get-sub-category-by-name/{subCategoryName}")]
        public async Task<ActionResult<ServiceResponse<SubCategory?>>> GetCategoryByName(string subCategoryName)
        {
            return await _subCategoryService.GetSubCategoryByName(subCategoryName);
        }

        [HttpDelete("{subCategoryId}")]
        public async Task<ActionResult<ServiceResponse<string?>>> DeleteSubCategory(int subCategoryId)
        {
            /*
             * TODO : Delete the image of the subcategory
             * * */
            return await _subCategoryService.DeleteSubCategory(subCategoryId);
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<string?>>> UpdateSubCategory(IFormFile? newImageFile, [FromForm] SubCategory newSubCategory)
        {
            if (newImageFile != null)
            {
                string filePath = Path.GetTempFileName();
                using (var stream = System.IO.File.Create(filePath))
                {
                    await newImageFile.CopyToAsync(stream);
                }
                byte[] imageData = await System.IO.File.ReadAllBytesAsync(filePath);
                AddImageDTO request = new AddImageDTO()
                {
                    ImageName = DateTime.Now.ToString() + "-" + newImageFile.FileName,
                    ImageDescription = newSubCategory.SubCategoryName + "'s image",
                    ImageExtension = newImageFile.ContentType,
                    ImageBytes = imageData,
                    ImageSize = (float)newImageFile.Length / 8,
                };

                var addNewImageResponse = await _imageService.AddImage(request);
                if (addNewImageResponse.Success && addNewImageResponse.Data != null)
                {
                    newSubCategory.SubCategoryImageId = addNewImageResponse.Data;
                    /*
                     * TODO : 
                     * DELETE THE OLD IMAGE
                     * **/
                }
                else
                {
                    return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMTHING_WENT_WRONG_WHILE_ADDING_THE_NEW_IMAGE"
                    };
                }
            }
            return await _subCategoryService.UpdateSubCategory(newSubCategory);
        }
    }
}
