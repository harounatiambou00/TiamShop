import React from "react";
import { Button, FormControl, OutlinedInput } from "@mui/material";
import { BsFilter, BsSearch } from "react-icons/bs";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";

type Props = {
  displayedProducts: ProductAndRelatedInfo[];
  setDisplayedProducts: React.Dispatch<
    React.SetStateAction<ProductAndRelatedInfo[]>
  >;
};

const SearchProducts = ({ displayedProducts, setDisplayedProducts }: Props) => {
  return (
    <div className="flex items-center mt-10 justify-center">
      <FormControl className="w-9/12 mr-5">
        <OutlinedInput
          size="small"
          className="w-full font-kanit font-light placeholder:font-kanit"
          placeholder="Recherchez un produit"
          startAdornment={<BsSearch className="text-xl text-gray-600 mr-5" />}
        />
      </FormControl>
      <Button
        variant="outlined"
        startIcon={<BsFilter className="text-xl text-primary" />}
        className="normal-case font-kanit font-light text-md"
      >
        Filtres
      </Button>
    </div>
  );
};

export default SearchProducts;
