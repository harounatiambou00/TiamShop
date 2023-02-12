import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../data/models/Category";

type Props = {
  category?: Category;
};

const Breadcumb = ({ category }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="h-10 w-full border-2 sm:rounded-lg lg:rounded-md px-5 sm:hidden lg:flex items-center">
      <span
        className="flex items-center text-gray-600 hover:underline underline-offset-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <AiOutlineHome className="mr-2" />
        Acceuil
      </span>
      <span className="flex items-center text-gray-600 hover:underline underline-offset-4 cursor-pointer">
        <MdKeyboardArrowRight className="mx-2" />
        Catégories
      </span>
      <span className="flex items-center text-gray-600">
        <MdKeyboardArrowRight className="mx-2" />
        {category?.CategoryTitle}{" "}
      </span>
    </div>
  );
};

export default Breadcumb;
