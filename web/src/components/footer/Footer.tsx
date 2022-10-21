import { Divider } from "@mui/material";
import React from "react";
import FooterBody from "./footer-body/FooterBody";
import FooterHeader from "./footer-header/FooterHeader";

import { AiFillHeart } from "react-icons/ai";

import "./footer.css";

const Footer: React.FC = () => {
  return (
    <div id="app-footer" className="w-full sm:px-10 lg:px-20 sm:py-3 lg:py-5">
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
          <AiFillHeart className="text-xl text-red-700 inline mx-1" />
        </p>
      </div>
    </div>
  );
};

export default Footer;
