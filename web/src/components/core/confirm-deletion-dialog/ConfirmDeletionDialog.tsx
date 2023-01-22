import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  text: string;
  deletionAction: () => void;
};

const ConfirmDeletionDialog = ({
  open,
  setOpen,
  title,
  text,
  deletionAction,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-deletion-alert-dialog-title"
      aria-describedby="confirm-deletion-alert-dialog-description"
    >
      <DialogTitle
        id="confirm-deletion-alert-dialog-title"
        className="font-kanit"
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className="font-kanit"
          id="confirm-deletion-alert-dialog-description"
        >
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Annuler</Button>
        <Button onClick={deletionAction} color="error">
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeletionDialog;
