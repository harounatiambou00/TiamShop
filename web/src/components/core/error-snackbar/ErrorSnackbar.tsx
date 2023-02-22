import { Alert, IconButton, Slide, SlideProps, Snackbar } from "@mui/material";
import React from "react";
import { MdOutlineClose } from "react-icons/md";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
};

type TransitionProps = Omit<SlideProps, "direction">;
function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const ErrorSnackbar = ({ open, setOpen, text }: Props) => {
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
        severity="error"
        onClose={() => setOpen(false)}
        className="font-kanit"
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
