﻿using api.DTOs.BrandDTOs;
using api.DTOs.CategoryDTOs;
using api.DTOs.ImageDTO;
using api.Services.BrandService;
using api.Services.CategoryService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IImageService _imageService;

        public CategoryController(ICategoryService categoryService, IImageService imageService)
        {
            _categoryService = categoryService;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Category?>>> GetCategoryById(int id)
        {
            return await _categoryService.GetCategoryById(id);
        }

        [HttpGet("{categoryName}")]
        public async Task<ActionResult<ServiceResponse<Category?>>> GetCategoryByName(string categoryName)
        {
            return await _categoryService.GetCategoryByName(categoryName);
        }

        [HttpGet("get-subcategories/{id}")]
        public async Task<ActionResult<ServiceResponse<List<SubCategory>>>> GetSubCategories(int id)
        {
            return await _categoryService.GetSubCategoriesOfCategory(id);
        }
    }
}