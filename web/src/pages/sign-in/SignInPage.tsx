import React from "react";
import { useNavigate } from "react-router-dom";
import SignInPagePanel from "./SignInPagePanel";
import SignInForm from "./SignInForm";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="h-full sm:w-full lg:w-4/12 flex sm:items-center sm:justify-center bg-white">
        <div className="h-full sm:w-0 lg:w-2 bg-secondary fixed left-0"></div>
        <div className="w-full sm:px-10 lg:px-6">
          <img
            src={process.env.PUBLIC_URL + "assets/images/logo.png"}
            alt="delivery"
            className="sm:h-36 sm:w-36 lg:h-16 lg:w-16 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1 className="sm:text-8xl lg:text-3xl font-medium opacity-70 mt-2">
            Connexion
          </h1>
          <h1 className="sm:text-5xl lg:text-lg font-light opacity-70">
            Vous n'avez pas de compte ? &nbsp;
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              Créez en un
            </span>
          </h1>
          <SignInForm />
        </div>
      </div>
      <SignInPagePanel />
    </div>
  );
};

export default SignInPage;
