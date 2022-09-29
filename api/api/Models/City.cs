namespace api.Models
{
    public class City
    {
        public readonly int CityId;
        public string? CityName { get; set; }

        public ICollection<Neighborhood> Neighborhood { get; set; } = new List<Neighborhood>();
    }
}
