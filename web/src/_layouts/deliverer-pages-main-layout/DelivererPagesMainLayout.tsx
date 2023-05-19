import React from "react";
import Header from "./header/Header";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-custom-hooks/useAppDispatch";
import { Deliverer } from "../../data/models/Deliverer";
import { setAuthenticatedDeliverer } from "../../redux/slices/authenticatedDelivererSlice";

import Leftbar from "./leftbar/Leftbar";
import { DeliveriesList } from "../../deliverer-pages";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";

const DelivererPagesMainLayout = () => {
  const authenticatedDeliverer = useAppSelector(
    (state: RootState) => state.authenticatedDeliverer.deliverer
  );
  const [activeLink, setActiveLink] = React.useState<number>(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
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
          setIsLoading(false);
        } else {
          dispatch(setAuthenticatedDeliverer({ deliverer: null }));
          navigate("/");
        }
      }
    };
    getAuthenticatedDeliverer();
  });

  return (
    <div className="w-full overflow-hidden">
      {!isLoading ? (
        <div className="w-full h-screen">
          <Header />
          <div className="w-full flex h-full overflow-y-scroll">
            <Leftbar activeLink={activeLink} setActiveLink={setActiveLink} />
            <div className="flex-1 pt-24 px-5 bg-white">
              <DeliveriesList
                activeLink={activeLink}
                setActiveLink={setActiveLink}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <CircularProgress thickness={4} size={200} />
        </div>
      )}
    </div>
  );
};

export default DelivererPagesMainLayout;
