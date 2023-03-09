import React from "react";
import { BiTrendingUp } from "react-icons/bi";
import { FaMoneyBill, FaTruck, FaUsers } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";

const TiamshopInNumbersSection = () => {
  return (
    <div className="w-full grid grid-cols-4 mt-5 gap-5">
      <div className=" h-40 bg-amber-400 rounded-md flex flex-col justify-center px-4 py-2 drop-shadow-md">
        <div className="flex items-center text-primary">
          <GiMoneyStack className="text-4xl" />
          <p className="ml-2 text-xl font-bold font-raleway">Revenus total</p>
        </div>
        <div className="text-2xl font-amita font-bold text-primary mt-2">
          2,000,0000 <span className="font-raleway">FCFA</span>
        </div>
        <div className="flex items-center mt-2">
          <BiTrendingUp className="text-green-400 text-2xl" />
          <span className="tex-xl font-normal text-slate-800 ml-2">27,5%</span>
          <span className="tex-xl font-normal text-slate-800 ml-2">
            +500k aujourd'hui
          </span>
        </div>
      </div>
      <div className="h-40 bg-white rounded-md flex flex-col justify-center px-4 py-2 drop-shadow-md">
        <div className="flex items-center text-primary">
          <FaUsers className="text-4xl" />
          <p className="ml-2 text-xl font-bold font-raleway">Clients</p>
        </div>
        <div className="text-2xl font-amita font-bold text-primary mt-2">
          500,000
        </div>
        <div className="flex items-center mt-2">
          <BiTrendingUp className="text-green-400 text-2xl" />
          <span className="tex-xl font-normal text-slate-800 ml-2">10,5%</span>
          <span className="tex-xl font-normal text-slate-800 ml-2">
            +10 aujourd'hui
          </span>
        </div>
      </div>
      <div className=" h-40 bg-white rounded-md flex flex-col justify-center px-4 py-2 drop-shadow-md">
        <div className="flex items-center text-primary">
          <FiPackage className="text-4xl" />
          <p className="ml-2 text-xl font-bold font-raleway">Commandes</p>
        </div>
        <div className="text-2xl font-amita font-bold text-primary mt-2">
          50
        </div>
        <div className="flex items-center mt-2">
          <BiTrendingUp className="text-green-400 text-2xl" />
          <span className="tex-xl font-normal text-slate-800 ml-2">1,5%</span>
          <span className="tex-xl font-normal text-slate-800 ml-2">
            +20 aujourd'hui
          </span>
        </div>
      </div>
      <div className=" h-40 bg-white rounded-md flex flex-col justify-center px-4 py-2 drop-shadow-md">
        <div className="flex items-center text-primary">
          <FaTruck className="text-4xl" />
          <p className="ml-2 text-xl font-bold font-raleway">Livraisons</p>
        </div>
        <div className="text-2xl font-amita font-bold text-primary mt-2">
          40
        </div>
        <div className="flex items-center mt-2">
          <BiTrendingUp className="text-green-400 text-2xl" />
          <span className="tex-xl font-normal text-slate-800 ml-2">0,5%</span>
          <span className="tex-xl font-normal text-slate-800 ml-2">
            +20 aujourd'hui
          </span>
        </div>
      </div>
    </div>
  );
};

export default TiamshopInNumbersSection;
