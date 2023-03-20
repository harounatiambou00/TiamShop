import React from "react";

import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { Product } from "../../../data/models/Product";
import {
  Checkbox,
  IconButton,
  Rating,
  Skeleton,
  TableCell,
  TableRow,
} from "@mui/material";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import { RootState } from "../../../redux/store";
import { Brand } from "../../../data/models/Brand";
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { SubCategory } from "../../../data/models/SubCategory";
import UpdateProductDialog from "../update-product-dialog/UpdateProductDialog";
import SuccessSnackbar from "../../../components/core/suucess-snackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../components/core/error-snackbar/ErrorSnackbar";
import ConfirmDeletionDialog from "../../../components/core/confirm-deletion-dialog/ConfirmDeletionDialog";

type Props = {
  product: Product;
  index: number;
};

const ProductTableRow = ({ product, index }: Props) => {
  const brands = useAppSelector(
    (state: RootState) => state.allBrands.brands
  ) as Brand[];
  const subCategories = useAppSelector(
    (state: RootState) => state.subCategories.subCategories
  ) as SubCategory[];
  const [isLoading, setIsLoading] = React.useState(false);
  const [productAndRelatedInfos, setProductAndRelatedInfos] =
    React.useState<ProductAndRelatedInfo | null>(null);
  const getProductAndRelatedInfos = async () => {
    setIsLoading(true);
    let url =
      process.env.REACT_APP_API_URL +
      "products/get-product-and-all-related-info/" +
      product.productId;
    let response = await fetch(url);
    let content = await response.json();
    if (content.success) {
      let data = content.data;
      setProductAndRelatedInfos((current) => ({
        ...current,
        productId: data.productId,
        productReference: data.productReference,
        productName: data.productName,
        productDescription: data.productDescription,
        productPrice: data.productPrice,
        productQuantity: data.productQuantity,
        createdAt: data.createdAt,
        waranty: data.waranty,
        color: data.color,
        productPrincipalImageId: data.productPrincipalImageId,
        brandId: data.brandId,
        subCategoryId: data.subCategoryId,
        productDiscountId: data.productDiscountId,
        productDiscountEndDate: data.productDiscountEndDate,
        productDiscountPercentage: data.productDiscountPercentage,
        rating: data.rating,
        numberOfVotes: data.numberOfVotes,
        images: data.images,
        caracteristics: data.caracteristics,
      }));
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getProductAndRelatedInfos();
  }, []);

  const [openDeletionAlert, setOpenDeletionAlert] =
    React.useState<boolean>(false);
  const [openDeletionSuccessSnackbar, setOpenDeletionSuccessSnackbar] =
    React.useState<boolean>(false);
  const [openDeletionErrorSnackbar, setOpenDeletionErrorSnackbar] =
    React.useState<boolean>(false);
  const handleDeleteProduct = async () => {
    let url = process.env.REACT_APP_API_URL + "products/" + product.productId;
    let response = await fetch(url, { method: "DELETE" });
    let content = await response.json();
    if (content.success) {
      setOpenDeletionSuccessSnackbar(true);
    } else {
      setOpenDeletionSuccessSnackbar(false);
    }
    setOpenDeletionAlert(false);
  };

  const [openUpdateProductDialog, setOpenUpdateProductDialog] =
    React.useState<boolean>(false);

  return (
    <TableRow className={index % 2 === 0 ? "" : "bg-white"}>
      <TableCell size="small" width={10}>
        {!isLoading && productAndRelatedInfos ? (
          <Checkbox size="small" />
        ) : (
          <div className="h-8 w-8 rounded-full flex justify-center items-center">
            <Skeleton variant="rectangular" className="w-4 h-4 rounded-md" />
          </div>
        )}
      </TableCell>
      <TableCell size="small" className="py-3">
        <div className="flex">
          {!isLoading && productAndRelatedInfos ? (
            <img
              alt={productAndRelatedInfos.images[0].imageName}
              src={
                "data:" +
                productAndRelatedInfos.images[0].imageExtension +
                ";base64," +
                productAndRelatedInfos.images[0].imageBytes
              }
              className="h-20"
            />
          ) : (
            <Skeleton variant="rectangular" className="w-24 h-24 rounded-md" />
          )}
          <div className="ml-2">
            <span className="font-kanit font-medium text-sm uppercase">
              {product.productName}
            </span>
            <br />
            <span className="font-kanit font-medium text-sm uppercase w-fit px-2 rounded-full bg-amber-400 text-primary">
              {product.productReference}
            </span>
            <br />
            {productAndRelatedInfos !== null ? (
              <span className="font-kanit font-medium text-sm uppercase text-red-800">
                <span
                  className={
                    productAndRelatedInfos.productDiscountPercentage === 0
                      ? ""
                      : "line-through"
                  }
                >
                  {product.productPrice} FCFA
                </span>
                {productAndRelatedInfos.productDiscountPercentage !== 0 && (
                  <span className="ml-2 text-gray-700">
                    {product.productPrice -
                      (product.productPrice *
                        productAndRelatedInfos.productDiscountPercentage) /
                        100}{" "}
                    FCFA
                  </span>
                )}
              </span>
            ) : (
              <span className="font-kanit font-medium text-base uppercase text-red-800">
                {product.productPrice} FCFA
              </span>
            )}
            <br />
            <span className="font-kanit text-sm uppercase text-gray-800">
              {brands.find((b) => b.brandId === product.brandId)?.BrandName}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell size="small" align="center">
        <span className="font-kanit font-medium text-md">
          {product.productQuantity}
        </span>
      </TableCell>
      <TableCell size="small" align="center">
        <span className="font-kanit font-normal">
          {
            subCategories.find((s) => s.SubCategoryId === product.subCategoryId)
              ?.SubCategoryTitle
          }
        </span>
      </TableCell>
      <TableCell size="small" align="center">
        {!isLoading && productAndRelatedInfos ? (
          <div className="text-center">
            <Rating
              value={productAndRelatedInfos.rating}
              readOnly
              size="small"
            />
            <br />
            <small className="font-kanit">
              {productAndRelatedInfos.numberOfVotes} votes
            </small>
          </div>
        ) : (
          <Rating value={0} readOnly size="small" />
        )}
      </TableCell>
      <TableCell size="small">
        <div className="flex flex-col justify-center items-center">
          <IconButton
            color="primary"
            size="small"
            onClick={() => setOpenUpdateProductDialog(true)}
          >
            <MdEdit />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => setOpenDeletionAlert(true)}
          >
            <AiOutlineDelete />
          </IconButton>
        </div>
      </TableCell>
      {productAndRelatedInfos && (
        <UpdateProductDialog
          open={openUpdateProductDialog}
          setOpen={setOpenUpdateProductDialog}
          product={productAndRelatedInfos}
        />
      )}
      <SuccessSnackbar
        open={openDeletionSuccessSnackbar}
        setOpen={setOpenDeletionSuccessSnackbar}
        text="La sous-catégorie a été supprimée avec succès."
      />
      <ErrorSnackbar
        open={openDeletionErrorSnackbar}
        setOpen={setOpenDeletionErrorSnackbar}
        text="Erreur"
      />
      <ConfirmDeletionDialog
        open={openDeletionAlert}
        setOpen={setOpenDeletionAlert}
        deletionAction={handleDeleteProduct}
        title="Voulez-vous vraiment supprimer ce produit"
        text="Cette action est irréversible, une fois que vous appuyez sur
            CONFIRMER le produit sera supprimé definitivement. Et de ce fait
            tout ce qui est lié à ce dernier sera aussi supprimé, les commandes, les livraisons etc ..."
      />
    </TableRow>
  );
};

export default ProductTableRow;
