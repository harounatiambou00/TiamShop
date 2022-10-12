import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import { RiCloseLine } from "react-icons/ri";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AnimatedButton } from "../../components/core";
import { InputTypes } from "./types";

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  //Used to handle onChange event of the values that don't need validation such as firsName, lastName, completeAddress.
  const handleChange =
    (prop: keyof InputTypes) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  /**
   * handle the onChange event of our password input and
   * check the validity of the current password
   */
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: event.target.value });
    if (event.target.value.length < 8) {
      setErrors({ ...errors, passwordError: true });
    } else {
      setErrors({ ...errors, passwordError: false });
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

  /**
   * toggle the password input visibility
   */
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const [errors, setErrors] = React.useState({
    passwordError: false,
  });

  const [isLoading, setIsLoading] = React.useState(false);

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

  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
  const handleCloseErrorSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackbar(false);
    navigate("/sign-in");
  };

  const resetPassword = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!errors.passwordError && values.password === values.confirmPassword) {
      if (values.password === "") {
        setErrors((currentErrors) => ({
          ...currentErrors,
          passwordError: true,
        }));
        setIsLoading(false);
        return;
      } else {
        setErrors((currentErrors) => ({
          ...currentErrors,
          passwordError: false,
        }));
      }
      let url = process.env.REACT_APP_API_URL + "auth/reset-password";
      let request = {
        token: token,
        newPassword: values.password,
      };

      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let content = await response.json();
      if (content.success) {
        setOpenSuccessSnackbar(true);
        setOpenErrorSnackbar(false);
      } else {
        setOpenErrorSnackbar(true);
        setOpenSuccessSnackbar(false);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="sm:h-full sm:w-full lg:h-4/6 lg:w-4/6 lg:bg-white lg:drop-shadow-lg md:p-5">
        <div className="sm:h-full lg:h-auto sm:w-full lg:w-auto sm:flex lg:block flex-col items-center justify-center">
          <h1 className="sm:text-5xl lg:text-3xl font-medium text-gray-500 mt-2 text-center">
            Créez un nouveau mot de passe
          </h1>
          <h1 className="sm:text-4xl lg:text-base font-light text-gray-500 text-center lg:px-10">
            Pour des messures de securité, votre mot de passe doit contenir au
            minimum 8 caractères. Aussi, nous vous conseillons de fournir un mot
            de passe contenant des lettres, des chiffres et éventuellement des
            caratères spéciaux.
          </h1>
          <form className="w-full flex flex-col sm:px-2 sm:py-0 lg:px-16 lg:py-10">
            <FormControl
              className="w-full sm:mt-16 lg:mt-0 lg:mb-5"
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
                Nouveau mot de passe
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
                label="Nouveau mot de passe"
              />
              {errors.passwordError && (
                <FormHelperText className="text-red-500 font-kanit sm:text-3xl lg:text-xs">
                  Un mot de passe doit contenir au moins 8 caractères
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              required
              error={values.confirmPassword !== values.password}
              className="w-full sm:mt-10 lg:mt-0"
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
                <FormHelperText className="text-red-500 font-kanit sm:text-3xl lg:text-xs">
                  Les deux mots de passe sont différents
                </FormHelperText>
              )}
            </FormControl>
            <div className="sm:mt-16 lg:mt-5 sm:w-full lg:w-3/12 uppercase">
              <AnimatedButton
                handleClick={resetPassword}
                text="Confirmer"
                isLoading={isLoading}
              />
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
          Votre mot de passe a été modifié avec succès.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseErrorSnackbar}
      >
        <Alert
          severity="error"
          className="font-kanit text-gray-600"
          action={
            <IconButton onClick={handleCloseSuccessSnackbar} size="small">
              <RiCloseLine />
            </IconButton>
          }
        >
          Votre lien est soit invalide soit expiré. Veuillez en redemander un
          autre.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ResetPassword;
