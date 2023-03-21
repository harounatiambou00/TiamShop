import React from "react";
import { Deliverer } from "../../data/models/Deliverer";
import { useAppDispatch } from "../../hooks/redux-custom-hooks/useAppDispatch";
import { setAuthenticatedDeliverer } from "../../redux/slices/authenticatedDelivererSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import { CircularProgress } from "@mui/material";

const DelivererDashboard = () => {
  const deliverer = useAppSelector(
    (state: RootState) => state.authenticatedDeliverer.deliverer
  );
  return (
    <div className="min-h-screen w-full">
      {deliverer !== null ? (
        <div className=""></div>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default DelivererDashboard;
