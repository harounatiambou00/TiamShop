using System.Security.Cryptography;

namespace api.Models
{
    public class User
    {
        public readonly int UserId;
        public string? UserGuid { get; set; } = null;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string CompleteAddress { get; set; } = string.Empty;

        public DateTime? BirthDate { get; set; }
        public DateTime CreatedAt { get; set; }

        public string? VerificationToken { get; set; }
        public DateTime? VerifiedAt { get; set; }

        private string HashedPassword;
        private string PasswordSalt;
        private string? ResetPasswordToken { get; set; } = null;
        private DateTime? ResetPasswordExpiresAt { get; set; } = null;

        //Only for admins
        public string? JobTitle { get; set; } = null;
        public string? JobDescription { get; set; } = null;

        //UserType
        public UserType UserType { get; set; }

        //Neighborhood
        public Neighborhood Neighborhood { get; set; }



        /**
            This construtor is used to create clients
         */
        public User(string email, string phoneNumber, string password, string firstName = "", string lastName = "", string completeAddress = "", DateTime? birthDate = null)
        {
            this.UserGuid = null;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Email = email;
            this.PhoneNumber = phoneNumber;
            this.CompleteAddress = completeAddress;
            this.BirthDate = birthDate;
            this.CreatedAt = DateTime.Now;
            this.VerificationToken = Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
            this.VerifiedAt = null;
            this.PasswordSalt = BCrypt.Net.BCrypt.GenerateSalt();
            this.HashedPassword = BCrypt.Net.BCrypt.HashPassword(password, this.PasswordSalt);
            this.ResetPasswordToken = null;
            this.ResetPasswordExpiresAt = null;
            this.JobTitle = null;
            this.JobDescription = null;
        }

        /**
            This construtor is used to create admins
         */
        public User(string userGuid, string email, string phoneNumber, string password, string firstName = "", string lastName = "", string completeAddress = "", DateTime? birthDate = null, string jobTitle = "", string jobDescription = "")
        {
            this.UserGuid = userGuid;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Email = email;
            this.PhoneNumber = phoneNumber;
            this.CompleteAddress = completeAddress;
            this.BirthDate = birthDate;
            this.CreatedAt = DateTime.Now;
            this.VerificationToken = Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
            this.VerifiedAt = DateTime.Now;
            this.PasswordSalt = BCrypt.Net.BCrypt.GenerateSalt();
            this.HashedPassword = BCrypt.Net.BCrypt.HashPassword(password, this.PasswordSalt);
            this.ResetPasswordToken = null;
            this.ResetPasswordExpiresAt = null;
            this.JobTitle = jobTitle;
            this.JobDescription = jobDescription;
        }

        public int GetUserId() => this.UserId;
        public string? GetUserGuid() => this.UserGuid;

        public void Verify()
        {
            this.VerificationToken = null;
            this.VerifiedAt = DateTime.Now;
        }

        public void SetHashedPassword(string newPassword)
        {
            this.PasswordSalt = BCrypt.Net.BCrypt.GenerateSalt();
            this.HashedPassword = BCrypt.Net.BCrypt.HashPassword(newPassword, this.PasswordSalt);
        }

        public string? GetResetPassordToken() => this.ResetPasswordToken;
        public void GenerateResetPasswordToken()
        {
            this.ResetPasswordToken = Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
            this.ResetPasswordExpiresAt = DateTime.Now.AddDays(1);
        }
        public bool ResetPasswordTokenIsValid() => this.ResetPasswordExpiresAt < DateTime.Now.AddDays(1);
    }
}
