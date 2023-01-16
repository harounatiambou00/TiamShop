namespace api.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = String.Empty;
        public string CategoryTitle { get; set; } = String.Empty;
        public Int64 CategoryImageId { get; set; }
        public int CategoryRanking { get; set; }
    }
}
