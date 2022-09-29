using System.ComponentModel.DataAnnotations;

namespace api.DTOs.UserDTOs.Admins
{
    public class LoginAdminDTO
    {
        [Required]
        public string? UserGuid { get; set; }

        [Required, EmailAddress]
        public string? Email { get; set; }

        [Required]
        [MaxLength(8), MinLength(8)]
        public string? PhoneNumber { get; set; }

        [Required]
        [MinLength(8)]
        public string? Password;
    }
}
