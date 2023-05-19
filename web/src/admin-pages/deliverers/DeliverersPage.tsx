import React from "react";
import { Deliverer } from "../../data/models/Deliverer";
import { Page } from "../../components/admin-layout";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddDeliveryDialog from "./add-delivery-dialog/AddDeliveryDialog";
import DelivbrerTableRow from "./TableRow";

const DeliverersPage = () => {
  const [deliverers, setDeliverers] = React.useState<any[]>([]);
  const getDeliverers = async () => {
    let url = process.env.REACT_APP_API_URL + "users/get-all-deliverers";
    let response = await fetch(url);
    let content = await response.json();
    let data = content.data;
    for (let i of data) {
      setDeliverers((currentDeliverers) => [
        ...currentDeliverers,
        {
          userId: i.userId,
          firstName: i.firstName,
          lastName: i.lastName,
          email: i.email,
          phoneNumber: i.phoneNumber,
          completeAddress: i.completeAddress,
          neighborhoodId: i.neighborhoodId,
          verifiedAt: null,
          //if the birthday is not null we create a date object by slicing the string because .net datetime and typescript date don't match
          birthDate:
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
    setDeliverers([]);
    getDeliverers();
  }, []);

  const refreshDeliverers = async () => {
    setDeliverers([]);
    await getDeliverers();
  };

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
      deliverers.length / 10 < 0
        ? 1
        : deliverers.length % 10 === 0
        ? Math.floor(deliverers.length / 10)
        : Math.floor(deliverers.length / 10) + 1
    );
  }, [deliverers]);

  const [openAddDelivererDialog, setOpenAddDelivererDialog] =
    React.useState(false);
  return (
    <Page
      title="Les Livreurs"
      buttonTitle="Ajouter un livreur"
      buttonAction={() => {
        setOpenAddDelivererDialog(true);
      }}
    >
      <div className="mt-7 w-full flex items-center justify-between">
        <span className="text-gray-500 pl-2 font-normal sm:text-xl lg:text-sm text-center">
          Vous avez vu{" "}
          {currentPage === numberOfPages ? deliverers.length : currentPage * 10}{" "}
          livreurs sur {deliverers.length}
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
      {deliverers.length > 0 && (
        <TableContainer className="mt-5 font-kanit">
          <Table className="w-full font-kanit" size="small">
            <TableHead>
              <TableRow className="bg-background">
                <TableCell className="font-kanit"></TableCell>
                <TableCell className=" font-kanit">NOM</TableCell>
                <TableCell className=" font-kanit">PRENOM</TableCell>
                <TableCell className=" font-kanit">EMAIL</TableCell>
                <TableCell className=" font-kanit">TELEPHONE</TableCell>
                <TableCell className=" font-kanit">AGE</TableCell>
                <TableCell className=" font-kanit">SECTEUR</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliverers
                .slice(currentPage * 10 - 10, currentPage * 10)
                .map((deliverer, index) => {
                  return (
                    <DelivbrerTableRow
                      key={index}
                      index={index}
                      deliverer={deliverer as Deliverer}
                      refreshDeliverers={refreshDeliverers}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div className="mt-10 w-full flex flex-col items-center justify-between">
        <span className="text-gray-500 mb-5 font-normal sm:text-xl lg:text-sm text-center">
          Vous avez vu{" "}
          {currentPage === numberOfPages ? deliverers.length : currentPage * 10}{" "}
          livreurs sur {deliverers.length}
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
      <AddDeliveryDialog
        open={openAddDelivererDialog}
        setOpen={setOpenAddDelivererDialog}
        refreshDeliverers={refreshDeliverers}
      />
    </Page>
  );
};

export default DeliverersPage;
