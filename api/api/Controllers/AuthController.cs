using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }
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
            //We will try to log the user
            var login = await _userService.LoginAdmin(request);

            //if the user is logged succesfully, we create a cookie that contains the token of the login
            if (login.Success)
            {
                Response.Cookies.Append("adminLoginJWT", login.Data, new CookieOptions
                {
                    HttpOnly = true, //This means that the frontend can only get it but cannot access/modify it. 
                    Expires = DateTimeOffset.Now.AddHours(2),
                });
            }

            /*
             * Finally we will return a service response to inform if the login was successful or not(if not why)
             * We return a Service Response with a null data because we don't want the frontend to access the token.
            */
            return new ServiceResponse<string?>
            {
                Data = null,
                Success = login.Success,
                Message = login.Message,
            };
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
