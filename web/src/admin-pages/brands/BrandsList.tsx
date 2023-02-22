import React from "react";
import { Brand } from "../../data/models/Brand";
import BrandListItem from "./BrandListItem";
import { ImageList } from "@mui/material";

type Props = {
  brands: Brand[];
  refreshBrands: () => void;
};

const BrandsList = (props: Props) => {
  return (
    <ImageList className="mt-5" variant="masonry" cols={5} gap={20}>
      {props.brands.map((brand) => {
        return (
          <BrandListItem
            key={brand.brandId}
            brand={brand}
            refreshBrands={props.refreshBrands}
          />
        );
      })}
    </ImageList>
  );
};

export default BrandsList;
