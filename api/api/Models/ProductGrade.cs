namespace api.Models
{
    public class ProductGrade
    {
        public long ProductGradeId { get; set; }
        public Int16 Grade { get; set; }
        public Guid ProductId { get; set; }
        public int UserId { get; set; }
    }
}
