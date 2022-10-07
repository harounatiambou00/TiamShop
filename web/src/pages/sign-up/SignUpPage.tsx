import React from "react";
import FormGroup from "./FormGroup";
import Panel from "./Panel";

import { BsEmojiSmileFill } from "react-icons/bs";

const SignUpPage: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-white h-full w-full flex">
        <Panel />
        <div className="h-full sm:w-full lg:w-7/12 py-5 px-10 overflow-y-scroll">
          <img
            src={process.env.PUBLIC_URL + "assets/images/logo.png"}
            alt="logo"
            className="sm:block lg:hidden h-28"
          />
          <h1 className="sm:text-5xl lg:text-3xl font-medium opacity-70">
            Bienvenue sur Tiamshop
          </h1>
          <h1 className="sm:text-3xl lg:text-lg font-light opacity-70">
            Créer votre compte ou &nbsp;
            <span className="text-blue-500 underline cursor-pointer">
              connectez-vous
            </span>
            &nbsp; si vous en avez déja un. &nbsp;
            <BsEmojiSmileFill className="inline text-amber-500" />
          </h1>
          <FormGroup />
          <small className="sm:mt-16 lg:mt-0 sm:text-xl lg:text-sm font-light flex justify-end">
            ©2021–2022&nbsp; &nbsp;
            <a
              href="https://radiant-bunny-7569fa.netlify.app/"
              className="underline text-blue-500"
              target="_blank"
              rel="noreferrer"
            >
              TIAMTECH CO
            </a>{" "}
            &nbsp; &nbsp;All Rights Reserved.
          </small>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
