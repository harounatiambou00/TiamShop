import { Alert, AlertTitle, Button } from "@mui/material";
import { BiHomeAlt } from "react-icons/bi";
import { BsCheck2Circle, BsEmojiSmileFill } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const OrderLaunchedSuccessfullyInfoSection = () => {
  const navigate = useNavigate();
  return (
    <div className="sm:col-span-12 lg:col-span-7 sm:mt-5 lg:mt-1 mb-10 flex flex-col items-center">
      <Alert
        severity="success"
        className="sm:w-full lg:w-10/12 sm:border-t-8 lg:border-t-2 border-t-green-600 font-kanit sm:text-3xl lg:text-sm"
        icon={
          <BsCheck2Circle className="sm:text-5xl lg:text-2xl text-green-600" />
        }
      >
        <AlertTitle className="mb-1 font-kanit font-normal text-green-800 sm:text-4xl lg:text-base uppercase">
          Votre commande a été lancé avec succès.
        </AlertTitle>
        Eh HOP, vous venez de passer une commande sur Tiamshop. Facile n'est-ce
        pas ?{" "}
        <BsEmojiSmileFill className="text-yellow-500 inline sm:text-3xl lg:text-xl" />
        <br />
        Un agent vous appeleras afin de valider votre commande puis vous serez
        livré dans les plus bref délais.
        <br />
        Si vous êtes en quête de réponses ou de précisions, notre équipe de
        support client est à votre écoute. N'hésitez pas à{" "}
        <span
          onClick={() => navigate("/contact-us")}
          className="text-blue-600 underline underline-offset-4 cursor-pointer"
        >
          nous contacter
        </span>{" "}
        pour éclaircir vos interrogations !
      </Alert>
      <Button
        onClick={() => navigate("/recommendations")}
        variant="contained"
        className="font-raleway font-medium normal-case sm:mt-10 lg:mt-5 bg-amber-400 text-primary sm:text-3xl lg:text-sm"
      >
        Et si vous craquiez également pour notre sélection faites uniquement
        pour vous ?{" "}
      </Button>
      <div className="flex items-center justify-between mt-10 sm:w-full lg:w-10/12">
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          startIcon={<BiHomeAlt className="sm:text-3xl lg:text-base" />}
          className="font-kanit font-light bg-primary normal-case sm:text-3xl lg:text-sm"
        >
          Acceuil
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/categories")}
          className="font-kanit font-light bg-primary normal-case sm:text-3xl lg:text-sm"
        >
          Nos rayons
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/cart")}
          startIcon={<GiShoppingCart className="sm:text-5xl lg:text-2xl" />}
          className="font-kanit font-light bg-primary normal-case sm:text-3xl lg:text-sm"
        >
          Votre panier
        </Button>
      </div>
    </div>
  );
};

export default OrderLaunchedSuccessfullyInfoSection;
