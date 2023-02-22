import React from "react";
import { Brand } from "../../data/models/Brand";
import {
  Skeleton,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { CustomImage } from "../../data/models/Image";
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import UpdateBrandDialog from "./update-brand-dialog/UpdateBrandDialog";
import ConfirmDeletionDialog from "../../components/core/confirm-deletion-dialog/ConfirmDeletionDialog";
import SuccessSnackbar from "../../components/core/suucess-snackbar/SuccessSnackbar";
import ErrorSnackbar from "../../components/core/error-snackbar/ErrorSnackbar";

type Props = {
  brand: Brand;
  refreshBrands: () => void;
};

const BrandListItem = ({ brand, refreshBrands }: Props) => {
  const [brandImage, setBrandImage] = React.useState<CustomImage | null>(null);

  const getBrandImage = async () => {
    let url = process.env.REACT_APP_API_URL + "images/" + brand.BrandImageId;
    let response = await fetch(url);
    let content = await response.json();
    if (content.success) {
      let data = content.data;
      let image: CustomImage = {
        imageId: data.imageId,
        imageName: data.imageName,
        imageDescription: data.imageDescription,
        imageExtension: data.imageExtension,
        imageBytes: data.imageBytes,
        imageSize: data.imageSize,
      };

      setBrandImage(image);
    }
  };

  React.useEffect(() => {
    getBrandImage();
  }, []);

  const [openUpdateBrandDialog, setOpenUpdateBrandDialog] =
    React.useState<boolean>(false);

  const [openConfirmDeletionDialog, setOpenConfirmDeletionDialog] =
    React.useState<boolean>(false);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] =
    React.useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);
  const handleDeleteBrand = async () => {
    let url = process.env.REACT_APP_API_URL + "brands/" + brand.brandId;
    let response = await fetch(url, {
      method: "DELETE",
    });

    let content = await response.json();
    if (content.success) {
      setOpenSuccessSnackbar(true);
      refreshBrands();
    } else {
      setOpenErrorSnackbar(true);
      console.log(content);
    }
  };
  return brandImage !== null ? (
    <ImageListItem className="bg-white px-2 pt-2 drop-shadow-md">
      <img
        alt={brand.BrandName}
        src={
          "data:" +
          brandImage.imageExtension +
          ";base64," +
          brandImage.imageBytes
        }
        loading="lazy"
      />
      <ImageListItemBar
        className="font-kanit"
        title={brand.BrandName}
        subtitle={brand.PartnershipDate !== null ? "Partenaire" : ""}
        position="below"
        actionIcon={
          <IconButton
            size="small"
            color="error"
            onClick={() => setOpenConfirmDeletionDialog(true)}
          >
            <AiOutlineDelete />
          </IconButton>
        }
      />
      <ImageListItemBar
        className="bg-transparent"
        position="top"
        actionIcon={
          <IconButton
            size="small"
            color="primary"
            className="bg-white"
            onClick={() => setOpenUpdateBrandDialog(true)}
          >
            <MdEdit />
          </IconButton>
        }
      />
      <UpdateBrandDialog
        open={openUpdateBrandDialog}
        setOpen={setOpenUpdateBrandDialog}
        brand={brand}
        refreshBrands={refreshBrands}
      />
      <ConfirmDeletionDialog
        open={openConfirmDeletionDialog}
        setOpen={setOpenConfirmDeletionDialog}
        title={"Suppression de la marque '" + brand.BrandName + "'"}
        text="Cette action est irréversible, une fois que vous appuyez sur
            CONFIRMER la marque sera supprimé definitivement. Et de ce fait
            tout ce qui est lié à cette dernière sera aussi supprimer, son image,
            ses produits, etc ..."
        deletionAction={handleDeleteBrand}
      />
      <SuccessSnackbar
        open={openSuccessSnackbar}
        setOpen={setOpenSuccessSnackbar}
        text="La catégorie a été supprimée avec succès."
      />
      <ErrorSnackbar
        open={openErrorSnackbar}
        setOpen={setOpenErrorSnackbar}
        text="Erreur"
      />
    </ImageListItem>
  ) : (
    <Skeleton />
  );
};

export default BrandListItem;
