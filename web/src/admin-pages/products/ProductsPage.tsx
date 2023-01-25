import React from "react";
import { Page } from "../../components/admin-layout";
import { Product, isAProduct } from "../../data/models/Product";
import { CircularProgress } from "@mui/material";
import { BsFilter, BsSearch } from "react-icons/bs";
import SearchProducts from "./search-products/SearchProducts";
import SortButton from "./sort-button/SortButton";
import FilterSelects from "./filter-selects/FilterSelects";
import ProductsTable from "./products-table/ProductsTable";
import AddProductDialog from "./add-product-dialog/AddProductDialog";

const ProductsPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [products, setProducts] = React.useState<any[]>([]);
  const getProducts = async () => {
    let url = process.env.REACT_APP_API_URL + "products/get-all-products";
    let response = await fetch(url);
    let content = await response.json();
    if (content.success) {
      let data = content.data;
      if (data) {
        for (let i of data) {
          setProducts((currentProducts) => [
            ...currentProducts,
            {
              ...{},
              productId: i.productId,
              productReference: i.productReference,
              productName: i.productName,
              productDescription: i.productDescription,
              productPrice: i.productPrice,
              productQuantity: i.productQuantity,
              createdAt: i.createdAt,
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
    } else {
    }
  };
  const [subCategories, setSubCategories] = React.useState<any[]>([]);
  const getSubCategories = async () => {
    const url = process.env.REACT_APP_API_URL + "sub-categories";
    let response = await fetch(url);
    let content = await response.json();
    let data = content.data;

    for (let i of data) {
      setSubCategories((currentSubCategories) => [
        ...currentSubCategories,
        {
          ...{},
          SubCategoryId: i.subCategoryId,
          SubCategoryName: i.subCategoryName,
          SubCategoryTitle: i.subCategoryTitle,
          SubCategoryImageId: i.subCategoryImageId,
          SubCategoryRanking: i.subCategoryRanking,
          CategoryId: i.categoryId,
        },
      ]);
    }
    subCategories.sort((a, b) =>
      a.SubCategoryTitle > b.SubCategoryTitle ? 1 : -1
    );
  };
  const [brands, setBrands] = React.useState<any[]>([]);
  const getBrands = async () => {
    const url = process.env.REACT_APP_API_URL + "brands";
    let response = await fetch(url);
    let content = await response.json();
    let data = content.data;

    for (let i of data) {
      setBrands((currentBrands) => [
        ...currentBrands,
        {
          ...{},
          brandId: i.brandId,
          BrandName: i.brandName,
          PartnershipDate:
            i.partnershipDate != null
              ? new Date(
                  parseInt(i.partnershipDate.slice(0, 4)),
                  parseInt(i.partnershipDate.slice(5, 7)) - 1,
                  parseInt(i.partnershipDate.slice(8, 10))
                )
              : null,
          BrandWebsiteLink: i.brandWebsiteLink,
          BrandImageId: i.brandImageId,
        },
      ]);
    }
  };
  React.useEffect(() => {
    setIsLoading(true);
    getProducts();
    getSubCategories();
    getBrands();
    setIsLoading(false);
  }, []);

  const [openAddProductDialog, setOpenAddProductDialog] =
    React.useState<boolean>(false);
  return !isLoading ? (
    <Page
      title="Les produits"
      buttonTitle="Ajouter"
      subtitle=""
      buttonAction={() => setOpenAddProductDialog(true)}
    >
      <SearchProducts products={products} setProducts={setProducts} />
      <div className="flex items-center mt-5 justify-center">
        <FilterSelects products={products} setProducts={setProducts} />
        <SortButton products={products} setProducts={setProducts} />
      </div>
      <ProductsTable products={products} />
      <AddProductDialog
        open={openAddProductDialog}
        setOpen={setOpenAddProductDialog}
        subCategories={subCategories}
        brands={brands}
      />
    </Page>
  ) : (
    <div>
      <CircularProgress />
    </div>
  );
};

export default ProductsPage;
