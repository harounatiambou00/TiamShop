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
    <AppBar elevation={0}>
      <Toolbar className=" bg-background text-primary flex items-center justify-evenly h-20">
        <img
          src={"/" + process.env.PUBLIC_URL + "assets/images/logo.png"}
          alt="logo"
          className="h-5/6"
          onClick={() => navigate("/deliverer")}
        />
        <div className="flex flex-1 items-center justify-center">
          <div className="h-10 w-7/12 bg-gray-100 border-2 border-primary flex items-center rounded-md">
            <input
              type="search"
              className="w-9/12 h-full outline-none pl-3 rounded-l-md"
              placeholder="Rechercher une livraison à partir de sa référence"
            />
            <div className="h-full w-3/12 bg-primary text-white uppercase font-raleway flex items-center justify-center font-medium cursor-pointer border-2 border-primary">
              Rechercher
            </div>
          </div>
        </div>
        <div className="px-4 py-2 rounded-full bg-white flex items-start cursor-pointer hover:drop-shadow-md">
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
