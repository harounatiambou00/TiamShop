import React from "react";

import { Page } from "../../components/admin-layout";

import { Client } from "../../data/models";
import ClientsTable from "./ClientsTable";
import { Pagination } from "@mui/material";

const Clients = () => {
  const [clients, setClients] = React.useState<Client[]>([]);

  const getCients = async () => {
    let url = process.env.REACT_APP_API_URL + "users/get-all-clients";
    let response = await fetch(url);
    let content = await response.json();
    if (content.success) {
      setClients([]);
      let data = content.data;
      let tempClients = [] as Client[];
      for (let i of data) {
        tempClients.push({
          ...{},
          userId: i.userId,
          FirstName: i.firstName,
          LastName: i.lastName,
          Email: i.email,
          PhoneNumber: i.phoneNumber,
          VerifiedAt:
            i.verifiedAt != null
              ? new Date(
                  parseInt(i.verifiedAt.slice(0, 4)),
                  parseInt(i.verifiedAt.slice(5, 7)) - 1,
                  parseInt(i.verifiedAt.slice(8, 10))
                )
              : null,
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
        });
      }
      setClients(tempClients);
    }
  };
  React.useEffect(() => {
    getCients();
  }, []);
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
      clients.length / 10 < 0
        ? 1
        : clients.length % 10 === 0
        ? Math.floor(clients.length / 10)
        : Math.floor(clients.length / 10) + 1
    );
  }, [clients]);
  return (
    <Page
      title="Les clients"
      subtitle="La liste de tout les clients incluant leurs noms, email, numéro de téléphone ..."
    >
      <div className="mt-7 w-full flex items-center justify-between">
        <span className="text-gray-500 pl-2 font-normal sm:text-xl lg:text-sm text-center">
          Vous avez vu{" "}
          {currentPage === numberOfPages ? clients.length : currentPage * 10}{" "}
          clients sur {clients.length}
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
      {clients.length > 0 && (
        <ClientsTable
          clients={clients.slice(currentPage * 10 - 10, currentPage * 10)}
        />
      )}
      <div className="mt-10 w-full flex flex-col items-center justify-between">
        <span className="text-gray-500 mb-5 font-normal sm:text-xl lg:text-sm text-center">
          Vous avez vu{" "}
          {currentPage === numberOfPages ? clients.length : currentPage * 10}{" "}
          clients sur {clients.length}
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

export default Clients;
