using api.DTOs.OrderLineDTOs;

namespace api.DTOs.OrderDTOs
{
    public class CreateOrderForClientDTO
    {
        public string OrdererCompleteAddress { get; set; } = string.Empty;
        public int ClientId { get; set; }
        public int NeighborhoodId { get; set; }

        public List<CreateOrderLineDTO> Lines { get; set; } = new List<CreateOrderLineDTO>();
    }
}
