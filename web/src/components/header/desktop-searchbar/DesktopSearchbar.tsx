import React from "react";

import { BsSearch } from "react-icons/bs";
import DesktopSearchbarSuggestionPopover from "./suggestion-popover/DesktopSearchbarSuggestionPopover";
import { MenuItem, Select } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { Category } from "../../../data/models/Category";
import { useNavigate } from "react-router-dom";

const DesktopSearchbar = () => {
  const navigate = useNavigate();
  let categories = useAppSelector(
    (state: RootState) => state.categories.categories
  ) as Category[];

  const [openDesktopSearchbarPopover, setOpenDesktopSearchbarPopover] =
    React.useState<boolean>(false);
  const [searchCriteria, setSearchCriteria] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("all");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchCriteria !== "") {
      let url =
        "/search?criteria=" +
        searchCriteria +
        "&sort=correspondance" +
        "&category=" +
        category +
        "&rating=all";
      navigate(url);
      setOpenDesktopSearchbarPopover(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full w-large-screens-searchbar-width ml-20"
    >
      <div
        id="desktop-searchbar"
        aria-describedby="desktop-searchbar-suggestion-popover"
        className={
          openDesktopSearchbarPopover
            ? "sm:hidden lg:flex h-full w-full text-gray-900 border-2 border-primary rounded-t-md bg-primary"
            : "sm:hidden lg:flex h-full w-full text-gray-900 border-2 border-primary rounded-md bg-primary"
        }
      >
        <div className="w-3/12 bg-white rounded-l-md">
          <Select
            className={
              openDesktopSearchbarPopover
                ? "h-full w-full rounded-tl-md font-normal font-kanit bg-amber-300"
                : "h-full w-full rounded-l-md font-normal font-kanit bg-amber-300"
            }
            sx={{
              "& 	.MuiOutlinedInput-notchedOutline": {
                border: "0px 0px 0px 1px",
                borderRadius: 0,
              },
            }}
            value={category}
            onChange={(e) => {
              let value = e.target.value;
              if (
                categories.find((c) => c.CategoryName === value) !== undefined
              )
                setCategory(value);
              else setCategory("all");
            }}
            MenuProps={{ disableScrollLock: true }}
          >
            <MenuItem value="all" className="font-kanit font-light">
              Toutes les catégories
            </MenuItem>
            {categories.map((category, index) => {
              return (
                <MenuItem
                  key={index}
                  value={category.CategoryName}
                  className="font-light font-kanit"
                >
                  {category.CategoryTitle}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <input
          type="search"
          placeholder="Rechercher un produit par son nom, sa catégorie, sa marque ..."
          className="outline-none w-8/12 pl-3 font-normal text-gray-600"
          value={searchCriteria}
          onChange={(e) => {
            setSearchCriteria(e.target.value);
            if (e.target.value !== "") {
              setOpenDesktopSearchbarPopover(true);
            } else {
              setOpenDesktopSearchbarPopover(false);
            }
          }}
          onBlur={() => setOpenDesktopSearchbarPopover(false)}
          onFocus={() =>
            searchCriteria !== "" && setOpenDesktopSearchbarPopover(true)
          }
        />
        <button
          type="submit"
          className="w-1/12 h-full flex items-center justify-center bg-primary rounded-r-md"
        >
          <BsSearch className="text-2xl text-gray-50" />
        </button>
      </div>
      <DesktopSearchbarSuggestionPopover
        open={openDesktopSearchbarPopover}
        setOpen={setOpenDesktopSearchbarPopover}
        criteria={searchCriteria}
        category={category}
      />
    </form>
  );
};

export default DesktopSearchbar;
