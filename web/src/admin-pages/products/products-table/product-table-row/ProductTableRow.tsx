import React from "react";
import { Checkbox, IconButton, Skeleton } from "@mui/material";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import ConfirmDeletionDialog from "../../../../components/core/confirm-deletion-dialog/ConfirmDeletionDialog";
import SuccessSnackbar from "../../../../components/core/suucess-snackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../../components/core/error-snackbar/ErrorSnackbar";
import UpdateProductDialog from "../../update-product-dialog/UpdateProductDialog";
import { CustomImage } from "../../../../data/models/Image";
import { useAppSelector } from "../../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../../redux/store";
import { useAppDispatch } from "../../../../hooks/redux-custom-hooks/useAppDispatch";
import { setAllProducts } from "../../../../redux/slices/allProductsSlice";
import ProductAndRelatedInfo from "../../../../data/models/ProductAndRelatedInfo";

type Props = {
  product: ProductAndRelatedInfo;
};

const ProductTableRow = ({ product }: Props) => {
  let products = useAppSelector(
    (state: RootState) => state.allProducts.allProducts
  );
  const dispatch = useAppDispatch();
  const [principalImage, setPrincipalImage] =
    React.useState<CustomImage | null>(null);
  React.useEffect(() => {
    const getPrincipalImageOfTheProduct = async () => {
      let url =
        process.env.REACT_APP_API_URL +
        "images/" +
        product.productPrincipalImageId;
      let response = await fetch(url, {
        method: "GET",
      });
      let content = await response.json();
      if (content.success) {
        setPrincipalImage(content.data);
      } else console.log(content);
    };

    getPrincipalImageOfTheProduct();
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
      dispatch(
        setAllProducts({
          allProducts: products.filter(
            (p) => p.productId !== product.productId
          ),
        })
      );
    } else {
      setOpenDeletionSuccessSnackbar(false);
    }
    setOpenDeletionAlert(false);
  };

  const [openUpdateProductDialog, setOpenUpdateProductDialog] =
    React.useState<boolean>(false);

  return principalImage ? (
    <div className="pt-5 w-full grid grid-cols-24 gap-0 items-center border-b-2 pb-2 cursor-pointer bg-transparent hover:bg-gray-100">
      <div className="flex items-center justify-center col-span-2">
        <Checkbox size="small" />
      </div>
      <img
        className="col-span-2 max-h-24"
        src={
          "data:" +
          principalImage.imageExtension +
          ";base64," +
          principalImage.imageBytes
        }
        alt={product.productReference}
      />

      <div className="col-span-12 flex flex-col items-start">
        <span className="font-raleway font-semibold text-sm">
          {product.productName}
        </span>
        <div className="w-full flex items-center">
          <span className="px-5 rounded-full drop-shadow-sm text-primary bg-orange-100 font-normal text-sm tracking-wide mr-5">
            {product.productReference}
          </span>
          <span className="text-center text-xs font-amita font-semibold bg-red-100 text-red-900 drop-shadow-sm rounded-full px-2">
            -{product.productDiscountPercentage}%
          </span>
        </div>
      </div>
      <div className="col-span-2 text-sm font-amita font-semibold">
        {product.productPrice}
      </div>
      <div className="col-span-2 text-center text-sm">N/A</div>
      <div className="col-span-2 text-center">
        <span className="text-center text-xs font-amita font-semibold bg-teal-100 text-teal-900 drop-shadow-sm rounded-full px-2">
          En stock
        </span>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <IconButton
          size="small"
          className="mr-1"
          onClick={() => setOpenUpdateProductDialog(true)}
        >
          <FiEdit />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => setOpenDeletionAlert(true)}
        >
          <BsTrash />
        </IconButton>
      </div>
      <UpdateProductDialog
        open={openUpdateProductDialog}
        setOpen={setOpenUpdateProductDialog}
        product={product}
      />

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
    </div>
  ) : (
    <Skeleton className="pt-5 w-full " />
  );
};

export default ProductTableRow;
