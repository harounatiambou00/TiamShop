using api.DTOs.BrandDTOs;
using api.DTOs.ImageDTO;
using api.Services.BrandService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/brands")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;
        private readonly IImageService _imageService;

        public BrandController(IBrandService brandService, IImageService imageService)
        {
            _brandService = brandService;
            _imageService = imageService;
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<string?>>> AddBrand(IFormFile imageFile, [FromForm] AddBrandDTO brand)
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
                ImageDescription = brand.BrandName+"'s logo.",
                ImageExtension = imageFile.ContentType,
                ImageBytes = imageData,
                ImageSize = (float)imageFile.Length / 8,
            };
            var addImageResponse = await _imageService.AddImage(request);
            if (addImageResponse.Success)
            {
                brand.BrandImageId = addImageResponse.Data;
                return await _brandService.AddBrand(brand);
            }
            else
            {
                return new ServiceResponse<string?>()
                {
                    Data=null,
                    Success=false,
                    Message="SOMETHING_WENT_WRONG_WHILE_ADDING_IMAGE"
                };
            }
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Brand>>>> GetAllBrands()
        {
            return await _brandService.GetAllBrands();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Brand?>>> GetBrandById(int id)
        {
            return await _brandService.GetBrandById(id);
        }
    }
}
