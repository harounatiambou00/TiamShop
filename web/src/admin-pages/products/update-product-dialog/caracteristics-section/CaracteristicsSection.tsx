import React from "react";
import ProductCaracteristic from "../../../../data/models/ProductCaracteristic";
import { IconButton } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

type Props = {
  caracteristics: ProductCaracteristic[];
};

const CaracteristicsSection = ({ caracteristics }: Props) => {
  return (
    <div className="mt-10">
      <h1 className="font-raleway uppercase font-medium mb-5">
        Caractéristiques
      </h1>
      {caracteristics.map((caracteristic) => (
        <div
          className={
            caracteristics.indexOf(caracteristic) % 2 === 0
              ? "w-full flex items-center py-2  px-2 bg-slate-100"
              : "w-full flex items-center py-2  px-2"
          }
          key={caracteristic.productCaracteristicId}
        >
          <div className="w-5/12 font-light">
            {caracteristic.productCaracteristicKey}
          </div>
          <div className="w-6/12 font-light">
            {caracteristic.productCaracteristicValue}
          </div>
          <div className="w-1/12 font-light flex items-center">
            <IconButton size="small">
              <FiEdit />
            </IconButton>
            <IconButton size="small" color="error">
              <BsTrash />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaracteristicsSection;
