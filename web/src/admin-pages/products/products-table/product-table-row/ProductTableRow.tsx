import React from "react";
import { Product } from "../../../../data/models/Product";
import {
  Avatar,
  Box,
  Checkbox,
  Collapse,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ProductCaracteristic from "../../../../data/models/ProductCaracteristic";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import ConfirmDeletionDialog from "../../../../components/core/confirm-deletion-dialog/ConfirmDeletionDialog";
import SuccessSnackbar from "../../../../components/core/suucess-snackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../../components/core/error-snackbar/ErrorSnackbar";
import UpdateProductDialog from "../../update-product-dialog/UpdateProductDialog";

type Props = {
  product: Product;
};

const ProductTableRow = ({ product }: Props) => {
  const [caracteristics, setCaracteristics] = React.useState<
    ProductCaracteristic[]
  >([]);
  React.useEffect(() => {
    const getProductCaracteristics = async () => {
      let url =
        process.env.REACT_APP_API_URL +
        "products/get-caracteristics/" +
        product.productId;
      let response = await fetch(url);
      let content = await response.json();
      if (content.success) {
        let data = content.data as ProductCaracteristic[];
        for (let c of data) {
          setCaracteristics((currentCaracteristics) => [
            ...currentCaracteristics,
            {
              ...{},
              productCaracteristicId: c.productCaracteristicId,
              productCaracteristicKey: c.productCaracteristicKey,
              productCaracteristicValue: c.productCaracteristicValue,
              productID: c.productID,
            },
          ]);
        }
      }
    };
    getProductCaracteristics();
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
  };

  const [openUpdateProductDialog, setOpenUpdateProductDialog] =
    React.useState<boolean>(false);

  return (
    <div className="pt-5 w-full grid grid-cols-24 gap-0 items-center border-b-2 pb-2 cursor-pointer hover:bg-gray-100">
      <div className="flex items-center justify-center col-span-2">
        <Checkbox size="small" />
      </div>
      <img
        className="col-span-2 max-h-16"
        src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
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
            -20%
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
        <IconButton size="small" className="mr-1">
          <FiEdit onClick={() => setOpenUpdateProductDialog(true)} />
        </IconButton>
        <IconButton size="small" color="error">
          <BsTrash onClick={() => setOpenDeletionAlert(true)} />
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
  );
};

export default ProductTableRow;
