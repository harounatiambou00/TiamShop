import React from "react";

import { BsSearch } from "react-icons/bs";

const DesktopSearchbar = () => {
  return (
    <div className="sm:hidden lg:flex text-gray-900 h-7/12 w-large-screens-searchbar-width border-2 border-primary bg-gray-50 rounded-md ml-20 bg-primary">
      <div className="w-3/12 rounded-l-md">
        <select className="h-full w-full rounded-l-md">
          <option className="">Toutes les catégories</option>
        </select>
      </div>
      <input
        type="search"
        placeholder="Rechercher un produit par son nom, sa catégorie, sa marque ..."
        className="outline-none w-8/12 pl-3 font-normal text-gray-600"
      />
      <button className="w-1/12 h-full flex items-center justify-center bg-primary rounded-r-md">
        <BsSearch className="text-2xl text-gray-50" />
      </button>
    </div>
  );
};

export default DesktopSearchbar;
