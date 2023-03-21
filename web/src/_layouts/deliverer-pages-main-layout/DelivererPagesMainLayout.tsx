import React from "react";
import Header from "./header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-custom-hooks/useAppDispatch";
import { Deliverer } from "../../data/models/Deliverer";
import { setAuthenticatedDeliverer } from "../../redux/slices/authenticatedDelivererSlice";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";

const DelivererPagesMainLayout = () => {
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

  return (
    <div>
      <Header />
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default DelivererPagesMainLayout;
