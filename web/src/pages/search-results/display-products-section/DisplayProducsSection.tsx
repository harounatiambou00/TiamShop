import React from "react";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { ProductCard } from "../../../components/core";

const DisplayProducsSection = () => {
  let allProducts = useAppSelector(
    (state: RootState) => state.allProducts.allProducts
  );
  return (
    <div className="w-full mt-5 drop-shadow-sm rounded-md">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-5">
        {allProducts.slice(0, 15).map((p, index) => (
          <ProductCard key={index} product={p} />
        ))}
      </div>
    </div>
  );
};

export default DisplayProducsSection;
