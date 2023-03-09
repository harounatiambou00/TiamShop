using api.DTOs.UserDTOs.Deliverers;
using api.Models;
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
        private readonly IEmailService _emailService;

        public UserController(IUserService userService, IProductGradeService productGradeService, IEmailService emailService)
        {
            _userService = userService;
            _productGradeService = productGradeService;
            _emailService = emailService;
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

        [HttpGet("get-all-deliverers")]
        public async Task<ServiceResponse<List<GetUserDTO>>> GetAllDeliverers()
        {
            return await _userService.GetAllDeliverers();
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

        [HttpPost("create-deliverer")]
        public async Task<ActionResult<ServiceResponse<string?>>> CreateDeliverer(CreateDelivererDTO request)
        {
            var getAdminResponse = await _userService.GetAdminByGuid(request.AdminGuid);
            if (getAdminResponse.Success && getAdminResponse.Data != null)
            {
                var admin = getAdminResponse.Data;
                var createDelivererResponse = await _userService.CreateDeliverer(request);
                if (createDelivererResponse.Success && createDelivererResponse.Data != null)
                {
                    var emailBody = "L'administrateur,\"#ADMIN_COMPLETE_NAME#\" vient de vous créer un compte livreur. Votre mot de mot de passe est le suivant : <strong>\"#PASSWORD#\"</strong><br /> Vous pouvez l'utiliser pour vous connecter et le modifier plus tard.";
                    emailBody = emailBody.Replace("#ADMIN_COMPLETE_NAME#", System.Text.Encodings.Web.HtmlEncoder.Default.Encode(admin.FirstName + " " + admin.LastName));
                    emailBody = emailBody.Replace("#PASSWORD#", System.Text.Encodings.Web.HtmlEncoder.Default.Encode(createDelivererResponse.Data));
                    var emailResponse = await _emailService.SendEmail(request.Email, "Tiamshop, création d'un compte livreur", emailBody);
                    if(!emailResponse.Success)
                        return new ServiceResponse<string?>
                        {
                            Data = null,
                            Success = false,
                            Message = "DELIVERER_CREATED_SUCCESSFULLY_BUT_SOMETHING_WENT_WRONG_WHILE_SENDING_THE_EMAIL"
                        };
                }
                return createDelivererResponse;

            }
            else
            {
                return new ServiceResponse<string?>
                {
                    Data = null,
                    Success = false,
                    Message = "ADMIN_NOT_FOUND"
                };
            }
          
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
