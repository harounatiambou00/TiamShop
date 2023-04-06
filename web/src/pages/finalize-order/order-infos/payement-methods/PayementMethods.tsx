import { LoadingButton } from "@mui/lab";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

type Props = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  handleConfirm: () => void;
  isLoading: boolean;
};

const payementMethods = [
  {
    title: "Payement à la livraison",
    description:
      "Vous êtes plutôt septique à l'idée de payer en ligne. Ne prenez aucun risque, payez comptant à la livraison. Votre argent ne vous quitteras qu'une fois la commande livrée.",
  },
  {
    title: "Airtel money",
    description:
      "Utilisez votre compte airtel money pour effectuer le payement; Rapide et Simple.",
  },
  {
    title: "Orange money",
    description:
      "Utilisez votre compte orange money pour effectuer le payement; Rapide et Simple.",
  },
  {
    title: "Payement par chèque",
    description: "Nous acceptons aussi les chèques.",
  },
];

const PayementMethods = ({
  setActiveStep,
  handleConfirm,
  isLoading,
}: Props) => {
  const [policiesAccepted, setPoliciesAccepted] = React.useState(false);
  return (
    <div className="w-full">
      <div className="flex flex-col sm:w-full lg:w-3/4 mt-2">
        {payementMethods.map((p, index) => (
          <div key={index} className="px-4 py-2 border-y relative">
            <h1 className="sm:text-4xl lg:text-xl font-normal">
              {p.title}{" "}
              {index !== 0 && index !== 3 && (
                <small className="bg-red-100 text-red-600 px-2 rounded-full ml-1 sm:text-md lg:text-xs sm:font-light lg:font-normal">
                  Indisponible pour le moment.
                </small>
              )}
            </h1>
            <p className="sm:text-3xl lg:text-base">{p.description}</p>
            <Checkbox
              checked={false}
              disabled={index !== 0 && index !== 3}
              icon={
                <MdCheckBoxOutlineBlank className="sm:text-4xl lg:text-xl" />
              }
              checkedIcon={<MdCheckBox className="sm:text-4xl lg:text-xl" />}
              className="absolute right-1 top-1"
            />
          </div>
        ))}
      </div>
      <FormControlLabel
        className="mt-5"
        control={
          <Checkbox
            checked={policiesAccepted}
            onChange={(e) => setPoliciesAccepted(e.target.checked)}
            icon={<MdCheckBoxOutlineBlank className="sm:text-4xl lg:text-xl" />}
            checkedIcon={<MdCheckBox className="sm:text-4xl lg:text-xl" />}
          />
        }
        label={
          <span className="font-kanit font-light sm:text-xl lg:text-sm">
            J'ai lu les{" "}
            <span className="underline underline-offset-4 text-blue-600">
              conditions de vente
            </span>{" "}
            ,{" "}
            <span className="underline underline-offset-4 text-blue-600">
              notre politique de livraison
            </span>{" "}
            et{" "}
            <span className="underline underline-offset-4 text-blue-600">
              notre politique de remboursement
            </span>{" "}
            et je les accepte toutes.
          </span>
        }
      />
      <div className="w-full flex justify-between items-center mt-8">
        <Button
          onClick={() => setActiveStep(1)}
          className="h-fit normal-case sm:text-2xl lg:text-base font-kanit"
          disabled={isLoading}
        >
          Retour
        </Button>
        <LoadingButton
          disabled={!policiesAccepted}
          loading={isLoading}
          onClick={handleConfirm}
          variant="contained"
          className={
            policiesAccepted && !isLoading
              ? "bg-amber-400 sm:text-4xl lg:text-lg text-primary font-kanit font-normal"
              : "sm:text-3xl lg:text-lg font-kanit font-normal"
          }
        >
          Confirmer la commande
        </LoadingButton>
      </div>
    </div>
  );
};

export default PayementMethods;
