import React from "react";
import { SubCategory } from "../../../../../../data/models/SubCategory";
import { CustomImage } from "../../../../../../data/models/Image";
import {
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";

import "./styles.css";
import UpdateSubCategoryDialog from "./UpdateSubCategoryDialog";
import SuccessSnackbar from "../../../../../../components/core/suucess-snackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../../../../components/core/error-snackbar/ErrorSnackbar";
import ConfirmDeletionDialog from "../../../../../../components/core/confirm-deletion-dialog/ConfirmDeletionDialog";

type Props = {
  subCategory: SubCategory;
  refreshSubCategories: () => void;
};
const SubCategoriesListItem = ({
  subCategory,
  refreshSubCategories,
}: Props) => {
  const [subCategoryImage, setSubCategoryImage] =
    React.useState<CustomImage | null>(null);

  const getCategoryImage = async () => {
    let url =
      process.env.REACT_APP_API_URL +
      "images/" +
      subCategory.SubCategoryImageId;
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

      setSubCategoryImage(image);
    }
  };

  const [openUpdateSubCategory, setOpenUpdateSubCategory] =
    React.useState(false);

  React.useEffect(() => {
    getCategoryImage();
  }, []);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] =
    React.useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);
  const handleDeleteSubCategory = async () => {
    let url =
      process.env.REACT_APP_API_URL +
      "sub-categories/" +
      subCategory.SubCategoryId;
    let response = await fetch(url, {
      method: "DELETE",
    });

    let content = await response.json();
    if (content.success) {
      setOpenSuccessSnackbar(true);
      refreshSubCategories();
    } else setOpenErrorSnackbar(true);
  };

  const [openConfirmDeletionDialog, setOpenConfirmDeletionDialog] =
    React.useState<boolean>(false);

  return subCategoryImage ? (
    <ImageListItem className="h-full w-full cursor-pointer image_list_item my-5">
      <img
        alt={subCategory.SubCategoryTitle}
        src={
          "data:" +
          subCategoryImage.imageExtension +
          ";base64," +
          subCategoryImage.imageBytes
        }
      />
      <ImageListItemBar
        title={
          <span className="font-raleway text-xs font-semibold tracking-widest">
            {subCategory.SubCategoryTitle}
          </span>
        }
        className="font-kanit image_list_item_bar"
        actionIcon={
          <div className="image_list_item_bar_actions">
            <IconButton color="error">
              <MdDelete
                className="text-red-500"
                onClick={() => setOpenConfirmDeletionDialog(true)}
              />
            </IconButton>
            <IconButton>
              <MdEdit
                className="text-gray-100"
                onClick={() => setOpenUpdateSubCategory(true)}
              />
            </IconButton>
          </div>
        }
      />
      <UpdateSubCategoryDialog
        open={openUpdateSubCategory}
        setOpen={setOpenUpdateSubCategory}
        subCategory={subCategory}
        refreshSubCategories={refreshSubCategories}
      />
      <SuccessSnackbar
        open={openSuccessSnackbar}
        setOpen={setOpenSuccessSnackbar}
        text="La sous-catégorie a été supprimée avec succès."
      />
      <ErrorSnackbar
        open={openErrorSnackbar}
        setOpen={setOpenErrorSnackbar}
        text="Erreur"
      />
      <ConfirmDeletionDialog
        open={openConfirmDeletionDialog}
        setOpen={setOpenConfirmDeletionDialog}
        title={
          "Suppression de la sous-catégorie '" +
          subCategory.SubCategoryTitle +
          "'"
        }
        text="Cette action est irréversible, une fois que vous appuyez sur
            CONFIRMER la sous-catégorie sera supprimé definitivement. Et de ce fait
            tout ce qui est lié à cette dernière sera aussi supprimer, son image,
            ses produits, etc ..."
        deletionAction={handleDeleteSubCategory}
      />
    </ImageListItem>
  ) : (
    <Skeleton variant="rectangular" className="h-full w-full" />
  );
};

export default SubCategoriesListItem;
