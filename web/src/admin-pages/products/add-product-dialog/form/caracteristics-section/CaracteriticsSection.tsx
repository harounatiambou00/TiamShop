import React from "react";
import { Button, IconButton, OutlinedInput } from "@mui/material";
import CaracteristicRow from "./caracteristic-row/CaracteristicRow";
import { BiPlus } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { ProductCaracteristic } from "../../AddProductDialog";

type Props = {
  caracteristics: ProductCaracteristic[];
  setCaracteristics: React.Dispatch<
    React.SetStateAction<ProductCaracteristic[]>
  >;
};

const CaracteristicsSection = ({
  caracteristics,
  setCaracteristics,
}: Props) => {
  const [isAdding, setIsAdding] = React.useState<boolean>(false);
  const [currentCaracteristicBeingAdded, setCurrentCaracteristicBeingAdded] =
    React.useState({
      key: "",
      value: "",
    });

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-raleway uppercase font-medium">Caractéristiques</h1>
        <Button
          variant="contained"
          size="small"
          disabled={isAdding}
          startIcon={<BiPlus />}
          onClick={() => setIsAdding(true)}
          className={
            isAdding
              ? "font-raleway mr-2 text-xs"
              : "bg-primary font-raleway mr-2 text-xs"
          }
        >
          Ajouter
        </Button>
      </div>
      {isAdding && (
        <div className="grid grid-cols-12 mb-3">
          <OutlinedInput
            type="text"
            value={currentCaracteristicBeingAdded.key}
            onChange={(e) =>
              setCurrentCaracteristicBeingAdded({
                ...currentCaracteristicBeingAdded,
                key: e.target.value,
              })
            }
            size="small"
            className="col-span-5 mr-3 font-kanit font-light"
          />
          <OutlinedInput
            type="text"
            value={currentCaracteristicBeingAdded.value}
            onChange={(e) =>
              setCurrentCaracteristicBeingAdded({
                ...currentCaracteristicBeingAdded,
                value: e.target.value,
              })
            }
            size="small"
            className="col-span-6 mr-3 font-kanit font-light"
          />
          <div className="flex items-center justify-center h-auto">
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                setIsAdding(false);
                setCurrentCaracteristicBeingAdded({
                  key: "",
                  value: "",
                });
              }}
            >
              <MdClose />
            </IconButton>
            <IconButton
              size="small"
              color="success"
              disabled={
                currentCaracteristicBeingAdded.key === "" ||
                currentCaracteristicBeingAdded.value === ""
              }
              onClick={() => {
                setCaracteristics([
                  ...caracteristics,
                  {
                    id:
                      caracteristics.length !== 0
                        ? caracteristics[caracteristics.length - 1].id + 1
                        : 1,
                    key: currentCaracteristicBeingAdded.key,
                    value: currentCaracteristicBeingAdded.value,
                  },
                ]);
                setCurrentCaracteristicBeingAdded({
                  key: "",
                  value: "",
                });
                setIsAdding(false);
              }}
            >
              <AiOutlineCheck />
            </IconButton>
          </div>
        </div>
      )}
      {caracteristics.map((caracteristic) => (
        <CaracteristicRow
          key={caracteristic.id}
          isPair={caracteristics.indexOf(caracteristic) % 2 === 0}
          caracteristic={caracteristic}
          setCaracteristics={setCaracteristics}
          caracteristics={caracteristics}
        />
      ))}
    </div>
  );
};

export default CaracteristicsSection;
