using System.ComponentModel.DataAnnotations;

namespace api.DTOs.UserDTOs
{
    public class UpdateUserDTO
    {
        [Required]
        public int UserId { get; set; }
        public string? UserGuid { get; set; } = null;
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        public string CompleteAddress { get; set; } = string.Empty;

        public DateTime? BirthDate { get; set; }

    }
}
