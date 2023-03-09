import {
  Dialog,
  Grow,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { AnimatedButton } from "../../../components/core";
import { Neighborhood } from "../../../data/models/Neighborhood";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { Admin } from "../../../data/models/Admin";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SuccessSnackbar from "../../../components/core/suucess-snackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../components/core/error-snackbar/ErrorSnackbar";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshDeliverers: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

type ValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  neighborhoodId: string;
  completeAddress: string;
};

type ErrorType =
  | "EMAIL_IS_REQUIRED"
  | "EMAIL_ALREADY_TAKEN"
  | "NEIGHBORHOOD_NOT_FOUND"
  | "PHONE_NUMBER_ALREADY_TAKEN"
  | "PHONE_NUMBER_IS_REQUIRED"
  | "NEIGHBORHOOD_IS_REQUIRED"
  | "INVALID_EMAIL"
  | "INVALID_PHONE_NUMBER"
  | "NEIGHBORHOOD_IS_REQUIRED"
  | "ADMIN_NOT_FOUND"
  | "DELIVERER_CREATED_SUCCESSFULLY_BUT_SOMETHING_WENT_WRONG_WHILE_SENDING_THE_EMAIL"
  | "INVALID_BIRTHDATE"
  | "NONE";

const AddDeliveryDialog = ({ open, setOpen, refreshDeliverers }: Props) => {
  const authenticatedAdmin = useAppSelector(
    (state: RootState) => state.authenticatedAdmin.admin
  ) as Admin;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [values, setValues] = React.useState<ValuesType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    neighborhoodId: "",
    completeAddress: "",
  });

  const [neighborhoods, setNeighborhoods] = React.useState<Neighborhood[]>([]);
  React.useEffect(() => {
    const getNeighborhoods = async () => {
      let url = process.env.REACT_APP_API_URL + "neighborhoods";
      let response = await fetch(url);
      let content = await response.json();
      if (content.success) {
        let data = content.data;
        for (let i of data) {
          setNeighborhoods((n) => [
            ...n,
            {
              neighborhoodId: i.neighborhoodId,
              neighborhoodName: i.neighborhoodName,
            },
          ]);
        }
      } else {
        setOpen(true);
      }
    };
    getNeighborhoods();
  }, []);

  const [error, setError] = React.useState<ErrorType>("NONE");
  const navigate = useNavigate();
  const save = async () => {
    if (values.email === "") {
      setError("EMAIL_IS_REQUIRED");
      return;
    } else if (
      !values.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setError("INVALID_EMAIL");
      return;
    } else if (values.phoneNumber === "") {
      setError("PHONE_NUMBER_IS_REQUIRED");
      return;
    } else if (
      values.phoneNumber.length < 8 ||
      values.phoneNumber.length > 8 ||
      isNaN(Number(values.phoneNumber))
    ) {
      setError("INVALID_PHONE_NUMBER");
      return;
    } else if (values.neighborhoodId === "") {
      setError("NEIGHBORHOOD_IS_REQUIRED");
      return;
    } else setError("NONE");
    setIsLoading(true);
    if (authenticatedAdmin === null) navigate("/admin-sign-in");
    else {
      let url = process.env.REACT_APP_API_URL + "users/create-deliverer";
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          adminGuid: authenticatedAdmin.UserGuid,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          completeAddress: values.completeAddress,
          birthDate: values.birthDate === "" ? null : values.birthDate,
          neighborhoodId: values.neighborhoodId,
        }),
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
        },
      });
      let content = await response.json();
      console.log(content);
      if (content.success) {
        setOpenSuccessSnackbar(true);

        setValues({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          birthDate: "",
          neighborhoodId: "",
          completeAddress: "",
        });
        await refreshDeliverers();
        setTimeout(() => setOpen(false), 6000);
      } else {
        if (content.message === "NEIGHBORHOOD_NOT_FOUND") {
          setError("NEIGHBORHOOD_NOT_FOUND");
        } else if (content.message === "THIS_PHONE_NUMBER_IS_ALREADY_TAKEN")
          setError("PHONE_NUMBER_ALREADY_TAKEN");
        else if (content.message === "THIS_EMAIL_ADDRESS_IS_ALREADY_TAKEN")
          setError("EMAIL_ALREADY_TAKEN");
        else if (content.message === "ADMIN_NOT_FOUND") {
          setError("ADMIN_NOT_FOUND");
          setOpenErrorSnackbar(true);
        } else if (
          content.message ===
          "DELIVERER_CREATED_SUCCESSFULLY_BUT_SOMETHING_WENT_WRONG_WHILE_SENDING_THE_EMAIL"
        ) {
          setError(
            "DELIVERER_CREATED_SUCCESSFULLY_BUT_SOMETHING_WENT_WRONG_WHILE_SENDING_THE_EMAIL"
          );
          setOpenErrorSnackbar(true);
          await refreshDeliverers();
        }
      }
    }
    setIsLoading(false);
  };

  const [openSuccessSnackbar, setOpenSuccessSnackbar] =
    React.useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="md"
      fullWidth
      TransitionComponent={Transition}
    >
      <div className="w-full px-10 py-5">
        <div className="w-full flex justify-between mb-5">
          <div className="font-medium text-3xl">Ajout d'un livreur</div>
          <IconButton color="primary" onClick={() => setOpen(false)}>
            <MdOutlineClose />
          </IconButton>
        </div>
        <div className="w-full grid grid-cols-2 gap-5">
          <div className="">
            <label htmlFor="" className="font-normal">
              Prénom
            </label>
            <OutlinedInput
              fullWidth
              size="small"
              className="font-kanit font-light placeholder:font-kanit placeholder:font-light"
              placeholder="Entrez le prénom du livreur"
              value={values.firstName}
              onChange={(e) =>
                setValues((v) => ({ ...v, firstName: e.target.value }))
              }
            />
          </div>
          <div className="">
            <label htmlFor="" className="font-normal">
              Nom
            </label>
            <OutlinedInput
              fullWidth
              size="small"
              className="font-kanit font-light placeholder:font-kanit placeholder:font-light"
              placeholder="Entrez le nom du livreur"
              value={values.lastName}
              onChange={(e) =>
                setValues((v) => ({ ...v, lastName: e.target.value }))
              }
            />
          </div>
          <div className="">
            <label htmlFor="" className="font-normal">
              Email <span className="text-red-500">*</span>
            </label>
            <OutlinedInput
              fullWidth
              required
              type="email"
              size="small"
              className="font-kanit font-light placeholder:font-kanit placeholder:font-light"
              placeholder="Entrez l'adresse mail du livreur"
              value={values.email}
              onChange={(e) =>
                setValues((v) => ({ ...v, email: e.target.value }))
              }
              error={
                error === "EMAIL_IS_REQUIRED" ||
                error === "INVALID_EMAIL" ||
                error === "EMAIL_ALREADY_TAKEN"
              }
            />
            {error === "EMAIL_IS_REQUIRED" && (
              <small className="text-red-500">
                Vous devez renseigner l'adresse email du livreur.
              </small>
            )}
            {error === "INVALID_EMAIL" && (
              <small className="text-red-500">
                Cette adresse email n'est pas valide.
              </small>
            )}
            {error === "EMAIL_ALREADY_TAKEN" && (
              <small className="text-red-500">
                Cette adresse email est déja utilisé.
              </small>
            )}
          </div>
          <div className="">
            <label htmlFor="" className="font-normal">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <OutlinedInput
              fullWidth
              size="small"
              className="font-kanit font-light placeholder:font-kanit placeholder:font-light"
              placeholder="Entrez le numéro de téléphone du livreur"
              value={values.phoneNumber}
              onChange={(e) => {
                let value: string = e.target.value;
                if (
                  value.length <= 8 &&
                  !isNaN(Number(value)) &&
                  !value.includes("e")
                )
                  setValues((v) => ({ ...v, phoneNumber: value }));
              }}
              error={
                error === "INVALID_PHONE_NUMBER" ||
                error === "PHONE_NUMBER_IS_REQUIRED" ||
                error === "PHONE_NUMBER_ALREADY_TAKEN"
              }
            />
            {error === "INVALID_PHONE_NUMBER" && (
              <small className="text-red-500">
                Ce numéro de téléphone est invalide.
              </small>
            )}
            {error === "PHONE_NUMBER_IS_REQUIRED" && (
              <small className="text-red-500">
                Vous devez renseigner le numéro de téléphone du livreur.
              </small>
            )}
            {error === "PHONE_NUMBER_ALREADY_TAKEN" && (
              <small className="text-red-500">
                Ce numéro de téléphone est déja utilisé.
              </small>
            )}
          </div>
          <div className="">
            <label htmlFor="" className="font-normal">
              Date de naissance
            </label>
            <OutlinedInput
              fullWidth
              type="date"
              size="small"
              className="font-kanit font-light placeholder:font-kanit placeholder:font-light"
              placeholder="Entrez le numéro de téléphone du livreur"
              value={values.birthDate}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  birthDate: moment(new Date(e.target.value)).format(
                    "YYYY-MM-DD"
                  ),
                }))
              }
              error={error === "INVALID_BIRTHDATE"}
            />
          </div>
          <div className="">
            <label htmlFor="" className="font-normal">
              Secteur <span className="text-red-500">*</span>
            </label>
            <Select
              fullWidth
              value={values.neighborhoodId}
              onChange={(e) => {
                setValues((v) => ({ ...v, neighborhoodId: e.target.value }));
              }}
              size="small"
              error={
                (error === "NEIGHBORHOOD_IS_REQUIRED" &&
                  values.neighborhoodId === "") ||
                error === "NEIGHBORHOOD_NOT_FOUND"
              }
              className="font-kanit font-light"
            >
              <MenuItem value="" className="font-kanit font-light"></MenuItem>
              {neighborhoods.map((n, index) => (
                <MenuItem
                  key={index}
                  value={n.neighborhoodId.toString()}
                  className="font-kanit font-light"
                >
                  {n.neighborhoodName}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="col-span-2">
            <label htmlFor="" className="font-normal">
              Adresse complète
            </label>
            <OutlinedInput
              fullWidth
              size="small"
              className="font-kanit font-light placeholder:font-kanit placeholder:font-light"
              placeholder="Entrez l'adresse du livreur"
              multiline
              rows={2}
              value={values.completeAddress}
              onChange={(e) =>
                setValues((v) => ({ ...v, completeAddress: e.target.value }))
              }
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <div className="w-40">
              <AnimatedButton
                text="Confirmer"
                isLoading={isLoading}
                handleClick={() => save()}
              />
            </div>
          </div>
        </div>
      </div>
      <SuccessSnackbar
        open={openSuccessSnackbar}
        setOpen={setOpenSuccessSnackbar}
        text="Vous venez d'ajouter un livreur"
      />
      <ErrorSnackbar
        open={openErrorSnackbar}
        setOpen={setOpenErrorSnackbar}
        text={
          error ===
          "DELIVERER_CREATED_SUCCESSFULLY_BUT_SOMETHING_WENT_WRONG_WHILE_SENDING_THE_EMAIL"
            ? "Le livreur a été ajouté avec succès mais une erreur s'est produite lors de l'envoi du mail de confirmation."
            : error === "ADMIN_NOT_FOUND"
            ? "Vous n'etes pas autorisé à effectuer cette opération."
            : ""
        }
      />
    </Dialog>
  );
};

export default AddDeliveryDialog;
