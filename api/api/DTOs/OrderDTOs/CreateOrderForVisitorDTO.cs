using api.DTOs.OrderLineDTOs;

namespace api.DTOs.OrderDTOs
{
    public class CreateOrderForVisitorDTO
    {
        public string OrdererFirstName { get; set; } = string.Empty;
        public string OrdererLastName { get; set; } = string.Empty;
        public string OrdererEmail { get; set; } = string.Empty;
        public string OrdererPhoneNumber { get; set; } = string.Empty;
        public string OrdererCompleteAddress { get; set; } = string.Empty;
        public int NeighborhoodId { get; set; }

        public List<CreateOrderLineDTO> Lines { get; set; } = new List<CreateOrderLineDTO>();
    }
}
