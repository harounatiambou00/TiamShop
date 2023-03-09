import React from "react";
import { Deliverer } from "../../data/models/Deliverer";
import { useAppDispatch } from "../../hooks/redux-custom-hooks/useAppDispatch";
import { setAuthenticatedDeliverer } from "../../redux/slices/authenticatedDelivererSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import { CircularProgress } from "@mui/material";

const DelivererDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //Get The authenticated client
  React.useEffect(() => {
    const getAuthenticatedDeliverer = async () => {
      let url = process.env.REACT_APP_API_URL + "auth/get-logged-deliverer";
      let response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      let content = await response.json();
      if (content) {
        if (content.success) {
          let data = content.data;

          let deliverer: Deliverer = {
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            completeAddress: data.completeAddress,
            birthDate:
              //if the birthday is not null we create a date object by slicing the string because .net datetime and typescript date don't match
              data.birthDate,
            neighborhoodId: data.neighborhoodId,
          };

          dispatch(setAuthenticatedDeliverer({ deliverer: deliverer }));
        } else {
          dispatch(setAuthenticatedDeliverer({ deliverer: null }));
          navigate("/");
        }
      }
    };
    getAuthenticatedDeliverer();
  });

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
