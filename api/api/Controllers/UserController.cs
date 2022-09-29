using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("get-all-users")]
        public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> GetAllUsers()
        {
            return Ok(new ServiceResponse<List<User>>());
        }

        [HttpGet("get-all-clients")]
        public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> GetAllClients()
        {
            return Ok(new ServiceResponse<List<User>>());
        }

        [HttpGet("get-all-admins")]
        public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> GetAllAdmins()
        {
            return Ok(new ServiceResponse<List<User>>());
        }

        [HttpGet("get-user-by-id/{id}")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO>>> GetUserById(int id)
        {
            return Ok(new ServiceResponse<User>());
        }

        [HttpGet("get-admin-by-guid/{guid}")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO>>> GetAdminByGuid(string guid)
        {
            return Ok(new ServiceResponse<User>());
        }

        [HttpGet("get-user-by-email/{email}")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO>>> GetUserByEmail(string email)
        {
            return Ok(new ServiceResponse<User>());
        }

        [HttpGet("get-user-by-phone-number/{phoneNumber}")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO>>> GetUserByPhoneNumber(string phoneNumber)
        {
            return Ok(new ServiceResponse<User>());
        }

        [HttpPost("create-admin")]
        public async Task<ActionResult<ServiceResponse<string>>> CreateAdmin(CreateAdminDTO request)
        {
            return Ok(new ServiceResponse<List<User>>());
        }

        [HttpPut("update-user")]
        public async Task<ActionResult<ServiceResponse<string>>> UpdateUser(UpdateUserDTO request)
        {
            return Ok(new ServiceResponse<List<User>>());
        }

        [HttpDelete("delete-user/{id}")]
        public async Task<ActionResult<ServiceResponse<string>>> DeleteUser(int id)
        {
            return Ok(new ServiceResponse<List<User>>());
        }
    }
}
