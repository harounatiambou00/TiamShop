import React from "react";
import { Page } from "../../components/admin-layout";
import { Product } from "../../data/models/Product";
import {
  Alert,
  Checkbox,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
} from "@mui/material";
import AddProductDialog from "./add-product-dialog/AddProductDialog";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import ProductTableRow from "./product-table-row/ProductTableRow";
import SearchAndFilterSection from "./search-and-filter-section/SearchAndFilterSection";
import { BiMessageError } from "react-icons/bi";

const ProductsPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  let brands = useAppSelector((state: RootState) => state.allBrands.brands);
  let subCategories = useAppSelector(
    (state: RootState) => state.subCategories.subCategories
  );
  const [displayedProducts, setDisplayedProducts] = React.useState<Product[]>(
    []
  );

  const [products, setProducts] = React.useState<Product[]>([]);
  const getAllProducts = async () => {
    setIsLoading(true);
    let url = process.env.REACT_APP_API_URL + "products/get-all-products";
    let response = await fetch(url);
    let content = await response.json();
    if (content.success) {
      setProducts([]);
      let data = content.data as Product[];
      for (let i of data) {
        setProducts((current) => [
          ...current,
          {
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
    setIsLoading(false);
  };
  React.useEffect(() => {
    setProducts([]);
    getAllProducts();
  }, []);
  React.useEffect(() => {
    setDisplayedProducts([]);
    setDisplayedProducts(products.reverse());
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
      displayedProducts.length / 10 < 0
        ? 1
        : displayedProducts.length % 10 === 0
        ? Math.floor(displayedProducts.length / 10)
        : Math.floor(displayedProducts.length / 10) + 1
    );
  }, [displayedProducts]);

  return (
    <Page
      title="Les produits"
      buttonTitle="Ajouter"
      subtitle="Dans cette section, Vous pouvez consulter et gérer tous les produits et leurs détails. ajouter, modifier ou spprimer une commande ..."
      buttonAction={() => setOpenAddProductDialog(true)}
    >
      <SearchAndFilterSection
        setProducts={setProducts}
        setIsLoading={setIsLoading}
        getAllProducts={getAllProducts}
      />

      <div className="mt-3 w-full flex items-center justify-between">
        <span className="text-gray-500 pl-2 font-normal sm:text-xl lg:text-sm text-center">
          Vous avez vu{" "}
          {currentPage >= numberOfPages ? products.length : currentPage * 10}{" "}
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
          size="small"
          className="font-amita"
        />
      </div>
      {isLoading ? (
        <div className="w-full h-60 flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : displayedProducts.length > 0 ? (
        <Table size="small" className="mt-5">
          <TableHead className="bg-white">
            <TableCell width={10} className="font-kanit text-sm uppercase">
              <Checkbox size="small" />
            </TableCell>
            <TableCell className="font-kanit text-sm uppercase">
              Produit
            </TableCell>
            <TableCell className="font-kanit text-sm uppercase" align="center">
              QTe
            </TableCell>
            <TableCell className="font-kanit text-sm uppercase" align="center">
              Sous-catégorie
            </TableCell>
            <TableCell className="font-kanit text-sm uppercase" align="center">
              Note
            </TableCell>
            <TableCell className="font-kanit text-sm uppercase"></TableCell>
          </TableHead>
          <TableBody>
            {displayedProducts
              .slice(currentPage * 10 - 10, currentPage * 10)
              .map((p, index) => (
                <ProductTableRow index={index} key={p.productId} product={p} />
              ))}
          </TableBody>
        </Table>
      ) : (
        <div className="w-full h-32 flex items-center justify-center">
          <Alert
            severity="error"
            className="font-kanit font-light sm:text-3xl lg:text-base flex items-center "
            icon={
              <BiMessageError className="text-red-400  sm:text-5xl lg:text-2xl" />
            }
          >
            Aucun article ne correspond à votre recherche.
          </Alert>
        </div>
      )}
      <div className="mt-10 w-full flex flex-col items-center justify-between mb-16">
        <span className="text-gray-500 mb-3 font-normal sm:text-xl lg:text-sm text-center">
          Vous avez vu{" "}
          {currentPage >= numberOfPages ? products.length : currentPage * 10}{" "}
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
  );
};

export default ProductsPage;
