import React from "react";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import { Admin } from "../../data/models/Admin";
import { MenuItem, Select, Skeleton } from "@mui/material";
import TiamshopInNumbersSection from "./tiamshop-in-numbers-section/TiamshopInNumbersSection";
import NewClientsSection from "./new-clients-section/NewClientsSection";
import { Client } from "../../data/models";
import OrdersAndRevenusGraph from "./orders-and-revenus-graphic/OrdersAndRevenusGraph";
import LastestOrders from "./lastest-orders/LastestOrders";
import BestSellers from "./best-sellers/BestSellers";

const Dashboard = () => {
  const authenticatedAdmin = useAppSelector(
    (state: RootState) => state.authenticatedAdmin.admin
  ) as Admin;
  const [period, setPeriod] = React.useState<
    "24_hours" | "1_month" | "1_week" | "1_year"
  >("24_hours");

  const [clients, setClients] = React.useState<Client[]>([]);
  React.useEffect(() => {
    const getClients = async () => {
      let url = process.env.REACT_APP_API_URL + "users/get-all-clients";
      let response = await fetch(url);
      let content = await response.json();
      let data = content.data;

      for (let i of data) {
        setClients((currentClients) => [
          ...currentClients,
          {
            ...{},
            userId: i.userId,
            FirstName: i.firstName,
            LastName: i.lastName,
            Email: i.email,
            PhoneNumber: i.phoneNumber,
            CompleteAddress: i.completeAddress,
            BirthDate:
              //if the birthday is not null we create a date object by slicing the string because .net datetime and typescript date don't match
              i.birthDate != null
                ? new Date(
                    parseInt(i.birthDate.slice(0, 4)),
                    parseInt(i.birthDate.slice(5, 7)) - 1,
                    parseInt(i.birthDate.slice(8, 10))
                  )
                : null,
          },
        ]);
      }
    };
    getClients();
  }, []);
  return (
    <div className="pt-24 px-10 flex flex-col w-full h-screen overflow-y-scroll pb-10 bg-white">
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-primary font-raleway font-bold text-2xl">
            Ravis de vous revoir, {authenticatedAdmin?.FirstName}
          </h1>
          <p className="font-kanit font-normal text-gray-600">
            Que s'est-il passé sur Tiamshop en votre abscence ?
          </p>
        </div>
        <div className="flex flex-col">
          <label className="font-normal">Période</label>
          <Select
            size="small"
            className="bg-white drop-shadow-sm w-40 font-kanit font-light"
            value={period}
            onChange={(e) => {
              if (
                e.target.value === "24_hours" ||
                e.target.value === "1_week" ||
                e.target.value === "1_month" ||
                e.target.value === "1_year"
              )
                setPeriod(e.target.value);
              else setPeriod("24_hours");
            }}
          >
            <MenuItem className="font-kanit font-light" value="24_hours">
              24 heures
            </MenuItem>
            <MenuItem className="font-kanit font-light" value="1_week">
              Une semaine
            </MenuItem>
            <MenuItem className="font-kanit font-light" value="1_month">
              Un mois
            </MenuItem>
            <MenuItem className="font-kanit font-light" value="1_year">
              Une année
            </MenuItem>
          </Select>
        </div>
      </div>
      <TiamshopInNumbersSection />
      <OrdersAndRevenusGraph />
      <div className="grid grid-cols-2 gap-5 w-full">
        {clients.length > 0 ? (
          <NewClientsSection clients={clients.slice(-10)} />
        ) : (
          <div className="h-60 mt-5 bg-white rounded-md drop-shadow-sm p-4 flex flex-col justify-between">
            <h1 className="font-raleway text-xl font-medium">
              Les nouveaux clients
            </h1>
            <Skeleton
              className="h-48 w-full"
              variant="rectangular"
              animation="wave"
            />
          </div>
        )}
        <LastestOrders />
      </div>
      <BestSellers />
    </div>
  );
};

export default Dashboard;
