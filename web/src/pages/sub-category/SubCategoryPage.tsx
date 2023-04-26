import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import { SubCategory } from "../../data/models/SubCategory";
import {
  Alert,
  AlertTitle,
  CircularProgress,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import SubCategoryPageBreadcumb from "./sub-category-page-breadcumb/SubCategoryPageBreadcumb";
import { Product } from "../../data/models/Product";
import { Brand } from "../../data/models/Brand";
import DisplayProduct from "./display-product/DisplayProduct";

const SubCategoryPage = () => {
  const navigate = useNavigate();
  const { subCategoryName } = useParams();
  const allSubCategories = useAppSelector(
    (state: RootState) => state.subCategories.subCategories
  ) as SubCategory[];

  const allBrands = useAppSelector(
    (state: RootState) => state.allBrands.brands
  ) as Brand[];

  const [allProducts, setAllProducts] = React.useState<Product[]>([]);

  const [subCategory, setSubCategory] = React.useState<SubCategory | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const getProducts = async () => {
      if (subCategory !== undefined) {
        setIsLoading(true);
        let url =
          process.env.REACT_APP_API_URL +
          "products/get-products-of-subcategory?subCategoryId=" +
          subCategory.SubCategoryId;
        let response = await fetch(url);
        let content = await response.json();
        if (content.success) {
          setAllProducts([]);
          for (let i of content.data) {
            setAllProducts((current) => [
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
      }
    };
    getProducts();
  }, [subCategory]);
  React.useEffect(() => {
    setProductsToBeDisplayed(allProducts);
  }, [allProducts]);

  const [sortByValue, setSortByValue] = React.useState<string>("ASC_PRICES");
  const [brandId, setBrandId] = React.useState<number>(0);
  const [productsToBeDisplayed, setProductsToBeDisplayed] = React.useState<
    Product[]
  >([]);
  React.useEffect(() => {
    if (subCategoryName !== undefined && subCategoryName != null) {
      const correspondingSubCategory = allSubCategories.find(
        (s) => s.SubCategoryName === subCategoryName
      );
      if (correspondingSubCategory !== undefined) {
        setSubCategory(correspondingSubCategory);
      }
      correspondingSubCategory === undefined && navigate("/");
    }
  }, [subCategoryName, allSubCategories]);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleChangeSortByValue = (value: string) => {
    if (value === "DESC_PRICES") {
      setProductsToBeDisplayed(
        productsToBeDisplayed.sort(function (p1, p2) {
          if (p1.productPrice > p2.productPrice) return -1;
          else if (p1.productPrice < p2.productPrice) return 1;
          else return 0;
        })
      );
    } else if (value === "BEST_SELLERS") {
    } else if (value === "RATINGS") {
    } else {
      setProductsToBeDisplayed(
        productsToBeDisplayed.sort((p1, p2) => {
          if (p1.productPrice < p2.productPrice) return -1;
          else if (p1.productPrice > p2.productPrice) return 1;
          else return 0;
        })
      );
    }
  };

  const handleChangeBrand = (e: SelectChangeEvent) => {
    if (
      allBrands.find((b) => b.brandId === Number(e.target.value)) !== undefined
    ) {
      setBrandId(Number(e.target.value));
      setProductsToBeDisplayed(
        allProducts.filter(
          (p) =>
            p.brandId === Number(e.target.value) &&
            p.subCategoryId === subCategory?.SubCategoryId
        )
      );
    } else {
      setBrandId(0);
      setProductsToBeDisplayed(
        allProducts.filter(
          (p) => p.subCategoryId === subCategory?.SubCategoryId
        )
      );
    }
  };

  const [numberOfPages, setNumberOfPages] = React.useState<number>(1);
  React.useEffect(() => {
    setNumberOfPages(
      productsToBeDisplayed.length / 10 < 0
        ? 1
        : productsToBeDisplayed.length % 10 === 0
        ? Math.floor(productsToBeDisplayed.length / 10)
        : Math.floor(productsToBeDisplayed.length / 10) + 1
    );
  }, [productsToBeDisplayed]);
  return subCategory === undefined ? (
    <div className="w-full h-screen flex items-center justify-center">
      <CircularProgress />
    </div>
  ) : (
    <div className="w-full p-5">
      <SubCategoryPageBreadcumb subCategory={subCategory} />
      <div className="mt-5 flex items-center justify-between">
        <h1 className="font-raleway sm:text-4xl lg:text-2xl uppercase font-medium">
          {subCategory.SubCategoryTitle}{" "}
          <span className="font-amita font-normal text-gray-500">
            ({productsToBeDisplayed.length})
          </span>
        </h1>
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
                  handleChangeSortByValue("ASC_PRICES");
                } else {
                  setSortByValue(e.target.value);
                  handleChangeSortByValue(e.target.value);
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
              Marque :{" "}
            </span>
            <Select
              size="small"
              className="font-kanit font-normal sm:text-lg lg:text-sm text-gray-500"
              MenuProps={{ disableScrollLock: true }}
              value={brandId.toString()}
              onChange={handleChangeBrand}
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
      <div className="mt-7 w-full flex items-center justify-between">
        <span className="text-gray-500 pl-2 font-normal sm:text-xl lg:text-sm text-center">
          {productsToBeDisplayed.length} resultats <br /> Vous avez vu{" "}
          {currentPage === numberOfPages
            ? productsToBeDisplayed.length
            : currentPage * 10}{" "}
          articles sur {productsToBeDisplayed.length}
        </span>

        <Pagination
          page={currentPage}
          onChange={handleChangePage}
          count={numberOfPages}
          shape="rounded"
          color="secondary"
          variant="outlined"
          showFirstButton
          showLastButton
        />
      </div>
      {isLoading ? (
        <div className="w-full h-96 flex items-center justify-center mt-5">
          <CircularProgress size="large" />
        </div>
      ) : (
        <div className="w-full mt-5">
          {productsToBeDisplayed.length !== 0 ? (
            productsToBeDisplayed
              .slice(currentPage * 10 - 10, currentPage * 10)
              .map((p) => (
                <DisplayProduct
                  key={p.productId}
                  product={p}
                  subCategory={subCategory}
                />
              ))
          ) : (
            <div className="w-full h-20 flex justify-center items-center">
              <Alert severity="error" className="h-full font-kanit">
                <AlertTitle className="font-kanit">Erreur</AlertTitle>
                Aucun produit de la catégorie "{subCategory.SubCategoryTitle}"
                qui respecte votre filtre n'a été trouvé.
              </Alert>
            </div>
          )}
        </div>
      )}

      <div className="mt-14 w-full flex flex-col items-center justify-center">
        <span className="text-gray-500 pl-2 font-normal sm:text-xl lg:text-sm text-center">
          {productsToBeDisplayed.length} resultats <br /> Vous avez vu{" "}
          {currentPage === numberOfPages
            ? productsToBeDisplayed.length
            : currentPage * 10}{" "}
          articles sur {productsToBeDisplayed.length}
        </span>

        <Pagination
          page={currentPage}
          onChange={handleChangePage}
          count={numberOfPages}
          shape="rounded"
          color="secondary"
          variant="outlined"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default SubCategoryPage;
