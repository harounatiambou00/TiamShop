import React from "react";
import { Product } from "../../../data/models/Product";
import { Button } from "@mui/material";
import { BsSortAlphaDown } from "react-icons/bs";

type Props = {
  displayedProducts: Product[];
};

const SortButton = ({ displayedProducts }: Props) => {
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
