import React from "react";
import { SubCategory } from "../../../data/models/SubCategory";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { AiOutlineHome } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Category } from "../../../data/models/Category";

type Props = {
  subCategory: SubCategory;
};

const SubCategoryPageBreadcumb = ({ subCategory }: Props) => {
  const navigate = useNavigate();
  let categories = useAppSelector(
    (state: RootState) => state.categories.categories
  ) as Category[];

  let category = categories.find(
    (c) => c.CategoryId === subCategory.CategoryId
  );

  return (
    <div className="h-10 w-full border-2 sm:rounded-lg lg:rounded-md px-5 sm:hidden lg:flex items-center">
      <span
        className="flex items-center text-gray-600 hover:underline underline-offset-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <AiOutlineHome className="mr-2" />
        Acceuil
      </span>
      <span
        className="flex items-center text-gray-600 hover:underline underline-offset-4 cursor-pointer"
        onClick={() => navigate("/categories")}
      >
        <MdKeyboardArrowRight className="mx-2" />
        Catégories
      </span>
      <span
        className="flex items-center text-gray-600 hover:underline underline-offset-4 cursor-pointer"
        onClick={() => navigate("/category/" + category?.CategoryName)}
      >
        <MdKeyboardArrowRight className="mx-2" />
        {category?.CategoryTitle}
      </span>
      <span className="flex items-center text-gray-600">
        <MdKeyboardArrowRight className="mx-2" />
        {subCategory.SubCategoryTitle}
      </span>
    </div>
  );
};

export default SubCategoryPageBreadcumb;
