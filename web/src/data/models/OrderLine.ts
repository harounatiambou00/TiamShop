export default interface Order {
  orderLineId: number;
  quantity: number;
  discountPercentage: number;
  orderId: number;
  productId: string;
}
