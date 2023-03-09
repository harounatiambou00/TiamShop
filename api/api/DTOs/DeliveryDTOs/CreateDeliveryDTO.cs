namespace api.DTOs.DeliveryDTOs
{
    public class CreateDeliveryDTO
    {
        public string DeliveryStatus { get; set; } = string.Empty;
        public int? AssignedTo { get; set; } = null;
    }
}
