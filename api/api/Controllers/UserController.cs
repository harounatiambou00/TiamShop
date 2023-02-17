﻿using api.Models;
using api.Services.ProductGradeService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IProductGradeService _productGradeService;

        public UserController(IUserService userService, IProductGradeService productGradeService)
        {
            _userService = userService;
            _productGradeService = productGradeService;
        }

        [HttpGet("get-all-users")]
        public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> GetAllUsers()
        {
            return await _userService.GetAllUsers();
        }

        [HttpGet("get-all-clients")]
        public async Task<ServiceResponse<List<GetUserDTO>>> GetAllClients()
        {
            return await _userService.GetAllClients();
        }

        [HttpGet("get-all-admins")]
        public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> GetAllAdmins()
        {
            return await _userService.GetAllAdmins();
        }

        [HttpGet("get-user-by-id/{id}")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO?>>> GetUserById(int id)
        {
            return await _userService.GetUserById(id);
        }

        [HttpGet("get-admin-by-guid/{guid}")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO?>>> GetAdminByGuid(string guid)
        {
            return await _userService.GetAdminByGuid(guid);
        }

        [HttpGet("get-user-by-email/{email}")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO?>>> GetUserByEmail(string email)
        {
            return await _userService.GetUserByEmail(email);
        }

        [HttpGet("get-user-by-phone-number/{phoneNumber}")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO?>>> GetUserByPhoneNumber(string phoneNumber)
        {
            return await _userService.GetUserByPhoneNumber(phoneNumber);
        }

        [HttpPost("create-admin")]
        public async Task<ActionResult<ServiceResponse<string?>>> CreateAdmin(CreateAdminDTO request)
        {
            return await _userService.CreateAdmin(request);
        }

        [HttpPut("update-user")]
        public async Task<ActionResult<ServiceResponse<string?>>> UpdateUser(UpdateUserDTO request)
        {
            return await _userService.UpdateUser(request);
        }

        [HttpDelete("delete-user/{id}")]
        public async Task<ActionResult<ServiceResponse<string?>>> DeleteUser(int id)
        {
            var getProductGrades = await _productGradeService.GetProductGradesByUserId(id);
            if (getProductGrades.Success)
            {
                foreach (ProductGrade productGrade in getProductGrades.Data)
                {
                    var deletedProductGradeResponse = await _productGradeService.DeleteProductGrade(productGrade.ProductGradeId);
                    if (!deletedProductGradeResponse.Success)
                    {
                        return new ServiceResponse<string?>()
                        {
                            Data = null,
                            Success = false,
                            Message = "SOMETHING_WENT_WRONG_WHILE_DELETING_THE_GRADES_USER_GAVE_TO_PRODUCTS"
                        };
                    }
                }
            }
            return await _userService.DeleteUser(id);
        }
    }
}
