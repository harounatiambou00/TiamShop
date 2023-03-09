namespace api.DTOs.DeliveryDTOs
{
    public class UpdateDeliveryDTO
    {
        public long DeliveryId { get; set; }
        public string DeliveryStatus { get; set; } = string.Empty;
        public int? AssignedTo { get; set; } = null;
        public DateTime? DeliveredAt { get; set; } = null;
    }
}
