import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarLink from "../../../components/client-account-page-components/sidebar-link/SidebarLink";

import { linkType, links } from "./types";

import { TbLogout } from "react-icons/tb";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
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
        className="bg-red-600 normal-case font-kanit justify-start font-light mt-16"
      >
        Se déconnecter
      </Button>
    </div>
  );
};

export default Sidebar;
