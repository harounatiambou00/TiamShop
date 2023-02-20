import React from "react";
import ProductAndRelatedInfo from "../../../../data/models/ProductAndRelatedInfo";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";

type Props = {
  product: ProductAndRelatedInfo;
  index: number;
};

const Item = ({ product, index }: Props) => {
  return (
    <div
      className={
        index % 2 === 0
          ? "w-full px-4 py-1 bg-gray-100  grid grid-cols-12"
          : "w-full px-4 py-1  grid grid-cols-12"
      }
    >
      <div className="col-span-6 flex">
        <img
          src={
            "data:" +
            product.images[0].imageExtension +
            ";base64," +
            product.images[0].imageBytes
          }
          alt={product.images[0].imageName}
          className="h-20"
        />
        <div className="flex flex-col items-center text-center mx-4 my-2">
          <h1 className="uppercase font-raleway text-center text-sm font-medium">
            {product.productName}
          </h1>
        </div>
      </div>
      <div className="col-span-2 h-full pl-3 flex justify-center flex-col">
        <div className="font-amita text-md">
          {product.productPrice -
            product.productPrice *
              (product.productDiscountPercentage / 100)}{" "}
          <span className="font-raleway ml-2 text-sm font-normal">FCFA</span>
        </div>
        {product.productDiscountPercentage !== 0 && (
          <div className="flex items-center">
            <span className="line-through text-red-500 font-amita text-sm">
              {" "}
              {product.productPrice}
            </span>{" "}
            <small className="ml-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full ">
              {" "}
              -{product.productDiscountPercentage}%
            </small>
          </div>
        )}
      </div>
      <div className="col-span-1 pl-3 h-full flex items-center font-raleway font-medium">
        20
      </div>
      <div className="col-span-2 pl-2 h-full flex items-center font-raleway font-medium">
        <div className="font-amita text-md">
          {product.productPrice * 20}{" "}
          <span className="font-raleway ml-1 text-sm font-normal">FCFA</span>
        </div>
      </div>
      <div className="col-span-1 pl-1 h-full flex items-center font-raleway font-medium">
        <span
          className={
            index % 2 === 0
              ? "bg-red-100 text-red-700 rounded-full px-2 py-1 mr-1"
              : "bg-green-100 text-green-700 rounded-full px-2 py-1 mr-1"
          }
        >
          {index % 2 === 0 ? (
            <BiTrendingDown className="text-xl " />
          ) : (
            <BiTrendingUp className="text-xl" />
          )}
        </span>
        {index % 2 === 0 ? "+2%" : "-2%"}
      </div>
    </div>
  );
};

export default Item;
