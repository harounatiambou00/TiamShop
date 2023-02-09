import React from "react";
import { Product } from "../../../data/models/Product";
import { Paper } from "@mui/material";

import ProductTableRow from "./product-table-row/ProductTableRow";

type Props = {
  displayedProducts: Product[];
};

const ProductsTable = ({ displayedProducts }: Props) => {
  return (
    <Paper elevation={2} className="w-full mt-10 flex flex-col">
      <div className="w-full grid grid-cols-24 gap-0 items-center bg-primary text-white h-14 rounded-t-md drop-shadow-sm">
        <div className="flex items-center justify-center col-span-2"></div>
        <div className="col-span-2 max-h-16"></div>

        <div className="col-span-12 flex flex-col items-start text-lg font-normal font-amita">
          Produit
        </div>
        <div className="col-span-2 text-lg font-amita">Prix</div>
        <div className="col-span-2 text-center text-lg font-amita">Vendus</div>
        <div className="col-span-2 text-center text-lg font-amita">Stock</div>
        <div className="col-span-2 flex items-center justify-center"></div>
      </div>
      {displayedProducts.map((product) => (
        <ProductTableRow key={product.productId} product={product} />
      ))}
    </Paper>
  );
};

export default ProductsTable;
