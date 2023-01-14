import { Alert, IconButton, Slide, SlideProps, Snackbar } from "@mui/material";
import React from "react";
import { MdOutlineClose } from "react-icons/md";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  whatHasBeenAdded: string;
  title: string;
};

type TransitionProps = Omit<SlideProps, "direction">;
function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const CategoryAddedSnakbar = ({
  open,
  setOpen,
  whatHasBeenAdded,
  title,
}: Props) => {
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
        La{" "}
        {whatHasBeenAdded === "category" ? " catégorie " : " sous-catégorie "} "
        {title}" a été ajouté avec succès.
      </Alert>
    </Snackbar>
  );
};

export default CategoryAddedSnakbar;
