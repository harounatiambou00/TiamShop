import React from "react";
import FormGroup from "./FormGroup";
import SignUpPagePanel from "./SignUpPagePanel";

import { BsEmojiSmileFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-white h-full w-full flex">
        <SignUpPagePanel />
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
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => navigate("/sign-in")}
            >
              connectez-vous
            </span>
            &nbsp; si vous en avez déja un. &nbsp;
            <BsEmojiSmileFill className="inline text-amber-500" />
          </h1>
          <FormGroup />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
