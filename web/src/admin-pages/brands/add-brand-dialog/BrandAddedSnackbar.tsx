import { Alert, IconButton, Slide, SlideProps, Snackbar } from "@mui/material";
import React from "react";

import { MdOutlineClose } from "react-icons/md";

type TransitionProps = Omit<SlideProps, "direction">;
function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BrandAddedSnackbar = ({ open, setOpen }: Props) => {
  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={TransitionUp}
      autoHideDuration={6000}
      action={
        <IconButton onClick={() => setOpen(false)}>
          <MdOutlineClose />
        </IconButton>
      }
    >
      <Alert
        variant="outlined"
        severity="success"
        onClose={() => setOpen(false)}
        className="font-kanit"
      >
        La marque a été ajouté avec succès.
      </Alert>
    </Snackbar>
  );
};

export default BrandAddedSnackbar;
