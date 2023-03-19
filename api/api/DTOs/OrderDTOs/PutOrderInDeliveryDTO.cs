using System.ComponentModel.DataAnnotations;

namespace api.DTOs.OrderDTOs
{
    public class PutOrderInDeliveryDTO
    {
        [Required]
        public string AdminGuid { get; set; }

        [Required]
        public long DeliveryId { get; set; }

        [Required]
        public long OrderId { get; set; }
    }
}
