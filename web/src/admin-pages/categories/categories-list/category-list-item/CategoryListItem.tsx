import React from "react";
import { Category } from "../../../../data/models/Category";
import { CustomImage } from "../../../../data/models/Image";
import {
  Button,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
} from "@mui/material";

import SubCategoriesList from "./sub-categories-list/SubCategoriesList";
import UpdateCategoryDialog from "./update-category-dialog/UpdateCategoryDialog";
import { MdEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmDeletionDialog from "../../../../components/core/confirm-deletion-dialog/ConfirmDeletionDialog";
import SuccessSnackbar from "../../../../components/core/suucess-snackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../../components/core/error-snackbar/ErrorSnackbar";

type Props = {
  category: Category;
  refreshCategories: () => void;
  index: number;
};

const CategoryListItem = ({ category, refreshCategories, index }: Props) => {
  const [categoryImage, setCategoryImage] = React.useState<CustomImage | null>(
    null
  );

  const getCategoryImage = async () => {
    let url =
      process.env.REACT_APP_API_URL + "images/" + category.CategoryImageId;
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

      setCategoryImage(image);
    }
  };

  React.useEffect(() => {
    getCategoryImage();
  }, []);

  const [openUpdateCategoryDialog, setOpenUpdateCategoryDialog] =
    React.useState<boolean>(false);
  const [openConfirmDeletionDialog, setOpenConfirmDeletionDialog] =
    React.useState<boolean>(false);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] =
    React.useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);
  const handleDeleteCategory = async () => {
    let url =
      process.env.REACT_APP_API_URL + "categories/" + category.CategoryId;
    let response = await fetch(url, {
      method: "DELETE",
    });

    let content = await response.json();
    if (content.success) {
      setOpenSuccessSnackbar(true);
      refreshCategories();
    } else {
      setOpenErrorSnackbar(true);
      console.log(content);
    }
  };
  return categoryImage !== null ? (
    <div className="w-full flex flex-col mb-16">
      <h1 className="font-raleway uppercase font-semibold text-2xl mb-3">
        <span className="text-teal-700 text-3xl font-bold">#</span>
        <span className="font-amita text-3xl text-teal-700">
          {index + 1}.
        </span>{" "}
        {category.CategoryTitle}
      </h1>
      <ImageListItem className="mb-5 w-fit">
        <img
          alt={category.CategoryTitle}
          src={
            "data:" +
            categoryImage.imageExtension +
            ";base64," +
            categoryImage.imageBytes
          }
          className="h-40 w-fit text-center rounded-lg drop-shadow-lg"
        />
        <ImageListItemBar
          className="bg-transparent"
          position="top"
          actionIcon={
            <div className="w-full flex justify-between">
              <Button
                size="small"
                variant="contained"
                className="bg-primary font-kanit font-light normal-case"
                startIcon={<MdEdit />}
                onClick={() => setOpenUpdateCategoryDialog(true)}
              >
                Modifier
              </Button>
            </div>
          }
          actionPosition="right"
        />
        <ImageListItemBar
          className="bg-transparent"
          position="bottom"
          actionIcon={
            <div className="w-full flex justify-between">
              <Button
                size="small"
                variant="contained"
                className="bg-red-600 font-kanit font-light normal-case"
                startIcon={<AiOutlineDelete />}
                onClick={() => setOpenConfirmDeletionDialog(true)}
              >
                Supprimer
              </Button>
            </div>
          }
          actionPosition="left"
        />
      </ImageListItem>
      <UpdateCategoryDialog
        open={openUpdateCategoryDialog}
        setOpen={setOpenUpdateCategoryDialog}
        category={category}
        refreshSubCategories={refreshCategories}
      />
      <ConfirmDeletionDialog
        open={openConfirmDeletionDialog}
        setOpen={setOpenConfirmDeletionDialog}
        title={"Suppression de la catégorie '" + category.CategoryTitle + "'"}
        text="Cette action est irréversible, une fois que vous appuyez sur
            CONFIRMER la catégorie sera supprimé definitivement. Et de ce fait
            tout ce qui est lié à cette dernière sera aussi supprimer, son image, ses sous-catégories,
            ses produits, etc ..."
        deletionAction={handleDeleteCategory}
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
      <SubCategoriesList categoryId={category.CategoryId} />
    </div>
  ) : (
    <div className="w-full flex flex-col mb-32">
      <Skeleton
        variant="rectangular"
        className="rounded-lg drop-shadow-lg mb-4 h-5 w-60"
      />
      <Skeleton
        variant="rectangular"
        className="rounded-lg drop-shadow-lg h-40 w-60"
      />
    </div>
  );
};

export default CategoryListItem;
