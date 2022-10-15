using System.ComponentModel.DataAnnotations;

namespace api.DTOs.UserDTOs
{
    public class UpdateUserDTO
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;
        public string CompleteAddress { get; set; } = string.Empty;

        public DateTime BirthDate { get; set; }
        public int NeighborhoodId { get; set; }
    }
}
