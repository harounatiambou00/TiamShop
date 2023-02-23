namespace api.DTOs.UserDTOs
{
    public class GetUserDTO
    {
        public int UserId { get; set; }
        public string? UserGuid { get; set; } = null;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string CompleteAddress { get; set; } = string.Empty;

        public DateTime? BirthDate { get; set; }
        public DateTime? VerifiedAt { get; set; } = null;

        //Only for admins
        public string? JobTitle { get; set; } = null;
        public string? JobDescription { get; set; } = null;
        public int NeighborhoodId { get; set; }
    }
}
