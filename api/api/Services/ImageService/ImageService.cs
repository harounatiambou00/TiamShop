using api.DTOs.ImageDTO;
using Dapper;
using Microsoft.Data.SqlClient;
using Org.BouncyCastle.Math;
using System.Globalization;
using System.Text;

namespace api.Services.ImageService
{
    public class ImageService : IImageService
    {
        private readonly string _connectionString;

        public ImageService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        public async Task<ServiceResponse<Int64?>> AddImage(AddImageDTO image)
        {
            using(var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.InsertImage @ImageName, @ImageDescription, @ImageExtension, @ImageBytes, @ImageSize";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@ImageName", image.ImageName},
                        {"@ImageDescription", image.ImageDescription},
                        {"@ImageExtension", image.ImageExtension},
                        {"@ImageBytes", image.ImageBytes},
                        {"@ImageSize", image.ImageSize},
                    };
                    var parameters  = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(SQL, parameters);

                    if (affectedRows == 1)
                    {
                        var imageFromImageName = await GetImageByName(image.ImageName);
                        if(imageFromImageName.Data == null)
                        {
                            return new ServiceResponse<Int64?>
                            {
                                Data = null,
                                Success = true,
                                Message = "IMAGE_CREATED_SUCCESSFULLY"
                            };
                        }
                        else
                        {
                            return new ServiceResponse<Int64?>
                            {
                                Data = imageFromImageName.Data.ImageId,
                                Success = true,
                                Message = "IMAGE_CREATED_SUCCESSFULLY"
                            };
                        }
                    }
                    else
                    {
                        return new ServiceResponse<Int64?>
                        {
                            Data = null,
                            Success = false,
                            Message = "IMAGE_CREATION_FAILED"
                        };
                    }
                }
                catch
                {
                    return new ServiceResponse<Int64?>
                    {
                        Data = null,
                        Success = false,
                        Message = "IMAGE_CREATION_FAILED"
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> DeleteImage(Int64 id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string sql = "EXEC dbo.DeleteImage @ImageId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@ImageId", id},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(sql, parameters);

                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = affectedRows >= 1,
                        Message = !(affectedRows >= 1) ? "IMAGE_NOT_FOUND" : "IMAGE_DELETED_SUCCESSFULLY"
                    };
                }
                catch (Exception e)
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message
                    };
                }
            }
        }

        public async Task<ServiceResponse<List<Image>>> GetAllImages()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "SELECT * FROM dbo.tblImages";
                    var images = await connection.QueryAsync<Image>(query);
                    
                    return new ServiceResponse<List<Image>>
                    {
                        Data = images.AsList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch(Exception ex)
                {
                    return new ServiceResponse<List<Image>>
                    {
                        Data = null,
                        Success = false,
                        Message = ex.Message
                    };
                }
            }
        }

        public async Task<ServiceResponse<Image?>> GetImageByName(string imageName)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetImageByName @ImageName";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@ImageName", imageName},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    Image? image = await connection.QueryFirstAsync<Image>(query, parameters);
                    return new ServiceResponse<Image?>
                    {
                        Data = image,
                        Success = image != null,
                        Message = image == null ? "IMAGE_NOT_FOUND" : "IMAGE_FOUND_SUCCESSFULLY"
                    };
                }
                catch
                {
                    return new ServiceResponse<Image?>
                    {
                        Data = null,
                        Success = false,
                        Message = "IMAGE_NOT_FOUND"
                    };
                }
            }
        }

        public async Task<ServiceResponse<Image?>> GetImageById(Int64 imageId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetImageById @ImageId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@ImageId", imageId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    Image image = await connection.QueryFirstAsync<Image>(query, parameters);

                    return new ServiceResponse<Image?>
                    {
                        Data = image,
                        Success = image != null,
                        Message = image ==  null ? "IMAGE_NOT_FOUND" : "IMAGE_FOUND_SUCCESSFULLY"
                    };
                }
                catch(Exception e)
                {
                    return new ServiceResponse<Image?>
                    {
                        Data = null,                                                                            
                        Success = false,
                        Message = e.Message
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> UpdateImage(Image newImage)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.UpdateImage @ImageId, @ImageName, @ImageDescription, @ImageExtension, @ImageBytes, @ImageSize";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@ImageId", newImage.ImageId},
                        {"@ImageName", newImage.ImageName},
                        {"@ImageDescription", newImage.ImageDescription},
                        {"@ImageExtension", newImage.ImageExtension},
                        {"@ImageBytes", newImage.ImageBytes},
                        {"@ImageSize", newImage.ImageSize},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(SQL, parameters);

                    if (affectedRows >= 1)
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = true,
                            Message = "IMAGE_UPDATED_SUCCESSFULLY"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "IMAGE_NOT_FOUND"
                        };
                    }
                }
                catch
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = "IMAGE_NOT_FOUND"
                    };
                }
            }
        }
    }
}
