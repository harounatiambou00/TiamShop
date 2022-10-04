import React from "react";

import { Page } from "../../components/admin-layout";

import { Client } from "../../data/models";
import ClientsTable from "./ClientsTable";

const Clients = () => {
  const [clients, setClients] = React.useState<Client[]>([]);

  const getCients = async () => {
    let url = "https://localhost:7254/user/get-all-clients";
    let response = await fetch(url);
    let content = await response.json();
    let data = content.data;

    for (let i of data) {
      setClients((currentClients) => [
        ...currentClients,
        {
          ...{},
          Id: i.userId,
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
                  parseInt(i.birthDate.slice(4, 6)),
                  parseInt(i.birthDate.slice(6, 8))
                )
              : null,
        },
      ]);
    }
  };

  React.useEffect(() => {
    getCients();
  }, []);

  return (
    <Page
      title="Les clients"
      subtitle="La liste de tout les clients incluant leurs noms, email, numéro de téléphone ..."
      buttonTitle="Ajouter"
    >
      {clients.length > 0 && <ClientsTable clients={clients} />}
    </Page>
  );
};

export default Clients;
