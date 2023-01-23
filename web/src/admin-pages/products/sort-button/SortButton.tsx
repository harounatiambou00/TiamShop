import React from "react";
import { Product } from "../../../data/models/Product";
import { Button } from "@mui/material";
import { BsSortAlphaDown } from "react-icons/bs";

type Props = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const SortButton = ({ products, setProducts }: Props) => {
  return (
    <Button
      variant="outlined"
      startIcon={<BsSortAlphaDown />}
      className="normal-case"
    >
      Trier
    </Button>
  );
};

export default SortButton;
