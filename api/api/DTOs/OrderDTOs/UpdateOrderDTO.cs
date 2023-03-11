namespace api.DTOs.OrderDTOs
{
    public class UpdateOrderDTO
    {
        public long OrderId { get; set; }
        public string OrdererFirstName { get; set; } = string.Empty;
        public string OrdererLastName { get; set; } = string.Empty;
        public string OrdererEmail { get; set; } = string.Empty;
        public string OrdererPhoneNumber { get; set; } = string.Empty;
        public string OrdererCompleteAddress { get; set; } = string.Empty;
        public DateTime? ValidatedAt { get; set; } = null;
        public DateTime? RejectedAt { get; set; } = null;
        public DateTime? DeliveredAt { get; set; } = null;

        public int? ClientId { get; set; } = null;
        public int? AdminWhoValidatedItId { get; set; } = null;
        public int? AdminWhoRejectedItId { get; set; } = null;
        public long? DeliveryId { get; set; } = null;
        public int NeighborhoodId { get; set; }
    }
}
