import React from "react";
import { ElevationScroll } from "../../../components/core";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";

const Header = () => {
  const navigate = useNavigate();
  const authenticatedDeliverer = useAppSelector(
    (state: RootState) => state.authenticatedDeliverer.deliverer
  );
  return (
    <AppBar elevation={2}>
      <Toolbar className=" bg-background text-primary flex items-center justify-evenly">
        <img
          src={"/" + process.env.PUBLIC_URL + "assets/images/logo.png"}
          alt="logo"
          className="sm:h-32 lg:h-24 cursor-pointer"
          onClick={() => navigate("/deliverer")}
        />
        <div className="flex flex-1 items-center justify-center"></div>
        <div className="px-5 py-2 rounded-md bg-slate-200 flex items-start cursor-pointer hover:drop-shadow-md">
          <Avatar className="text-primary"></Avatar>
          <div className="flex flex-col items-start text-center ml-2">
            <span className="text-sm text-gray-600 text-center w-full select-none">
              {authenticatedDeliverer?.firstName}
            </span>
            <span className="text-base font-medium uppercase text-primary select-none">
              {authenticatedDeliverer?.lastName}
            </span>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
