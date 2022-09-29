﻿using System.ComponentModel.DataAnnotations;

namespace api.DTOs.UserDTOs.Admins
{
    public class CreateAdminDTO
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required, EmailAddress]
        public string? Email { get; set; }
        [Required]
        [MaxLength(8), MinLength(8)]
        public string? PhoneNumber { get; set; }
        public string CompleteAddress { get; set; } = string.Empty;

        public DateTime? BirthDate { get; set; }

        [Required]
        [MinLength(8)]
        public string Password;

        //Only for admins
        [Required]
        public string? JobTitle { get; set; }
        [Required]
        public string? JobDescription { get; set; }
    }
}
