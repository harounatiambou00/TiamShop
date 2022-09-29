﻿namespace api.Models
{
    public class UserType
    {
        public int UserTypeId { get; set; }
        public string? UserTypeName { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
