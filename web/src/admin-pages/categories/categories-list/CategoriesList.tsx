import React from "react";
import { Category } from "../../../data/models/Category";
import CategoryListItem from "./category-list-item/CategoryListItem";

type Props = {
  categories: Category[];
  refreshCategories: () => void;
};
const CategoriesList = ({ categories, refreshCategories }: Props) => {
  return (
    <div className="mt-5">
      {categories.map((category, index) => {
        return (
          <CategoryListItem
            category={category}
            key={category.CategoryId}
            refreshCategories={refreshCategories}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default CategoriesList;
