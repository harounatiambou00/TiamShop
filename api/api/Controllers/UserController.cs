using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("get-all-users")]
        public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> GetAllUsers()
        {
            return Ok(_userService.GetAllUsers());
        }

        [HttpGet("get-all-clients")]
        public async Task<ServiceResponse<List<GetUserDTO>>> GetAllClients()
        {
            return await _userService.GetAllClients();
        }

        [HttpGet("get-all-admins")]
        public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> GetAllAdmins()
        {
            return Ok(_userService.GetAllAdmins());
        }

        [HttpGet("get-user-by-id/{id}")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO>>> GetUserById(int id)
        {
            return Ok(_userService.GetUserById(id));
        }

        [HttpGet("get-admin-by-guid/{guid}")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO>>> GetAdminByGuid(string guid)
        {
            return Ok(_userService.GetAdminByGuid(guid));
        }

        [HttpGet("get-user-by-email/{email}")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO>>> GetUserByEmail(string email)
        {
            return Ok(_userService.GetUserByEmail(email));
        }

        [HttpGet("get-user-by-phone-number/{phoneNumber}")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO>>> GetUserByPhoneNumber(string phoneNumber)
        {
            return Ok(_userService.GetUserByPhoneNumber(phoneNumber));
        }

        [HttpPost("create-admin")]
        public async Task<ActionResult<ServiceResponse<string>>> CreateAdmin(CreateAdminDTO request)
        {
            return Ok(_userService.CreateAdmin(request));
        }

        [HttpPut("update-user")]
        public async Task<ActionResult<ServiceResponse<string>>> UpdateUser(UpdateUserDTO request)
        {
            return Ok(_userService.UpdateUser(request));
        }

        [HttpDelete("delete-user/{id}")]
        public async Task<ActionResult<ServiceResponse<string>>> DeleteUser(int id)
        {
            return Ok(_userService.DeleteUser(id));
        }
    }
}
