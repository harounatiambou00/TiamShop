import React from "react";

import { AiOutlineHome } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const Breadcumb: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav
      className="flex px-5 py-3 text-gray-700 border-2 rounded-lg bg-white"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <span
            className="inline-flex items-center text-sm font-normal text-gray-700 hover:text-gray-900 hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            <AiOutlineHome className="mr-2" />
            Acceuil
          </span>
        </li>
        <li>
          <div className="flex items-center">
            <MdKeyboardArrowRight />
            <span className="ml-1 text-sm font-medium text-primary md:ml-2">
              Mon compte
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcumb;
