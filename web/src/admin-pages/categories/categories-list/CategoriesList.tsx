import React from "react";
import { Category } from "../../../data/models/Category";
import CategoryListItem from "./category-list-item/CategoryListItem";

type Props = {
  categories: Category[];
};
const CategoriesList = ({ categories }: Props) => {
  return (
    <div className="mt-5">
      {categories.map((category) => {
        return (
          <CategoryListItem category={category} key={category.CategoryId} />
        );
      })}
    </div>
  );
};

export default CategoriesList;
