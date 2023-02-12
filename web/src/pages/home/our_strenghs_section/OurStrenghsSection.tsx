import React from "react";

const OurStrenghsSection = () => {
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="flex flex-col items-center mr-5">
        <div className="h-20 w-20 rounded-tl-full rounded-tr-full rounded-bl-full bg-amber-200 drop-shadow-md rotate-45 z-10 items-center flex justify-center">
          <img
            alt="discount"
            src={
              "/" +
              process.env.PUBLIC_URL +
              "assets/images/homepage/discount.png"
            }
            className="-rotate-45 h-8/12"
          />
        </div>
        <div className="h-60 w-72 bg-white rounded-lg drop-shadow-md p-4 cursor-pointer border-2 border-amber-200 mt-5">
          <h3 className="font-bold uppercase font-raleway text-center">
            Jusqu'à 70% de réduction
          </h3>
          <pre></pre>
        </div>
      </div>
      <div className="flex flex-col items-center mr-5">
        <div className="h-20 w-20 rounded-tl-full rounded-tr-full rounded-bl-full bg-primary drop-shadow-md rotate-45 z-10 items-center flex justify-center">
          <img
            alt="discount"
            src={
              "/" +
              process.env.PUBLIC_URL +
              "assets/images/homepage/certified.png"
            }
            className="-rotate-45 h-8/12"
          />
        </div>
        <div className="h-60 w-72 bg-white rounded-lg drop-shadow-md p-4 cursor-pointer border-2 border-primary mt-5">
          <h3 className="font-bold uppercase font-raleway text-center">
            Des produits certifiés
          </h3>
          <pre></pre>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="h-20 w-20 rounded-tl-full rounded-tr-full rounded-bl-full bg-secondary drop-shadow-md rotate-45 items-center flex justify-center">
          <img
            alt="discount"
            src={
              "/" +
              process.env.PUBLIC_URL +
              "assets/images/homepage/fast-delivery.png"
            }
            className="-rotate-45 h-8/12"
          />
        </div>
        <div className="h-60 w-72 bg-white rounded-lg drop-shadow-md p-4 cursor-pointer border-2 border-secondary mt-4">
          <h3 className="font-bold uppercase font-raleway text-center">
            Livraisons rapides <br />&<br /> sécurisées
          </h3>
          <pre></pre>
        </div>
      </div>
    </div>
  );
};

export default OurStrenghsSection;
