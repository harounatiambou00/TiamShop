import React from "react";
import Delivery from "../../data/models/Delivery";
import { BsInfoCircle } from "react-icons/bs";
import {
  Button,
  ButtonGroup,
  Chip,
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
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Neighborhood } from "../../data/models/Neighborhood";
import Order from "../../data/models/Order";
import moment from "moment";

type Props = {
  delivery: Delivery;
  index: number;
  refreshDeliveries: () => void;
};

const Item = ({ delivery, index, refreshDeliveries }: Props) => {
  const authenticatedDeliverer = useAppSelector(
    (state: RootState) => state.authenticatedDeliverer.deliverer
  );
  const [neighborhood, setNeighborhood] = React.useState<Neighborhood | null>(
    null
  );
  React.useEffect(() => {
    if (authenticatedDeliverer !== null) {
      const getNeighborhood = async () => {
        let url =
          process.env.REACT_APP_API_URL +
          "neighborhoods/" +
          authenticatedDeliverer.neighborhoodId;
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
  }, [authenticatedDeliverer]);

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

  return (
    <TableRow className={index % 2 === 0 ? "" : "bg-background"}>
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
      <TableCell align="center" className="font-kanit font-normal">
        {orders.length > 0 ? (
          <div
            key={index}
            className="text-center flex flex-col items-center flex-wrap"
          >
            {orders.map((o, index) => (
              <div className="font-medium text-sm border border-amber-600 bg-amber-50 rounded-full px-2 py-1 uppercase w-fit">
                {o.orderReference}
              </div>
            ))}
          </div>
        ) : (
          <div key={index}>Aucune</div>
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
        <IconButton color="primary">
          <BsInfoCircle className="" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default Item;
