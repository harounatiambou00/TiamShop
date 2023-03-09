import React from "react";
import { Page } from "../../components/admin-layout";
import { Product } from "../../data/models/Product";
import { CircularProgress, Pagination } from "@mui/material";
import SearchProducts from "./search-products/SearchProducts";
import SortButton from "./sort-button/SortButton";
import FilterSelects from "./filter-selects/FilterSelects";
import ProductsTable from "./products-table/ProductsTable";
import AddProductDialog from "./add-product-dialog/AddProductDialog";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import ProductAndRelatedInfo from "../../data/models/ProductAndRelatedInfo";

const ProductsPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  let products = useAppSelector(
    (state: RootState) => state.allProducts.allProducts
  );
  let brands = useAppSelector((state: RootState) => state.allBrands.brands);
  let subCategories = useAppSelector(
    (state: RootState) => state.subCategories.subCategories
  );
  const [displayedProducts, setDisplayedProducts] = React.useState<
    ProductAndRelatedInfo[]
  >([]);

  React.useEffect(() => {
    setIsLoading(true);
    setDisplayedProducts(products);
    setIsLoading(false);
  }, [products]);

  const [openAddProductDialog, setOpenAddProductDialog] =
    React.useState<boolean>(false);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  const [numberOfPages, setNumberOfPages] = React.useState<number>(1);
  React.useEffect(() => {
    setNumberOfPages(
      products.length / 10 < 0
        ? 1
        : products.length % 10 === 0
        ? Math.floor(products.length / 10)
        : Math.floor(products.length / 10) + 1
    );
  }, [products]);
  return !isLoading ? (
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
      <div className="mt-7 w-full flex items-center justify-between">
        <span className="text-gray-500 pl-2 font-normal sm:text-xl lg:text-sm text-center">
          Vous avez vu{" "}
          {currentPage === numberOfPages ? products.length : currentPage * 10}{" "}
          produits sur {products.length}
        </span>

        <Pagination
          page={currentPage}
          onChange={handleChangePage}
          count={numberOfPages}
          shape="rounded"
          color="primary"
          variant="outlined"
          showFirstButton
          showLastButton
        />
      </div>
      <ProductsTable
        displayedProducts={displayedProducts.slice(
          currentPage * 10 - 10,
          currentPage * 10
        )}
      />
      <div className="mt-10 w-full flex flex-col items-center justify-between mb-16">
        <span className="text-gray-500 mb-3 font-normal sm:text-xl lg:text-sm text-center">
          Vous avez vu{" "}
          {currentPage === numberOfPages ? products.length : currentPage * 10}{" "}
          produits sur {products.length}
        </span>

        <Pagination
          page={currentPage}
          onChange={handleChangePage}
          count={numberOfPages}
          shape="rounded"
          color="primary"
          variant="outlined"
          showFirstButton
          showLastButton
        />
      </div>
      <AddProductDialog
        open={openAddProductDialog}
        setOpen={setOpenAddProductDialog}
        subCategories={subCategories}
        brands={brands}
      />
    </Page>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default ProductsPage;
