import { AppBar, IconButton, Toolbar, Button } from "@mui/material";
import React from "react";
import { ElevationScroll } from "../core";

import { BiMenuAltLeft } from "react-icons/bi";

import MobileSearchbar from "./mobile-searchbar/MobileSearchbar";
import DesktopSearchbar from "./desktop-searchbar/DesktopSearchbar";

import "./header.css";
import { categoryLinks } from "./category-links";
import Navlinks from "./navlinks/Navlinks";
import { useNavigate } from "react-router-dom";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

const Header = (props: Props) => {
  const navigate = useNavigate();
  return (
    <ElevationScroll {...props}>
      <AppBar
        id="app-header"
        className="sm:h-header-sm-height lg:h-header-lg-height p-0 m-0 text-gray-100"
      >
        <Toolbar className="h-full w-full flex flex-col sm:p-5 lg:py-1 lg:px-0">
          {/** */}
          <div className="sm:h-1/2 lg:h-2/3 w-full flex items-center justify-between lg:px-10">
            <div className="flex items-center">
              <IconButton
                size="large"
                className="sm:block lg:hidden items-center justify-center h-20 w-20"
              >
                <BiMenuAltLeft className="text-6xl text-primary" />
              </IconButton>
              <img
                src={"/" + process.env.PUBLIC_URL + "assets/images/logo.png"}
                alt="logo"
                className="sm:h-32 lg:h-20 cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            {/** large sceen searchbar, will be displayed only on large screens otherwise it'll be hidden  */}
            <DesktopSearchbar />
            <Navlinks />
          </div>
          {/** Desktop categories links */}
          <div className="sm:hidden lg:flex lg:h-1/3 lg:w-full items-center justify-between lg:px-2">
            <Button
              startIcon={<BiMenuAltLeft />}
              variant="contained"
              className="bg-primary"
            >
              MENU
            </Button>
            {categoryLinks.map((link) => (
              <Button
                key={link.title}
                className="text-gray-200 text-sm font-semibold normal-case hover:text-primary"
              >
                {link.name}
              </Button>
            ))}
          </div>
          {/** Mobile sceen searchbar, will be displayed only on small screens otherwise it'll be hidden  */}
          <MobileSearchbar />
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
