import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinearProgress } from "../../components/core";
import { SlideUpTransition } from "../../components/core/slide-up-transition/SlideUpTransition";

import { BiErrorAlt } from "react-icons/bi";
import { MdDone } from "react-icons/md";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [verificationSucceeded, setVerificationSucceeded] =
    React.useState<boolean>(false);
  const handleClose = () => {
    setIsLoading(true);
    navigate("/");
  };

  React.useEffect(() => {
    const verifyEmail = async () => {
      setIsLoading(true);
      let url =
        process.env.REACT_APP_API_URL + "auth/verify-email?token=" + token;
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let content = await response.json();
      console.log(content);
      if (content.success) {
        setVerificationSucceeded(true);
      } else {
        setVerificationSucceeded(false);
      }
      setIsLoading(false);
    };

    verifyEmail();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-3/6">
          <LinearProgress />
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen flex items-center justify-center">
        <Dialog
          open={!isLoading}
          TransitionComponent={SlideUpTransition}
          keepMounted
          onClose={handleClose}
          aria-describedby="email-verification-dialog-description"
        >
          <DialogTitle
            className={
              verificationSucceeded
                ? "font-kanit flex items-center text-green-900 sm:text-3xl lg:text-2xl"
                : "font-kanit flex items-center text-red-600 sm:text-3xl lg:text-2xl"
            }
          >
            {verificationSucceeded ? (
              <MdDone className="inline mr-5 sm:text-6xl lg:text-4xl" />
            ) : (
              <BiErrorAlt className="inline mr-5 sm:text-6xl lg:text-4xl" />
            )}
            {verificationSucceeded
              ? "Votre email a été confirmé avec succès."
              : "Votre lien de validation est invalide."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              className="font-kanit font-light sm:text-2xl lg:text-lg"
              id="email-verification-dialog-description"
            >
              {verificationSucceeded
                ? "Votre compte vient d'être validé, vous pouvez à présent y accéder et réaliser toutes les transactions possibles. Nous nous excusons de vous avoir fait perdre votre temps, mais cela nous aidera à assurer la sécurité de votre compte à l'avenir."
                : "Oops, nous n'avons pas pu valider votre adresse email. Veuillez créer un compte avec votre propre adresse email. Cette mesure nous permet d'éviter qu'un client s'inscrit avec une adresse qui ne lui appartient pas."}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              className="bg-primary font-kanit font-light sm:text-2xl lg:text-base"
            >
              D'accord
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};
export default VerifyEmail;
