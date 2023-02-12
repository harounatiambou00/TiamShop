import React from "react";

import { BsSearch } from "react-icons/bs";
import DesktopSearchbarSuggestionPopover from "./suggestion-popover/DesktopSearchbarSuggestionPopover";
import { MenuItem, Select } from "@mui/material";

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

  const [categories, setCategories] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getCategories = async () => {
    setIsLoading(true);
    const url = process.env.REACT_APP_API_URL + "categories";
    let response = await fetch(url);
    let content = await response.json();
    let data = content.data;

    for (let i of data) {
      setCategories((currentCategories) => [
        ...currentCategories,
        {
          ...{},
          CategoryId: i.categoryId,
          CategoryName: i.categoryName,
          CategoryTitle: i.categoryTitle,
          CategoryImageId: i.categoryImageId,
          CategoryRanking: i.categoryRanking,
        },
      ]);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getCategories();
  }, []);

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
        <div className="w-3/12 bg-white rounded-l-md">
          <Select
            className={
              openDesktopSearchbarPopover
                ? "h-full w-full rounded-tl-md font-light font-kanit"
                : "h-full w-full rounded-l-md font-light font-kanit"
            }
            sx={{
              "& 	.MuiOutlinedInput-notchedOutline": {
                border: "0px 0px 0px 1px",
                borderRadius: 0,
              },
            }}
            defaultValue={0}
          >
            <MenuItem value={0} className="font-kanit font-light">
              Toutes les catégories
            </MenuItem>
            {categories.map((category) => {
              return (
                <MenuItem
                  key={category.CategoryId}
                  value={category.CategoryId}
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
