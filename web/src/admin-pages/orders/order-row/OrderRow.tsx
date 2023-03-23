import React from "react";
import Order from "../../../data/models/Order";
import {
  Button,
  Dialog,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Neighborhood } from "../../../data/models/Neighborhood";
import {
  BsFillPatchCheckFill,
  BsInfoCircle,
  BsPatchCheckFill,
} from "react-icons/bs";
import { AiOutlineStop } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import SuccessSnackbar from "../../../components/core/suucess-snackbar/SuccessSnackbar";
import { LoadingButton } from "@mui/lab";
import UpdateOrderDialog from "./update-order-dialog/UpdateOrderDialog";
import AssignToDeliveryDialog from "./assign-to-delivery-dialog/AssignToDeliveryDialog";
import Delivery from "../../../data/models/Delivery";

type Props = {
  order: Order;
  index: number;
  refreshOrders: () => void;
};

const OrderRow = ({ order, index, refreshOrders }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [neighborhood, setNeighborhood] = React.useState<Neighborhood | null>(
    null
  );
  React.useEffect(() => {
    const getInfos = async () => {
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

    getInfos();
  }, [order]);

  const [openConfirmValidateOrderDialog, setOpenConfirmValidateOrderDialog] =
    React.useState(false);
  const [openConfirmRejectOrderDialog, setOpenConfirmRejectOrderDialog] =
    React.useState(false);

  const authenticatedAdmin = useAppSelector(
    (state: RootState) => state.authenticatedAdmin.admin
  );
  const [
    openValidatedSuccessfullySnackbar,
    setOpenValidatedSuccessfullySnackbar,
  ] = React.useState<boolean>(false);
  const [
    openRejectedSuccessfullySnackbar,
    setOpenRejectedSuccessfullySnackbar,
  ] = React.useState<boolean>(false);
  const validateOrder = async () => {
    setIsLoading(true);
    if (authenticatedAdmin) {
      let url = process.env.REACT_APP_API_URL + "orders/validate-order";
      let request = {
        adminGuid: authenticatedAdmin.UserGuid,
        orderId: order.orderId,
      };

      let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
        },
      });

      let content = await response.json();
      if (content.success) {
        setOpenValidatedSuccessfullySnackbar(true);
        refreshOrders();
        setOpenConfirmValidateOrderDialog(false);
      }
    }
    setIsLoading(false);
  };

  const rejectOrder = async () => {
    setIsLoading(true);
    if (authenticatedAdmin) {
      let url = process.env.REACT_APP_API_URL + "orders/reject-order";
      let request = {
        adminGuid: authenticatedAdmin.UserGuid,
        orderId: order.orderId,
      };

      let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
        },
      });

      let content = await response.json();
      if (content.success) {
        setOpenRejectedSuccessfullySnackbar(true);
        refreshOrders();
        setOpenConfirmRejectOrderDialog(false);
      }
    }
    setIsLoading(false);
  };

  const [updateOrderDialogIsOnReadOnly, setUpdateOrderDialogIsOnReadOnly] =
    React.useState<boolean>(false);

  const [openUpdateOrderDialog, setOpenUpdateOrderDialog] =
    React.useState<boolean>(false);
  const [openAssignToDeliveryDialog, setOpenAssignToDeliveryDialog] =
    React.useState<boolean>(false);

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
    getDelivery();
  }, [order]);
  return (
    <TableRow className={index % 2 === 0 ? "bg-inherit" : "bg-white"}>
      <TableCell className="font-kanit text-gray-600 font-medium tracking-wider">
        {order.orderReference.toUpperCase()}
      </TableCell>
      <TableCell className="font-raleway font-semibold">
        {order.orderDate.getDate().toString() +
          "/" +
          (order.orderDate.getMonth() + 1) +
          "/" +
          order.orderDate.getFullYear()}
      </TableCell>
      <TableCell className="font-kanit text-gray-600 select-text">
        <small className="">{order.ordererFirstName}</small>
        <br />
        <span className="font-medium text-black">
          {order.ordererLastName.toUpperCase()}
        </span>
        <br />
        <small className="text-black">
          {order.ordererPhoneNumber.slice(0, 2) +
            "-" +
            order.ordererPhoneNumber.slice(2, 5) +
            "-" +
            order.ordererPhoneNumber.slice(5, 8)}
        </small>
        {" | "}
        <small className="text-black">{order.ordererEmail}</small>
      </TableCell>
      <TableCell className="font-kanit text-black">
        {neighborhood?.neighborhoodName}
      </TableCell>
      <TableCell className="">
        <Button
          variant="contained"
          className={
            order.validatedAt !== null
              ? "bg-green-100 h-7 text-green-800 rounded-full normal-case font-light cursor-default"
              : order.rejectedAt !== null
              ? "bg-red-100 h-7 text-red-800 rounded-full normal-case font-light cursor-default"
              : "bg-gray-200 h-7 text-black rounded-full normal-case font-light cursor-default"
          }
          disableElevation
          disableRipple
        >
          {order.validatedAt !== null && (
            <span className="font-kanit bg-green-100 text-green-800 rounded-full drop-shadow-sm align-middle">
              <BsFillPatchCheckFill className="inline mr-1" />
              Validée
            </span>
          )}
          {order.rejectedAt !== null && (
            <span className="font-kanit bg-red-100 text-red-800 rounded-full drop-shadow-sm align-middle ">
              <AiOutlineStop className="inline mr-1" />
              Rejetée
            </span>
          )}
          {order.rejectedAt === null && order.validatedAt === null && (
            <span className="font-kanit bg-gray-200 text-black rounded-full drop-shadow-sm align-middle first-letter:uppercase">
              à veififier
            </span>
          )}
        </Button>
      </TableCell>
      <TableCell className="">
        {delivery === null ? (
          <div>
            <Button
              size="small"
              className="text-xs w-20 normal-case font-kanit font-normal bg-primary rounded-full"
              variant="contained"
              onClick={() => setOpenAssignToDeliveryDialog(true)}
            >
              Assigner
            </Button>
          </div>
        ) : (
          <div className="w-full h-full relative">
            <Button
              size="small"
              className={
                delivery.deliveryStatus === "DONE"
                  ? "text-xs w-20 normal-case font-kanit font-normal bg-green-100 text-green-800  rounded-full"
                  : delivery.deliveryStatus === "IN_PROGRESS"
                  ? "text-xs w-20 normal-case font-kanit font-normal bg-orange-100 text-orange-800 rounded-full"
                  : "text-xs w-20 normal-case font-kanit font-normal rounded-full bg-red-100 text-red-800"
              }
              variant="contained"
              onClick={() => setOpenAssignToDeliveryDialog(true)}
            >
              {delivery.deliveryStatus === "DONE"
                ? "Livrée"
                : delivery.deliveryStatus === "IN_PROGRESS"
                ? "En cours"
                : "A faire"}
            </Button>
          </div>
        )}
      </TableCell>
      <TableCell className="">
        <div className="w-full h-full grid grid-cols-2">
          <Tooltip title="Modifier">
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                setUpdateOrderDialogIsOnReadOnly(false);
                setOpenUpdateOrderDialog(true);
              }}
            >
              <MdEdit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Details">
            <IconButton
              size="small"
              onClick={() => {
                setUpdateOrderDialogIsOnReadOnly(true);
                setOpenUpdateOrderDialog(true);
              }}
            >
              <BsInfoCircle className="text-neutral-700" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Valider">
            <span>
              <IconButton
                size="small"
                disabled={order.validatedAt !== null}
                onClick={() => setOpenConfirmValidateOrderDialog(true)}
              >
                <BsPatchCheckFill
                  className={order.validatedAt !== null ? "" : "text-green-500"}
                />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Rejeter">
            <span className="">
              <IconButton
                size="small"
                disabled={order.rejectedAt !== null}
                onClick={() => setOpenConfirmRejectOrderDialog(true)}
              >
                <AiOutlineStop
                  className={order.rejectedAt !== null ? "" : "text-red-800"}
                />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      </TableCell>
      <Dialog
        open={openConfirmValidateOrderDialog}
        onClose={() => setOpenConfirmValidateOrderDialog(false)}
      >
        <div className="p-5">
          <h1 className="font-kanit font-normal text-xl text-primary">
            Voulez-vous vraiment valider cette commande ?
          </h1>
          <p className="mt-2 font-light text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
            assumenda iusto tempore optio consectetur quo cumque labore
            temporibus sequi in? Autem iste tempora mollitia labore dolorem.
            Neque a eveniet porro. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Consectetur ad at neque similique odio voluptatem
            animi, laboriosam perspiciatis cum quod facere harum? Praesentium
            pariatur molestias iste amet, veritatis animi esse.
          </p>
          <div className="mt-5 w-full flex items-center justify-between">
            <Button
              variant="outlined"
              className="normal-case"
              onClick={() => setOpenConfirmValidateOrderDialog(false)}
            >
              Annuler
            </Button>
            <LoadingButton
              loadingPosition="start"
              loading={isLoading}
              variant="contained"
              className={
                isLoading
                  ? "font-raleway font-semibold"
                  : "bg-teal-700 font-raleway font-semibold"
              }
              startIcon={<BsPatchCheckFill />}
              onClick={() => validateOrder()}
            >
              Confirmer
            </LoadingButton>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={openConfirmRejectOrderDialog}
        onClose={() => setOpenConfirmRejectOrderDialog(false)}
      >
        <div className="p-5">
          <h1 className="font-kanit font-normal text-xl text-primary">
            Voulez-vous vraiment rejeter cette commande ?
          </h1>
          <p className="mt-2 font-light text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
            assumenda iusto tempore optio consectetur quo cumque labore
            temporibus sequi in? Autem iste tempora mollitia labore dolorem.
            Neque a eveniet porro. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Consectetur ad at neque similique odio voluptatem
            animi, laboriosam perspiciatis cum quod facere harum? Praesentium
            pariatur molestias iste amet, veritatis animi esse.
          </p>
          <div className="mt-5 w-full flex items-center justify-between">
            <Button
              variant="outlined"
              className="normal-case"
              onClick={() => setOpenConfirmRejectOrderDialog(false)}
            >
              Annuler
            </Button>
            <LoadingButton
              loadingPosition="start"
              loading={isLoading}
              variant="contained"
              className={
                isLoading
                  ? "font-raleway font-semibold"
                  : "bg-red-700 font-raleway font-semibold"
              }
              startIcon={<AiOutlineStop />}
              onClick={() => rejectOrder()}
            >
              Confirmer
            </LoadingButton>
          </div>
        </div>
      </Dialog>
      <SuccessSnackbar
        open={openValidatedSuccessfullySnackbar}
        text="Validée avec succès."
        setOpen={setOpenValidatedSuccessfullySnackbar}
      />
      <SuccessSnackbar
        open={openRejectedSuccessfullySnackbar}
        text="Rejetée avec succès."
        setOpen={setOpenRejectedSuccessfullySnackbar}
      />
      <UpdateOrderDialog
        open={openUpdateOrderDialog}
        setOpen={setOpenUpdateOrderDialog}
        order={order}
        readOnly={updateOrderDialogIsOnReadOnly}
      />
      <AssignToDeliveryDialog
        open={openAssignToDeliveryDialog}
        setOpen={setOpenAssignToDeliveryDialog}
        order={order}
        currentDeliveryId={order.deliveryId}
        refreshOrders={refreshOrders}
      />
    </TableRow>
  );
};

export default OrderRow;
