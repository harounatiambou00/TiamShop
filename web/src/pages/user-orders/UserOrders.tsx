import React from "react";
import Order from "../../data/models/Order";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import { OutlinedInput, ToggleButton, ToggleButtonGroup } from "@mui/material";

import OrderRow from "./order-row/OrderRow";
import { BsSearch } from "react-icons/bs";

const UserOrders: React.FC = () => {
  const authenticatedClient = useAppSelector(
    (state: RootState) => state.authenticatedClient.client
  );
  const [orders, setOrders] = React.useState<Order[]>([]);
  const getOrders = async () => {
    if (authenticatedClient) {
      let url =
        process.env.REACT_APP_API_URL +
        "orders/get-orders-of-a-client/" +
        authenticatedClient.userId;
      let response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "text/plain",
        },
      });
      let content = await response.json();
      if (!content.success) {
      } else {
        setOrders([]);
        let data = content.data;
        let tempOrders = [] as Order[];
        for (let order of data) {
          tempOrders.push({
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
          });
        }
        setOrders(tempOrders.reverse());
      }
    }
  };

  React.useEffect(() => {
    getOrders();
  }, []);

  const [activeFilter, setActiveFilter] = React.useState<
    "all" | "validated" | "rejected" | "to_be_verified"
  >("all");
  const [ordersToBeDisplayed, setOrderToBeDisplayed] = React.useState<Order[]>(
    []
  );
  React.useEffect(() => {
    if (activeFilter === "validated") {
      setOrderToBeDisplayed(orders.filter((o) => o.validatedAt !== null));
    } else if (activeFilter === "rejected") {
      setOrderToBeDisplayed(orders.filter((o) => o.rejectedAt !== null));
    } else if (activeFilter === "to_be_verified") {
      setOrderToBeDisplayed(
        orders.filter((o) => o.rejectedAt === null && o.validatedAt === null)
      );
    } else {
      setOrderToBeDisplayed(orders);
    }
  }, [orders, activeFilter]);
  return (
    <div className="">
      <div>
        <h1 className="sm:text-4xl lg:text-2xl font-medium text-gray-600">
          Mes commandes
        </h1>
        <span className="sm:text-xl lg:text-sm">
          Vérifier l'état de nos commandes récentes, gérer les retours et
          télécharger les reçus
        </span>
      </div>
      <div className="w-full sm:mt-8 lg:mt-5 flex sm:flex-col-reverse lg:flex-row items-center justify-between">
        <ToggleButtonGroup
          size="small"
          value={activeFilter}
          color="secondary"
          className="sm:mt-5 lg:mt-0 border border-secondary"
        >
          <ToggleButton
            size="small"
            value="all"
            className="font-kanit font-normal sm:text-3xl lg:text-sm"
            onClick={() => setActiveFilter("all")}
          >
            Toutes
          </ToggleButton>
          <ToggleButton
            size="small"
            value="to_be_verified"
            className="font-kanit font-normal sm:text-3xl lg:text-sm"
            onClick={() => setActiveFilter("to_be_verified")}
          >
            En traitement
          </ToggleButton>
          <ToggleButton
            size="small"
            value="validated"
            className="font-kanit font-normal sm:text-3xl lg:text-sm"
            onClick={() => setActiveFilter("validated")}
          >
            Validées
          </ToggleButton>
          <ToggleButton
            size="small"
            value="rejected"
            className="font-kanit font-normal sm:text-3xl lg:text-sm"
            onClick={() => setActiveFilter("rejected")}
          >
            Rejetées
          </ToggleButton>
        </ToggleButtonGroup>
        <OutlinedInput
          placeholder="Recherchez une commande par sa réference"
          className="sm:w-11/12 lg:w-5/12 placeholder:font-kanit font-kanit sm:h-20 lg:h-10 sm:text-3xl lg:text-base"
          size="small"
          startAdornment={
            <BsSearch className="sm:mr-5 lg:mr-2 sm:text-5xl lg:text-base" />
          }
          onChange={(e) => {
            setActiveFilter("all");
            let value = e.target.value.toLowerCase();
            if (value !== "") {
              setOrderToBeDisplayed(
                orders.filter((o) =>
                  o.orderReference.toLowerCase().includes(value)
                )
              );
            } else {
              setOrderToBeDisplayed(orders);
            }
          }}
        />
      </div>
      <div className="w-full sm:mt-10 lg:mt-5">
        {ordersToBeDisplayed.map((order, index) => (
          <OrderRow order={order} index={index} />
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
