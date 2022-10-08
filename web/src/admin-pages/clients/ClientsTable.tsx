import React from "react";
import { Client } from "../../data/models/Client";

import {
  Avatar,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";

import { BsTrash } from "react-icons/bs";
import DeletionAlert from "./DeletionAlert";

type Props = {
  clients: Client[];
};

const ClientsTable = (props: Props) => {
  const [openDeletionDialog, setOpenDeletionDialog] = React.useState(false);
  const [userToDeleteId, setUserToDeleteId] = React.useState<number>(0);
  const [deletionIsLoading, setDeletionIsLoading] = React.useState(false);

  //Anytime the dialog is closed we set the openDeletionDialog state to false and the selected user's id is set to 0 because there can not be a user with the id 0 i the database
  const handleCloseDeletionDialog = () => {
    setOpenDeletionDialog(false);
    setUserToDeleteId(0);
  };

  //This function is only used to open the dialog and set the user's id but not to completly delete the user
  const handleDelete = (id: number) => {
    setUserToDeleteId(id);
    setOpenDeletionDialog(true);
  };

  //This is the function that effectivly delete the client
  const deletionAction = async (id: number) => {
    if (id > 0) {
      setDeletionIsLoading(true);
      let url = `${process.env.REACT_APP_API_URL}user/delete-user/${id}`;
      let response = fetch(url, {
        method: "DELETE",
      });

      let content = await (await response).json();
      if (content.success) {
        setDeletionIsLoading(false);
        setOpenDeletionDialog(false);
        //WWe have to reload the page anytime a client is deleted to keep our state updated
        window.location.reload();
      }
    }
  };

  React.useEffect(() => {}, [props.clients]);

  return (
    <div>
      <TableContainer component={Paper} className="mt-5 font-kanit">
        <Table className="w-full font-kanit">
          <TableHead>
            <TableRow>
              <TableCell className="font-kanit"></TableCell>
              <TableCell className=" font-kanit">NOM</TableCell>
              <TableCell className=" font-kanit">PRENOM</TableCell>
              <TableCell className=" font-kanit">EMAIL</TableCell>
              <TableCell className=" font-kanit">TELEPHONE</TableCell>
              <TableCell className=" font-kanit">ADRESSE</TableCell>
              <TableCell className=" font-kanit">AGE</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.clients.map((client) => {
              return (
                <TableRow className="font-kanit" key={client.Id}>
                  <TableCell className="font-kanit font-light">
                    <Avatar className="bg-gray-200 font-kanit">
                      {client.LastName[0]}
                      {client.FirstName[0]}
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-kanit font-light">
                    {client.LastName}
                  </TableCell>
                  <TableCell className="font-kanit font-light">
                    {client.FirstName}
                  </TableCell>
                  <TableCell className="font-kanit font-light">
                    {client.Email}
                  </TableCell>
                  <TableCell className="font-kanit font-light">
                    {client.PhoneNumber}
                  </TableCell>
                  <TableCell className="font-kanit font-light">
                    {client.CompleteAddress}
                  </TableCell>
                  <TableCell className="font-kanit font-light">
                    {client.BirthDate != null &&
                      //Broh don't ask me how but thsi get the age. Cheba stackoverflow :)
                      Math.abs(
                        new Date(
                          Date.now() - client.BirthDate.getTime()
                        ).getUTCFullYear() - 1970
                      )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(client.Id)}
                    >
                      <BsTrash className="text-red-500" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <DeletionAlert
        open={openDeletionDialog}
        handleClose={handleCloseDeletionDialog}
        deletionAction={deletionAction}
        userId={userToDeleteId}
        deletionIsLoading={deletionIsLoading}
      />
    </div>
  );
};

export default ClientsTable;
