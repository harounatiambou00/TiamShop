using System.ComponentModel.DataAnnotations;

namespace api.DTOs.UserDTOs.Clients
{
    public class SignUpClientDTO
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        [Required, EmailAddress]
        public string? Email { get; set; }
        [Required]
        [MaxLength(8), MinLength(8)]
        public string? PhoneNumber { get; set; }
        public string CompleteAddress { get; set; } = string.Empty;

        public DateTime? BirthDate { get; set; } = null;

        [Required]
        [MinLength(8)]
        public string Password { get; set; }

        [Required]
        public int? NeighborhoodId { get; set; } = null;
    }
}
