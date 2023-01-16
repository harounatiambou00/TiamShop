namespace api.DTOs.CategoryDTOs
{
    public class AddCategoryDTO
    {
        public string CategoryName { get; set; } = String.Empty;
        public string CategoryTitle { get; set; } = String.Empty;
        public Int64? CategoryImageId { get; set; }
    }
}
