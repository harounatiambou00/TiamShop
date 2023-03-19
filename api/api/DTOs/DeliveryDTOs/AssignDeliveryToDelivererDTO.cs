using System.ComponentModel.DataAnnotations;

namespace api.DTOs.DeliveryDTOs
{
    public class AssignDeliveryToDelivererDTO
    {
        [Required]
        public string AdminGuid { get; set; }

        [Required]
        public long DeliveryId { get; set; }

        public int DelivererId { get; set; }
    }
}
