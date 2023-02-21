using api.DTOs.CategoryDTOs;
using api.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace api.Services.CategoryService
{
    public class CategoryService : ICategoryService
    {
        private readonly string _connectionString;
        public CategoryService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        public async Task<ServiceResponse<string?>> AddCategory(AddCategoryDTO category)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.InsertCategory @CategoryName, @CategoryTitle, @CategoryImageId";
                    var dictionary = new Dictionary<string, object?>
                    {
                        {"@CategoryName", category.CategoryName},
                        {"@CategoryTitle", category.CategoryTitle},
                        {"@CategoryImageId", category.CategoryImageId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(SQL, parameters);

                    if (affectedRows == 1)
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = true,
                            Message = "CATEGORY_CREATED_SUCCESSFULLY"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "CATEGORY_CREATION_FAILED"
                        };
                    }
                }
                catch
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = "CATEGORY_CREATION_FAILED"
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> DeleteCategory(int categoryId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "DELETE FROM dbo.tblCategories WHERE CategoryId = @CategoryId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@CategoryId", categoryId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(query, parameters);
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = affectedRows >= 1,
                        Message = affectedRows >= 1 ? "CATEGORY_DELETED_SUCCESSFULLY" : "CATEGORY_NOT_FOUND"
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

        public async Task<ServiceResponse<List<Category>>> GetAllCategories()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetAllCategories";
                    var categories = await connection.QueryAsync<Category>(query);
                    return new ServiceResponse<List<Category>>()
                    {
                        Data = categories.ToList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch
                {
                    return new ServiceResponse<List<Category>>()
                    {
                        Data = null,
                        Success = false,
                        Message = "SOMETHING_WENT_WRONG"
                    };
                }
            }
        }

        public async Task<ServiceResponse<Category?>> GetCategoryById(int categoryId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetCategoryById @CategoryId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@CategoryId", categoryId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    Category? category = await connection.QueryFirstAsync<Category>(query, parameters);
                    return new ServiceResponse<Category?>
                    {
                        Data = category,
                        Success = category != null,
                        Message = category == null ? "CATEGORY_NOT_FOUND" : "CATEGORY_FOUND_SUCCESSFULLY"
                    };
                }
                catch
                {
                    return new ServiceResponse<Category?>
                    {
                        Data = null,
                        Success = false,
                        Message = "CATEGORY_NOT_FOUND"
                    };
                }
            }
        }

        public async Task<ServiceResponse<Category?>> GetCategoryByName(string categoryName)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetCategoryByName @CategoryName";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@CategoryName", categoryName},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    Category? category = await connection.QueryFirstAsync<Category>(query, parameters);
                    return new ServiceResponse<Category?>
                    {
                        Data = category,
                        Success = category != null,
                        Message = category == null ? "CATEGORY_NOT_FOUND" : "CATEGORY_FOUND_SUCCESSFULLY"
                    };
                }
                catch
                {
                    return new ServiceResponse<Category?>
                    {
                        Data = null,
                        Success = false,
                        Message = "CATEGORY_NOT_FOUND"
                    };
                }
            }
        }

        public Task<ServiceResponse<Image?>> GetImageOfCategory(int categoryId)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<List<SubCategory>>> GetSubCategoriesOfCategory(int categoryId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    var getCorrespondingCategoryResponse = await GetCategoryById(categoryId);
                    if(getCorrespondingCategoryResponse.Data != null)
                    {
                        string query = "EXEC dbo.GetSubCategoriesOfCategory @CategoryId";
                        var dictionary = new Dictionary<string, object>
                        {
                            {"@CategoryId", categoryId},
                        };
                        var parameters = new DynamicParameters(dictionary);
                        var subCategories = await connection.QueryAsync<SubCategory>(query, parameters);
                        return new ServiceResponse<List<SubCategory>>()
                        {
                            Data = subCategories.ToList(),
                            Success = true,
                            Message = ""
                        };
                    }
                    else
                    {
                        return new ServiceResponse<List<SubCategory>>()
                        {
                            Data = null,
                            Success = false,
                            Message = "CATEGORY_NOT_FOUND"
                        };
                    }
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

        public async Task<ServiceResponse<string?>> UpdateCategory(Category newCategory)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string SQL = "EXEC dbo.UpdateCategory @CategoryId, @CategoryName, @CategoryTitle, @CategoryImageId, @CategoryRanking";
                    var dictionary = new Dictionary<string, object?>
                    {
                        {"@CategoryId", newCategory.CategoryId},
                        {"@CategoryName", newCategory.CategoryName},
                        {"@CategoryTitle", newCategory.CategoryTitle},
                        {"@CategoryImageId", newCategory.CategoryImageId},
                        {"@CategoryRanking", newCategory.CategoryRanking},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(SQL, parameters);

                    if (affectedRows >= 1)
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = true,
                            Message = "CATEGORY_UPDATED_SUCCESSFULLY"
                        };
                    }
                    else
                    {
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "CATEGORY_UPDATE_FAILED"
                        };
                    }
                }
                catch (Exception ex)
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = ex.Message
                    };
                }
            }
        }
    }
}
