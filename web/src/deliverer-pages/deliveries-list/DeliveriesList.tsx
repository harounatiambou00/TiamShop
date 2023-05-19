import React, { SetStateAction } from "react";
import Delivery from "../../data/models/Delivery";
import {
  Alert,
  CircularProgress,
  Divider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import {
  MdClearAll,
  MdDoneAll,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import Item from "./Item";

type PeriodTabsType = {
  id: number;
  title: string;
};

const tableHeadCells = [
  "Réference",
  "Status",
  "Date",
  "Commandes",
  "Secteur",
  "",
];

type Props = {
  activeLink: number;
  setActiveLink: React.Dispatch<SetStateAction<number>>;
};
const DeliveriesList = ({ activeLink, setActiveLink }: Props) => {
  const authenticatedDeliverer = useAppSelector(
    (state: RootState) => state.authenticatedDeliverer.deliverer
  );
  const [allAffectedDeliveries, setAllAffectedDeliveries] = React.useState<
    Delivery[] | undefined
  >(undefined);
  const getAffectedDeliveries = async () => {
    let url =
      process.env.REACT_APP_API_URL +
      "deliveries/get-affected-deliveries/" +
      authenticatedDeliverer?.userId;
    let response = await fetch(url, {
      method: "GET",
    });

    let content = await response.json();
    if (content.success) {
      let data = content.data;
      let tempDeliveries = [] as Delivery[];
      for (let i of data) {
        tempDeliveries.push({
          deliveryId: i.deliveryId,
          deliveredAt:
            i.deliveredAt === null
              ? null
              : new Date(
                  parseInt(i.deliveredAt.slice(0, 4)),
                  parseInt(i.deliveredAt.slice(5, 7)) - 1,
                  parseInt(i.deliveredAt.slice(8, 10))
                ),
          deliveryReference: i.deliveryReference,
          deliveryStatus: i.deliveryStatus,
          assignedTo: i.assignedTo,
        });
      }
      setAllAffectedDeliveries(tempDeliveries);
    } else {
      setAllAffectedDeliveries([]);
    }
  };
  React.useEffect(() => {
    getAffectedDeliveries();
  }, []);
  const [deliveriesToBeDisplayed, setDeliveiresToBeDisplayed] = React.useState<
    Delivery[]
  >([]);
  React.useEffect(() => {
    if (allAffectedDeliveries !== undefined)
      setDeliveiresToBeDisplayed(allAffectedDeliveries);
    else setDeliveiresToBeDisplayed([]);
  }, [allAffectedDeliveries]);

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

  React.useEffect(() => {
    if (allAffectedDeliveries !== undefined) {
      switch (activeLink) {
        case 2:
          setDeliveiresToBeDisplayed(
            allAffectedDeliveries.filter((d) => d.deliveryStatus === "TODO")
          );
          break;
        case 3:
          setDeliveiresToBeDisplayed(
            allAffectedDeliveries.filter(
              (d) => d.deliveryStatus === "IN_PROGRESS"
            )
          );
          break;
        case 4:
          setDeliveiresToBeDisplayed(
            allAffectedDeliveries.filter((d) => d.deliveryStatus === "DONE")
          );
          break;
        default:
          setDeliveiresToBeDisplayed(allAffectedDeliveries);
      }
    }
  }, [activeLink, allAffectedDeliveries]);
  return (
    <div className="w-full h-full bg-white">
      <h1 className="text-3xl text-primary font-semibold font-raleway flex items-center">
        {activeLink === 4 ? (
          <MdDoneAll />
        ) : activeLink === 3 ? (
          <GiSandsOfTime />
        ) : activeLink === 2 ? (
          <MdOutlineCheckBoxOutlineBlank />
        ) : (
          <MdClearAll />
        )}
        <span className="ml-2">
          {activeLink === 4
            ? "Les livraisons déja effectuées"
            : activeLink === 3
            ? "Les livraisons en cours"
            : activeLink === 2
            ? "Les livraions à faire"
            : "Toutes les livraisons"}
        </span>
      </h1>
      <div className="w-full pl-10">
        <h1 className="text-xl font-raleway font-semibold">
          Ravis de vous revoir,{" "}
          <span className="text-primary font-bold">
            {authenticatedDeliverer?.firstName} !
          </span>
        </h1>
        <span className="w-3/4">
          Sur cette page, vous avez la possibilités de voir{" "}
          <span className="lowercase">
            {activeLink === 4
              ? "Les livraisons déja effectuées"
              : activeLink === 3
              ? "Les livraisons en cours"
              : activeLink === 2
              ? "Les livraions à faire"
              : "Toutes les livraisons"}
          </span>
        </span>
      </div>
      <Divider className="my-5" />

      {allAffectedDeliveries === undefined ? (
        <div className="h-full w-full flex items-center justify-center">
          <CircularProgress thickness={2} size={75} />
        </div>
      ) : deliveriesToBeDisplayed.length === 0 ? (
        <div className="w-full flex justify-center mt-10">
          <Alert severity="error" className="w-fit font-kanit">
            {activeLink === 4
              ? "Aucune livraison effectuées."
              : activeLink === 3
              ? "Aucune livraison en cours."
              : activeLink === 2
              ? "Aucune livraison à faire."
              : "Aucune livraison."}
          </Alert>
        </div>
      ) : (
        <Table
          size="small"
          className="mt-5 overflow-x-scroll"
          sx={{ minWidth: 1000 }}
        >
          <TableHead className="bg-background">
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
              <Item
                key={index}
                index={index}
                delivery={d}
                refreshDeliveries={() => {
                  setDeliveiresToBeDisplayed([]);
                  getAffectedDeliveries();
                }}
              />
            ))}
          </TableBody>
        </Table>
      )}
      {deliveriesToBeDisplayed.length > 0 && (
        <div className="mt-14 w-full flex flex-col items-center justify-between">
          <span className="text-gray-500 mb-5 font-normal sm:text-xl lg:text-sm text-center">
            Vous avez vu{" "}
            {currentPage === numberOfPages ||
            deliveriesToBeDisplayed.length === 0
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
      )}
    </div>
  );
};

export default DeliveriesList;
