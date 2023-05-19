import React from "react";
import { BsApple } from "react-icons/bs";
import { FaLayerGroup, FaRegIdCard, FaTruck, FaUsers } from "react-icons/fa";
import { FiLogOut, FiPackage } from "react-icons/fi";
import { HiTag } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux-custom-hooks/useAppDispatch";
import { setAuthenticatedAdmin } from "../../../redux/slices/authenticatedAdminSlice";
import { LoadingButton } from "@mui/lab";

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
    id: 7,
    name: "deliverers",
    title: "Livreurs",
    pagePath: "/admin/deliverers",
    icon: (
      <div className="">
        <FaRegIdCard className="text-2xl" />
      </div>
    ),
  },
  {
    id: 8,
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
  const dispatch = useAppDispatch();
  const [logoutIsLoading, setLogoutIsLoading] = React.useState<boolean>(false);
  const logout = async () => {
    setLogoutIsLoading(true);
    let url = process.env.REACT_APP_API_URL + "auth/admins/logout";
    let response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "text/plain",
      },
    });

    let content = await response.json();
    if (content && content.success) {
      dispatch(setAuthenticatedAdmin({ admin: null }));
      navigate("/admin-sign-in");
    }
    setLogoutIsLoading(false);
  };
  return (
    <div className="w-72 pt-20 h-screen relative bg-gray-100">
      <div className="w-full h-3/4 flex flex-col px-2 pt-5">
        {links.map((link) => (
          <div
            key={link.id}
            className={
              activeLink === link.name
                ? "px-4 py-3 flex items-center mb-2 bg-primary text-white rounded-md"
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
      <LoadingButton
        className={
          logoutIsLoading
            ? "absolute bottom-0 font-kanit font-light bg-gray-200 rounded-none text-primary"
            : "absolute bottom-0 font-kanit font-light bg-red-600 rounded-none text-white"
        }
        disableElevation
        fullWidth
        loading={logoutIsLoading}
        endIcon={<FiLogOut className="" />}
        loadingPosition="end"
        variant="contained"
        onClick={logout}
      >
        Se déconnecter
      </LoadingButton>
    </div>
  );
};

export default Leftbar;
