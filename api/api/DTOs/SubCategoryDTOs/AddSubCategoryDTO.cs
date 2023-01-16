namespace api.DTOs.SubCategoryDTOs
{
    public class AddSubCategoryDTO
    {
        public string SubCategoryName { get; set; } = string.Empty;
        public string SubCategoryTitle { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public long? SubCategoryImageId { get; set; }
    }
}
