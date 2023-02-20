import React from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsApple } from "react-icons/bs";
import { FaLayerGroup, FaTruck, FaUsers } from "react-icons/fa";
import { FiLogOut, FiPackage } from "react-icons/fi";
import { GiHandTruck } from "react-icons/gi";
import { HiTag } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type LinkNameType =
  | "dashboard"
  | "products"
  | "brands"
  | "categories"
  | "deliveries"
  | "orders"
  | "clients";

type LinkType = {
  id: number;
  name: LinkNameType;
  title: string;
  pagePath: string;
  icon: React.ReactNode;
};

const links = [
  {
    id: 1,
    name: "dashboard",
    title: "Tableau de bord",
    pagePath: "/admin",
    icon: (
      <div className="">
        <MdDashboard className="text-2xl" />
      </div>
    ),
  },
  {
    id: 2,
    name: "products",
    title: "Produits",
    pagePath: "/admin/products",
    icon: (
      <div className="">
        <HiTag className="text-2xl" />
      </div>
    ),
  },
  {
    id: 3,
    name: "clients",
    title: "Clients",
    pagePath: "/admin/clients",
    icon: (
      <div className="">
        <FaUsers className="text-2xl" />
      </div>
    ),
  },
  {
    id: 4,
    name: "categories",
    title: "Catégories",
    pagePath: "/admin/categories",
    icon: (
      <div className="">
        <FaLayerGroup className="text-2xl" />
      </div>
    ),
  },
  {
    id: 5,
    name: "brands",
    title: "Marques",
    pagePath: "/admin/brands",
    icon: (
      <div className="">
        <BsApple className="text-2xl" />
      </div>
    ),
  },
  {
    id: 6,
    name: "orders",
    title: "Commandes",
    pagePath: "/admin/orders",
    icon: (
      <div className="">
        <FiPackage className="text-2xl" />
      </div>
    ),
  },
  {
    id: 5,
    name: "deliveries",
    title: "Livraisons",
    pagePath: "/admin/deliveries",
    icon: (
      <div className="">
        <FaTruck className="text-2xl" />
      </div>
    ),
  },
] as LinkType[];

const Leftbar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = React.useState<LinkNameType>("dashboard");
  return (
    <div className="w-60 pt-20 h-screen relative bg-white">
      <div className="w-full h-3/4 flex flex-col pt-5">
        {links.map((link) => (
          <div
            key={link.id}
            className={
              activeLink === link.name
                ? "px-4 py-3 flex items-center mb-2 bg-primary text-white"
                : "px-4 py-3 flex items-center mb-2 text-primary hover:bg-gray-100 cursor-pointer"
            }
            onClick={() => {
              setActiveLink(link.name);
              navigate(link.pagePath);
            }}
          >
            <div>{link.icon}</div>
            <span className="font-raleway text-md font-medium ml-4">
              {link.title}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-red-600 text-white border-2 border-red-600 py-2 font-raleway absolute bottom-0 w-full text-lg flex items-center justify-center cursor-pointer transition ease-in duration-200 hover:bg-white hover:border-2 hover:border-red-600 hover:text-red-600 ">
        <span className="font-raleway uppercase font-medium">
          Se déconnecter
        </span>
        <FiLogOut className="ml-5" />
      </div>
    </div>
  );
};

export default Leftbar;
