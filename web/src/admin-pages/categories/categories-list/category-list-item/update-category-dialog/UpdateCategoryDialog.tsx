import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  OutlinedInput,
  Skeleton,
  Slide,
} from "@mui/material";
import React from "react";
import { BiArrowBack, BiSave } from "react-icons/bi";
import { Category } from "../../../../../data/models/Category";
import { TransitionProps } from "@mui/material/transitions";
import { FiEdit } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { CustomImage } from "../../../../../data/models/Image";
import SuccessSnackbar from "../../../../../components/core/suucess-snackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../../../components/core/error-snackbar/ErrorSnackbar";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: Category;
  refreshSubCategories: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ValuesState = {
  CategoryName: string;
  CategoryTitle: string;
};

const UpdateCategoryDialog = ({
  open,
  setOpen,
  category,
  refreshSubCategories,
}: Props) => {
  const [values, setValues] = React.useState<ValuesState>({
    CategoryName: category.CategoryName,
    CategoryTitle: category.CategoryTitle,
  });

  const imageInput = React.useRef<HTMLInputElement>(null);
  const [categoryImage, setCategoryImage] = React.useState<CustomImage | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const getCategoryImage = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };
  React.useEffect(() => {
    getCategoryImage();
  }, []);

  const [savingIsLoading, setSavingIsLoading] = React.useState<boolean>(false);

  // New image
  const [newImage, setNewImage] = React.useState<File | null>(null);
  const [newImageBase64, setNewImageBase64] = React.useState<string | null>(
    null
  );

  const [openSuccessSnackbar, setOpenSuccessSnackbar] =
    React.useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);
  const handleSave = async () => {
    setSavingIsLoading(true);
    let url = process.env.REACT_APP_API_URL + "categories";
    let formData = new FormData();

    if (newImage && newImageBase64) formData.append("newImageFile", newImage);
    formData.append("CategoryId", category.CategoryId.toString());
    formData.append("CategoryName", values.CategoryName);
    formData.append("CategoryTitle", values.CategoryTitle);
    formData.append("CategoryImageId", category.CategoryImageId.toString());
    formData.append("CategoryRanking", category.CategoryRanking.toString());

    let response = await fetch(url, {
      method: "PUT",
      body: formData,
    });

    let content = await response.json();

    if (content.success) {
      setOpenSuccessSnackbar(true);
      setTimeout(() => refreshSubCategories(), 3000);
    } else {
      setOpenErrorSnackbar(true);
    }
    setSavingIsLoading(false);
  };

  React.useEffect(() => {
    if (newImage) {
      const reader = new FileReader();
      reader.readAsDataURL(newImage);
      reader.onloadend = () => {
        setNewImageBase64(reader.result as string);
      };
    } else {
      setNewImageBase64(null);
    }
  }, [newImage]);
  return !isLoading && categoryImage ? (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      TransitionComponent={Transition}
      className="bg-gray-100 "
    >
      <div className="h-full w-full flex-col flex bg-white">
        <div className="h-20 flex w-full items-center justify-between py-5 px-10 bg-white">
          <IconButton onClick={() => setOpen(false)} color="primary">
            <BiArrowBack />
          </IconButton>
          <h1 className="font-raleway text-primary font-bold text-xl ml-4 flex-1 items-center">
            Modification du produit "{category.CategoryTitle}"
          </h1>
          <LoadingButton
            variant="outlined"
            startIcon={<BiSave />}
            size="large"
            className="font-raleway"
            loading={savingIsLoading}
            onClick={handleSave}
          >
            Enregistrer
          </LoadingButton>
        </div>
        <div className="">
          <div className="h-20"></div>
          <div className="flex">
            <div className="w-1/2 p-10">
              {categoryImage && (
                <ImageListItem className="cursor-pointer">
                  <img
                    alt={category.CategoryTitle}
                    src={
                      newImageBase64
                        ? newImageBase64
                        : "data:" +
                          categoryImage.imageExtension +
                          ";base64," +
                          categoryImage.imageBytes
                    }
                    className="h-80 text-center rounded-lg drop-shadow-lg"
                  />
                  {newImage && newImageBase64 && (
                    <ImageListItemBar
                      className="bg-transparent"
                      position="bottom"
                      actionIcon={
                        <div className="w-full flex justify-between">
                          <Button
                            size="small"
                            variant="contained"
                            className="bg-gray-400 font-kanit font-light normal-case"
                            startIcon={<MdClose />}
                            onClick={() => setNewImage(null)}
                          >
                            Réinitialiser
                          </Button>
                        </div>
                      }
                      actionPosition="left"
                    />
                  )}
                  <ImageListItemBar
                    className="bg-transparent"
                    position="top"
                    actionIcon={
                      <div className="w-full flex justify-between">
                        <Button
                          size="small"
                          variant="contained"
                          className="bg-primary font-kanit font-light normal-case"
                          startIcon={<FiEdit />}
                          onClick={() => imageInput.current?.click()}
                        >
                          Modifier
                        </Button>
                      </div>
                    }
                    actionPosition="right"
                  />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={imageInput}
                    onChange={(event) => {
                      event.preventDefault();
                      event.currentTarget &&
                        event.currentTarget.files &&
                        setNewImage(event.currentTarget.files[0]);
                    }}
                  />
                </ImageListItem>
              )}
            </div>
            <div className="p-10 w-1/2 ">
              <div className="w-full flex flex-col">
                <label className="mb-1 text-xl font-raleway font-medium">
                  Nom de la catégorie
                </label>
                <OutlinedInput
                  fullWidth
                  value={values.CategoryName}
                  onChange={(e) => {
                    setValues({ ...values, CategoryName: e.target.value });
                  }}
                  placeholder=""
                  className="font-kanit"
                />
              </div>
              <div className="w-full flex flex-col mt-4">
                <label className="mb-1 text-xl font-raleway font-medium">
                  Titre de la catégorie
                </label>
                <OutlinedInput
                  fullWidth
                  value={values.CategoryTitle}
                  onChange={(e) => {
                    setValues({ ...values, CategoryTitle: e.target.value });
                  }}
                  placeholder=""
                  className="font-kanit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessSnackbar
        open={openSuccessSnackbar}
        setOpen={setOpenSuccessSnackbar}
        text="La catégorie a été modifiée avec succès."
      />
      <ErrorSnackbar
        open={openErrorSnackbar}
        setOpen={setOpenErrorSnackbar}
        text="Erreur"
      />
    </Dialog>
  ) : (
    <Dialog
      fullScreen
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      className="bg-gray-100"
    >
      <div className="h-full w-full flex items-center justify-center">
        <Skeleton variant="circular" />
      </div>
    </Dialog>
  );
};

export default UpdateCategoryDialog;
