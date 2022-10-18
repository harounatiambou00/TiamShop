import { IconButton } from "@mui/material";
import { BsSearch } from "react-icons/bs";

import React from "react";

const MobileSearchbar = () => {
  return (
    <div className="sm:h-1/2 lg:hidden w-full sm:mt-5">
      <div className="flex h-9/12 w-full border-4 items-center rounded-md bg-gray-50">
        <IconButton className="items-center justify-center h-20 w-20">
          <BsSearch className="text-4xl" />
        </IconButton>
        <input
          type="search"
          placeholder="Rechercher le nom du produit, une catégorie, une marque ..."
          className="text-4xl pl-2 w-full h-full outline-none font-base bg-gray-50"
        />
      </div>
    </div>
  );
};

export default MobileSearchbar;
