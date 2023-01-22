import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

type Props = {
  open: boolean;
  handleClose: () => void;
  deletionAction: (id: number) => {};
  userId: number;
  deletionIsLoading: boolean;
};

const DeletionAlert = ({
  open,
  handleClose,
  deletionAction,
  userId,
  deletionIsLoading,
}: Props) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="deletion-alert-dialog-title"
        aria-describedby="deletion-alert-dialog-description"
      >
        <DialogTitle
          id="deletion-alert-dialog-title"
          className="font-kanit font-normal text-lg"
        >
          Voulez-vous vraiment supprimer le compte de cet utilisateur?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="deletion-alert-dialog-description"
            className="font-kanit font-light text-base"
          >
            Cette action est irréversible, une fois que vous appuyez sur
            CONFIRMER le compte sera supprimer definitivement. Et de ce fait
            tout ce qui est lié à ce client sera aussi supprimé, son panier, ses
            commandes, etc ...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="text-gray-800 font-kanit font-normal"
          >
            Annuler
          </Button>
          {deletionIsLoading ? (
            <LoadingButton loading variant="outlined" color="error">
              Confirmer
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              color="error"
              className="bg-red-600 font-kanit font-normal"
              onClick={() => deletionAction(userId)}
            >
              Confirmer
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeletionAlert;
