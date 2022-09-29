using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //Clients
        [HttpPost("sign-up")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO?>>> SignUpClient(SignUpClientDTO request)
        {
            return Ok(new ServiceResponse<GetUserDTO>());
        }

        [HttpPost("sign-in")]
        public async Task<ActionResult<ServiceResponse<string?>>> LoginClient(LoginClientDTO request)
        {
            return Ok(new ServiceResponse<string>());
        }

        [HttpGet("get-logged-client")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO?>>> GetLoggedClient()
        {
            return Ok(new ServiceResponse<GetUserDTO>());
        }

        //Admins
        [HttpPost("admins/sign-in")]
        public async Task<ActionResult<ServiceResponse<string?>>> LoginAdmin(LoginAdminDTO request)
        {
            return Ok(new ServiceResponse<string>());
        }

        [HttpGet("admins/get-logged-admin")]
        public async Task<ActionResult<ServiceResponse<GetUserDTO?>>> GetLoggedAdmin()
        {
            return Ok(new ServiceResponse<GetUserDTO>());
        }



        //Admins & Clients
        [HttpPost("verify-email")]
        public async Task<ActionResult<ServiceResponse<string?>>> VerifyEmail(string token)
        {
            return Ok(new ServiceResponse<string>());
        }

        [HttpPost("forgot-password")]
        public async Task<ActionResult<ServiceResponse<string?>>> ForgotPassword(string email)
        {
            return Ok(new ServiceResponse<string>());
        }

        [HttpPost("reset-password")]
        public async Task<ActionResult<ServiceResponse<string?>>> ResetPassword(ResetPasswordDTO request)
        {
            return Ok(new ServiceResponse<string>());
        }

        [HttpPost("send-verification-email")]
        public async Task<ActionResult<ServiceResponse<string?>>> SendVerificationEmail(SendVerificationEmailDTO request)
        {
            return Ok(new ServiceResponse<string>());
        }

    }
}
