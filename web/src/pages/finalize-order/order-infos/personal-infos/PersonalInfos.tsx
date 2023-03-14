import React from "react";
import { useAppSelector } from "../../../../hooks/redux-custom-hooks/useAppSelector";
import { Button, Divider, OutlinedInput, Slide } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../redux/store";
import { OrderToBeMadeType } from "../../../../redux/slices/orderToBeMadeSlice";

type Props = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  values: OrderToBeMadeType;
  setValues: React.Dispatch<React.SetStateAction<OrderToBeMadeType>>;
};

type ErrorType =
  | "FIRST_NAME_IS_REQUIRED"
  | "FIRST_NAME_MUST_CONTAIN_AT_LEAST_3_LETTERS"
  | "LAST_NAME_IS_REQUIRED"
  | "LAST_NAME_MUST_CONTAIN_AT_LEAST_3_LETTERS"
  | "EMAIL_IS_REQUIRED"
  | "INVALID_EMAIL"
  | "PHONE_NUMBER_IS_REQUIRED"
  | "INVALID_PHONE_NUMBER"
  | "NONE";

const PersonalInfos = ({
  activeStep,
  setActiveStep,
  values,
  setValues,
}: Props) => {
  const authenticatedClient = useAppSelector(
    (state: RootState) => state.authenticatedClient.client
  );
  const navigate = useNavigate();
  const [error, setError] = React.useState<ErrorType>("NONE");
  const handleContinue = () => {
    if (values.ordererFirstName.length === 0) {
      setError("FIRST_NAME_IS_REQUIRED");
      return;
    } else if (values.ordererFirstName.length < 3) {
      setError("FIRST_NAME_MUST_CONTAIN_AT_LEAST_3_LETTERS");
      return;
    } else if (values.ordererLastName?.length === 0) {
      setError("LAST_NAME_IS_REQUIRED");
      return;
    } else if (values.ordererLastName.length < 3) {
      setError("LAST_NAME_MUST_CONTAIN_AT_LEAST_3_LETTERS");
      return;
    } else if (values.ordererEmail.length === 0) {
      setError("EMAIL_IS_REQUIRED");
      return;
    } else if (
      !values.ordererEmail
        .toLocaleLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setError("INVALID_EMAIL");
      return;
    } else if (values.ordererPhoneNumber?.length === 0) {
      setError("PHONE_NUMBER_IS_REQUIRED");
      return;
    } else if (!values.ordererPhoneNumber.match(/^[2-9][0-9]{7}$/)) {
      setError("INVALID_PHONE_NUMBER");
      return;
    } else setError("NONE");
    setActiveStep(1);
  };
  return (
    <div className="w-full grid grid-cols-2 gap-5">
      <div className={authenticatedClient !== null ? "hidden" : "col-span-2"}>
        <div className="w-full grid grid-cols-2 gap-5 mb-5">
          <Button
            variant="contained"
            className="bg-primary font-kanit mx-5 font-light sm:text-2xl lg:text-sm"
            onClick={() => navigate("/sign-up")}
          >
            Créer un compte
          </Button>
          <Button
            variant="outlined"
            className="font-kanit mx-5 font-light sm:text-2xl lg:text-sm"
            onClick={() => navigate("/sign-in")}
          >
            Se connecter
          </Button>
        </div>
        <Divider className="font-kanit font-medium sm:text-2xl lg:text-sm">
          OU
        </Divider>
      </div>
      <div className="">
        <label htmlFor="" className="mb-1 sm:text-2xl lg:text-base font-medium">
          Prénom
        </label>
        <OutlinedInput
          fullWidth
          size="small"
          className="bg-white font-kanit font-normal sm:h-20 lg:h-10 sm:text-2xl lg:text-base"
          value={values.ordererFirstName}
          onChange={(e) =>
            setValues((current) => ({
              ...current,
              ordererFirstName: e.target.value,
            }))
          }
          error={
            error === "FIRST_NAME_IS_REQUIRED" ||
            error === "FIRST_NAME_MUST_CONTAIN_AT_LEAST_3_LETTERS"
          }
          disabled={authenticatedClient !== null}
        />
        <small className="text-red-600 font-kanit font-normal">
          {error === "FIRST_NAME_IS_REQUIRED"
            ? "Vous devez saisir votre prénom."
            : error === "FIRST_NAME_MUST_CONTAIN_AT_LEAST_3_LETTERS"
            ? "Un prénom doit contenir au moins trois lettres."
            : ""}
        </small>
      </div>
      <div className="">
        <label htmlFor="" className="mb-1 sm:text-2xl lg:text-base font-medium">
          Nom
        </label>
        <OutlinedInput
          fullWidth
          size="small"
          className="bg-white font-kanit font-normal sm:h-20 lg:h-10 sm:text-2xl lg:text-base"
          value={values.ordererLastName}
          onChange={(e) =>
            setValues((current) => ({
              ...current,
              ordererLastName: e.target.value,
            }))
          }
          error={
            error === "LAST_NAME_IS_REQUIRED" ||
            error === "LAST_NAME_MUST_CONTAIN_AT_LEAST_3_LETTERS"
          }
          disabled={authenticatedClient !== null}
        />
        <small className="text-red-600 font-kanit font-normal">
          {error === "LAST_NAME_IS_REQUIRED"
            ? "Vous devez saisir votre nom."
            : error === "LAST_NAME_MUST_CONTAIN_AT_LEAST_3_LETTERS"
            ? "Un nom doit contenir au moins trois lettres."
            : ""}
        </small>
      </div>
      <div className="">
        <label htmlFor="" className="mb-1 sm:text-2xl lg:text-base font-medium">
          Email
        </label>
        <OutlinedInput
          fullWidth
          size="small"
          className="bg-white font-kanit font-normal sm:h-20 lg:h-10 sm:text-2xl lg:text-base"
          value={values.ordererEmail}
          onChange={(e) =>
            setValues((current) => ({
              ...current,
              ordererEmail: e.target.value,
            }))
          }
          error={error === "EMAIL_IS_REQUIRED" || error === "INVALID_EMAIL"}
          disabled={authenticatedClient !== null}
        />
        <small className="text-red-600 font-kanit font-normal">
          {error === "EMAIL_IS_REQUIRED"
            ? "Vous devez saisir votre adresse mail."
            : error === "INVALID_EMAIL"
            ? "Veuillez saisr une adresse email valide."
            : ""}
        </small>
      </div>
      <div className="">
        <label htmlFor="" className="mb-1 sm:text-2xl lg:text-base font-medium">
          Numéro de téléphone
        </label>
        <OutlinedInput
          fullWidth
          size="small"
          className="bg-white font-kanit font-normal sm:h-20 lg:h-10 sm:text-2xl lg:text-base"
          value={values.ordererPhoneNumber}
          onChange={(e) =>
            setValues((current) => {
              let value = e.target.value;
              if (!isNaN(Number(value)) && value.length <= 8)
                return {
                  ...current,
                  ordererPhoneNumber: value,
                };
              else return current;
            })
          }
          error={
            error === "PHONE_NUMBER_IS_REQUIRED" ||
            error === "INVALID_PHONE_NUMBER"
          }
          disabled={authenticatedClient !== null}
        />
        <small className="text-red-600 font-kanit font-normal">
          {error === "PHONE_NUMBER_IS_REQUIRED"
            ? "Vous devez saisir votre numéro de téléphone."
            : error === "INVALID_PHONE_NUMBER"
            ? "Veuillez saisr un numéro de téléphone valide."
            : ""}
        </small>
      </div>
      <div className="col-span-2 w-full flex justify-end mt-5">
        <Button
          variant="contained"
          className="bg-primary font-raleway normal-case sm:text-2xl lg:text-base"
          onClick={() => handleContinue()}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfos;
