import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { Product } from "../../../data/models/Product";

type Props = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const FilterSelects = ({ products, setProducts }: Props) => {
  return (
    <div className="flex items-center justify-right">
      <FormControl className="mr-5">
        <Select
          size="small"
          className="font-kanit font-light placeholder:font-kanit text-gray-500"
          defaultValue={0}
        >
          <MenuItem value={0} className="">
            Toutes les catégories
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl className="mr-5">
        <Select
          size="small"
          className="font-kanit font-light placeholder:font-kanit text-gray-500"
          defaultValue={0}
        >
          <MenuItem value={0} className="">
            Toutes les marques
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl className="mr-5">
        <Select
          size="small"
          className="font-kanit font-light placeholder:font-kanit text-gray-500"
          defaultValue={0}
        >
          <MenuItem value={0} className="">
            Tout les prix
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl className="mr-5">
        <Select
          size="small"
          className="font-kanit font-light placeholder:font-kanit text-gray-500"
          defaultValue={0}
        >
          <MenuItem value={0} className="">
            Toutes les dates
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterSelects;
