namespace api.Models
{
    public class Neighborhood
    {
        public int NeighborhoodId { get; set; }
        public string? NeighborhoodName { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();

        //City
        public City? City { get; set; }
    }
}
