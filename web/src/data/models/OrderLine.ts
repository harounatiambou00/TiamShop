export default interface OrderLine {
  orderLineId: number;
  quantity: number;
  discountPercentage: number;
  orderId: number;
  productId: string;
}
