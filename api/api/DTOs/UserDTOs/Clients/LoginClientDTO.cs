using System.ComponentModel.DataAnnotations;

namespace api.DTOs.UserDTOs.Clients
{
    public class LoginClientDTO
    {
        [Required, EmailAddress]
        public string? Email { get; set; }

        [Required]
        [MinLength(8)]
        public string? Password;

        
    }
}
