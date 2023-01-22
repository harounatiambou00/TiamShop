import {
  AppBar,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slide,
  TextField,
  Toolbar,
} from "@mui/material";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { MdOutlineClose } from "react-icons/md";
import { BiSave } from "react-icons/bi";
import { LoadingButton } from "@mui/lab";
import { Category } from "../../../data/models/Category";
import CategoryAddedSnakbar from "./CategoryAddedSnakbar";

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
  categories: Category[];
  refreshCategories: () => void;
};

type ValuesState = {
  name: string;
  title: string;
  targetedCategoryName: string | number;
};

const AddCategoryOrSubCategoryDialog = ({
  open,
  setOpen,
  categories,
  refreshCategories,
}: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  const [values, setValues] = React.useState<ValuesState>({
    name: "",
    title: "",
    targetedCategoryName: "", //This will contain the category of the subcategor to be added.
  });

  const handleChange =
    (prop: keyof ValuesState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const [whatIsBeingAdded, setWhatIsBeingAdded] = React.useState("category");
  const handleChangeWhatIsBeingAdded = (event: SelectChangeEvent) => {
    setWhatIsBeingAdded(event.target.value);
  };

  // Category or SubCategory image
  const [categoryImage, setCategoryImage] = React.useState<File | null>(null);
  const handleChangeCategoryImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    event.currentTarget &&
      event.currentTarget.files &&
      setCategoryImage(event.currentTarget.files[0]);
  };

  const [savingIsLoading, setSavingIsLoading] = React.useState<boolean>(false);
  const [openCategoryAddedSnackbar, setOpenCategoryAddedSnackbar] =
    React.useState<boolean>(false);

  const handleSave = async () => {
    setSavingIsLoading(true);
    if (whatIsBeingAdded === "category") {
      if (categoryImage && values.name && values.title) {
        let url = process.env.REACT_APP_API_URL + "categories";
        const formData = new FormData();
        formData.append("imageFile", categoryImage);
        formData.append("CategoryName", values.name);
        formData.append("CategoryTitle", values.title);

        let response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        let content = await response.json();
        if (content.success) {
          setSavingIsLoading(false);
          setOpenCategoryAddedSnackbar(true);
          setTimeout(() => refreshCategories(), 3000);
        }
      }
    } else {
      if (categoryImage && values.name && values.title) {
        let url = process.env.REACT_APP_API_URL + "sub-categories";
        //This will contain the category of the subcategory
        let targetedCategory = categories.find(
          (c) => c.CategoryName === values.targetedCategoryName
        );
        console.log(targetedCategory);
        if (targetedCategory) {
          const formData = new FormData();
          formData.append("imageFile", categoryImage);
          formData.append("SubCategoryName", values.name);
          formData.append("SubCategoryTitle", values.title);
          formData.append("CategoryId", targetedCategory.CategoryId.toString());
          let response = await fetch(url, {
            method: "POST",
            body: formData,
          });

          let content = await response.json();
          if (content.success) {
            setSavingIsLoading(false);
            setOpenCategoryAddedSnackbar(true);
            setTimeout(() => refreshCategories(), 3000);
          }
        }
      }
    }
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar elevation={1}>
        <Toolbar className="h-20 bg-white">
          <IconButton onClick={handleClose}>
            <MdOutlineClose className="text-gray-900" />
          </IconButton>
          <h1 className="font-raleway text-primary font-bold text-xl ml-4 flex-1">
            Ajout d'une catégoie ou d'une sous-catégorie
          </h1>
          <LoadingButton
            variant="outlined"
            startIcon={<BiSave />}
            onClick={handleSave}
            loading={savingIsLoading}
            size="large"
            className="font-raleway"
          >
            Enregistrer
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <div className="h-20 w-full"></div>
      <div className="my-5 h-full flex items-center justify-center overflow-y-scroll">
        <form className="w-3/8 mt-28">
          <FormControl fullWidth className="mb-5">
            <InputLabel
              id="what-is-being-added-select-label"
              sx={{
                fontFamily: "Kanit, 'sans-serif'",
                fontWeight: { md: "400", lg: "400" },
                fontSize: { md: 30, lg: 18 },
                backgroundColor: "#FFFFFF",
                marginRight: 2,
              }}
            >
              Que voulez-vous ajouter ?
            </InputLabel>
            <Select
              labelId="what-is-being-added-select-label"
              id="what-is-being-added-select"
              value={whatIsBeingAdded}
              label="Que voulez-vous ajouter ?"
              onChange={handleChangeWhatIsBeingAdded}
              className="font-kanit"
            >
              <MenuItem value="category" className="font-kanit">
                Une catégorie
              </MenuItem>
              <MenuItem value="subcategory" className="font-kanit">
                Une sous-catégorie
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            className="mb-5"
            label={
              whatIsBeingAdded === "category"
                ? "Le nom de la catégorie"
                : "Le nom de la sous-catégorie"
            }
            fullWidth
            autoFocus
            autoComplete="off"
            variant="outlined"
            type="text"
            value={values.name}
            onChange={handleChange("name")}
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
          <TextField
            className="mb-5"
            label={
              whatIsBeingAdded === "category"
                ? "Le titre de la catégorie"
                : "Le titre de la sous-catégorie"
            }
            fullWidth
            autoFocus
            autoComplete="off"
            variant="outlined"
            type="text"
            value={values.title}
            onChange={handleChange("title")}
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
          {whatIsBeingAdded === "subcategory" && (
            <FormControl fullWidth className="mb-5">
              <InputLabel
                id="category-select-label"
                sx={{
                  fontFamily: "Kanit, 'sans-serif'",
                  fontWeight: { md: "400", lg: "400" },
                  fontSize: { md: 30, lg: 18 },
                  backgroundColor: "#FFFFFF",
                  marginRight: 2,
                }}
              >
                Dans quelle catégorie voulez-vous l'ajouter ?
              </InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={values.targetedCategoryName}
                label="Dans quelle catégorie voulez-vous l'ajouter ?"
                onChange={(event: SelectChangeEvent<string | number>) => {
                  setValues({
                    ...values,
                    targetedCategoryName: event.target.value,
                  });
                }}
              >
                <MenuItem value="choose" className="font-kanit font-light">
                  Choisir
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem
                    key={category.CategoryId}
                    value={category.CategoryName}
                    className="font-kanit"
                  >
                    {category.CategoryTitle}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <div className="w-full flex items-center justify-center h-72 border-2 border-dashed border-primary rounded-xl mt-5">
            <TextField type="file" onChange={handleChangeCategoryImage} />
          </div>
        </form>
      </div>
      <CategoryAddedSnakbar
        open={openCategoryAddedSnackbar}
        setOpen={setOpenCategoryAddedSnackbar}
        whatHasBeenAdded={whatIsBeingAdded}
        title={values.title}
      />
    </Dialog>
  );
};

export default AddCategoryOrSubCategoryDialog;
