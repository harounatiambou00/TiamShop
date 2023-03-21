import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarLink from "../../../components/client-account-page-components/sidebar-link/SidebarLink";

import { linkType, links } from "./types";

import { TbLogout } from "react-icons/tb";
import { useAppDispatch } from "../../../hooks/redux-custom-hooks/useAppDispatch";
import { setAuthenticatedClient } from "../../../redux/slices/authenticatedClientSlice";
import { LoadingButton } from "@mui/lab";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [activeLink, setActiveLink] = React.useState<linkType>("details");
  const handleNavigate = (prop: linkType) => {
    setActiveLink(prop);
    if (prop === "details") {
      navigate("");
    } else if (prop === "favorites") {
      navigate("my-favorites");
    } else if (prop === "orders") {
      navigate("my-orders");
    } else if (prop === "receipts") {
      navigate("my-receipts");
    } else if (prop === "settings") {
      navigate("my-settings");
    }
  };

  const [logoutIsLoading, setLogoutIsLoading] = React.useState<boolean>(false);
  const logout = async () => {
    setLogoutIsLoading(true);
    let url = process.env.REACT_APP_API_URL + "auth/logout";
    let response = await fetch(url, {
      method: "POST",
      credentials: "include",
    });

    let content = await response.json();
    if (content && content.success) {
      dispatch(setAuthenticatedClient({ client: null }));
    }
    setLogoutIsLoading(false);
  };

  return (
    <div className="">
      {links.map((link) => {
        return (
          <SidebarLink
            key={link.title}
            name={link.name}
            to={link.to}
            isActive={link.title === activeLink}
            title={link.title}
            icon={link.icon}
            handleNavigate={() => handleNavigate(link.title)}
          />
        );
      })}
      <LoadingButton
        loading={logoutIsLoading}
        loadingPosition="start"
        variant="contained"
        color="error"
        startIcon={<TbLogout />}
        onClick={logout}
        className={
          logoutIsLoading
            ? "normal-case font-kanit justify-start font-light mt-10"
            : "bg-red-600 normal-case font-kanit justify-start font-light mt-10"
        }
      >
        Se déconnecter
      </LoadingButton>
    </div>
  );
};

export default Sidebar;
