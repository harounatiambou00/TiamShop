using api.DTOs.SubCategoryDTOs;
using api.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace api.Services.SubCategoryService
{
    public class SubCategoryService : ISubCategoryService
    {
        private readonly string _connectionString;
        public SubCategoryService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }


        public async Task<ServiceResponse<string?>> AddSubCategory(AddSubCategoryDTO subCategory)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.InsertSubCategory @SubCategoryName, @SubCategoryTitle, @SubCategoryImageId, @CategoryId";
                    var dictionary = new Dictionary<string, object?>
                    {
                        {"@SubCategoryName", subCategory.SubCategoryName},
                        {"@SubCategoryTitle", subCategory.SubCategoryTitle},
                        {"@SubCategoryImageId", subCategory.SubCategoryImageId},
                        {"@CategoryId", subCategory.CategoryId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(SQL, parameters);

                    if (affectedRows == 1)
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = true,
                            Message = "SUBCATEGORY_CREATED_SUCCESSFULLY"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "SUBCATEGORY_CREATION_FAILED"
                        };
                    }
                }
                catch
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = "SUBCATEGORY_CREATION_FAILED"
                    };
                }
            }
        }

        public Task<ServiceResponse<string?>> DeleteSubCategory(int subCategoryId)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<List<SubCategory>>> GetAllSubCategories()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetAllSubCategories";
                    var subCategories = await connection.QueryAsync<SubCategory>(query);
                    return new ServiceResponse<List<SubCategory>>()
                    {
                        Data = subCategories.ToList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch
                {
                    return new ServiceResponse<List<SubCategory>>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMETHING_WENT_WRONG"
                    };
                }
            }
        }

        public Task<ServiceResponse<Image?>> GetImageOfSubCategory(int subCategoryId)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<SubCategory?>> GetSubCategoryById(int subCategoryId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetSubCategoryById @SubCategoryId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@SubCategoryId", subCategoryId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    SubCategory? subCategory = await connection.QueryFirstAsync<SubCategory>(query, parameters);
                    return new ServiceResponse<SubCategory?>
                    {
                        Data = subCategory,
                        Success = subCategory != null,
                        Message = subCategory == null ? "SUBCATEGORY_NOT_FOUND" : "SUBCATEGORY_FOUND_SUCCESSFULLY"
                    };
                }
                catch
                {
                    return new ServiceResponse<SubCategory?>
                    {
                        Data = null,
                        Success = false,
                        Message = "SUBCATEGORY_NOT_FOUND"
                    };
                }
            }
        }

        public async Task<ServiceResponse<SubCategory?>> GetSubCategoryByName(string subCategoryName)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetSubCategoryByName @SubCategoryName";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@SubCategoryName", subCategoryName},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    SubCategory? subCategory = await connection.QueryFirstAsync<SubCategory>(query, parameters);
                    return new ServiceResponse<SubCategory?>
                    {
                        Data = subCategory,
                        Success = subCategory != null,
                        Message = subCategory == null ? "SUBCATEGORY_NOT_FOUND" : "SUBCATEGORY_FOUND_SUCCESSFULLY"
                    };
                }
                catch
                {
                    return new ServiceResponse<SubCategory?>
                    {
                        Data = null,
                        Success = false,
                        Message = "SUBCATEGORY_NOT_FOUND"
                    };
                }
            }
        }

        public Task<ServiceResponse<string?>> UpdateSubCategory(SubCategory newSubCategory)
        {
            throw new NotImplementedException();
        }
    }
}
