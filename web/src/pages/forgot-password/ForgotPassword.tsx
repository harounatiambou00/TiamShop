import { Alert, Button, IconButton, Snackbar, TextField } from "@mui/material";
import React from "react";
import {
  EmailErrorMessages,
  EmailErrorType,
  ErrorTypes,
  phoneNumberErrorMessages,
  PhoneNumberErrorType,
  ValuesState,
} from "./types";

import { RiCloseLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { AnimatedButton } from "../../components/core";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [values, setValues] = React.useState<ValuesState>({
    email: "",
    phoneNumber: "",
    recoverWithPhoneNumber: false,
  });

  const [errors, setErrors] = React.useState<ErrorTypes>({
    emailError: false,
    phoneNumberError: false,
  });

  const [emailErrorType, setEmailErrorType] =
    React.useState<EmailErrorType>("none");

  const [phoneNumberErrorType, setPhoneNumberErrorType] =
    React.useState<PhoneNumberErrorType>("none");

  const [isLoading, setIsLoading] = React.useState(false);

  const toggleRecoverWithPhoneNumber = () => {
    setValues((currentValues) => ({
      ...currentValues,
      recoverWithPhoneNumber: !values.recoverWithPhoneNumber,
    }));
  };

  /**
   * handle the onChange event of our email input and
   * check the validity of the current email
   */
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, email: event.target.value });
    if (event.target.value === "") {
      setErrors((currentState) => ({
        ...currentState,
        emailError: true,
      }));
      setEmailErrorType("isRequired");
    } else if (
      //we will check if the current email match email regex expression
      !event.target.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setErrors((currentState) => ({
        ...currentState,
        emailError: true,
      }));
      setEmailErrorType("isInvalid");
    } else {
      setErrors((currentState) => ({
        ...currentState,
        emailError: false,
      }));
      setEmailErrorType("none");
    }
  };

  /**
   * handle the onChange event of our phone number input and
   * check the validity of the current phoneNumber
   */
  const handleChangePhoneNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isNaN(Number(event.target.value))) {
      if (event.target.value.length !== 8) {
        setErrors({ ...errors, phoneNumberError: true });
        setPhoneNumberErrorType("isInvalid");
        setValues({ ...values, phoneNumber: event.target.value });
      } else {
        setErrors({ ...errors, phoneNumberError: false });
        setPhoneNumberErrorType("none");
        setValues({ ...values, phoneNumber: event.target.value });
      }
    }
  };

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const handleCloseSuccessSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessSnackbar(false);
    navigate("/sign-in");
  };

  const recoverPassword = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    if (values.recoverWithPhoneNumber) {
      if (!errors.phoneNumberError) {
        if (values.phoneNumber === "") {
          setErrors((currentErrors) => ({
            ...currentErrors,
            phoneNumberError: true,
          }));
          setPhoneNumberErrorType("isRequired");
          setIsLoading(false);
          return;
        } else {
          setErrors((currentErrors) => ({
            ...currentErrors,
            phoneNumberError: false,
          }));
          setPhoneNumberErrorType("none");
        }

        let url = `${process.env.REACT_APP_API_URL}auth/recover-password-with-phone-number?phoneNumber=${values.phoneNumber}`;
        let response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let content = await response.json();
        if (content.success) {
          setErrors((currentState) => ({
            ...currentState,
            phoneNumberError: false,
          }));
          setPhoneNumberErrorType("none");
          navigate("/");
        } else {
          setErrors((currentErrors) => ({
            ...currentErrors,
            phoneNumberError: true,
          }));
          setPhoneNumberErrorType("isIncorrect");
        }
      }
    } else {
      if (!errors.emailError) {
        if (values.email === "") {
          setErrors((currentErrors) => ({
            ...currentErrors,
            emailError: true,
          }));
          setEmailErrorType("isRequired");
          setIsLoading(false);
          return;
        } else {
          setErrors((currentErrors) => ({
            ...currentErrors,
            emailError: false,
          }));
          setEmailErrorType("none");
        }

        let url = `${process.env.REACT_APP_API_URL}auth/recover-password-with-email?email=${values.email}`;
        let response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let content = await response.json();
        if (content.success) {
          setErrors((currentState) => ({
            ...currentState,
            emailError: false,
          }));
          setEmailErrorType("none");
          setOpenSuccessSnackbar(true);
        } else {
          setErrors((currentErrors) => ({
            ...currentErrors,
            emailError: true,
          }));
          setEmailErrorType("isIncorrect");
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="sm:h-full sm:w-full lg:h-4/6 lg:w-4/6 lg:bg-white lg:drop-shadow-lg md:p-5">
        <IconButton onClick={() => navigate(-1)} className="" size="large">
          <IoIosArrowBack className="sm:text-5xl lg:text-base" />
        </IconButton>
        <div className="sm:h-full lg:h-auto sm:w-full lg:w-auto sm:flex lg:block flex-col items-center justify-center">
          <h1 className="sm:text-5xl lg:text-3xl font-medium text-gray-500 mt-2 text-center">
            Vous avez oublié votre mot de passe ?
          </h1>
          <h1 className="sm:text-4xl lg:text-lg font-light text-gray-500 text-center">
            Ne vous inquietez pas, nous allons y remedier en deux temps trois
            mouvements.
          </h1>
          <form className="w-full flex flex-col sm:px-2 lg:px-16 lg:py-10">
            {!values.recoverWithPhoneNumber && (
              <TextField
                required
                fullWidth
                autoFocus
                autoComplete="off"
                variant="outlined"
                label="Email"
                type="email"
                placeholder="Veuillez entrer votre adresse email"
                value={values.email}
                onChange={handleChangeEmail}
                error={errors.emailError}
                helperText={
                  errors.emailError && emailErrorType !== "none"
                    ? EmailErrorMessages[emailErrorType]
                    : ""
                }
                FormHelperTextProps={{
                  sx: {
                    fontFamily: "Kanit, 'sans-serif'",
                    fontSize: { xs: 30, lg: 15 },
                  },
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    height: { md: 100, lg: 55 },
                    fontSize: { md: 30, lg: 18 },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontFamily: "Kanit, 'sans-serif'",
                    fontWeight: { md: "500", lg: "400" },
                    fontSize: { md: 30, lg: 18 },
                  },
                  shrink: true,
                }}
                inputProps={{
                  sx: {
                    fontFamily: "Raleway, 'sans-serif'",
                    fontWeight: { md: "500", lg: "400" },
                  },
                }}
                className="sm:mt-10 lg:mt-0"
              />
            )}
            {values.recoverWithPhoneNumber && (
              <TextField
                required
                fullWidth
                autoComplete="off"
                autoFocus
                variant="outlined"
                type="text"
                label="Numéro de télephone"
                placeholder="Veuillez entrer votre numéro de téléphone"
                value={values.phoneNumber}
                onChange={handleChangePhoneNumber}
                error={errors.phoneNumberError}
                helperText={
                  errors.phoneNumberError && phoneNumberErrorType !== "none"
                    ? phoneNumberErrorMessages[phoneNumberErrorType]
                    : ""
                }
                FormHelperTextProps={{
                  sx: {
                    fontFamily: "Kanit, 'sans-serif'",
                    fontSize: { xs: 30, lg: 12 },
                  },
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    height: { md: 100, lg: 55 },
                    fontSize: { md: 30, lg: 18 },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontFamily: "Kanit, 'sans-serif'",
                    fontWeight: { md: "500", lg: "400" },
                    fontSize: { md: 30, lg: 18 },
                  },
                  shrink: true,
                }}
                inputProps={{
                  sx: {
                    fontFamily: "Raleway, 'sans-serif'",
                    fontWeight: { md: "500", lg: "400" },
                  },
                }}
                className="sm:mt-10 lg:mt-0"
              />
            )}
            <div className="mt-5 sm:w-full lg:w-6/12 uppercase">
              <AnimatedButton
                handleClick={recoverPassword}
                text="Changer mon mot de passe"
                isLoading={isLoading}
              />
            </div>
            <div className="flex justify-end">
              <div className="sm:mt-10 lg:mt-2 sm:w-full lg:w-6/12 uppercase">
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={toggleRecoverWithPhoneNumber}
                  className="mt-3 font-raleway font-normal sm:text-3xl lg:text-base"
                >
                  Utilisez votre{" "}
                  {values.recoverWithPhoneNumber
                    ? "adresse email"
                    : "numéro de téléphone"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseSuccessSnackbar}
        message=""
      >
        <Alert
          severity="success"
          className="font-kanit text-gray-600"
          action={
            <IconButton onClick={handleCloseSuccessSnackbar} size="small">
              <RiCloseLine />
            </IconButton>
          }
        >
          Un lien vous a été envoyé par mail, utilisez le pour changer de mot de
          passe.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
