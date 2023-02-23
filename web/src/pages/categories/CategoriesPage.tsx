import React from "react";
import CategoriesPageBreadcumb from "./categories-pages-breadcumb/CategoriesPageBreadcumb";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import CategoriesItem from "./categories-items/CategoriesItem";
import { ImageList } from "@mui/material";

const CategoriesPage: React.FC = () => {
  let categories = useAppSelector(
    (state: RootState) => state.categories.categories
  );
  return (
    <div className="p-5">
      <CategoriesPageBreadcumb />
      <h1 className="mt-5 font-raleway uppercase text-2xl font-normal">
        Nos rayons
      </h1>
      <div className="px-16 py-5">
        <ImageList variant="masonry" gap={20} cols={4} className="pb-5">
          {categories.map((c, index) => (
            <CategoriesItem key={index} category={c} />
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default CategoriesPage;
