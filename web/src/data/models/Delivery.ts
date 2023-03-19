export default interface Delivery {
  deliveryId: number;
  deliveryReference: string;
  deliveryStatus: string;
  deliveredAt: Date | null;
  assignedTo: number | null;
}
