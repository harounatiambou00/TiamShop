import React from "react";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import OrderSummary from "./order-summary/OrderSummary";
import OrderInfos from "./order-infos/OrderInfos";
import { useAppDispatch } from "../../hooks/redux-custom-hooks/useAppDispatch";
import { setOrderToBeMade } from "../../redux/slices/orderToBeMadeSlice";

const FinalizeOrderPage = () => {
  const order = useAppSelector((state: RootState) => state.orderToBeMade);
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
  return (
    <div className="w-full sm:mb-10 lg:mb-2 p-5 grid grid-cols-12 gap-5">
      <OrderInfos />
      <OrderSummary />
    </div>
  );
};

export default FinalizeOrderPage;
