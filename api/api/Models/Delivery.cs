namespace api.Models
{
    public class Delivery
    {
        public long DeliveryId { get; set; }
        public string DeliveryReference { get; set; } = string.Empty;
        public string DeliveryStatus { get; set; } = string.Empty;
        public DateTime? DeliveredAt { get; set; } = null;
        public int? AssignedTo { get; set; } = null;

        public string getDeliveryStatus()
        {
            return this.DeliveryStatus;
        }

        public void setDeliveryStatus(DeliveryStatusEnum status)
        {
            if (status == DeliveryStatusEnum.TODO) DeliveryStatus = "TODO";
            else if (status == DeliveryStatusEnum.IN_PROGRESS) DeliveryStatus = "IN_PROGRESS";
            else if (status == DeliveryStatusEnum.DONE) DeliveryStatus = "DONE";
        }

        public Delivery(long deliveryId, string deliveryReference, DeliveryStatusEnum status, int? assignedTo)
        {
            DeliveryId = deliveryId;
            DeliveryReference = deliveryReference;
            setDeliveryStatus(status);
            DeliveredAt = null;
            AssignedTo = assignedTo;
        }
        public Delivery()
        {

        }
    }
}
