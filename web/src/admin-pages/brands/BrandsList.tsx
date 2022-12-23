import React from "react";
import { Brand } from "../../data/models/Brand";
import BrandListItem from "./BrandListItem";

type Props = {
  brands: Brand[];
};

const BrandsList = (props: Props) => {
  return (
    <div className="mt-5 grid grid-cols-5 gap-4">
      {props.brands.map((brand) => {
        return <BrandListItem brand={brand} />;
      })}
    </div>
  );
};

export default BrandsList;
