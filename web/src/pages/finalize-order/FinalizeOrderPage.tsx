import React from "react";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import OrderSummary from "./order-summary/OrderSummary";
import OrderInfos from "./order-infos/OrderInfos";
import { useAppDispatch } from "../../hooks/redux-custom-hooks/useAppDispatch";
import { setOrderToBeMade } from "../../redux/slices/orderToBeMadeSlice";
import OrderLaunchedSuccessfullyInfoSection from "./order-launched-successfully-info-section/OrderLaunchedSuccessfullyInfoSection";
import { useNavigate } from "react-router-dom";
import ErrorSnackbar from "../../components/core/error-snackbar/ErrorSnackbar";

const FinalizeOrderPage = () => {
  const navigate = useNavigate();
  const order = useAppSelector((state: RootState) => state.orderToBeMade);
  React.useEffect(() => {
    if (order.lines.length === 0) navigate("/*");
  }, [order]);
  const authenticatedClient = useAppSelector(
    (state: RootState) => state.authenticatedClient.client
  );
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (authenticatedClient !== null) {
      let newOrder = {
        ordererFirstName: authenticatedClient.FirstName,
        ordererLastName: authenticatedClient.LastName,
        ordererEmail: authenticatedClient.Email,
        ordererPhoneNumber: authenticatedClient.PhoneNumber,
        ordererCompleteAddress: authenticatedClient.CompleteAddress,
        clientId: authenticatedClient.userId,
        neighborhoodId: authenticatedClient.NeighborhoodId,
        lines: order.lines,
      };
      dispatch(setOrderToBeMade(newOrder));
    }
  }, [authenticatedClient]);

  const [orderLaunchedSuccessfully, setOrderLaunchedSuccessfully] =
    React.useState<boolean>(false);

  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);
  return (
    <div className="w-full sm:mb-10 lg:mb-2 p-5 grid grid-cols-12 gap-5">
      {orderLaunchedSuccessfully ? (
        <OrderLaunchedSuccessfullyInfoSection />
      ) : (
        <OrderInfos
          setOrderLaunchedSuccessfully={setOrderLaunchedSuccessfully}
          setOpenErrorSnackbar={setOpenErrorSnackbar}
        />
      )}
      <OrderSummary readOnly={orderLaunchedSuccessfully} />
      <ErrorSnackbar
        setOpen={setOpenErrorSnackbar}
        open={openErrorSnackbar}
        text="Nous n'avons pas pu lancer votre commande, réessayez plus tard."
      />
    </div>
  );
};

export default FinalizeOrderPage;
