import React from "react";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import { Brand } from "../../data/models/Brand";
import { SubCategory } from "../../data/models/SubCategory";
import {
  Alert,
  AlertTitle,
  CircularProgress,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import DisplayProduct from "./DisplayProduct";
import { Product } from "../../data/models/Product";

type Props = {
  title: string;
  subTitle?: string;
  type: "best_sellers" | "on_discount_products" | "recommendations";
};

const BestSellersAndDiscountAndRecommendationsPagesSkeleton = ({
  title,
  subTitle,
  type,
}: Props) => {
  const allBrands = useAppSelector(
    (state: RootState) => state.allBrands.brands
  ) as Brand[];
  const allSubCategories = useAppSelector(
    (state: RootState) => state.subCategories.subCategories
  ) as SubCategory[];

  const [productsToBeDisplayed, setProductsToBeDisplayed] = React.useState<
    Product[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    if (type === "on_discount_products") {
      const getProductsToBeDisplayed = async () => {
        setIsLoading(true);
        let url =
          process.env.REACT_APP_API_URL + "products/get-products-on-discount";
        let response = await fetch(url);
        let content = await response.json();
        if (content.success) {
          setProductsToBeDisplayed([]);
          for (let i of content.data) {
            setProductsToBeDisplayed((current) => [
              ...current,
              {
                productId: i.productId,
                productReference: i.productReference,
                productName: i.productName,
                productDescription: i.productDescription,
                productPrice: i.productPrice,
                productQuantity: i.productQuantity,
                createdAt:
                  i.createdAt !== null && typeof i.createdAt === "string"
                    ? new Date(
                        parseInt(i.createdAt.slice(0, 4)),
                        parseInt(i.createdAt.slice(5, 7)) - 1,
                        parseInt(i.createdAt.slice(8, 10))
                      )
                    : null,
                waranty: i.waranty,
                color: i.color,
                productPrincipalImageId: i.productPrincipalImageId,
                brandId: i.brandId,
                subCategoryId: i.subCategoryId,
                productDiscountId: i.productDiscountId,
              },
            ]);
          }
        }
        setIsLoading(false);
      };
      getProductsToBeDisplayed();
    } else if (type === "best_sellers") {
      const getProductsToBeDisplayed = async () => {
        setIsLoading(true);
        let url =
          process.env.REACT_APP_API_URL + "products/get-best-sellers-products";
        let response = await fetch(url);
        let content = await response.json();
        if (content.success) {
          setProductsToBeDisplayed([]);
          for (let i of content.data) {
            setProductsToBeDisplayed((current) => [
              ...current,
              {
                productId: i.productId,
                productReference: i.productReference,
                productName: i.productName,
                productDescription: i.productDescription,
                productPrice: i.productPrice,
                productQuantity: i.productQuantity,
                createdAt:
                  i.createdAt !== null && typeof i.createdAt === "string"
                    ? new Date(
                        parseInt(i.createdAt.slice(0, 4)),
                        parseInt(i.createdAt.slice(5, 7)) - 1,
                        parseInt(i.createdAt.slice(8, 10))
                      )
                    : null,
                waranty: i.waranty,
                color: i.color,
                productPrincipalImageId: i.productPrincipalImageId,
                brandId: i.brandId,
                subCategoryId: i.subCategoryId,
                productDiscountId: i.productDiscountId,
              },
            ]);
          }
        }
        setIsLoading(false);
      };
      getProductsToBeDisplayed();
      setProductsToBeDisplayed([]);
    } else {
      /**
       * TODO: Sort the products by recommendation percentage
       */
      setProductsToBeDisplayed([]);
    }
  }, []);
  const [sortByValue, setSortByValue] = React.useState<string>("ASC_PRICES");
  const [brandId, setBrandId] = React.useState<number>(0);
  const [subCategoryId, setSubCategoryId] = React.useState<number>(0);

  return (
    <div className="p-5">
      <div className="mt-5 flex items-center justify-between">
        <div>
          <h1 className="font-raleway sm:text-4xl lg:text-2xl uppercase font-medium">
            {title}
            <span className="font-amita font-normal text-gray-500">
              ({productsToBeDisplayed.length})
            </span>
          </h1>
          <h4 className="font-kanit sm:text-2xl lg:text-lg text-gray-700">
            {subTitle}
          </h4>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:w-48 lg:w-40">
            <span className="font-kanit font-normal sm:text-lg lg:text-sm">
              Trier par :{" "}
            </span>
            <Select
              size="small"
              className="font-kanit font-normal sm:text-lg lg:text-sm text-gray-500"
              MenuProps={{ disableScrollLock: true }}
              value={sortByValue}
              onChange={(e) => {
                if (
                  e.target.value !== "ASC_PRICES" &&
                  e.target.value !== "DESC_PRICES" &&
                  e.target.value !== "BEST_SELLERS" &&
                  e.target.value !== "RATINGS"
                ) {
                  setSortByValue("ASC_PRICES");
                } else {
                  setSortByValue(e.target.value);
                }
              }}
            >
              <MenuItem
                className="font-kanit font-light sm:text-lg lg:text-sm"
                value="ASC_PRICES"
              >
                Prix croissants
              </MenuItem>
              <MenuItem
                className="font-kanit font-light sm:text-lg lg:text-sm"
                value="DESC_PRICES"
              >
                Prix décroissants
              </MenuItem>
              <MenuItem
                className="font-kanit font-light sm:text-lg lg:text-sm"
                value="BEST_SELLERS"
              >
                Les meilleures ventes
              </MenuItem>
              <MenuItem
                className="font-kanit font-light sm:text-lg lg:text-sm"
                value="RATINGS"
              >
                Notes des clients
              </MenuItem>
            </Select>
          </div>
          <div className="flex flex-col sm:w-48 lg:w-40 ml-5">
            <span className="font-kanit font-normal sm:text-lg lg:text-sm">
              Catégorie :{" "}
            </span>
            <Select
              size="small"
              className="font-kanit font-normal sm:text-lg lg:text-sm text-gray-500"
              MenuProps={{ disableScrollLock: true }}
              value={subCategoryId.toString()}
              onChange={(e) => {
                if (
                  Number(e.target.value) === 0 ||
                  isNaN(Number(e.target.value))
                ) {
                  setSubCategoryId(0);
                } else {
                  setSubCategoryId(Number(e.target.value));
                }
              }}
            >
              <MenuItem
                className="font-kanit font-light sm:text-lg lg:text-sm"
                value={0}
              >
                Toutes les catégories
              </MenuItem>
              {allSubCategories.map((s) => (
                <MenuItem
                  key={s.SubCategoryId}
                  className="font-kanit font-light sm:text-lg lg:text-sm"
                  value={s.SubCategoryId}
                >
                  {s.SubCategoryTitle}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col sm:w-48 lg:w-40 ml-5">
            <span className="font-kanit font-normal sm:text-lg lg:text-sm">
              Marque :{" "}
            </span>
            <Select
              size="small"
              className="font-kanit font-normal sm:text-lg lg:text-sm text-gray-500"
              MenuProps={{ disableScrollLock: true }}
              value={brandId.toString()}
              onChange={(e) => {
                if (
                  Number(e.target.value) === 0 ||
                  isNaN(Number(e.target.value))
                ) {
                  setBrandId(0);
                } else {
                  setBrandId(Number(e.target.value));
                }
              }}
            >
              <MenuItem
                className="font-kanit font-light sm:text-lg lg:text-sm"
                value={0}
              >
                Toutes les marques
              </MenuItem>
              {allBrands.map((brand) => (
                <MenuItem
                  key={brand.brandId}
                  className="font-kanit font-light sm:text-lg lg:text-sm"
                  value={brand.brandId}
                >
                  {brand.BrandName}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full h-96 py-16 flex items-center justify-center">
          <CircularProgress size="large" />
        </div>
      ) : (
        <div className="w-full mt-5">
          {productsToBeDisplayed.length !== 0 ? (
            productsToBeDisplayed.map((p) => (
              <DisplayProduct product={p} key={p.productId} />
            ))
          ) : (
            <div className="w-full h-20 flex justify-center items-center">
              <Alert severity="error" className="h-full font-kanit">
                <AlertTitle className="font-kanit">Erreur</AlertTitle>
                Aucun produit qui respecte votre filtre n'a été trouvé.
              </Alert>
            </div>
          )}
        </div>
      )}
      <div className="mt-7 flex items-center justify-center w-full">
        {productsToBeDisplayed.length !== 0 && (
          <Pagination
            count={6}
            variant="outlined"
            shape="rounded"
            size="large"
            showFirstButton
            showLastButton
          />
        )}
      </div>
    </div>
  );
};

export default BestSellersAndDiscountAndRecommendationsPagesSkeleton;
