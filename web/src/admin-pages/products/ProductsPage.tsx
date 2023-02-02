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
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import UpdateProductDialog from "./update-product-dialog/UpdateProductDialog";

const ProductsPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  let products = useAppSelector(
    (state: RootState) => state.allProducts.allProducts
  );
  let brands = useAppSelector((state: RootState) => state.allBrands.brands);
  let subCategories = useAppSelector(
    (state: RootState) => state.subCategories.subCategories
  );
  const [displayedProducts, setDisplayedProducts] = React.useState<Product[]>(
    []
  );

  React.useEffect(() => {
    setIsLoading(true);
    setDisplayedProducts(products);
    setIsLoading(false);
  }, [products]);

  const [openAddProductDialog, setOpenAddProductDialog] =
    React.useState<boolean>(false);
  return !isLoading && products.length !== 0 ? (
    <Page
      title="Les produits"
      buttonTitle="Ajouter"
      subtitle=""
      buttonAction={() => setOpenAddProductDialog(true)}
    >
      <SearchProducts
        displayedProducts={displayedProducts}
        setDisplayedProducts={setDisplayedProducts}
      />
      <div className="flex items-center mt-5 justify-center">
        <FilterSelects
          products={products}
          displayedProducts={displayedProducts}
          setDisplayedProducts={setDisplayedProducts}
        />
        <SortButton displayedProducts={displayedProducts} />
      </div>
      <ProductsTable displayedProducts={displayedProducts} />
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
