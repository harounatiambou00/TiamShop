using System.ComponentModel.DataAnnotations;

namespace api.DTOs.UserDTOs.Deliverers
{
    public class CreateDelivererDTO
    {
        [Required]
        public string AdminGuid { get; set; }
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required, EmailAddress]
        public string Email { get; set; } = String.Empty;
        [Required]
        [MaxLength(8), MinLength(8)]
        public string PhoneNumber { get; set; } = String.Empty;
        public string CompleteAddress { get; set; } = string.Empty;

        public DateTime? BirthDate { get; set; }

        [Required]
        public int NeighborhoodId { get; set; }
    }
}
