import { HiOutlineUsers } from "react-icons/hi";
import { BiCategoryAlt } from "react-icons/bi";
import { TbTruckDelivery, TbBrandApple } from "react-icons/tb";
import { AiOutlineGift, AiOutlineDashboard } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

const Leftbar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-60 bg-white flex flex-col">
      <div className="flex flex-col mt-10 w-60 px-5">
        <div
          onClick={() => navigate("/admin")}
          className="cursor-pointer flex items-center h-10 w-full mb-5 px-2 hover:bg-gray-100 hover:rounded-md"
        >
          <AiOutlineDashboard className="text-primary text-2xl" />
          <span className="text-gray-600 ml-3">Tableau de bord</span>
        </div>
        <div
          onClick={() => navigate("/admin/clients")}
          className="cursor-pointer flex items-center h-10 w-full mb-5 px-2 hover:bg-gray-100 hover:rounded-md"
        >
          <HiOutlineUsers className="text-primary text-2xl" />
          <span className="text-gray-600 ml-3">Les clients</span>
        </div>
        <div className="cursor-pointer flex items-center h-10 w-full mb-5 px-2 hover:bg-gray-100 hover:rounded-md">
          <BiCategoryAlt className="text-primary text-2xl" />
          <span className="text-gray-600 ml-3">Les catégories</span>
        </div>
        <div className="cursor-pointer flex items-center h-10 w-full mb-5 px-2 hover:bg-gray-100 hover:rounded-md">
          <TbTruckDelivery className="text-primary text-2xl" />
          <span className="text-gray-600 ml-3">Les livraisons</span>
        </div>
        <div className="cursor-pointer flex items-center h-10 w-full mb-5 px-2 hover:bg-gray-100 hover:rounded-md">
          <TbBrandApple className="text-primary text-2xl" />
          <span className="text-gray-600 ml-3">Les marques</span>
        </div>
        <div className="cursor-pointer flex items-center h-10 w-full mb-5 px-2 hover:bg-gray-100 hover:rounded-md">
          <AiOutlineGift className="text-primary text-2xl" />
          <span className="text-gray-600 ml-3">Les commandes</span>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
