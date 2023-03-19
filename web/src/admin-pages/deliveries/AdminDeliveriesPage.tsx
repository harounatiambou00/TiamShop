import React from "react";
import { Page } from "../../components/admin-layout";
import Delivery from "../../data/models/Delivery";
import {
  OutlinedInput,
  Pagination,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { BsSearch } from "react-icons/bs";
import DeliveryRow from "./delivery-row/DeliveryRow";

const tableHeadCells = [
  "Réference",
  "Status",
  "Date",
  "Commandes",
  "Livreur",
  "Secteur",
  "",
];
const tabs = ["Toutes les livraisons", "En prépation", "En cours", "Livrée"];
const AdminDeliveriesPage = () => {
  const [deliveries, setDeliveries] = React.useState<Delivery[]>([]);
  const getDeliveries = async () => {
    let url = process.env.REACT_APP_API_URL + "deliveries";
    let response = await fetch(url, {
      method: "GET",
    });
    let content = await response.json();
    if (content.success) {
      setDeliveries([]);
      let data = content.data;
      let tempDeliveries = [] as Delivery[];

      for (let i of data) {
        tempDeliveries.push({
          deliveryId: i.deliveryId,
          deliveryReference: i.deliveryReference,
          deliveredAt:
            i.deliveredAt !== null && typeof i.deliveredAt === "string"
              ? new Date(
                  parseInt(i.deliveredAt.slice(0, 4)),
                  parseInt(i.deliveredAt.slice(5, 7)) - 1,
                  parseInt(i.deliveredAt.slice(8, 10))
                )
              : null,
          assignedTo: i.assignedTo,
          deliveryStatus: i.deliveryStatus,
        });
      }
      setDeliveries(tempDeliveries.reverse());
    }
  };
  React.useEffect(() => {
    getDeliveries();
  }, []);

  const [deliveriesToBeDisplayed, setDeliveriesToBeDisplayed] = React.useState<
    Delivery[]
  >([]);
  React.useEffect(() => {
    setDeliveriesToBeDisplayed(deliveries);
  }, [deliveries]);

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
      deliveriesToBeDisplayed.length / 10 < 0
        ? 1
        : deliveriesToBeDisplayed.length % 10 === 0
        ? Math.floor(deliveriesToBeDisplayed.length / 10)
        : Math.floor(deliveriesToBeDisplayed.length / 10) + 1
    );
  }, [deliveriesToBeDisplayed]);

  const [activeTab, setActiveTab] = React.useState<number>(0);
  React.useEffect(() => {
    if (activeTab === 0) {
      setDeliveriesToBeDisplayed(deliveries);
    } else if (activeTab === 1)
      setDeliveriesToBeDisplayed(
        deliveries.filter((o) => o.deliveryStatus === "TODO")
      );
    else if (activeTab === 2)
      setDeliveriesToBeDisplayed(
        deliveries.filter((o) => o.deliveryStatus === "IN_PROGRESS")
      );
    else if (activeTab === 3)
      setDeliveriesToBeDisplayed(
        deliveries.filter((o) => o.deliveryStatus === "DONE")
      );
  }, [activeTab, deliveries]);

  const handleAddDelivery = async () => {
    let url = process.env.REACT_APP_API_URL + "deliveries";
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    let content = await response.json();
    if (content.success) {
      setDeliveries([]);
      getDeliveries();
    }
  };

  return (
    <Page
      title="Les livraisons"
      buttonTitle="Ajouter une livraison"
      buttonAction={() => handleAddDelivery()}
      subtitle="Dans cette section, Vous pouvez consulter et gérer toutes les livraisons et leurs détails. Vous pourrez créer une livraison et ajouter des commandes à une livraison. Vous pouvez également consulter les informations relatives au livreur, telles que son prénom, son nom, son adresse électronique, son numéro de téléphone, son secteur ... "
    >
      <div className="w-full">
        <div className="mt-10 w-full border-b">
          <Tabs
            value={activeTab}
            onChange={(event: React.SyntheticEvent, newValue: number) => {
              setActiveTab(newValue);
            }}
          >
            {tabs.map((t, index) => (
              <Tab
                key={index}
                value={index}
                label={
                  <span className="font-kanit font-normal normal-case">
                    {t}
                  </span>
                }
              />
            ))}
          </Tabs>
        </div>
        <div className="mt-5">
          <OutlinedInput
            className="w-1/2 bg-white h-9 font-kanit placeholder:font-kanit placeholder:text-gray-600"
            size="small"
            startAdornment={<BsSearch className="mr-2" />}
            placeholder="Recherchez une livraison à partir de sa référence"
            onChange={(e) => {
              setDeliveriesToBeDisplayed(
                deliveries.filter((d) =>
                  d.deliveryReference
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }}
          />
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
                  align="center"
                  key={index}
                  className="font-raleway font-bold text-xs uppercase tracking-wide select-none"
                >
                  {c}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveriesToBeDisplayed.map((d, index) => (
              <DeliveryRow
                key={index}
                index={index}
                delivery={d}
                refreshDeliveries={() => {
                  setDeliveries([]);
                  getDeliveries();
                }}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-14 w-full flex flex-col items-center justify-between">
        <span className="text-gray-500 mb-5 font-normal sm:text-xl lg:text-sm text-center">
          Vous avez vu{" "}
          {currentPage === numberOfPages || deliveriesToBeDisplayed.length === 0
            ? deliveriesToBeDisplayed.length
            : currentPage * 10}{" "}
          livraisons sur {deliveriesToBeDisplayed.length}
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

export default AdminDeliveriesPage;
