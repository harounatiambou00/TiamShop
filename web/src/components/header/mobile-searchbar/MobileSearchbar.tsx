import { IconButton } from "@mui/material";
import { BsSearch } from "react-icons/bs";

import React from "react";
import { useNavigate } from "react-router-dom";

const MobileSearchbar = () => {
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = React.useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchCriteria !== "") {
      let url =
        "/search?criteria=" +
        searchCriteria +
        "&sort=correspondance" +
        "&rating=all";
      navigate(url);
    }
  };
  return (
    <form className="sm:h-1/2 lg:hidden w-full sm:mt-5" onSubmit={handleSubmit}>
      <div className="flex h-9/12 w-full border-4 items-center rounded-md bg-gray-50">
        <IconButton className="items-center justify-center h-20 w-20">
          <BsSearch className="text-4xl" />
        </IconButton>
        <input
          type="search"
          placeholder="Rechercher le nom du produit, une catégorie, une marque ..."
          className="text-4xl pl-2 w-full h-full outline-none font-base bg-gray-50 text-primary"
          value={searchCriteria}
          onChange={(e) => {
            setSearchCriteria(e.target.value);
          }}
        />
      </div>
    </form>
  );
};

export default MobileSearchbar;
