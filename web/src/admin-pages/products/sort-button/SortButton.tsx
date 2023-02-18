import { Button } from "@mui/material";
import { BsSortAlphaDown } from "react-icons/bs";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";

type Props = {
  displayedProducts: ProductAndRelatedInfo[];
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
