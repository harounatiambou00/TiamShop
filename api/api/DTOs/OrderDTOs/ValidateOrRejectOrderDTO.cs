using System.ComponentModel.DataAnnotations;

namespace api.DTOs.OrderDTOs
{
    public class ValidateOrRejectOrderDTO
    {
        [Required]
        public string AdminGuid { get; set; }

        [Required]
        public long OrderId { get; set; }
    }
}
