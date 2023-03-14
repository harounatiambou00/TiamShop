export default interface Order {
  orderId: number;
  orderReference: string;
  orderDate: Date;
  ordererFirstName: string;
  ordererLastName: string;
  ordererEmail: string;
  ordererPhoneNumber: string;
  ordererCompleteAddress: string;
  validatedAt: Date | null;
  rejectedAt: Date | null;
  deliveredAt: Date | null;
  clientId: number | null;
  adminWhoValidatedItId: number | null;
  adminWhoRejectedItId: number | null;
  deliveryId: number | null;
  neighborhoodId: number;
}
