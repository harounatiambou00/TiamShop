import React from "react";
import { IconButton, OutlinedInput } from "@mui/material";

import { AiOutlineCheck } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { ProductCaracteristic } from "../../../AddProductDialog";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

type Props = {
  caracteristic: ProductCaracteristic;
  isPair: boolean;
  setCaracteristics: React.Dispatch<
    React.SetStateAction<ProductCaracteristic[]>
  >;
  caracteristics: ProductCaracteristic[];
};

const CaracteristicRow = ({
  caracteristic,
  isPair,
  setCaracteristics,
  caracteristics,
}: Props) => {
  const [isBeingUpdated, setIsBeingUpdated] = React.useState<boolean>(false);
  const [values, setValues] = React.useState({
    key: caracteristic.key,
    value: caracteristic.value,
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
            setCaracteristics(
              caracteristics.map((c) => {
                if (c.id === caracteristic.id) {
                  c.key = values.key;
                  c.value = values.value;
                }
                return c;
              })
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
      <div className="w-5/12 font-light">{caracteristic.key}</div>
      <div className="w-6/12 font-light">{caracteristic.value}</div>
      <div className="w-1/12 font-light flex items-center">
        <IconButton
          size="small"
          color="primary"
          onClick={() => setIsBeingUpdated(true)}
        >
          <FiEdit />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => {
            setCaracteristics(
              caracteristics.filter((c) => c.id !== caracteristic.id)
            );
          }}
        >
          <BsTrash />
        </IconButton>
      </div>
    </div>
  );
};

export default CaracteristicRow;
