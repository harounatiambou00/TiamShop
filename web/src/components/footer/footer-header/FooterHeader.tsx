import { IconButton } from "@mui/material";

import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiTwitter,
  SiYoutube,
} from "react-icons/si";

import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const FooterHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex sm:flex-col lg:flex-row items-center lg:justify-between">
      <img
        src={"/" + process.env.PUBLIC_URL + "assets/images/logo.png"}
        alt="logo"
        className="sm:h-32 sm:w-32 lg:h-20 lg:w-20 cursor-pointer sm:items-center"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="text-gray-50 sm:mt-5 lg:mt-0">
        <h1 className="sm:text-3xl lg:text-xl text-center opacity-80 uppercase">
          NEWSLETTER
        </h1>
        <span className="sm:text-2xl lg:text-sm opacity-70 text-center">
          Inscrivez-vous à notre newsletter pour recevoir chaque weekend nos
          bons plans.
        </span>
        <div className="w-full sm:h-20 lg:h-12 sm:border-4 lg:border-2 border-amber-400 rounded-sm flex items-center bg-gray-50 sm:mt-4 lg:mt-1">
          <MdEmail className="w-1/12 sm:text-4xl lg:text-2xl mx-1 text-amber-400" />
          <input
            type="email"
            placeholder="Veuillez saisir votre adresse mail"
            className="h-full w-9/12 pl-2 rounded-r-md bg-transparent sm:text-2xl lg:text-lg text-primary outline-none placeholder:text-primary placeholder:opacity-75"
          />
          <button className="h-full sm:text-3xl lg:text-base bg-amber-400 w-2/12 text-primary font-normal">
            Confirmer
          </button>
        </div>
      </div>
      <div>
        <h1 className="sm:text-3xl lg:text-xl text-gray-50 opacity-80 text-center uppercase sm:mt-5 lg:mt-0">
          Suivez-nous
        </h1>
        <div className="flex items-center">
          <IconButton className="sm:text-4xl lg:text-2xl sm:text-linkedin sm:mr-4 lg:mr-2 hover:text-linkedin">
            <SiLinkedin className="" />
          </IconButton>
          <IconButton className="sm:text-4xl lg:text-2xl sm:text-facebook  sm:mr-4 lg:mr-2 hover:text-facebook">
            <SiFacebook className="" />
          </IconButton>
          <IconButton className="sm:text-4xl lg:text-2xl sm:text-youtube  sm:mr-4 lg:mr-2 hover:text-youtube">
            <SiYoutube className="" />
          </IconButton>
          <IconButton className="sm:text-4xl lg:text-2xl sm:text-twitter  sm:mr-4 lg:mr-2 hover:text-twitter">
            <SiTwitter className="" />
          </IconButton>
          <IconButton className="sm:text-4xl lg:text-2xl text-gray-50 sm:mr-4 lg:mr-2 ">
            <SiInstagram className="" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default FooterHeader;
