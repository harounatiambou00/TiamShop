import { CustomImage } from "./Image";
import ProductCaracteristic from "./ProductCaracteristic";

export default interface ProductAndRelatedInfo {
  productId: string;
  productReference: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  createdAt: Date | null | string;
  waranty: string;
  color: string;
  productPrincipalImageId: number;
  brandId: number | string;
  subCategoryId: number | string;
  productDiscountId: number;
  images: CustomImage[];
  caracteristics: ProductCaracteristic[];
  productDiscountPercentage: number;
  productDiscountEndDate: Date | null | string;
  rating: number;
  numberOfVotes: number;
}
