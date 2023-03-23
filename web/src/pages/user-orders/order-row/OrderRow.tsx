import React from "react";
import Order from "../../../data/models/Order";
import { Button, IconButton, Skeleton, Tooltip } from "@mui/material";
import { BsFillPatchCheckFill, BsInfoCircle } from "react-icons/bs";
import { AiOutlineStop } from "react-icons/ai";
import { LoadingButton } from "@mui/lab";
import Delivery from "../../../data/models/Delivery";
import { Neighborhood } from "../../../data/models/Neighborhood";
import DetailsDialog from "./details/DetailsDialog";

type Props = {
  order: Order;
  index: number;
};

const OrderRow = ({ order, index }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [neighborhood, setNeighborhood] = React.useState<Neighborhood | null>(
    null
  );
  const getNeighborhood = async () => {
    let url =
      process.env.REACT_APP_API_URL + "neighborhoods/" + order.neighborhoodId;
    let response = await fetch(url);
    let content = await response.json();
    if (content.success) {
      setNeighborhood((current) => ({
        ...current,
        neighborhoodId: content.data.neighborhoodId,
        neighborhoodName: content.data.neighborhoodName,
      }));
    }
  };

  const [delivery, setDelivery] = React.useState<Delivery | null>(null);
  const getDelivery = async () => {
    if (order.deliveryId) {
      let url =
        process.env.REACT_APP_API_URL +
        "deliveries/get-delivery-by-id/" +
        order.deliveryId;

      let response = await fetch(url);
      let content = await response.json();
      if (content.success) {
        let data = content.data;
        setDelivery((current) => ({
          ...current,
          deliveryId: data.deliveryId,
          deliveryReference: data.deliveryReference,
          deliveredAt:
            data.deliveredAt !== null && typeof data.deliveredAt === "string"
              ? new Date(
                  parseInt(data.deliveredAt.slice(0, 4)),
                  parseInt(data.deliveredAt.slice(5, 7)) - 1,
                  parseInt(data.deliveredAt.slice(8, 10))
                )
              : null,
          assignedTo: data.assignedTo,
          deliveryStatus: data.deliveryStatus,
        }));
      }
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    getNeighborhood();
    getDelivery();
    setIsLoading(false);
  }, []);

  const [openOrderDetailsDialog, setOpenOrderDetailsDialog] =
    React.useState(false);
  return (
    <div
      className={
        index % 2 === 0
          ? "w-full sm:p-10 lg:p-5 bg-gray-50 grid sm:grid-cols-3 lg:grid-cols-6 sm:gap-5 lg:gap-1"
          : "w-full sm:p-10 lg:p-5 bg-white grid sm:grid-cols-3 lg:grid-cols-6"
      }
    >
      <div className="sm:text-3xl lg:text-base sm:text-center lg:text-left">
        <span className="font-kanit font-normal ">Réference</span>
        <br />
        <span className="font-kanit font-normal text-gray-500">
          {order.orderReference.toUpperCase()}
        </span>
      </div>
      <div className="sm:text-3xl lg:text-base sm:text-center lg:text-left">
        <span className="font-kanit font-normal">Date</span>
        <br />
        <span className="font-kanit font-normal text-gray-500">
          {order.orderDate.getDate().toString() +
            "/" +
            (order.orderDate.getMonth() + 1) +
            "/" +
            order.orderDate.getFullYear()}
        </span>
      </div>
      <div className="sm:text-3xl lg:text-base sm:text-center lg:text-left">
        <span className="font-kanit font-normal">Status</span>
        <br />
        <Button
          variant="contained"
          className={
            order.validatedAt !== null
              ? "bg-green-100 text-green-800 rounded-full normal-case font-light cursor-default"
              : order.rejectedAt !== null
              ? "bg-red-100 text-red-800 rounded-full normal-case font-light cursor-default"
              : "bg-gray-200 text-black rounded-full normal-case font-light cursor-default"
          }
          disableElevation
          disableRipple
        >
          {order.validatedAt !== null && (
            <span className="font-kanit font-normal sm:text-2xl lg:text-xs bg-green-100 text-green-800 rounded-full drop-shadow-sm align-middle">
              <BsFillPatchCheckFill className="inline mr-1" />
              Validée
            </span>
          )}
          {order.rejectedAt !== null && (
            <span className="font-kanit font-normal sm:text-2xl lg:text-xs bg-red-100 text-red-800 rounded-full drop-shadow-sm align-middle ">
              <AiOutlineStop className="inline mr-1" />
              Rejetée
            </span>
          )}
          {order.rejectedAt === null && order.validatedAt === null && (
            <span className="font-kanit font-normal sm:text-2xl lg:text-xs bg-gray-200 text-black rounded-full drop-shadow-sm align-middle first-letter:uppercase">
              En traitement
            </span>
          )}
        </Button>
      </div>
      <div className="sm:text-center lg:text-left">
        <span className="font-kanit font-normal sm:text-3xl lg:text-base">
          Livraison
        </span>
        <br />
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            className="rounded-full h-6 w-3/4"
            animation="wave"
          />
        ) : (
          <Button
            className={
              delivery?.deliveryStatus === "DONE"
                ? " normal-case font-kanit font-normal bg-green-100 text-green-800  rounded-full cursor-default"
                : delivery?.deliveryStatus === "IN_PROGRESS"
                ? " normal-case font-kanit font-normal bg-orange-100 text-orange-800 rounded-full cursor-default"
                : " normal-case font-kanit font-normal rounded-full bg-red-100 text-red-800 cursor-default"
            }
            variant="contained"
            disableElevation
            disableRipple
          >
            <span className="sm:text-2xl lg:text-xs">
              {" "}
              {delivery?.deliveryStatus === "DONE"
                ? "Livrée"
                : delivery?.deliveryStatus === "IN_PROGRESS"
                ? "En cours"
                : order.rejectedAt !== null
                ? "Annulée"
                : "En préparation"}
            </span>
          </Button>
        )}
      </div>
      <div className="sm:text-center lg:text-left sm:text-3xl lg:text-base">
        <span className="font-kanit font-normal ">Adresse</span>
        <br />
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            className="rounded-full h-6 w-full"
            animation="wave"
          />
        ) : (
          <span className="font-kanit font-normal text-gray-500">
            {neighborhood !== null ? (
              <span className="">
                <span className="text-gray-500">
                  {neighborhood.neighborhoodName}
                </span>
                <br />
              </span>
            ) : (
              <span className="">N/A</span>
            )}
          </span>
        )}
      </div>
      <div className="flex justify-center items-center">
        <Tooltip title="Details">
          <IconButton
            className="h-fit"
            color="primary"
            onClick={() => setOpenOrderDetailsDialog(true)}
          >
            <BsInfoCircle className="sm:text-5xl lg:text-2xl" />
          </IconButton>
        </Tooltip>
        <LoadingButton
          loading={false}
          startIcon={<AiOutlineStop className="sm:text-3xl lg:text-lg" />}
          className="ml-2 bg-red-500 h-fit text-white normal-case font-kanit font-light sm:text-3xl lg:text-sm"
          variant="contained"
          size="small"
        >
          Annuler
        </LoadingButton>
      </div>
      <DetailsDialog
        open={openOrderDetailsDialog}
        setOpen={setOpenOrderDetailsDialog}
        order={order}
        delivery={delivery}
        neighborhood={neighborhood}
      />
    </div>
  );
};

export default OrderRow;
