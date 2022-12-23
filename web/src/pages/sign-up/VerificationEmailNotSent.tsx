import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const VerificationEmailNotSent = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={props.handleClose}
      aria-describedby="verification-email-failed-dialog-description"
    >
      <DialogTitle className="font-kanit">
        Vérification de votre adresse email
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className="font-kanit font-light"
          id="verification-email-success-failed-description"
        >
          Votre compte a été crée avec succès. Cependant nous n'avons pas pu
          vous avoyer un mail de vérification, vous pouvez en redemander un
          ultérieurement.
          <br /> Ce protocol nous permet d'&ecirc;tre s&ucirc;r que cette
          adresse vous appartient.
          <br /> Merci.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={props.handleClose}
          className="font-kanit bg-primary"
        >
          D'accord
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerificationEmailNotSent;
