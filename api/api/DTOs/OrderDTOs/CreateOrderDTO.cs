namespace api.DTOs.OrderDTOs
{
    public class CreateOrderDTO
    {
        public string OrdererFirstName { get; set; } = string.Empty;
        public string OrdererLastName { get; set; } = string.Empty;
        public string OrdererEmail { get; set; } = string.Empty;
        public string OrdererPhoneNumber { get; set; } = string.Empty;
        public string OrdererCompleteAddress { get; set; } = string.Empty;
        public int? ClientId { get; set; } = null;  
        public int NeighborhoodId { get; set; }
    }
}
