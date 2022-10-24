import React from "react";

import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  FormGroup,
  FormHelperText,
} from "@mui/material";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { AnimatedButton } from "../../components/core";

import {
  EmailErrorMessages,
  EmailErrorType,
  ErrorTypes,
  PasswordErrorMessages,
  PasswordErrorType,
  phoneNumberErrorMessages,
  PhoneNumberErrorType,
  ValuesState,
} from "./types";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState<ValuesState>({
    email: "",
    phoneNumber: "",
    password: "",
    showPassword: false,
    signInWithPhoneNumber: false,
    remenberMe: true,
  });

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

  const toggleSignInWithPhoneNumber = () => {
    setValues({
      ...values,
      signInWithPhoneNumber: !values.signInWithPhoneNumber,
    });
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

  /**
   * handle the onChange event of our password input and
   * check the validity of the current password
   */
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: event.target.value });
    if (event.target.value.length < 8) {
      setErrors({ ...errors, passwordError: true });
      setPasswordErrorType("isInvalid");
    } else {
      setErrors({ ...errors, passwordError: false });
      setPasswordErrorType("none");
    }
  };

  /**
   * toggle the password input visibility
   */
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const [errors, setErrors] = React.useState<ErrorTypes>({
    emailError: false,
    phoneNumberError: false,
    passwordError: false,
  });

  const [emailErrorType, setEmailErrorType] =
    React.useState<EmailErrorType>("none");

  const [phoneNumberErrorType, setPhoneNumberErrorType] =
    React.useState<PhoneNumberErrorType>("none");

  const [passwordErrorType, setPasswordErrorType] =
    React.useState<PasswordErrorType>("none");

  const [isLoading, setIsLoading] = React.useState(false);

  const login = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (values.signInWithPhoneNumber) {
      if (!errors.phoneNumberError && !errors.passwordError) {
        setIsLoading(true);
        if (values.phoneNumber === "") {
          setErrors((currentState) => ({
            ...currentState,
            phoneNumberError: true,
          }));
          setPhoneNumberErrorType("isRequired");
          //If the phoneNumber field is not filled, we want to stop the function
          setIsLoading(false);
          return;
        } else {
          setErrors((currentState) => ({
            ...currentState,
            phoneNumberError: false,
          }));
        }
        if (values.password === "") {
          setErrors((currentState) => ({
            ...currentState,
            passwordError: true,
          }));
          setPasswordErrorType("isRequired");
          //If the password field is not filled, we want to stop the function
          setIsLoading(false);
          return;
        } else {
          setErrors((currentState) => ({
            ...currentState,
            passwordError: false,
          }));
          setPasswordErrorType("none");
        }

        let url =
          process.env.REACT_APP_API_URL + "auth/sign-in-with-phone-number";

        let request = {
          phoneNumber: values.phoneNumber,
          password: values.password,
          remenberMe: values.remenberMe,
        };
        let response = await fetch(url, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(request),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let content = await response.json();
        if (content.success) {
          navigate("/");
          setErrors((currentState) => ({
            ...currentState,
            passwordError: false,
          }));
          setPasswordErrorType("none");

          setErrors((currentState) => ({
            ...currentState,
            phoneNumberError: false,
          }));
          setPhoneNumberErrorType("none");
        } else {
          if (
            content.message === "CLIENT_NOT_FOUND" ||
            content.message === "INCORRECT_PHONE_NUMBER"
          ) {
            setErrors((currentState) => ({
              ...currentState,
              phoneNumberError: true,
            }));
            setPhoneNumberErrorType("isIncorrect");
          } else if (content.message === "INCORRECT_PASSWORD") {
            setErrors((currentState) => ({
              ...currentState,
              passwordError: true,
            }));
            setPasswordErrorType("isIncorrect");
          }
        }
      }
    } else {
      if (!errors.emailError && !errors.passwordError) {
        setIsLoading(true);
        if (values.email === "") {
          setErrors((currentState) => ({ ...currentState, emailError: true }));
          setEmailErrorType("isRequired");
          //If the email field is not filled, we want to stop the function
          setIsLoading(false);
          return;
        } else {
          setErrors((currentState) => ({ ...currentState, emailError: false }));
        }
        if (values.password === "") {
          setErrors((currentState) => ({
            ...currentState,
            passwordError: true,
          }));
          setPasswordErrorType("isRequired");
          //If the password field is not filled, we want to stop the function
          setIsLoading(false);
          return;
        } else {
          setErrors((currentState) => ({
            ...currentState,
            passwordError: false,
          }));
          setPasswordErrorType("none");
        }

        let url = process.env.REACT_APP_API_URL + "auth/sign-in-with-email";

        let request = {
          email: values.email,
          password: values.password,
          remenberMe: values.remenberMe,
        };
        let response = await fetch(url, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(request),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let content = await response.json();
        if (content.success) {
          navigate("/");

          setErrors((currentState) => ({
            ...currentState,
            passwordError: false,
          }));
          setPasswordErrorType("none");

          setErrors((currentState) => ({
            ...currentState,
            emailError: false,
          }));
          setEmailErrorType("none");
        } else {
          if (
            content.message === "CLIENT_NOT_FOUND" ||
            content.message === "INCORRECT_EMAIL"
          ) {
            setErrors((currentState) => ({
              ...currentState,
              emailError: true,
            }));
            setEmailErrorType("isIncorrect");
          } else if (content.message === "INCORRECT_PASSWORD") {
            setErrors((currentState) => ({
              ...currentState,
              passwordError: true,
            }));
            setPasswordErrorType("isIncorrect");
          }
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <form className="mt-5">
      {!values.signInWithPhoneNumber && (
        <TextField
          required
          fullWidth
          autoFocus
          autoComplete="off"
          variant="outlined"
          label="Email"
          type="email"
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
          }}
          inputProps={{
            sx: {
              fontFamily: "Raleway, 'sans-serif'",
              fontWeight: { md: "500", lg: "400" },
            },
          }}
          className="sm:mt-10 lg:mt-2"
        />
      )}
      {values.signInWithPhoneNumber && (
        <TextField
          required
          fullWidth
          autoComplete="off"
          autoFocus
          variant="outlined"
          type="text"
          label="Numéro de télephone"
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
          }}
          inputProps={{
            sx: {
              fontFamily: "Raleway, 'sans-serif'",
              fontWeight: { md: "500", lg: "400" },
            },
          }}
          className="sm:mt-10 lg:mt-2"
        />
      )}
      <FormControl
        className="w-full sm:mt-16 lg:mt-5"
        variant="outlined"
        required
        error={errors.passwordError}
        sx={{
          "& .MuiInputBase-root": {
            height: { md: 100, lg: 55 },
            fontSize: { md: 30, lg: 18 },
          },
        }}
      >
        <InputLabel
          htmlFor="app-client-sign-up-password-input"
          className=""
          sx={{
            fontFamily: "Kanit, 'sans-serif'",
            fontWeight: { md: "500", lg: "400" },
            fontSize: { md: 30, lg: 18 },
          }}
        >
          Mot de passe
        </InputLabel>
        <OutlinedInput
          autoComplete="off"
          id="app-client-sign-up-password-input"
          value={values.password}
          onChange={handleChangePassword}
          className="font-kanit sm:font-normal lg:font-light"
          type={values.showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
                size="large"
              >
                {values.showPassword ? (
                  <AiOutlineEyeInvisible className="sm:text-5xl lg:text-xl" />
                ) : (
                  <AiOutlineEye className="sm:text-5xl lg:text-xl" />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Mot de passe"
        />
        {errors.passwordError && passwordErrorType !== "none" && (
          <FormHelperText className="text-red-500 font-kanit sm:text-3xl lg:text-xs">
            {PasswordErrorMessages[passwordErrorType]}
          </FormHelperText>
        )}
      </FormControl>
      <div className="flex justify-end">
        <span
          className="text-blue-500 underline sm:text-4xl lg:text-sm font-light flex justify-end cursor-pointer w-fit"
          onClick={() => navigate("/forgot-password")}
        >
          Mot de passe oublié ?
        </span>
      </div>
      <div className="w-full">
        <FormGroup className="w-fit mb-3 sm:text-4xl lg:text-base">
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: {
                      xs: "3.5rem",
                      lg: "1.5rem",
                    },
                  },
                }}
              />
            }
            label={
              <span className="font-kanit font-light sm:text-4xl lg:text-base">
                Rester connecté ?
              </span>
            }
          />
        </FormGroup>
        <AnimatedButton
          handleClick={login}
          text="Se connecter"
          isLoading={isLoading}
        />
      </div>
      <Divider
        textAlign="center"
        className="mt-3 text-gray-600 sm:text-4xl lg:text-base"
      >
        OU
      </Divider>
      <Button
        fullWidth
        variant="outlined"
        className="mt-3 font-kanit font-normal sm:text-4xl lg:text-base"
        onClick={toggleSignInWithPhoneNumber}
      >
        Ulitisez votre{" "}
        {values.signInWithPhoneNumber ? "adresse email" : "numéro de téléphone"}
      </Button>

      <small className="mt-10 sm:text-3xl lg:text-sm font-light flex justify-center">
        ©2021–2022&nbsp; &nbsp;
        <a
          href="https://radiant-bunny-7569fa.netlify.app/"
          className="underline text-blue-500"
          target="_blank"
          rel="noreferrer"
        >
          TIAMTECH CO
        </a>{" "}
        &nbsp; &nbsp;All Rights Reserved.
      </small>
    </form>
  );
};

export default SignInForm;
