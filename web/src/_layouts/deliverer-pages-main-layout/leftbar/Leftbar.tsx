import { LoadingButton } from "@mui/lab";
import React, { SetStateAction } from "react";
import { useAppDispatch } from "../../../hooks/redux-custom-hooks/useAppDispatch";
import { FiLogOut } from "react-icons/fi";
import { setAuthenticatedDeliverer } from "../../../redux/slices/authenticatedDelivererSlice";
import { useNavigate } from "react-router-dom";
import {
  MdClearAll,
  MdDoneAll,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";

type LinkType = {
  id: number;
  title: string;
  icon: React.ReactNode;
};

const links = [
  {
    id: 1,
    title: "Toutes les livraisons",
    icon: (
      <div className="">
        <MdClearAll className="text-2xl" />
      </div>
    ),
  },
  {
    id: 2,
    title: "À faire",
    icon: (
      <div className="">
        <MdOutlineCheckBoxOutlineBlank className="text-2xl" />
      </div>
    ),
  },
  {
    id: 3,
    title: "En cours",
    icon: (
      <div className="">
        <GiSandsOfTime className="text-2xl" />
      </div>
    ),
  },
  {
    id: 4,
    title: "Livrées",
    icon: (
      <div className="">
        <MdDoneAll className="text-2xl" />
      </div>
    ),
  },
] as LinkType[];

type Props = {
  activeLink: number;
  setActiveLink: React.Dispatch<SetStateAction<number>>;
};

const Leftbar = ({ activeLink, setActiveLink }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutIsLoading, setLogoutIsLoading] = React.useState<boolean>(false);
  const logout = async () => {
    setLogoutIsLoading(true);
    let url = process.env.REACT_APP_API_URL + "auth/delivererlogout";
    let response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "text/plain",
      },
    });

    let content = await response.json();
    if (content && content.success) {
      dispatch(setAuthenticatedDeliverer({ deliverer: null }));
      navigate("/");
    }
    setLogoutIsLoading(false);
  };

  return (
    <div className="sm:w-1/6 lg:w-60 mt-20">
      <div className="w-60 flex flex-col px-2 pt-5">
        {links.map((link) => (
          <div
            key={link.id}
            className={
              activeLink === link.id
                ? "px-4 py-3 flex items-center mb-2 bg-primary text-white rounded-md"
                : "px-4 py-3 flex items-center mb-2 text-primary hover:bg-gray-100 cursor-pointer"
            }
            onClick={() => {
              setActiveLink(link.id);
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
            ? "absolute bottom-0 font-kanit font-light bg-gray-200 rounded-none text-primary lg:w-60"
            : "absolute bottom-0 font-kanit font-light bg-red-600 rounded-none text-white lg:w-60"
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
