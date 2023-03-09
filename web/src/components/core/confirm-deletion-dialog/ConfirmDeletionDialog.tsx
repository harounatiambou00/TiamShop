import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

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
  const [deletionInProgress, setDeletionInProgress] =
    React.useState<boolean>(false);
  const handleDelete = async () => {
    setDeletionInProgress(true);
    await deletionAction();
    setDeletionInProgress(false);
  };
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
          className="font-kanit font-light"
          id="confirm-deletion-alert-dialog-description"
        >
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpen(false)}
          className="font-kanit normal-case font-light"
          size="small"
        >
          Annuler
        </Button>
        <LoadingButton
          onClick={() => {
            handleDelete();
          }}
          loading={deletionInProgress}
          color="error"
          variant="outlined"
          startIcon={<AiOutlineDelete />}
          loadingPosition="start"
          className="font-kanit font-light"
          size="small"
        >
          Confirmer
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeletionDialog;
