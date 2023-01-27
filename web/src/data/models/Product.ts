export interface Product {
  productId: string;
  productReference: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  createdAt: Date | null;
  waranty: string;
  color: string;
  productPrincipalImageId: number;
  brandId: number | string;
  subCategoryId: number | string;
  productDiscountId: number;
}

//The obj is Product syntax is a type predicate where obj must be the name of the parameter the function takes.
export function isAProduct(obj: any): obj is Product {
  return (
    "productId" in obj &&
    "productName" in obj &&
    "productReference" in obj &&
    "productDescription" in obj &&
    "productPrice" in obj &&
    "productQuantity" in obj &&
    "createdAt" in obj &&
    "waranty" in obj &&
    "color" in obj &&
    "productPrincipalImage" in obj &&
    "brandId" in obj &&
    "subCategoryId" in obj &&
    "productDiscountId" in obj
  );
}
