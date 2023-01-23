import React from "react";
import { Page } from "../../components/admin-layout";
import { Product, isAProduct } from "../../data/models/Product";
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Input,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { BsFilter, BsSearch } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import SearchProducts from "./search-products/SearchProducts";
import SortButton from "./sort-button/SortButton";
import FilterSelects from "./filter-selects/FilterSelects";
import ProductsTable from "./products-table/ProductsTable";
import AddProductDialog from "./add-product-dialog/AddProductDialog";

const ProductsPage = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getProducts = async () => {
    setIsLoading(true);
    let url = process.env.REACT_APP_API_URL + "products/get-all-products";
    let response = await fetch(url);
    let content = await response.json();

    if (content.success) {
      let data = content.data;
      if (data) {
        for (let i of data) {
          if (isAProduct(i)) {
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
      }
    } else {
    }

    setIsLoading(false);
  };

  React.useEffect(() => {
    getProducts();
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
      />
    </Page>
  ) : (
    <div>
      <CircularProgress />
    </div>
  );
};

export default ProductsPage;
