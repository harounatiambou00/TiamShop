import React from "react";
import ProductCaracteristic from "../../../../../data/models/ProductCaracteristic";
import { IconButton, OutlinedInput } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { MdClose } from "react-icons/md";

type Props = {
  caracteristic: ProductCaracteristic;
  handleDeleteCaracteristic: (caracteristicId: number) => void;
  isPair: boolean;
  updateCaracteristic: (id: number, key: string, value: string) => void;
  caracteristicsToBeAdded: ProductCaracteristic[];
};

const CaracteristicRow = ({
  caracteristic,
  handleDeleteCaracteristic,
  isPair,
  updateCaracteristic,
  caracteristicsToBeAdded,
}: Props) => {
  const [isBeingUpdated, setIsBeingUpdated] = React.useState<boolean>(false);
  const [values, setValues] = React.useState({
    key: caracteristic.productCaracteristicKey,
    value: caracteristic.productCaracteristicValue,
  });
  return isBeingUpdated ? (
    <div
      className={
        isPair
          ? "w-full flex items-center py-2  px-2 bg-slate-100"
          : "w-full flex items-center py-2  px-2"
      }
    >
      <div className="w-5/12 font-light pr-5">
        <OutlinedInput
          type="text"
          size="small"
          fullWidth
          value={values.key}
          onChange={(e) =>
            setValues({
              ...values,
              key: e.target.value,
            })
          }
          className="font-kanit font-light"
        />
      </div>
      <div className="w-6/12 font-light pr-5">
        <OutlinedInput
          type="text"
          size="small"
          className="font-kanit font-light"
          fullWidth
          value={values.value}
          onChange={(e) =>
            setValues({
              ...values,
              value: e.target.value,
            })
          }
        />
      </div>
      <div className="w-1/12 font-light flex items-center">
        <IconButton
          size="small"
          color="error"
          onClick={() => setIsBeingUpdated(false)}
        >
          <MdClose />
        </IconButton>
        <IconButton
          size="small"
          color="success"
          disabled={values.key === "" || values.value === ""}
          onClick={() => {
            updateCaracteristic(
              caracteristic.productCaracteristicId,
              values.key,
              values.value
            );
            setIsBeingUpdated(false);
          }}
        >
          <AiOutlineCheck />
        </IconButton>
      </div>
    </div>
  ) : (
    <div
      className={
        isPair
          ? "w-full flex items-center py-2  px-2 bg-slate-100"
          : "w-full flex items-center py-2  px-2"
      }
    >
      <div className="w-5/12 font-light">
        {caracteristic.productCaracteristicKey}
      </div>
      <div className="w-6/12 font-light">
        {caracteristic.productCaracteristicValue}
      </div>
      <div className="w-1/12 font-light flex items-center">
        {caracteristicsToBeAdded.find(
          (c) =>
            c.productCaracteristicId === caracteristic.productCaracteristicId
        ) === undefined && (
          <IconButton
            size="small"
            color="primary"
            onClick={() => setIsBeingUpdated(true)}
          >
            <FiEdit />
          </IconButton>
        )}
        <IconButton
          size="small"
          color="error"
          onClick={() =>
            handleDeleteCaracteristic(caracteristic.productCaracteristicId)
          }
        >
          <BsTrash />
        </IconButton>
      </div>
    </div>
  );
};

export default CaracteristicRow;
