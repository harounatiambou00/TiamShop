import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

import { BiSave } from "react-icons/bi";
import { Client } from "../../../data/models/AccountPageClient";
import { Neighborhood } from "../../../data/models/Neighborhood";
import {
  EmailErrorMessages,
  EmailErrorType,
  phoneNumberErrorMessages,
  PhoneNumberErrorType,
} from "./types";

type Props = {
  readOnly: boolean;
  client: Client;
  setReadOnly: Dispatch<SetStateAction<boolean>>;
};
const FormGroup = ({ readOnly, client, setReadOnly }: Props) => {
  const [neighborhoods, setNeighborhoods] = React.useState<Neighborhood[]>([]);
  React.useEffect(() => {
    /**
     * @returns Anytime the component in rendered we want to fetch the neighborhoos from the database so that the user can choose his neighborhood
     */
    const getNeighborhoods = async () => {
      let url = process.env.REACT_APP_API_URL + "neighborhoods";
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

  const [values, setValues] = React.useState<Client>({
    userId: client.userId,
    FirstName: client.FirstName,
    LastName: client.LastName,
    Email: client.Email,
    PhoneNumber: client.PhoneNumber,
    CompleteAddress: client.CompleteAddress,
    BirthDate: client.BirthDate,
    NeighborhoodId: client.NeighborhoodId,
  });

  React.useEffect(() => {
    setValues((prevValues) => ({ ...prevValues, userId: client.userId }));
    setValues((prevValues) => ({ ...prevValues, FirstName: client.FirstName }));
    setValues((prevValues) => ({ ...prevValues, LastName: client.LastName }));
    setValues((prevValues) => ({ ...prevValues, Email: client.Email }));
    setValues((prevValues) => ({
      ...prevValues,
      PhoneNumber: client.PhoneNumber,
    }));
    setValues((prevValues) => ({
      ...prevValues,
      CompleteAddress: client.CompleteAddress,
    }));
    setValues((prevValues) => ({ ...prevValues, BirthDate: client.BirthDate }));
    setValues((prevValues) => ({
      ...prevValues,
      NeighborhoodId: client.NeighborhoodId,
    }));
  }, [client]);

  //Used to handle onChange event of the values that don't need validation such as firsName, lastName, completeAddress.
  const handleChange =
    (prop: keyof Client) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  /**
   * handle the onChange event of our email input and
   * check the validity of the current email
   */
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, Email: event.target.value });
    if (event.target.value === "") {
      setErrors((currentState) => ({
        ...currentState,
        emailError: true,
      }));
      setEmailErrorType("isRequired");
    } else if (
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
        setValues({ ...values, PhoneNumber: event.target.value });
      } else {
        setErrors({ ...errors, phoneNumberError: false });
        setPhoneNumberErrorType("none");
        setValues({ ...values, PhoneNumber: event.target.value });
      }
    }
  };

  const handleChangeBirthDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues((prevValues) => ({
      ...prevValues,
      BirthDate: event.target.value,
    }));
  };

  const handleChangeNeighborhood = (event: SelectChangeEvent) => {
    setValues({ ...values, NeighborhoodId: event.target.value });
    setErrors((currentState) => ({
      ...currentState,
      neighborhoodError: false,
    }));
  };

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

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const save = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (
      !errors.emailError &&
      !errors.phoneNumberError &&
      !errors.neighborhoodError
    ) {
      //Checking the required fields
      if (values.Email === "") {
        setErrors((currentState) => ({ ...currentState, emailError: true }));
        setEmailErrorType("isRequired");
        //If the email field is not filled, we want to stop the function
        return;
      } else {
        setErrors((currentState) => ({ ...currentState, emailError: false }));
      }
      if (values.PhoneNumber === "") {
        setErrors((currentState) => ({
          ...currentState,
          phoneNumberError: true,
        }));
        setPhoneNumberErrorType("isRequired");
        //If the phoneNumber field is not filled, we want to stop the function
        return;
      } else {
        setErrors((currentState) => ({
          ...currentState,
          phoneNumberError: false,
        }));
      }
      if (values.NeighborhoodId === "" || values.NeighborhoodId === 0) {
        setErrors((currentState) => ({
          ...currentState,
          neighborhoodError: true,
        }));
        //If the password field is not filled, we want to stop the function
        return;
      } else {
        setErrors((currentState) => ({
          ...currentState,
          neighborhoodError: false,
        }));
      }

      setIsLoading(true);

      let url = process.env.REACT_APP_API_URL + "users/update-user";
      let request = {
        userId: values.userId,
        firstName: values.FirstName,
        lastName: values.LastName,
        email: values.Email,
        phoneNumber: values.PhoneNumber,
        completeAddress: values.CompleteAddress,
        birthDate: values.BirthDate,
        neighborhoodId: values.NeighborhoodId,
      };

      let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let content = await response.json();
      if (content != null) {
        if (content.success) {
          setReadOnly(true);
        } else {
          if (content.message === "EMAIL_IS_ALREADY_TAKEN") {
            setErrors((currentState) => ({
              ...currentState,
              emailError: true,
            }));
            setEmailErrorType("isAlreadyTaken");
          } else if (content.message === "PHONE_NUMBER_IS_ALREADY_TAKEN") {
            setErrors((currentState) => ({
              ...currentState,
              phoneNumberError: true,
            }));
            setPhoneNumberErrorType("isAlreadyTaken");
          } else if (content.message === "NEIGHBORHOOD_NOT_FOUND") {
            setErrors((currentState) => ({
              ...currentState,
              neighborhoodError: true,
            }));
          } else if (content.message === "USER_NOT_FOUND") {
          }
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <form className="w-full mt-10 sm:pt-10 lg:p-0">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-10 lg:gap-7">
        <TextField
          className="border-2"
          autoFocus
          value={values.FirstName}
          onChange={handleChange("FirstName")}
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
            shrink: true,
          }}
          inputProps={{
            sx: {
              fontFamily: "Kanit, 'sans-serif'",
              fontWeight: { md: "400", lg: "300" },
            },
          }}
          disabled={readOnly}
        />
        <TextField
          disabled={readOnly}
          autoComplete="off"
          variant="outlined"
          type="text"
          label="Nom"
          value={values.LastName}
          onChange={handleChange("LastName")}
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
        <TextField
          disabled={readOnly}
          required
          autoComplete="off"
          error={errors.emailError && !readOnly}
          helperText={
            errors.emailError &&
            !readOnly &&
            emailErrorType !== "none" &&
            EmailErrorMessages[emailErrorType]
          }
          FormHelperTextProps={{
            sx: {
              fontFamily: "Kanit, 'sans-serif'",
              fontSize: { xs: 30, lg: 12 },
            },
          }}
          variant="outlined"
          type="email"
          label="Email"
          value={values.Email}
          onChange={handleChangeEmail}
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
        <TextField
          disabled={readOnly}
          required
          error={errors.phoneNumberError && !readOnly}
          helperText={
            errors.phoneNumberError &&
            !readOnly &&
            phoneNumberErrorType !== "none" &&
            phoneNumberErrorMessages[phoneNumberErrorType]
          }
          FormHelperTextProps={{
            sx: {
              fontFamily: "Kanit, 'sans-serif'",
              fontSize: { xs: 30, lg: 12 },
            },
          }}
          autoComplete="off"
          variant="outlined"
          type="text"
          label="Numéro de télephone"
          value={values.PhoneNumber}
          onChange={handleChangePhoneNumber}
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
        />
        <TextField
          disabled={readOnly}
          type="date"
          placeholder="Date de naissance"
          label="Date de naissance"
          value={values.BirthDate}
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
          sx={{
            "& .MuiInputBase-root": {
              height: { md: 100, lg: 55 },
              fontSize: { md: 30, lg: 18 },
            },
          }}
        >
          <InputLabel
            id="app-client-account-details-neighborhood-select-label"
            className="font-kanit sm:font-medium lg:font-normal"
            shrink
            sx={{
              fontFamily: "Kanit, 'sans-serif'",
              bgcolor: "white",
              fontWeight: { md: "500", lg: "400" },
              fontSize: { md: 30, lg: 18 },
            }}
            disabled={readOnly}
          >
            Votre Quartier
          </InputLabel>
          <Select
            autoComplete="off"
            labelId="app-client-account-details-neighborhood-select-label"
            id="app-client-account-details-neighborhood-select"
            label="Votre Quartier"
            value={values.NeighborhoodId.toString()}
            onChange={handleChangeNeighborhood}
            disabled={readOnly}
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
          {errors.neighborhoodError && !readOnly && (
            <FormHelperText className="text-red-500 font-kanit sm:text-3xl lg:text-xs">
              Vous devez renseigner votre quartier.
            </FormHelperText>
          )}
        </FormControl>
      </div>
      <TextField
        disabled={readOnly}
        autoComplete="off"
        fullWidth
        variant="outlined"
        placeholder="Exemple:  Derrière ..., Devant ..., A coté de ..."
        type="text"
        label="Votre adresse complète"
        value={values.CompleteAddress}
        onChange={handleChange("CompleteAddress")}
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
        className="sm:mt-16 lg:mt-7 "
        helperText={
          <span className="sm:text-xl lg:text-xs">
            Cette addresse nous aide à vous situer au sein de votre quartier,
            merci de bien la choisir.
          </span>
        }
        FormHelperTextProps={{
          sx: {
            fontFamily: "Kanit, 'sans-serif'",
          },
        }}
      />
      <div className="sm:mt-8 lg:mt-5">
        <LoadingButton
          loading={isLoading && !readOnly}
          loadingPosition="start"
          variant="contained"
          className={
            readOnly ||
            errors.emailError ||
            errors.phoneNumberError ||
            errors.neighborhoodError
              ? "font-kanit normal-case font-normal sm:text-4xl lg:text-base"
              : isLoading
              ? "bg-primary text-white font-kanit normal-case font-normal sm:text-4xl lg:text-base"
              : "bg-primary font-kanit normal-case font-normal sm:text-4xl lg:text-base"
          }
          startIcon={<BiSave className="sm:text-4xl lg:text-base" />}
          size="large"
          disabled={
            readOnly ||
            errors.emailError ||
            errors.phoneNumberError ||
            errors.neighborhoodError
          }
          onClick={isLoading && !readOnly ? () => {} : save}
        >
          Enregistrer
        </LoadingButton>
      </div>
    </form>
  );
};

export default FormGroup;
