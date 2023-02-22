using api.DTOs.BrandDTOs;
using api.DTOs.ImageDTO;
using api.Services.BrandService;
using api.Services.ProductService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/brands")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;
        private readonly IProductService _productService;
        private readonly IImageService _imageService;

        public BrandController(IBrandService brandService, IProductService productService , IImageService imageService)
        {
            _brandService = brandService;
            _productService = productService;
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

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<string?>>> UpdateBrand(IFormFile? newImageFile, [FromForm] Brand brand)
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
                    ImageId = brand.BrandImageId,
                    ImageName = DateTime.Now.ToString() + "-" + newImageFile.FileName,
                    ImageDescription = brand.BrandName + "'s logo.",
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
            return await _brandService.UpdateBrand(brand);
        }

        [HttpDelete("{brandId}")]
        public async Task<ActionResult<ServiceResponse<string?>>> DeleteBrand(int brandId)
        {
            var getBrandResponse = await _brandService.GetBrandById(brandId);
            if(getBrandResponse.Success && getBrandResponse.Data != null)
            {
                Brand brand = getBrandResponse.Data;
                var getAllProductsResponse = await _productService.GetAllProducts();
                if (getAllProductsResponse.Success && getAllProductsResponse.Data != null)
                {

                    foreach (Product p in getAllProductsResponse.Data)
                    {
                        if (p.BrandId == brandId)
                        {
                            var deleteProductResponse = await _productService.DeleteProduct(p.ProductId);
                            if (deleteProductResponse.Success) return new ServiceResponse<string?>()
                            {
                                Data = null,
                                Success = false,
                                Message = "SOMTHING_WENT_WRONG_WHILE_DELETING_THE_PRODUCTS"
                            };
                        }
                    }
                }
                var deleteBrandResponse = await _brandService.DeleteBrand(brandId);
                if (deleteBrandResponse.Success)
                {
                    var deleteBrandImageResponse = await _imageService.DeleteImage(brand.BrandImageId);
                    if (!deleteBrandImageResponse.Success) return new ServiceResponse<string?>()
                    {
                        Data = null,
                        Success = false,
                        Message = "BRAND_DELETEd8SUCCESSFULLY_BUT_SOMETHING_WENT_WRONG_WHILE_DELETING_THE_IMAGE"
                    };
                    return deleteBrandResponse;
                }
                else return deleteBrandResponse;
            }
            else
                return new ServiceResponse<string?>()
                {
                    Data = null,
                    Success = false,
                    Message = "BRAND_NOT_FOUND"
                };
        }
    }
}
