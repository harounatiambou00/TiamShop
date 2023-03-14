import React from "react";
import { OrderToBeMadeType } from "../../../../redux/slices/orderToBeMadeSlice";
import { Button, MenuItem, OutlinedInput, Select } from "@mui/material";
import { Neighborhood } from "../../../../data/models/Neighborhood";
import { BsInfoSquare } from "react-icons/bs";

type Props = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  values: OrderToBeMadeType;
  setValues: React.Dispatch<React.SetStateAction<OrderToBeMadeType>>;
};

type ErrorType = "NEIGHBORHOOD_IS_REQUIRED" | "ADDRESS_IS_REQUIRED" | "NONE";
const DeliveryAddress = ({
  activeStep,
  setActiveStep,
  values,
  setValues,
}: Props) => {
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
    setNeighborhoods([]);
    getNeighborhoods();
  }, []);
  const [error, setError] = React.useState<ErrorType>("NONE");
  const handleContinue = () => {
    if (values.neighborhoodId === 0) {
      setError("NEIGHBORHOOD_IS_REQUIRED");
      return;
    } else if (values.ordererCompleteAddress === "") {
      setError("ADDRESS_IS_REQUIRED");
      return;
    } else setError("NONE");
    setActiveStep(2);
  };
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-2 gap-5 mt-2">
        <div className="">
          <label
            htmlFor=""
            className="mb-1 sm:text-2xl lg:text-base font-medium"
          >
            Ville
          </label>
          <OutlinedInput
            fullWidth
            size="small"
            className="bg-white font-kanit font-normal sm:h-20 lg:h-10 sm:text-2xl lg:text-base"
            value="Niamey"
            disabled
          />
          <div className="font-kanit sm:text-lg lg:text-sm mt-1">
            <BsInfoSquare className="inline sm:text-2xl lg:text-lg mr-2" /> Pour
            le moment nous sommes uniquement dans la capitale.
          </div>
        </div>
        <div className="">
          <label
            htmlFor=""
            className="mb-1 sm:text-2xl lg:text-base font-medium"
          >
            Quartier
          </label>
          <Select
            fullWidth
            size="small"
            className="bg-white font-kanit font-normal sm:h-20 lg:h-10 sm:text-2xl lg:text-base"
            MenuProps={{ disableScrollLock: true }}
            value={values.neighborhoodId}
            onChange={(e) => {
              let value = e.target.value;
              if (
                !isNaN(Number(value)) &&
                neighborhoods.find(
                  (n) => n.neighborhoodId === Number(value)
                ) !== undefined
              ) {
                setValues((current) => ({
                  ...current,
                  neighborhoodId: Number(value),
                }));
              } else
                setValues((current) => ({
                  ...current,
                  neighborhoodId: 0,
                }));
            }}
            error={error === "NEIGHBORHOOD_IS_REQUIRED"}
          >
            <MenuItem value={0}></MenuItem>
            {neighborhoods.map((n, index) => (
              <MenuItem
                key={index}
                value={n.neighborhoodId.toString()}
                className="font-kanit font-light sm:text-xl lg:text-sm"
              >
                {n.neighborhoodName}
              </MenuItem>
            ))}
          </Select>
          <small className="text-red-600 font-kanit font-normal">
            {error === "NEIGHBORHOOD_IS_REQUIRED" &&
              "Vous devez renseigner votre quartier."}
          </small>
        </div>
        <div className="col-span-2">
          <label
            htmlFor=""
            className="mb-1 sm:text-2xl lg:text-base font-medium"
          >
            Adresse{" "}
            <span className="sm:text-2xl lg:text-base text-gray-600 font-normal">
              (donnez-nous plus de détails sur le lieu de livraison.)
            </span>
          </label>
          <OutlinedInput
            fullWidth
            size="small"
            className="bg-white font-kanit font-normal sm:h-20 lg:h-auto sm:text-2xl lg:text-base"
            multiline
            rows={2}
            value={values.ordererCompleteAddress}
            onChange={(e) =>
              setValues((current) => ({
                ...current,
                ordererCompleteAddress: e.target.value,
              }))
            }
            error={error === "ADDRESS_IS_REQUIRED"}
          />
          <small className="text-red-600 font-kanit font-normal">
            {error === "ADDRESS_IS_REQUIRED" && "Guidez-nous vers vous."}
          </small>
        </div>
      </div>
      <div className="w-full flex justify-between sm:mt-10 lg:mt-5">
        <Button
          onClick={() => setActiveStep(0)}
          className="normal-case sm:text-2xl lg:text-base font-kanit"
        >
          Retour
        </Button>
        <Button
          onClick={() => handleContinue()}
          variant="contained"
          className="bg-primary font-kanit normal-case sm:text-2xl lg:text-base sm:ml-8 lg:ml-5"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default DeliveryAddress;
