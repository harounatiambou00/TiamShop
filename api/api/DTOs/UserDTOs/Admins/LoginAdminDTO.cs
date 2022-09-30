using System.ComponentModel.DataAnnotations;

namespace api.DTOs.UserDTOs.Admins
{
    public class LoginAdminDTO
    {
        [Required]
        public string UserGuid { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }
    }
}
