using api.DTOs.BrandDTOs;
using api.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using static System.Net.Mime.MediaTypeNames;

namespace api.Services.BrandService
{
    public class BrandService : IBrandService
    {
        private readonly string _connectionString;

        public BrandService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }
        public async Task<ServiceResponse<string?>> AddBrand(AddBrandDTO brand)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.InsertBrand @BrandName, @PartnershipDate, @BrandWebsiteLink, @BrandImaageId";
                    var dictionary = new Dictionary<string, object?>
                    {
                        {"@BrandName", brand.BrandName},
                        {"@PartnershipDate", brand.PartnershipDate},
                        {"@BrandWebsiteLink", brand.BrandWebsiteLink},
                        {"@BrandImaageId", brand.BrandImageId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(SQL, parameters);

                    if (affectedRows == 1)
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = true,
                            Message = "BRAND_CREATED_SUCCESSFULLY"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "BRAND_CREATION_FAILED"
                        };
                    }
                }
                catch
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = "BRAND_CREATION_FAILED"
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> DeleteBrand(int brandId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.DeleteBrand @BrandId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@BrandId", brandId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(query, parameters);
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = affectedRows >= 1,
                        Message = affectedRows < 1 ? "BRAND_NOT_FOUND" : "BRAND_DELETED_SUCCESSFULLY"
                    };
                }
                catch(Exception e)
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

        public async Task<ServiceResponse<List<Brand>>> GetAllBrands()
        {
            using(var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetAllBrands";
                    var brands = await connection.QueryAsync<Brand>(query);
                    return new ServiceResponse<List<Brand>>()
                    {
                        Data = brands.ToList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch
                {
                    return new ServiceResponse<List<Brand>>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMETHING_WENT_WRONG"
                    };
                }
            }
        }

        public async Task<ServiceResponse<Brand?>> GetBrandById(int brandId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetBrandById @BrandId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@BrandId", brandId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    Brand? brand = await connection.QueryFirstAsync<Brand>(query, parameters);
                    return new ServiceResponse<Brand?>
                    {
                        Data = brand,
                        Success = brand != null,
                        Message = brand == null ? "BRAND_NOT_FOUND" : "BRAND_FOUND_SUCCESSFULLY"
                    };
                }
                catch
                {
                    return new ServiceResponse<Brand?>
                    {
                        Data = null,
                        Success = false,
                        Message = "BRAND_NOT_FOUND"
                    };
                }
            }
        }

        public async Task<ServiceResponse<Brand?>> GetBrandByName(string brandName)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetBrandByName @BrandName";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@BrandName", brandName},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    Brand? brand = await connection.QueryFirstAsync<Brand>(query, parameters);
                    return new ServiceResponse<Brand?>
                    {
                        Data = brand,
                        Success = brand != null,
                        Message = brand == null ? "BRAND_NOT_FOUND" : "BRAND_FOUND_SUCCESSFULLY"
                    };
                }
                catch
                {
                    return new ServiceResponse<Brand?>
                    {
                        Data = null,
                        Success = false,
                        Message = "BRAND_NOT_FOUND"
                    };
                }
            }
        }

        public async Task<ServiceResponse<Models.Image?>> GetImageOfBrand(int brandId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetBrandById @BrandId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@BrandId", brandId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    Models.Image? image = await connection.QueryFirstAsync<Models.Image>(query, parameters);
                    return new ServiceResponse<Models.Image?>
                    {
                        Data = image,
                        Success = image != null,
                        Message = image == null ? "BRAND_OR_IMAGE_NOT_FOUND" : "IMAGE_FOUND_SUCCESSFULLY"
                    };
                }
                catch
                {
                    return new ServiceResponse<Models.Image?>
                    {
                        Data = null,
                        Success = false,
                        Message = "BRAND_OR_IMAGE_NOT_FOUND"
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> UpdateBrand(Brand newBrand) 
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.UpdateBrand @BrandId, @BrandName, @PartnershipDate, @BrandWebsiteLink, @BrandImageId";
                    var dictionary = new Dictionary<string, object?>
                    {
                        {"@BrandId", newBrand.BrandId},
                        {"@BrandName", newBrand.BrandName},
                        {"@PartnershipDate", newBrand.PartnershipDate},
                        {"@BrandWebsiteLink", newBrand.BrandWebsiteLink},
                        {"@BrandImageId", newBrand.BrandImageId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(SQL, parameters);

                    if (affectedRows >= 1)
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = true,
                            Message = "BRAND_UPDATED_SUCCESSFULLY"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "BRAND_NOT_FOUND"
                        };
                    }
                }
                catch(Exception e)
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
    }
}
