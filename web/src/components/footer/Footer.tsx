import { Divider } from "@mui/material";
import React from "react";
import FooterBody from "./footer-body/FooterBody";
import FooterHeader from "./footer-header/FooterHeader";

import { AiFillHeart } from "react-icons/ai";

import "./footer.css";
import { BsDot } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div
        id="app-footer"
        className="w-full sm:px-10 lg:px-20 sm:py-3 lg:py-5 bg-primary"
      >
        <FooterHeader />
        <Divider className="my-5" />
        <FooterBody />
        <Divider className="my-5" />
        <div className="flex flex-col items-center">
          <a
            href="https://radiant-bunny-7569fa.netlify.app"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={
                "/" + process.env.PUBLIC_URL + "assets/images/tiamtech-logo.png"
              }
              alt="tiamtech-logo"
              className="sm:h-28 lg:h-16 cursor-pointer"
            />
          </a>
          <p className="sm:text-xl lg:text-sm text-gray-50 opacity-70 mt-2">
            Designed & Build by{" "}
            <a
              href="https://radiant-bunny-7569fa.netlify.app"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary hover:underline"
            >
              TIAMTECH CO
            </a>{" "}
            with all the{" "}
            <AiFillHeart className="text-xl text-red-500 inline mx-1" />
          </p>
        </div>
      </div>
      <div className="w-full bg-amber-400 py-1 px-2 flex items-center flex-wrap">
        <div
          onClick={() => navigate("/deliverer-sign-in")}
          className="text-primary flex items-center justify-center px-2 cursor-pointer sm:text-3xl lg:text-base hover:underline h-full w-fit border-2 border-amber-400 hover:border-primary"
        >
          <BsDot /> <span>Etes-vous un livreur ?</span>
        </div>
        <div
          onClick={() => navigate("/admin-sign-in")}
          className="text-primary flex items-center justify-center px-2 cursor-pointer sm:text-3xl lg:text-base hover:underline h-full w-fit border-2 border-amber-400 hover:border-primary"
        >
          <BsDot /> <span>Etes-vous un administrateur ?</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
