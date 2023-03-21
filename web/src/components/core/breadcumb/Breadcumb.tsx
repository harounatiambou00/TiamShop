import React from "react";
import { BreadcumbItemType } from "../../../data/breadcumb-item-type";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

type Props = {
  items: BreadcumbItemType[];
};

const Breadcumb = ({ items }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="w-full border-2 sm:rounded-lg lg:rounded-md px-5 sm:py-4 lg:py-2 flex items-center flex-wrap bg-white">
      <span
        className="flex items-center text-gray-800 hover:underline underline-offset-4 cursor-pointer sm:text-3xl lg:text-base"
        onClick={() => navigate("/")}
      >
        <AiOutlineHome className="mr-2" />
        Acceuil
      </span>

      {items.map((i, index) =>
        i.action !== null && i.action !== undefined ? (
          <span
            className="flex items-center text-gray-800 hover:underline underline-offset-4 cursor-pointer sm:text-3xl lg:text-base"
            onClick={i.action}
          >
            <MdKeyboardArrowRight className="mx-2" />
            {i.title}
          </span>
        ) : (
          <span className="flex items-center text-gray-800 sm:text-3xl lg:text-base">
            <MdKeyboardArrowRight className="mx-2" />
            {i.title}
          </span>
        )
      )}
    </div>
  );
};

export default Breadcumb;
