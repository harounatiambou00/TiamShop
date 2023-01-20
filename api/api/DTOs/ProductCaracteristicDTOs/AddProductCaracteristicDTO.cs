namespace api.DTOs.ProductCaracteristicDTOs
{
    public class AddProductCaracteristicDTO
    {
        public string ProductCaracteristicKey { get; set; } = String.Empty;
        public string ProductCaracteristicValue { get; set; } = String.Empty;
        public Guid ProductID { get; set; }
    }
}
