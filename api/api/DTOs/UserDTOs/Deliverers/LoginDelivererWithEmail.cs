using System.ComponentModel.DataAnnotations;

namespace api.DTOs.UserDTOs.Deliverers
{
    public class LoginDelivererWithEmail
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        public string? Password { get; set; }

        public bool RemenberMe { get; set; } = true;
    }
}
