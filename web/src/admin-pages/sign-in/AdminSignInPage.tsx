import React from "react";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  FormHelperText,
} from "@mui/material";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AnimatedButton } from "../../components/core";

import { useNavigate } from "react-router-dom";
import SignInPagePanel from "./SignInPagePanel";

const AdminSignInPage = () => {
  const navigate = useNavigate();
  interface State {
    guid: string;
    email: string;
    password: string;
    showPassword: boolean;
  }

  const [values, setValues] = React.useState({
    guid: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const [incorrectGuid, setIncorrectGuid] = React.useState(false);
  const incorrectGuidMessage =
    "Identifiant invalide.Un guid est une chaîne de 36 caractères avec 5 parties séparées par des traits d'union (-). La première et la dernière partie contiennent 8 caractères chacune et les autres 4 caractères chacune";
  const [incorrectEmail, setIncorrectEmail] = React.useState(false);
  const [incorrectPassword, setIncorrectPassword] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {}, [isLoading]);

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
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

  const signIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let user = {
      userGuid: values.guid,
      email: values.email,
      password: values.password,
    };

    let url = process.env.REACT_APP_API_URL + "auth/admins/sign-in";
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let content = await response.json();

    if (!content.success) {
      if (content.message === "ADMIN_NOT_FOUND") {
        setIncorrectGuid(true);
        setIncorrectEmail(false);
        setIncorrectPassword(false);
      } else if (content.message === "INCORRECT_EMAIL") {
        setIncorrectGuid(false);
        setIncorrectEmail(true);
        setIncorrectPassword(false);
      } else if (content.message === "INCORRECT_PASSWORD") {
        setIncorrectGuid(false);
        setIncorrectEmail(false);
        setIncorrectPassword(true);
      }
    } else {
      setIncorrectGuid(false);
      setIncorrectEmail(false);
      setIncorrectPassword(false);
      navigate("/admin");
    }
    console.log(content);
    setIsLoading(false);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background">
      <div className="h-full w-full flex">
        <SignInPagePanel />
        <div className="w-2/6 h-full flex flex-col p-5 overflow-y-scroll">
          <div className="h-full sm:w-0 lg:w-2 bg-secondary fixed left-0"></div>
          <img
            src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
            alt="logo"
            className="h-16 w-16 mb-2"
          />
          <h1 className="text-2xl font-medium opacity-70">
            Bienvenue cher administrateur
          </h1>
          <h1 className="opacity-60">
            Veuillez vous connecter pour pouvoir accéder à votre tableau de
            bord.
          </h1>

          <div className="w-full flex flex-col justify-center mt-10 font-Kanit">
            <TextField
              autoFocus
              fullWidth
              error={incorrectGuid ? true : false}
              helperText={incorrectGuid ? incorrectGuidMessage : ""}
              variant="outlined"
              type="text"
              label="Identifiant"
              required
              placeholder="Ex: 00000000-0000-0000-0000-00000000"
              className="mb-7"
              value={values.guid}
              onChange={handleChange("guid")}
              InputLabelProps={{
                sx: {
                  fontFamily: "Kanit, 'sans-serif'",
                },
              }}
              inputProps={{
                sx: {
                  fontFamily: "Kanit, 'sans-serif'",
                },
              }}
            />
            <TextField
              variant="outlined"
              type="email"
              label="Adresse Email"
              error={incorrectEmail ? true : false}
              helperText={incorrectEmail ? "Adresse email incorrect" : ""}
              placeholder="Ex: exemple@gmail.com"
              className="mb-7"
              value={values.email}
              onChange={handleChange("email")}
              InputLabelProps={{
                sx: {
                  fontFamily: "Kanit, 'sans-serif'",
                },
              }}
              inputProps={{
                sx: {
                  fontFamily: "Kanit, 'sans-serif'",
                },
              }}
            />

            <FormControl className="w-full" variant="outlined">
              <InputLabel
                htmlFor="app-admin-login-password-input"
                className=""
                sx={{
                  fontFamily: "Kanit, 'sans-serif",
                  bgcolor: "white",
                }}
              >
                Mot de passe
              </InputLabel>
              <OutlinedInput
                id="app-admin-login-password-input"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                error={incorrectPassword ? true : false}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Mot de passe"
              />
              {incorrectPassword && (
                <FormHelperText className="text-red-500">
                  Mot de passe incorrect
                </FormHelperText>
              )}
            </FormControl>
            <span className="text-end underline text-blue-400 font-light mt-3 cursor-pointer">
              Mot de passe oublié ?
            </span>
          </div>
          <div className="mt-10">
            <AnimatedButton
              handleClick={signIn}
              text="Sign in"
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignInPage;
