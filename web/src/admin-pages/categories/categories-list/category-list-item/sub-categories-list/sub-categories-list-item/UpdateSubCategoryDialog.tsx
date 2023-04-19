import {
  AppBar,
  Button,
  Dialog,
  FormControl,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Slide,
  TextField,
  Toolbar,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { SubCategory } from "../../../../../../data/models/SubCategory";
import { BiArrowBack, BiSave } from "react-icons/bi";
import { CustomImage } from "../../../../../../data/models/Image";
import { LoadingButton } from "@mui/lab";
import { FiEdit } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import SuccessSnackbar from "../../../../../../components/core/suucess-snackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../../../../components/core/error-snackbar/ErrorSnackbar";
import { useAppSelector } from "../../../../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../../../../redux/store";
import ProductAndRelatedInfo from "../../../../../../data/models/ProductAndRelatedInfo";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subCategory: SubCategory;
  refreshSubCategories: () => void;
};

type ValuesState = {
  SubCategoryId: number;
  SubCategoryName: string;
  SubCategoryTitle: string;
  CategoryId: number | string;
};

const UpdateSubCategoryDialog = ({
  open,
  setOpen,
  subCategory,
  refreshSubCategories,
}: Props) => {
  const imageInput = React.useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [subCategoryImage, setSubCategoryImage] =
    React.useState<CustomImage | null>(null);
  const getSubCategoryImage = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };
  const [categories, setCategories] = React.useState<any[]>([]);
  const getCategories = async () => {
    setIsLoading(true);
    const url = process.env.REACT_APP_API_URL + "categories";
    let response = await fetch(url);
    let content = await response.json();
    let data = content.data;

    for (let i of data) {
      setCategories((currentCategories) => [
        ...currentCategories,
        {
          ...{},
          CategoryId: i.categoryId,
          CategoryName: i.categoryName,
          CategoryTitle: i.categoryTitle,
          CategoryImageId: i.categoryImageId,
          CategoryRanking: i.categoryRanking,
        },
      ]);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getSubCategoryImage();
    getCategories();
  }, []);

  const [values, setValues] = React.useState<ValuesState>({
    SubCategoryId: subCategory.SubCategoryId,
    SubCategoryName: subCategory.SubCategoryName,
    SubCategoryTitle: subCategory.SubCategoryTitle,
    CategoryId: subCategory.CategoryId,
  } as ValuesState);
  const handleChange =
    (prop: keyof ValuesState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: e.currentTarget.value });
    };
  const handleChangeCategory = (e: SelectChangeEvent) => {
    setValues({ ...values, CategoryId: e.target.value });
  };

  const [savingIsLoading, setSavingIsLoading] = React.useState<boolean>(false);

  // New image
  const [newImage, setNewImage] = React.useState<File | null>(null);
  const [newImageBase64, setNewImageBase64] = React.useState<string | null>(
    null
  );

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

  const [openSuccessSnackbar, setOpenSuccessSnackbar] =
    React.useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);
  const handleSave = async () => {
    setSavingIsLoading(true);
    let url = process.env.REACT_APP_API_URL + "sub-categories";
    let formData = new FormData();

    if (newImage && newImageBase64) formData.append("newImageFile", newImage);
    formData.append("SubCategoryId", subCategory.SubCategoryId.toString());
    formData.append("SubCategoryName", subCategory.SubCategoryName);
    formData.append("SubCategoryTitle", subCategory.SubCategoryTitle);
    formData.append("CategoryId", subCategory.CategoryId.toString());
    formData.append(
      "SubCategoryImageId",
      subCategory.SubCategoryImageId.toString()
    );
    formData.append(
      "SubCategoryRanking",
      subCategory.SubCategoryRanking.toString()
    );

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

  const products = [] as ProductAndRelatedInfo[];

  return !isLoading && subCategoryImage ? (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        setOpen(false);
        setCategories([]);
      }}
      TransitionComponent={Transition}
      className="bg-gray-100"
    >
      <div className="h-full w-full flex items-center justify-center bg-white">
        <AppBar elevation={1}>
          <Toolbar className="h-20 flex justify-between bg-white">
            <IconButton onClick={() => setOpen(false)} color="primary">
              <BiArrowBack />
            </IconButton>
            <h1 className="font-raleway text-primary font-bold text-xl ml-4 flex-1">
              Modification de la sous-catégorie{" "}
              <span className="font-medium">
                '{subCategory.SubCategoryTitle}'
              </span>
            </h1>
            <LoadingButton
              variant="outlined"
              startIcon={<BiSave />}
              loading={savingIsLoading}
              size="large"
              className="font-raleway"
              onClick={handleSave}
            >
              Enregistrer
            </LoadingButton>
          </Toolbar>
        </AppBar>
        <div className="">
          <div className="h-20"></div>
          <div className="flex">
            <div className="w-1/2 p-10">
              {subCategoryImage && (
                <ImageListItem className="cursor-pointer">
                  <img
                    alt={subCategory.SubCategoryTitle}
                    src={
                      newImageBase64
                        ? newImageBase64
                        : "data:" +
                          subCategoryImage.imageExtension +
                          ";base64," +
                          subCategoryImage.imageBytes
                    }
                    className="w-full text-center rounded-lg drop-shadow-lg"
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
            <div className="w-1/2 flex flex-col items-center justify-center p-10">
              <TextField
                fullWidth
                value={values.SubCategoryTitle}
                onChange={handleChange("SubCategoryTitle")}
                label="Titre"
                className="mb-5"
                sx={{
                  "& .MuiInputBase-root": {
                    height: { md: 100, lg: 55 },
                    fontSize: { md: 30, lg: 18 },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontFamily: "Kanit, 'sans-serif'",
                    fontWeight: { md: "400", lg: "400" },
                    fontSize: { md: 30, lg: 18 },
                  },
                }}
                inputProps={{
                  sx: {
                    fontFamily: "Kanit, 'sans-serif'",
                    fontWeight: { md: "400", lg: "400" },
                  },
                }}
              />
              <FormControl
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    height: { md: 100, lg: 55 },
                    fontSize: { md: 30, lg: 18 },
                  },
                }}
                className="mb-7"
              >
                <InputLabel
                  id="app-admin-subcategory-update-category-select-label"
                  className="font-kanit sm:font-medium lg:font-normal"
                  sx={{
                    fontFamily: "Kanit, 'sans-serif'",
                    bgcolor: "white",
                    fontWeight: { md: "300", lg: "200" },
                    fontSize: { md: 30, lg: 18 },
                  }}
                >
                  Catégorie
                </InputLabel>
                <Select
                  value={values.CategoryId.toString()}
                  onChange={handleChangeCategory}
                  autoComplete="off"
                  labelId="app-admin-subcategory-update-category-select-label"
                  id="app-admin-subcategory-update-category-select"
                  label="Catégorie"
                  inputProps={{
                    sx: {
                      fontFamily: "Kanit, 'sans-serif'",
                      fontWeight: { md: "400", lg: "400" },
                    },
                  }}
                >
                  <MenuItem value="">Choisir</MenuItem>
                  {categories.map((category) => {
                    return (
                      <MenuItem
                        value={category.CategoryId}
                        className="font-kanit"
                        key={category.CategoryId}
                      >
                        {category.CategoryTitle}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <div className="grid grid-cols-3 gap-5">
                <TextField
                  disabled
                  label="Nombre de produits"
                  value={products.length}
                  className="mb-5"
                  type="text"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: { md: 100, lg: 55 },
                      fontSize: { md: 30, lg: 18 },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: "Kanit, 'sans-serif'",
                      fontWeight: { md: "400", lg: "400" },
                      fontSize: { md: 30, lg: 18 },
                    },
                    shrink: true,
                  }}
                  inputProps={{
                    sx: {
                      fontFamily: "Kanit, 'sans-serif'",
                      fontWeight: { md: "400", lg: "400" },
                    },
                  }}
                />
                <TextField
                  label="Rang"
                  value={subCategory.SubCategoryRanking}
                  disabled
                  className="mb-5"
                  type="text"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: { md: 100, lg: 55 },
                      fontSize: { md: 30, lg: 18 },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: "Kanit, 'sans-serif'",
                      fontWeight: { md: "400", lg: "400" },
                      fontSize: { md: 30, lg: 18 },
                    },
                    shrink: true,
                  }}
                  inputProps={{
                    sx: {
                      fontFamily: "Kanit, 'sans-serif'",
                      fontWeight: { md: "400", lg: "400" },
                    },
                  }}
                />
                <TextField
                  label="Nombre de commandes"
                  disabled
                  value={20}
                  className="mb-5"
                  type="text"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: { md: 100, lg: 55 },
                      fontSize: { md: 30, lg: 18 },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: "Kanit, 'sans-serif'",
                      fontWeight: { md: "400", lg: "400" },
                      fontSize: { md: 30, lg: 18 },
                    },
                    shrink: true,
                  }}
                  inputProps={{
                    sx: {
                      fontFamily: "Kanit, 'sans-serif'",
                      fontWeight: { md: "400", lg: "400" },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessSnackbar
        open={openSuccessSnackbar}
        setOpen={setOpenSuccessSnackbar}
        text="La sous-catégorie a été modifiée avec succès."
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

export default UpdateSubCategoryDialog;
