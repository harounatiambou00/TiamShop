import { Button } from "@mui/material";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import Item from "./item/Item";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";

const BestSellers = () => {
  const navigate = useNavigate();
  const products = [] as ProductAndRelatedInfo[];
  return (
    <div className="mt-5 w-full rounded-sm drop-shadow-sm bg-white p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-raleway text-xl font-medium mb-2">
          Les produits les plus achetés
        </h1>
        <Button
          size="small"
          className="normal-case font-kanit font-light "
          startIcon={<BsPlus />}
          onClick={() => navigate("/admin/orders")}
        >
          Voir plus
        </Button>
      </div>
      <div className="w-full px-4 grid grid-cols-12 border-b-2 mt-5">
        <div className="text-lg col-span-6">Produit</div>
        <div className="text-lg col-span-2">Prix</div>
        <div className="text-lg col-span-1">Vendus</div>
        <div className="text-lg col-span-2">Revenus total</div>
        <div className="text-lg col-span-1">Tendances</div>
      </div>
      <div className="mt-1">
        {products.map((product, index) => (
          <Item key={product.productId} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
