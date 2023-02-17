using System.ComponentModel.DataAnnotations;

namespace api.DTOs.ProductGradeDTOs
{
    public class GetProductGradeByProductIdAndUserIdDTO
    {
        [Required]
        public Guid ProductId { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}
