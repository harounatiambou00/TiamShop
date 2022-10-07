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
} from "@mui/material";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AnimatedButton } from "../../components/core";

import { State } from "./formGroupState";

const FormGroup: React.FC = () => {
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    neighborhood: "",
    completeAddress: "",
    showPassword: false,
    showConfirmPassword: false,
  });

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

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleChangeNeighborhood = (event: SelectChangeEvent) => {
    setValues({ ...values, neighborhood: event.target.value });
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
          variant="outlined"
          type="text"
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
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            className="font-kanit sm:font-normal lg:font-light"
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
        </FormControl>
        <FormControl
          required
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
        </FormControl>
        <TextField
          autoComplete="off"
          type="date"
          placeholder="Date de naissance"
          label="Date de naissance"
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
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TextField
        autoComplete="off"
        fullWidth
        variant="outlined"
        type="text"
        label="Votre adresse complète"
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
          handleClick={() => {}}
          text="S'inscricre"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default FormGroup;
