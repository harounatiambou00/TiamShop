namespace api.Models
{
    public class ProductCaracteristic
    {
        public long ProductCaracteristicId { get; set; }
        public string ProductCaracteristicKey { get; set; } = String.Empty;
        public string ProductCaracteristicValue { get; set; } = String.Empty;
        public Guid ProductID { get; set; }
    }
}
