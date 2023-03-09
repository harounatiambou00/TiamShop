using System.ComponentModel.DataAnnotations;

namespace api.DTOs.UserDTOs.Deliverers
{
    public class LoginDelivererWihPhoneNumber
    {
        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        [MinLength(8)]
        public string? Password { get; set; }

        public bool RemenberMe { get; set; } = true;
    }
}
