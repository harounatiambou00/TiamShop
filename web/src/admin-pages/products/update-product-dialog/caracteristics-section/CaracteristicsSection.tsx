import React from "react";
import { Button, IconButton, OutlinedInput } from "@mui/material";
import ProductCaracteristic from "../../../../data/models/ProductCaracteristic";
import CaracteristicRow from "./caracteristic-row/CaracteristicRow";
import { BiPlus } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";

type Props = {
  caracteristics: ProductCaracteristic[];
  handleDeleteCaracteristic: (caracteristicId: number) => void;
  setCaracteristics: React.Dispatch<
    React.SetStateAction<ProductCaracteristic[]>
  >;
  productID: string;
  caracteristicsToBeAdded: ProductCaracteristic[];
  setCaracteristicsToBeAdded: React.Dispatch<
    React.SetStateAction<ProductCaracteristic[]>
  >;
};

const CaracteristicsSection = ({
  caracteristics,
  handleDeleteCaracteristic,
  setCaracteristics,
  productID,
  caracteristicsToBeAdded,
  setCaracteristicsToBeAdded,
}: Props) => {
  const updateCaracteristic = (id: number, key: string, value: string) => {
    let newCaracteristics = [] as ProductCaracteristic[];
    for (let i of caracteristics) {
      if (i.productCaracteristicId !== id) newCaracteristics.push(i);
      else {
        newCaracteristics.push({
          productCaracteristicId: id,
          productCaracteristicKey: key,
          productCaracteristicValue: value,
          productID: i.productID,
        } as ProductCaracteristic);
      }
    }
    setCaracteristics(newCaracteristics);
  };

  const [isAdding, setIsAdding] = React.useState<boolean>(false);
  const [currentCaracteristicBeingAdded, setCurrentCaracteristicBeingAdded] =
    React.useState({
      key: "",
      value: "",
    });
  const handleAddCaracteristic = () => {
    setIsAdding(false);
    setCaracteristicsToBeAdded([
      ...caracteristicsToBeAdded,
      {
        productCaracteristicId:
          caracteristics.length !== 0
            ? caracteristics[caracteristics.length - 1].productCaracteristicId +
              1
            : 1, //Par default, cette valeur n'ira pas au server
        productCaracteristicKey: currentCaracteristicBeingAdded.key,
        productCaracteristicValue: currentCaracteristicBeingAdded.value,
        productID: productID,
      },
    ]);
    setCaracteristics([
      ...caracteristics,
      {
        productCaracteristicId:
          caracteristics.length !== 0
            ? caracteristics[caracteristics.length - 1].productCaracteristicId +
              1
            : 1, //Par default, cette valeur n'ira pas au server
        productCaracteristicKey: currentCaracteristicBeingAdded.key,
        productCaracteristicValue: currentCaracteristicBeingAdded.value,
        productID: productID,
      },
    ]);
    setCurrentCaracteristicBeingAdded({
      key: "",
      value: "",
    });
  };
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
              onClick={handleAddCaracteristic}
            >
              <AiOutlineCheck />
            </IconButton>
          </div>
        </div>
      )}
      {caracteristics.map((caracteristic) => (
        <CaracteristicRow
          key={caracteristic.productCaracteristicId}
          isPair={caracteristics.indexOf(caracteristic) % 2 === 0}
          caracteristic={caracteristic}
          handleDeleteCaracteristic={handleDeleteCaracteristic}
          updateCaracteristic={updateCaracteristic}
          caracteristicsToBeAdded={caracteristicsToBeAdded}
        />
      ))}
    </div>
  );
};

export default CaracteristicsSection;
