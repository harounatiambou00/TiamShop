using api.DTOs.ProductGradeDTOs;
using api.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace api.Services.ProductGradeService
{
    public class ProductGradeService : IProductGradeService
    {
        private readonly string _connectionString;
        public ProductGradeService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }
        public async Task<ServiceResponse<string?>> AddProductGrade(AddProductGradeDTO productGrade)
        {
            if(productGrade.Grade < 0 || productGrade.Grade > 5)
            {
                return new ServiceResponse<string?>
                {
                    Data = null,
                    Success = false,
                    Message = "PRODUCT_GRADE_MUST_BE_BETWEEN_0_AND_5"
                };
            }
            else
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    try
                    {
                        connection.Open();
                        string sql = "EXEC dbo.InsertProductGrade @Grade, @ProductId, @UserId";
                        var dictionary = new Dictionary<string, object>
                    {
                        {"@Grade", productGrade.Grade},
                        {"@ProductId", productGrade.ProductId},
                        {"@UserId", productGrade.UserId},
                    };
                        var parameters = new DynamicParameters(dictionary);
                        var affectedRows = await connection.ExecuteAsync(sql, parameters);
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = true,
                            Message = "PRODUCT_GRADE_CREATED_SUCCESSFULLY"
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
        }

        public async Task<ServiceResponse<string?>> DeleteProductGrade(long productGradeId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string sql = "EXEC dbo.DeleteProductGrade @ProductGradeId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@ProductGradeId", productGradeId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(sql, parameters);
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = true,
                        Message = "PRODUCT_DELETED_SUCCESSFULLY"
                    };
                }
                catch(Exception _)
                {
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = false,
                        Message = _.Message
                    };
                }

            }
        }

        public async Task<ServiceResponse<List<ProductGrade>>> GetAllProductGrades()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetAllProductGrades";
                    var productGrades = await connection.QueryAsync<ProductGrade>(query);

                    return new ServiceResponse<List<ProductGrade>>
                    {
                        Data = productGrades.AsList(),
                        Success = true,
                        Message = ""
                    };
                }
                catch (Exception ex)
                {
                    return new ServiceResponse<List<ProductGrade>>
                    {
                        Data = null,
                        Success = false,
                        Message = ex.Message
                    };
                }
            }
        }

        public async Task<ServiceResponse<List<ProductGrade>>> GetProductGradesByProductId(Guid productId)
        {
            List<ProductGrade>? allProductGrades = (await GetAllProductGrades()).Data;
            if (allProductGrades != null)
                return new ServiceResponse<List<ProductGrade>>()
                {
                    Data = allProductGrades.Where<ProductGrade>((p) => p.ProductId == productId).AsList(),
                    Success = true,
                    Message = ""
                };
            else
            {
                return new ServiceResponse<List<ProductGrade>>()
                {
                    Data = new List<ProductGrade>(),
                    Success = true,
                    Message = ""
                };
            }
        }

        public async Task<ServiceResponse<ProductGrade?>> GetProductGradeById(long productGradeId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string query = "EXEC dbo.GetProductGradeById @ProductGradeId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@ProductGradeId", productGradeId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    ProductGrade? productGrade = await connection.QueryFirstAsync<ProductGrade>(query, parameters);

                    return new ServiceResponse<ProductGrade?>
                    {
                        Data = productGrade,
                        Success = productGrade != null,
                        Message = productGrade == null ? "PRODUCT_GRADE_NOT_FOUND" : "PRODUCT_GRADE_FOUND_SUCCESSFULLY"
                    };
                }
                catch (Exception e)
                {
                    return new ServiceResponse<ProductGrade?>
                    {
                        Data = null,
                        Success = false,
                        Message = e.Message
                    };
                }
            }
        }

        public async Task<ServiceResponse<string?>> UpdateProductGrade(ProductGrade newProductGrade)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    string sql = "EXEC dbo.UpdateProductGrade @ProductGradeId, @Grade, @ProductId, @UserId";
                    var dictionary = new Dictionary<string, object>
                    {
                        {"@ProductGradeId", newProductGrade.ProductGradeId},
                        {"@Grade", newProductGrade.Grade},
                        {"@ProductId", newProductGrade.ProductId},
                        {"@UserId", newProductGrade.UserId},
                    };
                    var parameters = new DynamicParameters(dictionary);
                    var affectedRows = await connection.ExecuteAsync(sql, parameters);
                    return new ServiceResponse<string?>
                    {
                        Data = null,
                        Success = true,
                        Message = "PRODUCT_GRADE_UPDATED_SUCCESSFULLY"
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

        public async Task<ServiceResponse<ProductGrade?>> GetProductGradeByProductIdAndUserId(Guid productId, int userId)
        {
            List<ProductGrade>? allProductGrades = (await GetAllProductGrades()).Data;
            if (allProductGrades != null)
            {
                ProductGrade? matchedProductGrade = allProductGrades.Find((p) => p.ProductId == productId && p.UserId == userId);
                return new ServiceResponse<ProductGrade?>()
                {
                    Data = matchedProductGrade,
                    Success = matchedProductGrade != null,
                    Message = matchedProductGrade != null ? "" : "PRODUCT_GRADE_NOT_FOUND"
                };
            }
            else
            {
                return new ServiceResponse<ProductGrade?>()
                {
                    Data = null,
                    Success = true,
                    Message = "PRODUCT_GRADE_NOT_FOUND"
                };
            }
        }

        public async Task<ServiceResponse<float>> GetProductAverageGradeByProductId(Guid productId)
        {
            var getAllGradesResponse = await GetProductGradesByProductId(productId);
            List<ProductGrade> productGrades = getAllGradesResponse.Data != null ? getAllGradesResponse.Data : new List<ProductGrade>();
            int sum = 0;
            for (var i = 0; i < productGrades.Count; i++)
            {
               sum += productGrades[i].Grade;
            }
            return new ServiceResponse<float>()
            {
                Data = productGrades.Count == 0 ? 0 : sum / productGrades.Count,
                Success = true,
                Message = ""
            };
        }

        public async Task<ServiceResponse<List<ProductGrade>>> GetProductGradesByUserId(int userId)
        {
            List<ProductGrade>? allProductGrades = (await GetAllProductGrades()).Data;
            if (allProductGrades != null)
                return new ServiceResponse<List<ProductGrade>>()
                {
                    Data = allProductGrades.Where<ProductGrade>((p) => p.UserId == userId).AsList(),
                    Success = true,
                    Message = ""
                };
            else
            {
                return new ServiceResponse<List<ProductGrade>>()
                {
                    Data = new List<ProductGrade>(),
                    Success = true,
                    Message = ""
                };
            }
        }
    }
}
