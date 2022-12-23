import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarLink from "../../../components/client-account-page-components/sidebar-link/SidebarLink";

import { linkType, links } from "./types";

import { TbLogout } from "react-icons/tb";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/redux-custom-hooks/useAppDispatch";
import { setAuthenticatedClient } from "../../../redux/slices/authenticatedClientSlice";
import { RootState } from "../../../redux/store";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  let authenticatedClient = useAppSelector(
    (state: RootState) => state.authenticatedClient.client
  );

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
      <Button
        variant="contained"
        color="error"
        startIcon={<TbLogout />}
        onClick={logout}
        className="bg-red-600 normal-case font-kanit justify-start font-light mt-16"
      >
        Se déconnecter
      </Button>
    </div>
  );
};

export default Sidebar;
