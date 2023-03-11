namespace api.Models
{
    public class Order
    {
        public long OrderId { get; set; }
        public string OrderReference { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; } = DateTime.Now;
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

        public string getReference()
        {
            return OrderReference;
        }

        public DateTime getOrderDate()
        {
            return OrderDate;
        }

        public static string generateReference(string firstName, string lastName, string email)
        {
            string reference = "";
            if(firstName != string.Empty)
            {
                reference += firstName[0];
            }
            if (lastName != string.Empty)
            {
                reference += lastName[0];
            }
            if (reference.Length == 0)
            {
                reference += email.Substring(0, 4);
            }else if (reference.Length == 1)
            {
                reference += email.Substring(0, 3);
            }else if (reference.Length == 2)
            {
                reference += email.Substring(0, 2);
            }

            reference += DateTime.Now.Year.ToString().Substring(2) + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString();
            return reference.Substring(0, 12);
        }

        public Order(long orderId, string ordererFirstName, string ordererLastName, string ordererEmail, string ordererPhoneNumber, string ordererCompleteAddress, int neighborhoodId)
        {
            OrderId = orderId;
            OrderReference = generateReference(ordererFirstName, ordererLastName, ordererEmail);
            OrdererFirstName = ordererFirstName;
            OrdererLastName = ordererLastName;
            OrdererEmail = ordererEmail;
            OrdererPhoneNumber = ordererPhoneNumber;
            OrdererCompleteAddress = ordererCompleteAddress;
            ValidatedAt = null;
            RejectedAt = null;
            DeliveredAt = null;
            ClientId = null;
            AdminWhoValidatedItId = null;
            AdminWhoRejectedItId = null;
            DeliveryId = null;
            NeighborhoodId = neighborhoodId;    
        }

        public Order(long orderId, GetUserDTO client)
        {
            OrderId = orderId;
            OrderReference = generateReference(client.FirstName, client.LastName, client.Email);
            OrdererFirstName = client.FirstName;
            OrdererLastName = client.LastName;
            OrdererEmail = client.Email;
            OrdererPhoneNumber = client.PhoneNumber;
            OrdererCompleteAddress = client.CompleteAddress;
            ValidatedAt = null;
            RejectedAt = null;
            DeliveredAt = null;
            ClientId = null;
            AdminWhoValidatedItId = null;
            AdminWhoRejectedItId = null;
            DeliveryId = null;
            NeighborhoodId = client.NeighborhoodId;
        }

        public Order()
        {

        }
    }
}
