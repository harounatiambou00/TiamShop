import React from "react";
import Delivery from "../../../data/models/Delivery";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TableCell,
  TableRow,
} from "@mui/material";
import { MdEdit, MdKeyboardArrowDown } from "react-icons/md";
import { Deliverer } from "../../../data/models/Deliverer";
import { BsInfoCircle } from "react-icons/bs";
import { Neighborhood } from "../../../data/models/Neighborhood";
import Order from "../../../data/models/Order";
import AssignToDelivererDialog from "./assign-to-deliverer-dialog/AssignToDelivererDialog";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  delivery: Delivery;
  index: number;
  refreshDeliveries: () => void;
};

const DeliveryRow = ({ delivery, index, refreshDeliveries }: Props) => {
  const [deliverer, setDeliverer] = React.useState<Deliverer | null>(null);
  React.useEffect(() => {
    const getDeliverer = async () => {
      if (delivery.assignedTo !== null) {
        let url =
          process.env.REACT_APP_API_URL +
          "users/get-user-by-id/" +
          delivery.assignedTo;
        let response = await fetch(url);
        let content = await response.json();

        if (content.success)
          setDeliverer((current) => ({
            ...current,
            userId: content.data.userId,
            firstName: content.data.firstName,
            lastName: content.data.lastName,
            email: content.data.email,
            phoneNumber: content.data.phoneNumber,
            verifiedAt:
              content.data.verifiedAt != null
                ? new Date(
                    parseInt(content.data.verifiedAt.slice(0, 4)),
                    parseInt(content.data.verifiedAt.slice(5, 7)) - 1,
                    parseInt(content.data.verifiedAt.slice(8, 10))
                  )
                : null,
            completeAddress: content.data.completeAddress,
            birthDate:
              //if the birthday is not null we create a date object by slicing the string because .net datetime and typescript date don't match
              content.data.birthDate != null
                ? new Date(
                    parseInt(content.data.birthDate.slice(0, 4)),
                    parseInt(content.data.birthDate.slice(5, 7)) - 1,
                    parseInt(content.data.birthDate.slice(8, 10))
                  )
                : null,
            neighborhoodId: content.data.neighborhoodId,
          }));
      }
    };

    getDeliverer();
  }, [delivery]);

  const [neighborhood, setNeighborhood] = React.useState<Neighborhood | null>(
    null
  );
  React.useEffect(() => {
    if (deliverer !== null) {
      const getNeighborhood = async () => {
        let url =
          process.env.REACT_APP_API_URL +
          "neighborhoods/" +
          deliverer.neighborhoodId;
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

      getNeighborhood();
    }
  }, [deliverer]);

  const [orders, setOrders] = React.useState<Order[]>([]);

  React.useEffect(() => {
    const getOrders = async () => {
      if (delivery) {
        let url =
          process.env.REACT_APP_API_URL +
          "orders/get-orders-of-a-delivery/" +
          delivery.deliveryId;
        let response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "text/plain",
          },
        });
        let content = await response.json();
        if (!content.success) {
        } else {
          let data = content.data;
          for (let order of data) {
            setOrders((current) => [
              ...current,
              {
                orderId: order.orderId,
                orderReference: order.orderReference,
                ordererFirstName: order.ordererFirstName,
                ordererLastName: order.ordererLastName,
                ordererEmail: order.ordererEmail,
                ordererCompleteAddress: order.ordererCompleteAddress,
                ordererPhoneNumber: order.ordererPhoneNumber,
                orderDate:
                  order.orderDate !== null
                    ? new Date(
                        parseInt(order.orderDate.slice(0, 4)),
                        parseInt(order.orderDate.slice(5, 7)) - 1,
                        parseInt(order.orderDate.slice(8, 10))
                      )
                    : new Date(),
                neighborhoodId: order.neighborhoodId,
                clientId: order.neighborhoodId,
                validatedAt:
                  order.validatedAt !== null
                    ? new Date(
                        parseInt(order.validatedAt.slice(0, 4)),
                        parseInt(order.validatedAt.slice(5, 7)) - 1,
                        parseInt(order.validatedAt.slice(8, 10))
                      )
                    : null,
                rejectedAt:
                  order.rejectedAt !== null
                    ? new Date(
                        parseInt(order.rejectedAt.slice(0, 4)),
                        parseInt(order.rejectedAt.slice(5, 7)) - 1,
                        parseInt(order.rejectedAt.slice(8, 10))
                      )
                    : null,
                deliveredAt:
                  order.deliveredAt !== null
                    ? new Date(
                        parseInt(order.deliveredAt.slice(0, 4)),
                        parseInt(order.deliveredAt.slice(5, 7)) - 1,
                        parseInt(order.deliveredAt.slice(8, 10))
                      )
                    : null,
                deliveryId: order.deliveryId,
                adminWhoValidatedItId: order.adminWhoValidatedItId,
                adminWhoRejectedItId: order.adminWhoRejectedItId,
              },
            ]);
          }
        }
      }
    };

    setOrders([]);
    getOrders();
  }, [delivery]);

  const [openDeliveryStatusPopper, setOpenDeliveryStatusPopper] =
    React.useState<boolean>(false);
  const deliveryStatusPopperAnchorRef = React.useRef<HTMLDivElement>(null);
  const handleToggleDeliveryStatusPopover = () => {
    setOpenDeliveryStatusPopper((prev) => !prev);
  };

  const handleCloseDeliveryStatusPopper = (event: Event) => {
    if (
      deliveryStatusPopperAnchorRef.current &&
      deliveryStatusPopperAnchorRef.current.contains(
        event.target as HTMLElement
      )
    ) {
      return;
    }

    setOpenDeliveryStatusPopper(false);
  };

  const [openAssignToDelivererDialog, setOpenAssignToDelivererDialog] =
    React.useState<boolean>(false);

  const handleUpdateDeliveryStatus = async (
    status: "TODO" | "IN_PROGRESS" | "DONE"
  ) => {
    let url = process.env.REACT_APP_API_URL + "deliveries";
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deliveryId: delivery.deliveryId,
        deliveryStatus: status,
        assignedTo: delivery.assignedTo,
        deliveredAt: status === "DONE" ? moment().format("YYYY-MM-DD") : null,
      }),
    });

    let content = await response.json();
    if (content.success) {
      refreshDeliveries();
    }
  };

  const handleDeleteDelivery = async () => {
    let url =
      process.env.REACT_APP_API_URL + "deliveries/" + delivery.deliveryId;
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "text/plain",
      },
    });

    let content = await response.json();
    if (content.success) {
      refreshDeliveries();
    }
  };
  return (
    <TableRow className={index % 2 === 0 ? "" : "bg-white"}>
      <TableCell
        align="center"
        className="font-kanit tracking-wider font-medium text-xs"
      >
        {delivery.deliveryReference}
      </TableCell>
      <TableCell align="center">
        <ButtonGroup
          variant="contained"
          className="rounded-full bg-white"
          disableElevation
          ref={deliveryStatusPopperAnchorRef}
          color="secondary"
        >
          <Button
            className={
              delivery.deliveryStatus === "TODO"
                ? "bg-red-100 text-red-800 rounded-l-full px-2 font-kanit text-xs"
                : delivery.deliveryStatus === "IN_PROGRESS"
                ? "bg-amber-100 text-amber-800 rounded-l-full px-2 font-kanit text-xs"
                : "bg-green-100 text-green-800 rounded-l-full px-2 font-kanit text-xs"
            }
            size="small"
            disableRipple
            disableFocusRipple
            disableTouchRipple
          >
            {delivery.deliveryStatus === "TODO"
              ? "En préparation"
              : delivery.deliveryStatus === "IN_PROGRESS"
              ? "En cours"
              : "Livrée"}
          </Button>
          <Button
            className={
              delivery.deliveryStatus === "TODO"
                ? "bg-red-100 text-red-800 rounded-r-full font-kanit text-xs"
                : delivery.deliveryStatus === "IN_PROGRESS"
                ? "bg-amber-100 text-amber-800 rounded-r-full text-xs"
                : "bg-green-100 text-green-800 rounded-r-full text-xs"
            }
            size="small"
            onClick={handleToggleDeliveryStatusPopover}
          >
            <MdKeyboardArrowDown />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={openDeliveryStatusPopper}
          anchorEl={deliveryStatusPopperAnchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener
                  onClickAway={handleCloseDeliveryStatusPopper}
                >
                  <MenuList autoFocusItem>
                    <MenuItem
                      className="font-kanit font-light text-red-700 hover:bg-red-100"
                      onClick={() => handleUpdateDeliveryStatus("TODO")}
                    >
                      En préparation
                    </MenuItem>
                    <MenuItem
                      className="font-kanit font-light"
                      onClick={() => handleUpdateDeliveryStatus("IN_PROGRESS")}
                    >
                      En cours
                    </MenuItem>
                    <MenuItem
                      className="font-kanit font-light text-green-700 hover:bg-green-50"
                      onClick={() => handleUpdateDeliveryStatus("DONE")}
                    >
                      Livrée
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </TableCell>
      <TableCell align="center" className="h-fit">
        {delivery.deliveredAt ? (
          <span className="font-kanit font-normal ">
            {moment(delivery.deliveredAt).format("DD/MM/YYYY")}
          </span>
        ) : (
          <span className="font-kanit font-normal">N/A</span>
        )}
      </TableCell>
      <TableCell align="center" className="font-amita font-semibold">
        {orders.length}
      </TableCell>
      <TableCell align="center" className="">
        {deliverer !== null ? (
          <span className="font-kanit text-gray-600 select-text relative">
            <small className="">{deliverer.firstName}</small>
            <br />
            <span className="font-medium text-black">
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
            <IconButton
              size="small"
              color="primary"
              className="absolute right-1 top-0"
              onClick={() => setOpenAssignToDelivererDialog(true)}
            >
              <MdEdit />
            </IconButton>
          </span>
        ) : (
          <Button
            className="rounded-full normal-case px-3 font-kanit bg-primary"
            variant="contained"
            size="small"
            onClick={() => setOpenAssignToDelivererDialog(true)}
          >
            Assigner
          </Button>
        )}
      </TableCell>
      <TableCell align="center" className="font-kanit font-normal text-xs">
        {neighborhood !== null ? (
          neighborhood.neighborhoodName
        ) : (
          <span className="font-kanit font-normal">N/A</span>
        )}
      </TableCell>
      <TableCell align="center">
        <div className="flex flex-col">
          <IconButton size="small" color="primary">
            <BsInfoCircle className="" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            className="mt-1"
            onClick={handleDeleteDelivery}
          >
            <AiOutlineDelete />
          </IconButton>
        </div>
      </TableCell>
      <AssignToDelivererDialog
        open={openAssignToDelivererDialog}
        setOpen={setOpenAssignToDelivererDialog}
        delivery={delivery}
        currentDeliverer={deliverer}
        refreshDeliveries={refreshDeliveries}
      />
    </TableRow>
  );
};

export default DeliveryRow;
