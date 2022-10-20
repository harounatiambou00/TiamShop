import React from "react";

import { BsSearch } from "react-icons/bs";
import DesktopSearchbarSuggestionPopover from "./suggestion-popover/DesktopSearchbarSuggestionPopover";

const DesktopSearchbar = () => {
  const [openDesktopSearchbarPopover, setOpenDesktopSearchbarPopover] =
    React.useState<boolean>(false);

  const [searchCriteria, setSearchCriteria] = React.useState<string>("");

  const handleChangeSearchCriteria = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchCriteria(event.target.value);
    if (event.target.value !== "") {
      setOpenDesktopSearchbarPopover(true);
    } else {
      setOpenDesktopSearchbarPopover(false);
    }
  };

  const handleClickOutside = (event: React.FocusEvent<HTMLInputElement>) => {
    setOpenDesktopSearchbarPopover(false);
  };

  return (
    <div className="h-7/12 w-large-screens-searchbar-width ml-20">
      <div
        id="desktop-searchbar"
        aria-describedby="desktop-searchbar-suggestion-popover"
        className={
          openDesktopSearchbarPopover
            ? "sm:hidden lg:flex h-full w-full text-gray-900 border-2 border-primary rounded-t-md bg-primary"
            : "sm:hidden lg:flex h-full w-full text-gray-900 border-2 border-primary rounded-md bg-primary"
        }
      >
        <div className="w-3/12">
          <select
            className={
              openDesktopSearchbarPopover
                ? "h-full w-full rounded-tl-md"
                : "h-full w-full rounded-l-md"
            }
          >
            <option className="">Toutes les catégories</option>
          </select>
        </div>
        <input
          type="search"
          placeholder="Rechercher un produit par son nom, sa catégorie, sa marque ..."
          className="outline-none w-8/12 pl-3 font-normal text-gray-600"
          value={searchCriteria}
          onChange={handleChangeSearchCriteria}
          onBlur={handleClickOutside}
          onFocus={() =>
            searchCriteria !== "" && setOpenDesktopSearchbarPopover(true)
          }
        />
        <button className="w-1/12 h-full flex items-center justify-center bg-primary rounded-r-md">
          <BsSearch className="text-2xl text-gray-50" />
        </button>
      </div>
      <DesktopSearchbarSuggestionPopover
        open={openDesktopSearchbarPopover}
        setOpen={setOpenDesktopSearchbarPopover}
      />
    </div>
  );
};

export default DesktopSearchbar;
