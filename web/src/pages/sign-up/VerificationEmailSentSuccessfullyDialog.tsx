import {
  Alert,
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

const VerificationEmailSentSuccessfullyDialog = (props: Props) => {
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
          Votre compte a été crée avec succès. Un email de confirmation vous a
          été envoyé, vous y trouverez un lien qui vous permettra de confirmer
          votre inscription.
          <br /> Ce protocol nous permet d'&ecirc;tre s&ucirc;r que cette
          adresse vous appartient.
          <br /> Merci.
          <Alert
            variant="outlined"
            severity="warning"
            className="mt-2 text-amber-400 font-kanit"
          >
            NB: Si vous ne recevez aucun mail, vérifier dans votre bo&icirc;te
            spams.
          </Alert>
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

export default VerificationEmailSentSuccessfullyDialog;
