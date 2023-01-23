import React from "react";
import SuccessSnackbar from "../../../components/core/suucess-snackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../components/core/error-snackbar/ErrorSnackbar";
import { AppBar, Dialog, IconButton, Slide, Toolbar } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { BiArrowBack, BiSave } from "react-icons/bi";
import { LoadingButton } from "@mui/lab";
import Form from "./Form";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddProductDialog = ({ open, setOpen }: Props) => {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] =
    React.useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);

  const [savingIsLoading, setSavingIsLoading] = React.useState<boolean>(false);
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      TransitionComponent={Transition}
      className="bg-gray-100"
    >
      <div className="h-full w-full flex flex-col bg-white">
        <AppBar elevation={1}>
          <Toolbar className="h-20 flex justify-between bg-white">
            <IconButton onClick={() => setOpen(false)} color="primary">
              <BiArrowBack />
            </IconButton>
            <h1 className="font-raleway text-primary font-bold text-xl ml-4 flex-1">
              Ajout d'un nouveau produit
            </h1>
            <LoadingButton
              variant="outlined"
              startIcon={<BiSave />}
              loading={savingIsLoading}
              size="large"
              className="font-raleway"
            >
              Enregistrer
            </LoadingButton>
          </Toolbar>
        </AppBar>
        <div className="h-20 w-full"></div>
        <Form />
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
  );
};

export default AddProductDialog;
