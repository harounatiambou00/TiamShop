import React from "react";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AnimatedButton } from "../../components/core";

import {
  EmailErrorMessages,
  EmailErrorType,
  Errors,
  FormGroupInputsTypes,
  phoneNumberErrorMessages,
  PhoneNumberErrorType,
} from "./types";
import { Neighborhood } from "../../data/models/Neighborhood";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import VerificationEmailSentSuccessfullyDialog from "./VerificationEmailSentSuccessfullyDialog";

const FormGroup: React.FC = () => {
  const navigate = useNavigate();
  const [openEmailSentDialog, setOpenEmailSentDialog] = React.useState(false);
  const handleCloseEmailSentDialog = () => {
    setOpenEmailSentDialog(false);
    navigate("/");
  };
  const [neighborhoods, setNeighborhoods] = React.useState<Neighborhood[]>([]);
  React.useEffect(() => {
    const getNeighborhoods = async () => {
      let url = "https://localhost:7254/api/Neighborhood";
      let response = await fetch(url);
      let content = await response.json();
      let data = content.data;
      let neighborhoods = [];
      if (data != null) {
        for (var neighborhood of data) {
          neighborhoods.push({
            neighborhoodId: neighborhood.neighborhoodId,
            neighborhoodName: neighborhood.neighborhoodName,
          } as Neighborhood);
        }
      }

      setNeighborhoods(neighborhoods as Neighborhood[]);
    };
    getNeighborhoods();
  }, []);

  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    neighborhood: "",
    completeAddress: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [birthDate, setBirthDate] = React.useState(
    moment().format("YYYY-MM-DD")
  );
  const [errors, setErrors] = React.useState({
    emailError: false,
    phoneNumberError: false,
    passwordError: false,
    neighborhoodError: false,
  });

  const [phoneNumberErrorType, setPhoneNumberErrorType] =
    React.useState<PhoneNumberErrorType>("none");

  const [emailErrorType, setEmailErrorType] =
    React.useState<EmailErrorType>("none");

  const handleChange =
    (prop: keyof FormGroupInputsTypes) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleChangeBirthDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBirthDate(moment(new Date(event.target.value)).format("YYYY-MM-DD"));
  };

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

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: event.target.value });
    if (event.target.value.length < 8) {
      setErrors({ ...errors, passwordError: true });
    } else {
      setErrors({ ...errors, passwordError: false });
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const signUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    //Checking the required fields
    if (values.email === "") {
      setErrors((currentState) => ({ ...currentState, emailError: true }));
      setEmailErrorType("isRequired");
      return;
    } else {
      setErrors((currentState) => ({ ...currentState, emailError: false }));
    }
    if (values.phoneNumber === "") {
      setErrors((currentState) => ({
        ...currentState,
        phoneNumberError: true,
      }));
      setPhoneNumberErrorType("isRequired");
      return;
    } else {
      setErrors((currentState) => ({
        ...currentState,
        phoneNumberError: false,
      }));
    }
    if (values.password === "") {
      setErrors((currentState) => ({ ...currentState, passwordError: true }));
      return;
    } else {
      setErrors((currentState) => ({
        ...currentState,
        passwordError: false,
      }));
    }
    if (values.neighborhood === "") {
      setErrors((currentState) => ({
        ...currentState,
        neighborhoodError: true,
      }));
      return;
    } else {
      setErrors((currentState) => ({
        ...currentState,
        neighborhoodError: false,
      }));
    }

    setIsLoading(true);

    let url = "https://localhost:7254/auth/sign-up";
    let request = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      completeAddress: values.completeAddress,
      birthDate: birthDate,
      password: values.password,
      neighborhoodId: Number(values.neighborhood),
    };

    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let content = await response.json();
    if (content != null) {
      if (content.success) {
        //The client has been registered and the verification email is sent successfully
        if (content.message === "EMAIL_SENT_SUCCESSFULLY") {
          setOpenEmailSentDialog(true);
        }
        //The client has been registered but the verification email failed
        else {
        }
      } else {
        if (content.message === "") {
        } else if (
          content.message === "THE_PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS"
        ) {
        } else if (content.message === "THIS_PHONE_NUMBER_IS_ALREADY_TAKEN") {
          setErrors((currentState) => ({
            ...currentState,
            phoneNumberError: true,
          }));
          setPhoneNumberErrorType("isAlreadyTaken");
        } else if (content.message === "THIS_EMAIL_ADDRESS_IS_ALREADY_TAKEN") {
          setErrors((currentState) => ({ ...currentState, emailError: true }));
          setEmailErrorType("isAlreadyTaken");
        } else if (
          content.message === "REQUIRED_FIELDS_ARE_NOT_COMPLETLY_FILLED"
        ) {
        } else if (content.message === "CLIENT_CREATION_FAILED") {
        }
      }
    }

    setIsLoading(false);
  };

  const handleChangeNeighborhood = (event: SelectChangeEvent) => {
    setValues({ ...values, neighborhood: event.target.value });
    setErrors((currentState) => ({
      ...currentState,
      neighborhoodError: false,
    }));
  };

  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <form className="w-full mt-10 sm:pt-10 lg:p-0">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-16 lg:gap-5">
        <TextField
          autoFocus
          autoComplete="off"
          variant="outlined"
          type="text"
          value={values.firstName}
          onChange={handleChange("firstName")}
          label="Prénom"
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
              fontFamily: "Kanit, 'sans-serif'",
              fontWeight: { md: "400", lg: "300" },
            },
          }}
        />
        <TextField
          autoComplete="off"
          variant="outlined"
          type="text"
          label="Nom"
          value={values.lastName}
          onChange={handleChange("lastName")}
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
              fontFamily: "Kanit, 'sans-serif'",
              fontWeight: { md: "400", lg: "300" },
            },
          }}
        />
        <TextField
          required
          autoComplete="off"
          error={errors.emailError}
          helperText={
            errors.emailError && emailErrorType !== "none"
              ? EmailErrorMessages[emailErrorType]
              : ""
          }
          variant="outlined"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          label="Email"
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
              fontFamily: "Kanit, 'sans-serif'",
              fontWeight: { md: "400", lg: "300" },
            },
          }}
        />
        <TextField
          required
          error={errors.phoneNumberError}
          helperText={
            errors.phoneNumberError && phoneNumberErrorType !== "none"
              ? phoneNumberErrorMessages[phoneNumberErrorType]
              : ""
          }
          value={values.phoneNumber}
          onChange={handleChangePhoneNumber}
          autoComplete="off"
          variant="outlined"
          type="text"
          label="Numéro de télephone"
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
        />
        <FormControl
          className="w-full"
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
              bgcolor: "white",
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
                  onMouseDown={handleMouseDownPassword}
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
          {errors.passwordError && (
            <FormHelperText className="text-red-500">
              Un mot de passe doit contenir au moins 8 caractères
            </FormHelperText>
          )}
        </FormControl>
        <FormControl
          required
          error={values.confirmPassword !== values.password}
          className="w-full"
          variant="outlined"
          sx={{
            "& .MuiInputBase-root": {
              height: { md: 100, lg: 55 },
              fontSize: { md: 30, lg: 18 },
            },
          }}
        >
          <InputLabel
            htmlFor="app-client-sign-up-confirm-password-input"
            className=""
            sx={{
              fontFamily: "Kanit, 'sans-serif'",
              bgcolor: "white",
              fontWeight: { md: "500", lg: "400" },
              fontSize: { md: 30, lg: 18 },
            }}
          >
            Confirmer votre mot de passe
          </InputLabel>
          <OutlinedInput
            autoComplete="off"
            className="font-kanit sm:font-normal lg:font-light"
            id="app-client-sign-up-confirm-password-input"
            type={values.showConfirmPassword ? "text" : "password"}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {values.showConfirmPassword ? (
                    <AiOutlineEyeInvisible className="sm:text-5xl lg:text-xl" />
                  ) : (
                    <AiOutlineEye className="sm:text-5xl lg:text-xl" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Confirmer votre mot de passe"
          />
          {values.confirmPassword !== values.password && (
            <FormHelperText className="text-red-500">
              Les deux mots de passe sont différents
            </FormHelperText>
          )}
        </FormControl>
        <TextField
          type="date"
          placeholder="Date de naissance"
          label="Date de naissance"
          value={birthDate}
          onChange={handleChangeBirthDate}
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
              fontFamily: "Kanit, 'sans-serif'",
              fontWeight: { md: "400", lg: "300" },
            },
          }}
        />
        <FormControl
          fullWidth
          error={errors.neighborhoodError}
          sx={{
            "& .MuiInputBase-root": {
              height: { md: 100, lg: 55 },
              fontSize: { md: 30, lg: 18 },
            },
          }}
        >
          <InputLabel
            id="app-client-sign-up-neighborhood-select-label"
            className="font-kanit sm:font-medium lg:font-normal"
            sx={{
              fontFamily: "Kanit, 'sans-serif'",
              bgcolor: "white",
              fontWeight: { md: "500", lg: "400" },
              fontSize: { md: 30, lg: 18 },
            }}
          >
            Votre Quartier
          </InputLabel>
          <Select
            autoComplete="off"
            labelId="app-client-sign-up-neighborhood-select-label"
            id="app-client-sign-up-neighborhood-select"
            value={values.neighborhood}
            onChange={handleChangeNeighborhood}
            label="Votre Quartier"
            inputProps={{
              sx: {
                fontFamily: "Kanit, 'sans-serif'",
                fontWeight: { md: "400", lg: "300" },
              },
            }}
          >
            {neighborhoods.map((neighborhood) => {
              return (
                <MenuItem
                  key={neighborhood.neighborhoodId}
                  value={neighborhood.neighborhoodId}
                  className="font-kanit"
                >
                  {neighborhood.neighborhoodName}
                </MenuItem>
              );
            })}
          </Select>
          {errors.neighborhoodError && (
            <FormHelperText className="text-red-500">
              Vous devez renseigner votre quartier.
            </FormHelperText>
          )}
        </FormControl>
      </div>
      <TextField
        autoComplete="off"
        fullWidth
        variant="outlined"
        type="text"
        label="Votre adresse complète"
        value={values.completeAddress}
        onChange={handleChange("completeAddress")}
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
            fontFamily: "Kanit, 'sans-serif'",
            fontWeight: { md: "400", lg: "300" },
          },
        }}
        className="sm:mt-16 lg:mt-7"
      />
      <div className="sm:mt-20 lg:mt-10 font-light sm:text-2xl lg:text-base opacity-70">
        En créant ce compte, vous confirmer avoir lu, compris, et accepter nos{" "}
        <span className="text-blue-500 underline cursor-pointer">
          conditions d'utilisations
        </span>{" "}
        et{" "}
        <span className="text-blue-500 underline cursor-pointer">
          notre polique de ventes
        </span>{" "}
        .
      </div>
      <div className="sm:mt-10 lg:mt-3 sm:w-2/6 lg:w-1/6">
        <AnimatedButton
          handleClick={signUp}
          text="S'inscricre"
          isLoading={isLoading}
        />
      </div>
      <VerificationEmailSentSuccessfullyDialog
        open={openEmailSentDialog}
        handleClose={handleCloseEmailSentDialog}
      />
    </form>
  );
};

export default FormGroup;
