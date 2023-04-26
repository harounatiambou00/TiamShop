import { AppBar, IconButton, Toolbar, Button, Skeleton } from "@mui/material";
import React from "react";
import { ElevationScroll } from "../core";

import { BiMenuAltLeft } from "react-icons/bi";

import MobileSearchbar from "./mobile-searchbar/MobileSearchbar";
import DesktopSearchbar from "./desktop-searchbar/DesktopSearchbar";

import "./header.css";
import Navlinks from "./navlinks/Navlinks";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import { FiMenu } from "react-icons/fi";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
  openLeftDrawer: boolean;
  setOpenLeftDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (props: Props) => {
  let categories = useAppSelector(
    (state: RootState) => state.categories.categories
  );
  const navigate = useNavigate();
  return (
    <ElevationScroll {...props}>
      <AppBar
        id="app-header"
        className="sm:h-header-sm-height lg:h-header-lg-height p-0 m-0 text-gray-100 bg-background"
      >
        <Toolbar className="h-full w-full flex flex-col sm:p-5 lg:py-1 lg:px-0">
          {/** */}
          <div className="sm:h-1/2 lg:h-2/3 w-full flex items-center justify-between lg:px-10">
            <div className="flex items-center">
              <IconButton
                size="large"
                onClick={() => props.setOpenLeftDrawer(true)}
                className="sm:block lg:hidden items-center justify-center h-20 w-20"
              >
                <BiMenuAltLeft className="text-6xl text-primary hover:text-amber-500" />
              </IconButton>
              <img
                src={"/" + process.env.PUBLIC_URL + "assets/images/logo.png"}
                alt="logo"
                className="sm:h-32 lg:h-20 cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            {/** large sceen searchbar, will be displayed only on large screens otherwise it'll be hidden  */}
            <div className="sm:z-10 lg:z-50 sm:hidden lg:block lg:h-7/12">
              <DesktopSearchbar />
            </div>
            <Navlinks />
          </div>
          {/** Desktop categories links */}
          <div className="sm:hidden lg:flex lg:h-1/3 lg:w-full items-center justify-between lg:px-2 z-40">
            <IconButton onClick={() => props.setOpenLeftDrawer(true)}>
              <FiMenu className="text-primary hover:text-amber-500" />
            </IconButton>
            {categories.length > 0
              ? categories.slice(0, 8).map((category) => (
                  <Button
                    size="small"
                    className="text-xs font-medium font-raleway normal-case hover:text-amber-600"
                    onClick={() =>
                      navigate("/category/" + category.CategoryName)
                    }
                    key={category.CategoryId}
                  >
                    {category.CategoryTitle}
                  </Button>
                ))
              : [0, 1, 2, 3, 4, 5, 6, 7].map((i, index) => (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    className="h-5 w-24 rounded-md"
                  />
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
