import {
  AppBar,
  Button,
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slide,
  TextField,
  Toolbar,
} from "@mui/material";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { MdOutlineClose } from "react-icons/md";
import { BiSave } from "react-icons/bi";
import { AiOutlineLink } from "react-icons/ai";
import moment from "moment";
import BrandAddedSnackbar from "./BrandAddedSnackbar";
import { LoadingButton } from "@mui/lab";

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
};

const AddBrandDialog = ({ open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  const [brandImage, setBrandImage] = React.useState<File | null>(null);

  const [brandName, setBrandName] = React.useState("");
  const [brandWebsiteLink, setBrandWebsiteLink] = React.useState("");
  const [brandIsPartner, setBrandIsPartner] = React.useState(false);

  const [savingIsLoading, setSavingIsLoading] = React.useState(false);

  const handleChangeBrandImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    event.currentTarget &&
      event.currentTarget.files &&
      setBrandImage(event.currentTarget.files[0]);
  };

  const handleSave = async () => {
    setSavingIsLoading(true);
    if (brandImage && brandName) {
      let url = process.env.REACT_APP_API_URL + "brands";
      const formData = new FormData();
      formData.append("imageFile", brandImage);
      formData.append("BrandName", brandName);
      formData.append(
        "PartnershipDate",
        brandIsPartner ? moment().format().substring(0, 19) : ""
      );
      let response = await fetch(url, { method: "POST", body: formData });
      let content = await response.json();
      if (content.success) {
        setSavingIsLoading(false);
        setOpenBrandAddedSnackbar(true);
      }
    }
    setSavingIsLoading(false);
  };

  const [openBrandAddedSnackbar, setOpenBrandAddedSnackbar] =
    React.useState(false);

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
            Ajout d'une nouvelle marque
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
      <div className="my-5 h-full flex items-center justify-center">
        <form className="w-3/8">
          <TextField
            label="Nom de la marque"
            fullWidth
            autoFocus
            autoComplete="off"
            variant="outlined"
            type="text"
            value={brandName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBrandName(e.currentTarget.value)
            }
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
            className="w-full mt-5"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                height: { md: 100, lg: 55 },
                fontSize: { md: 30, lg: 18 },
              },
            }}
          >
            <InputLabel
              htmlFor="app-admin-add-brand-link-input"
              className=""
              sx={{
                fontFamily: "Kanit, 'sans-serif'",
                bgcolor: "white",
                fontWeight: { md: "400", lg: "400" },
                fontSize: { md: 30, lg: 18 },
              }}
            >
              Entrer le lien du site web de la marque
            </InputLabel>
            <OutlinedInput
              autoComplete="off"
              className="font-kanit font-normal"
              id="app-admin-add-brand-link-input"
              type="url"
              value={brandWebsiteLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBrandWebsiteLink(e.currentTarget.value)
              }
              endAdornment={
                <InputAdornment position="end" className="">
                  <AiOutlineLink className="text-3xl text-primary" />
                </InputAdornment>
              }
              label="Entrer le lien du site web de la marque"
            />
          </FormControl>
          <div className="w-full flex items-center justify-center h-72 border-2 border-dashed border-primary rounded-xl mt-5">
            <TextField type="file" onChange={handleChangeBrandImage} />
          </div>
          <FormControlLabel
            sx={{
              "& .MuiFormControlLabel-label": {
                fontFamily: "Kanit, 'sans-serif'",
              },
            }}
            control={
              <Checkbox
                value={brandIsPartner}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBrandIsPartner(e.currentTarget.checked)
                }
              />
            }
            label="Marque partenaire ?"
            className="mt-2"
          />
        </form>
      </div>
      <BrandAddedSnackbar
        open={openBrandAddedSnackbar}
        setOpen={setOpenBrandAddedSnackbar}
      />
    </Dialog>
  );
};
export default AddBrandDialog;
