import React from "react";

import { Page } from "../../components/admin-layout";

import { Client } from "../../data/models";
import ClientsTable from "./ClientsTable";

const Clients = () => {
  const [clients, setClients] = React.useState<Client[]>([]);

  const getCients = async () => {
    let url = process.env.REACT_APP_API_URL + "users/get-all-clients";
    let response = await fetch(url);
    let content = await response.json();
    let data = content.data;
    console.log(content);
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
