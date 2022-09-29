namespace api.DTOs.UserDTOs
{
    public class GetUserDTO
    {
        public int UserId { get; }
        public string? UserGuid { get; set; } = null;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string CompleteAddress { get; set; } = string.Empty;

        public DateTime? BirthDate { get; set; }

        //Only for admins
        public string? JobTitle { get; set; } = null;
        public string? JobDescription { get; set; } = null;
    }
}
