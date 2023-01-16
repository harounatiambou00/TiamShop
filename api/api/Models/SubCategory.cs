namespace api.Models
{
    public class SubCategory
    {
        public int SubCategoryId { get; set; }
        public string SubCategoryName { get; set; } = String.Empty;
        public string SubCategoryTitle { get; set; } = String.Empty;
        public int CategoryId { get; set; }
        public long? SubCategoryImageId { get; set; }
        public int SubCategoryRanking { get; set; }
    }
}
