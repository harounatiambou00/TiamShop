import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Breadcumb = () => {
  const navigate = useNavigate();
  return (
    <div className="sm:h-20 lg:h-10 w-full border-2 sm:rounded-lg lg:rounded-md px-5 flex items-center">
      <span
        className="flex items-center text-gray-600 sm:underline lg:no-underline hover:underline underline-offset-4 cursor-pointer sm:text-4xl lg:text-base"
        onClick={() => navigate("/")}
      >
        <AiOutlineHome className="mr-2" />
        Acceuil
      </span>
      <span className="flex items-center text-gray-600 sm:text-4xl lg:text-base">
        <MdKeyboardArrowRight className="mx-2" />
        Mon panier
      </span>
    </div>
  );
};

export default Breadcumb;
