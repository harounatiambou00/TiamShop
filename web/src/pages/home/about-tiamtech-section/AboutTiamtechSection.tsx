import React from "react";
import { AnimatedButton } from "../../../components/core";
import { Button } from "@mui/material";
import { BsArrowReturnRight } from "react-icons/bs";
const AboutTiamtechSection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <h1 className="uppercase text-xl font-raleway font-medium mb-4">
        Qui sommes-nous ?
      </h1>
      <div className="w-9/12 h-80 bg-orange-50 drop-shadow-lg pl-2 pr-10 py-2 flex justify-between items-center">
        <div className="w-3/12 flex items-center justify-center">
          <img
            alt="tiamtech.png"
            src={
              "/" + process.env.PUBLIC_URL + "assets/images/tiamtech-logo.png"
            }
            className="h-40"
          />
        </div>
        <div className="w-9/12">
          <h1 className="font-amita text-4xl">TIAMTECH Co.</h1>
          <p className="font-kanit font-light first-letter:font-amita first-letter:text-xl text-black">
            Est une start-up basée au Niger qui fournit des services tels que le
            développement de sites web et d'applications mobiles. Nous aidons
            les petites et moyennes entreprises à augmenter leur visibilité en
            mettant à leur disposition des sites web, et à mieux piloter leurs
            opérations avec des applications de gestion. <br /> L'un de nos
            objectifs principaux est de mettre en place un réseau de plateformes
            de commerce électronique couvrant tout le Niger à l'horizon 2030.
            Réseau qui permettra de faciliter et d'apporter un vent de
            modernitié au commerce Nigérien qui constitue déja l'une des
            activités principales du pays.
          </p>
          <div className="w-full flex justify-end">
            <Button
              variant="outlined"
              color="primary"
              size="large"
              className="font-kanit font-light mt-2"
              endIcon={<BsArrowReturnRight />}
              href="https://radiant-bunny-7569fa.netlify.app/"
              target="_blank"
            >
              Visiter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTiamtechSection;
