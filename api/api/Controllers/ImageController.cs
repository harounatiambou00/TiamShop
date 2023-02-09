using api.DTOs.ImageDTO;
using api.DTOs.ImageDTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Math;
using System.IO;

namespace api.Controllers
{
    [Route("api/images")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<Int64?>>> AddImage(IFormFile imageFile, [FromForm]AddImageControllerDTO image)
        {
            string filePath = Path.GetTempFileName();
            using(var stream = System.IO.File.Create(filePath))
            {
                await imageFile.CopyToAsync(stream);
            }
            byte[] imageData = await System.IO.File.ReadAllBytesAsync(filePath);
            AddImageDTO request = new AddImageDTO()
            {
                ImageName = DateTime.Now.ToString() + "-" + imageFile.FileName,
                ImageDescription = image.ImageDescription,  
                ImageExtension = imageFile.ContentType,
                ImageBytes = imageData,
                ImageSize = (float)imageFile.Length / 8,
            };
            return await _imageService.AddImage(request);
        }


        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Image>>>> GettAllImages()
        {
            return await _imageService.GetAllImages();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Image?>>> GetImageById(Int64 id)
        {
            return await _imageService.GetImageById(id);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<string?>>> DeleteImage(Int64 id)
        {
            return await _imageService.DeleteImage(id);
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<string?>>> UpdateImage([FromForm] Int64 id, IFormFile newFile)
        {
            string filePath = Path.GetTempFileName();
            using (var stream = System.IO.File.Create(filePath))
            {
                await newFile.CopyToAsync(stream);
            }
            byte[] imageData = await System.IO.File.ReadAllBytesAsync(filePath);
            Image request = new Image()
            {
                ImageId = id,
                ImageName = DateTime.Now.ToString() + "-" + newFile.FileName,
                ImageDescription = "",
                ImageExtension = newFile.ContentType,
                ImageBytes = imageData,
                ImageSize = (float)newFile.Length / 8,
            };
            return await _imageService.UpdateImage(request);
        }
    }     
}
