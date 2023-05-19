import React from "react";
import { Deliverer } from "../../data/models/Deliverer";
import { Avatar, IconButton, TableCell, TableRow } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { Neighborhood } from "../../data/models/Neighborhood";
import ConfirmDeletionDialog from "../../components/core/confirm-deletion-dialog/ConfirmDeletionDialog";
import ErrorSnackbar from "../../components/core/error-snackbar/ErrorSnackbar";

type Props = {
  deliverer: Deliverer;
  refreshDeliverers: () => {};
  index: number;
};

const DelivbrerTableRow = ({ deliverer, refreshDeliverers, index }: Props) => {
  const [neighborhood, setNeighborhood] = React.useState<Neighborhood | null>(
    null
  );

  const [openDeletionDialog, setOpenDeletionDialog] =
    React.useState<boolean>(false);

  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);
  const handleDelete = async () => {
    let url = `${process.env.REACT_APP_API_URL}users/delete-user/${deliverer.userId}`;
    let response = fetch(url, {
      method: "DELETE",
    });

    let content = await (await response).json();
    if (content.success) {
      await refreshDeliverers();
    } else {
      setOpenErrorSnackbar(true);
    }
  };

  React.useEffect(() => {
    const getNeighborhood = async () => {
      let url =
        process.env.REACT_APP_API_URL +
        "neighborhoods/" +
        deliverer.neighborhoodId;
      let response = await fetch(url);
      let content = await response.json();
      if (content.success) {
        let data = content.data;
        setNeighborhood({
          neighborhoodId: data.neighborhoodId,
          neighborhoodName: data.neighborhoodName,
        });
      } else {
      }
    };
    getNeighborhood();
  }, []);

  return (
    <TableRow
      className={index % 2 !== 0 ? "font-kanit bg-background" : "font-kanit"}
      key={deliverer.userId}
    >
      <TableCell className="font-kanit font-light">
        <Avatar className="bg-gray-300 text-primary font-kanit">
          {deliverer.lastName[0]}
          {deliverer.firstName[0]}
        </Avatar>
      </TableCell>
      <TableCell className="font-kanit font-light">
        {deliverer.lastName}
      </TableCell>
      <TableCell className="font-kanit font-light">
        {deliverer.firstName}
      </TableCell>
      <TableCell className="font-kanit font-light">
        {deliverer.email}{" "}
      </TableCell>
      <TableCell className="font-kanit font-light">
        {deliverer.phoneNumber.slice(0, 2) +
          "-" +
          deliverer.phoneNumber.slice(2, 5) +
          "-" +
          deliverer.phoneNumber.slice(5, 8)}
      </TableCell>
      <TableCell className="font-kanit font-light">
        {deliverer.birthDate != null &&
          //Broh don't ask me how but thsi get the age. Cheba stackoverflow :)
          Math.abs(
            new Date(
              Date.now() - deliverer.birthDate.getTime()
            ).getUTCFullYear() - 1970
          )}
      </TableCell>
      {neighborhood !== null ? (
        <TableCell className="font-kanit font-light">
          {neighborhood.neighborhoodName}
        </TableCell>
      ) : (
        <TableCell className="font-kanit font-light">N/A</TableCell>
      )}
      <TableCell>
        <IconButton
          size="small"
          color="error"
          onClick={() => setOpenDeletionDialog(true)}
        >
          <AiOutlineDelete className="text-red-500" />
        </IconButton>
      </TableCell>
      <ConfirmDeletionDialog
        title={"Suppréssion du compte du livreur " + deliverer.firstName}
        text="Cette action est irréversible, une fois que vous appuyez sur
            CONFIRMER le compte sera supprimer definitivement. Et de ce fait
            tout ce qui est lié à ce client sera aussi supprimé."
        open={openDeletionDialog}
        setOpen={setOpenDeletionDialog}
        deletionAction={() => handleDelete()}
      />
      <ErrorSnackbar
        open={openErrorSnackbar}
        setOpen={setOpenErrorSnackbar}
        text="OOPs, nous n'avons pas pu supprimer ce compte."
      />
    </TableRow>
  );
};

export default DelivbrerTableRow;
