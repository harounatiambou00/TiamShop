import React from "react";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import { CircularProgress, Tab, Tabs } from "@mui/material";

const tabs = ["A faire", "En cours", "Livrées", "Annulées"];

const DelivererDashboard = () => {
  const deliverer = useAppSelector(
    (state: RootState) => state.authenticatedDeliverer.deliverer
  );
  return (
    <div className="min-h-screen w-full">
      {deliverer !== null ? (
        <div className="">
          <h1 className="text-2xl font-normal">
            Ravis de vous revoir {deliverer.firstName},{" "}
          </h1>
          <span className="text-lg font-normal">On se met au travail ? </span>
          <div className="mt-10">
            <h1 className="font-raleway uppercase text-xl text-primary font-semibold">
              Mes livraisons
            </h1>
          </div>
          <div className="mt-2 border-b">
            <Tabs value={0}>
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab} value={index} />
              ))}
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default DelivererDashboard;
