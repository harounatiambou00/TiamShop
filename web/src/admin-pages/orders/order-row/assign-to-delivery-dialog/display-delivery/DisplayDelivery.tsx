import React from "react";
import Delivery from "../../../../../data/models/Delivery";
import { Deliverer } from "../../../../../data/models/Deliverer";
import { BsCheckCircleFill } from "react-icons/bs";
import { IconButton } from "@mui/material";

type Props = {
  delivery: Delivery;
  isActive: boolean;
  setActiveDeliveryId: React.Dispatch<React.SetStateAction<number | null>>;
};

const DisplayDelivery = ({
  delivery,
  isActive,
  setActiveDeliveryId,
}: Props) => {
  const [deliverer, setDeliverer] = React.useState<Deliverer | null>(null);
  const getDeliverer = async () => {
    if (delivery.assignedTo) {
      let url =
        process.env.REACT_APP_API_URL +
        "users/get-user-by-id/" +
        delivery.assignedTo;

      let response = await fetch(url);
      let content = await response.json();
      if (content.success) {
        let data = content.data;
        setDeliverer((current) => ({
          ...current,
          userId: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          completeAddress: data.completeAddress,
          neighborhoodId: data.neighborhoodId,
          verifiedAt: data.verifiedAt,
          birthDate:
            data.birthDate !== null && typeof data.birthDate === "string"
              ? new Date(
                  parseInt(data.birthDate.slice(0, 4)),
                  parseInt(data.birthDate.slice(5, 7)) - 1,
                  parseInt(data.birthDate.slice(8, 10))
                )
              : null,
        }));
      }
    }
  };

  React.useEffect(() => {
    getDeliverer();
  }, []);
  return (
    <div
      className={
        isActive
          ? "p-2 rounded-md bg-gray-100 my-2 font-light relative border-t-2"
          : "p-2 rounded-md cursor-pointer my-2 font-light relative border-t-2"
      }
      onClick={() => setActiveDeliveryId(delivery.deliveryId)}
    >
      <span className="font-kanit font-normal">
        {delivery.deliveryReference}
      </span>
      <br />
      <span className="bg-red-100 text-red-800 px-2 rounded-full text-xs font-normal">
        En préparation
      </span>
      <div className="mt-1 w-full">
        <span className="text-xs font-normal">Informations sur le livreur</span>
        <br />
        {deliverer ? (
          <span className="font-kanit text-gray-600 select-text relative">
            <small className="text-xs">{deliverer.firstName}</small>
            <br />
            <span className="font-medium text-black text-sm">
              {deliverer.lastName.toUpperCase()}
            </span>
            <br />
            <small className="text-black">
              {deliverer.phoneNumber.slice(0, 2) +
                "-" +
                deliverer.phoneNumber.slice(2, 5) +
                "-" +
                deliverer.phoneNumber.slice(5, 8)}
            </small>
            {" | "}
            <small className="text-black">{deliverer.email}</small>
          </span>
        ) : (
          <span className="text-red-700">Non assignée</span>
        )}
      </div>
      {isActive && (
        <BsCheckCircleFill className="text-primary absolute right-2 top-2" />
      )}
    </div>
  );
};

export default DisplayDelivery;
