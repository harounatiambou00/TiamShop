import React from "react";
import Order from "../../data/models/Order";
import { Page } from "../../components/admin-layout";
import {
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { BsSearch } from "react-icons/bs";
import OrderRow from "./order-row/OrderRow";

const tableHeadCells = [
  "Réference",
  "Date",
  "Client",
  "Secteur",
  "Status",
  "Livraison",
  "",
];

const tabs = [
  "Toutes les commandes",
  "À valider",
  "Validées",
  "Rejetées",
  "Non assignées",
];

type PeriodType = "all" | "one_week" | "one_month" | "one_year";
const AdminOrdersPage = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [ordersToBeDisplayed, setOrdersTobeDisplayed] = React.useState<Order[]>(
    []
  );

  const getOrders = async () => {
    let url = process.env.REACT_APP_API_URL + "orders/";
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
  };
  React.useEffect(() => {
    getOrders();
  }, []);

  React.useEffect(() => {
    setOrdersTobeDisplayed(orders);
  }, [orders]);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  const [numberOfPages, setNumberOfPages] = React.useState<number>(1);
  React.useEffect(() => {
    setNumberOfPages(
      ordersToBeDisplayed.length / 10 < 0
        ? 1
        : ordersToBeDisplayed.length % 10 === 0
        ? Math.floor(ordersToBeDisplayed.length / 10)
        : Math.floor(ordersToBeDisplayed.length / 10) + 1
    );
  }, [ordersToBeDisplayed]);

  const [activeTab, setActiveTab] = React.useState<number>(0);
  React.useEffect(() => {
    if (activeTab === 0) {
      setOrdersTobeDisplayed(orders);
    } else if (activeTab === 1)
      setOrdersTobeDisplayed(
        orders.filter((o) => o.validatedAt === null && o.rejectedAt === null)
      );
    else if (activeTab === 2)
      setOrdersTobeDisplayed(orders.filter((o) => o.validatedAt !== null));
    else if (activeTab === 3)
      setOrdersTobeDisplayed(orders.filter((o) => o.rejectedAt !== null));
    else if (activeTab === 4)
      setOrdersTobeDisplayed(orders.filter((o) => o.deliveryId === null));
  }, [activeTab, orders]);

  const [period, setPeriod] = React.useState<PeriodType>("all");
  React.useEffect(() => {
    if (period === "all") {
      setOrdersTobeDisplayed(orders);
    } else if (period === "one_week") {
      setOrdersTobeDisplayed(
        orders.filter(
          (o) =>
            o.orderDate.getTime() >=
            new Date().getTime() - 1000 * 60 * 60 * 24 * 7
        )
      );
    } else if (period === "one_month") {
      setOrdersTobeDisplayed(
        orders.filter(
          (o) =>
            o.orderDate.getTime() >=
            new Date().getTime() - 1000 * 60 * 60 * 24 * 31
        )
      );
    } else if (period === "one_year") {
      setOrdersTobeDisplayed(
        orders.filter(
          (o) =>
            o.orderDate.getTime() >=
            new Date().getTime() - 1000 * 60 * 60 * 24 * 365
        )
      );
    }
  }, [period, orders]);

  const refreshOrders = () => {
    setOrders([]);
    getOrders();
  };
  return (
    <Page
      title="Les commandes"
      subtitle="Dans cette section, Vous pouvez consulter et gérer toutes les commandes et leurs détails. Vous pouvez valider ou rejeter les commandes. Vous pouvez également consulter les informations relatives à l'auteur de la commande, telles que son prénom, son nom, son adresse électronique, son numéro de téléphone, son adresse ... Vous devez appeler le donneur d'ordre avant de valider une commande."
    >
      <div className="mt-10 w-full border-b">
        <Tabs
          value={activeTab}
          onChange={(event: React.SyntheticEvent, newValue: number) => {
            setActiveTab(newValue);
          }}
        >
          {tabs.map((t, index) => (
            <Tab
              value={index}
              label={
                <span className="font-kanit font-normal normal-case">{t}</span>
              }
            />
          ))}
        </Tabs>
      </div>
      <div className="w-full flex justify-between items-end px-2 py-2">
        <OutlinedInput
          className="w-1/2 bg-white h-9 font-kanit placeholder:font-kanit placeholder:text-gray-600"
          size="small"
          startAdornment={<BsSearch className="mr-2" />}
          placeholder="Recherchez une commande à partir de sa référence ou du nom de la personne ayant passé la commande"
          onChange={(e) => {
            setOrdersTobeDisplayed(
              orders.filter((o) =>
                o.orderReference
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              )
            );
          }}
        />
        <div className="flex items-center">
          <div className="flex flex-col">
            <label htmlFor="" className="font-kanit font-normal">
              Période
            </label>
            <Select
              className="font-kanit font-normal bg-white h-8 w-40"
              MenuProps={{ disableScrollLock: true }}
              value={period}
              onChange={(e) => {
                let value = e.target.value;
                if (
                  value === "one_week" ||
                  value === "one_month" ||
                  value === "one_year"
                )
                  setPeriod(value);
                else setPeriod("all");
              }}
            >
              <MenuItem className="font-kanit text-sm font-normal" value="all">
                Tout le temps
              </MenuItem>
              <MenuItem
                className="font-kanit text-sm font-normal"
                value="one_week"
              >
                Une semaine
              </MenuItem>
              <MenuItem
                className="font-kanit text-sm font-normal"
                value="one_month"
              >
                Un mois
              </MenuItem>
              <MenuItem
                className="font-kanit text-sm font-normal"
                value="one_year"
              >
                Une année
              </MenuItem>
            </Select>
          </div>
        </div>
      </div>
      <Table
        size="small"
        className="mt-5 overflow-x-scroll"
        sx={{ minWidth: 1000 }}
      >
        <TableHead className="bg-white">
          <TableRow>
            {tableHeadCells.map((c, index) => (
              <TableCell
                key={index}
                className="font-raleway font-bold text-xs uppercase tracking-wide select-none"
              >
                {c}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersToBeDisplayed.map((o, index) => (
            <OrderRow
              key={index}
              index={index}
              order={o}
              refreshOrders={refreshOrders}
            />
          ))}
        </TableBody>
      </Table>
      <div className="mt-14 w-full flex flex-col items-center justify-between">
        <span className="text-gray-500 mb-5 font-normal sm:text-xl lg:text-sm text-center">
          Vous avez vu{" "}
          {currentPage === numberOfPages || ordersToBeDisplayed.length === 0
            ? ordersToBeDisplayed.length
            : currentPage * 10}{" "}
          commandes sur {ordersToBeDisplayed.length}
        </span>

        <Pagination
          page={currentPage}
          onChange={handleChangePage}
          count={numberOfPages}
          shape="rounded"
          color="primary"
          variant="outlined"
          showFirstButton
          showLastButton
        />
      </div>
    </Page>
  );
};

export default AdminOrdersPage;
