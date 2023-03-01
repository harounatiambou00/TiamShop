import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./styles.css";

// import required modules
import { Autoplay, EffectCards } from "swiper";
import { Button } from "@mui/material";
import { BsArrowReturnRight } from "react-icons/bs";

const OurStrenghsSection = () => {
  const [currentSlide, setCurrentSlide] = React.useState<number>(1);
  return (
    <div className="w-full sm:mt-20 lg:mt-14 ">
      <h1 className="w-full uppercase font-raleway font-semibold text-center mb-4 sm:text-4xl lg:text-2xl">
        Pourquoi choisir Tiamshop ?
      </h1>
      <div className="w-full flex items-center justify-center py-5">
        <Swiper
          className="h-128 sm:w-6/12 lg:w-7/12 pl-16"
          effect={"cards"}
          grabCursor
          modules={[EffectCards, Autoplay]}
          autoplay={{
            delay: 15000,
          }}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.activeIndex + 1);
          }}
        >
          <SwiperSlide className="rounded-md flex flex-col items-start justify-start">
            <img
              src="https://img.freepik.com/photos-gratuite/homme-africain-recevant-colis-employe-du-service-livraison_181624-45377.jpg?w=740&t=st=1677665950~exp=1677666550~hmac=ef9ff53e42bb45ce177f9f96c9b1bfd183487edd7d1383bb624cdeba7ae966d2"
              alt=""
              className="h-full w-full"
            />
          </SwiperSlide>
          <SwiperSlide className="rounded-md flex flex-col items-start justify-start">
            <img
              alt=""
              src="https://img.freepik.com/photos-premium/jeune-homme-noir-excite-tenant-argent-utilisant-son-telephone_216356-735.jpg?w=740"
              className="h-full w-full"
            />
          </SwiperSlide>
        </Swiper>
        <div className="sm:w-6/12 lg:w-5/12 pl-16 pr-4 text-center">
          <h1 className="font-raleway font-bold text-xl text-center text-gray-700">
            <span className="text-4xl text-primary">{currentSlide}.</span>{" "}
            {currentSlide === 1 &&
              "Achetez en ligne en toute sécurité et recevez vos achats directement à votre porte en un temps record !"}
            {currentSlide === 2 && "Aucun risque! Satisfait ou remboursé."}
          </h1>
          {currentSlide === 1 && (
            <p className="sm:text-lg lg:text-md text-center mt-4">
              Tiamshop vous offre cette expérience de shopping en ligne, en
              toute confiance. Vous pouvez profiter d'un processus d'achat
              simple et rapide, sans les tracas et les soucis de la livraison.
              <br />
              Nous prenons en charge la livraison de votre commande, vous
              évitant ainsi de vous déplacer malgré la chaleur étouffante du
              Niger et de perdre du temps dans les transport.
              <br />
              Acheter en ligne sur notre site est facile et sécurisé. Vous
              pouvez parcourir notre sélection de produits, ajouter les articles
              que vous souhaitez acheter à votre panier et passer votre commande
              en quelques clics seulement. Nous nous occupons du reste et vous
              livrons votre commande directement à votre porte, rapidement et en
              toute sécurité.
            </p>
          )}
          {currentSlide === 2 && (
            <p className="sm:text-lg lg:text-md text-center mt-4">
              Notre politique de remboursement facile et rapide vous offre une
              totale tranquillité d'esprit lorsque vous achetez chez nous. Si
              vous n'êtes pas satisfait de votre achat pour quelque raison que
              ce soit, nous nous engageons à vous rembourser intégralement ou à
              vous offrir un échange en respectant bien-sur les conditions
              d'intégrité du produit.
              <br />
              Chez Tiamshop, nous croyons que la satisfaction du client est
              primordiale.
              <br />
              N'ayez plus peur d'acheter en ligne! Avec notre politique de
              remboursement "satisfait ou remboursé", vous pouvez profiter de
              tous nos produits et services en toute confiance. Venez découvrir
              notre sélection de produits de qualité et commandez dès
              maintenant!
            </p>
          )}

          <Button
            variant="outlined"
            className="mt-4 txt-sm font-kanit font-light"
            endIcon={<BsArrowReturnRight />}
          >
            En savoir plus sur notre politique de{" "}
            {currentSlide === 1 && "livraisons"}
            {currentSlide === 2 && "remboursements"}.
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OurStrenghsSection;
