import { Avatar, Dialog, IconButton, OutlinedInput } from "@mui/material";
import React from "react";
import Delivery from "../../../../data/models/Delivery";
import { Deliverer } from "../../../../data/models/Deliverer";
import { MdArrowBack } from "react-icons/md";
import { BsCheckCircleFill, BsSearch } from "react-icons/bs";
import { FiSave } from "react-icons/fi";
import { LoadingButton } from "@mui/lab";
import { useAppSelector } from "../../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  delivery: Delivery;
  currentDeliverer: Deliverer | null;
  refreshDeliveries: () => void;
};

const AssignToDelivererDialog = ({
  open,
  setOpen,
  delivery,
  currentDeliverer,
  refreshDeliveries,
}: Props) => {
  const [deliverers, setDeliverers] = React.useState<Deliverer[]>([]);
  const [deliverersToBeDisplayed, setDeliverersToBeDislpayed] = React.useState<
    Deliverer[]
  >([]);
  const authenticatedAdmin = useAppSelector(
    (state: RootState) => state.authenticatedAdmin.admin
  );
  const navigate = useNavigate();
  React.useEffect(() => {
    if (authenticatedAdmin === null) navigate("/admin-sign-in");
  }, [authenticatedAdmin]);
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

  React.useEffect(() => {
    setDeliverersToBeDislpayed(deliverers);
  }, [deliverers]);

  const [activeDelivererId, setActiveDelivererId] = React.useState<
    number | undefined
  >(
    currentDeliverer !== undefined && currentDeliverer !== null
      ? currentDeliverer.userId
      : undefined
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const [requiredDelivererError, setRequiredDelivererError] =
    React.useState(false);
  const handleSave = async () => {
    if (authenticatedAdmin !== null) {
      setIsLoading(true);
      if (activeDelivererId === undefined) setRequiredDelivererError(true);
      else setRequiredDelivererError(false);

      if (!requiredDelivererError && activeDelivererId !== undefined) {
        let url =
          process.env.REACT_APP_API_URL +
          "deliveries/assign-delivery-to-deliverer";

        let response = await fetch(url, {
          method: "PUT",
          headers: {
            Accept: "text/plain",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminGuid: authenticatedAdmin.UserGuid,
            deliveryId: delivery.deliveryId,
            delivererId: activeDelivererId,
          }),
        });
        let content = await response.json();
        if (content.success) {
          refreshDeliveries();
          setOpen(false);
        }
      }
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <div className="p-5">
        <div className="flex items-center">
          <IconButton
            color="primary"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            <MdArrowBack />
          </IconButton>
          <h2 className="font-normal text-lg">
            Assignez la livraison{" "}
            <span className="font-raleway font-semibold bg-gray-100 text-primary rounded-full px-2">
              {delivery.deliveryReference}
            </span>{" "}
            à un livreur
          </h2>
        </div>
        {requiredDelivererError && (
          <div className="w-full flex justify-center my-2">
            <small className="bg-red-100 text-red-800 rounded-full px-2">
              Vous devez choisir un livreur
            </small>
          </div>
        )}
        <div className="mt-5 w-full">
          <OutlinedInput
            size="small"
            fullWidth
            startAdornment={<BsSearch className="mr-2 text-xl text-primary" />}
            className="font-kanit"
            onChange={(e) => {
              let value = e.target.value;
              value = value.toLowerCase();
              setDeliverersToBeDislpayed(
                deliverers.filter(
                  (d) =>
                    d.firstName.toLowerCase().includes(value) ||
                    d.lastName.toLowerCase().includes(value) ||
                    d.email.toLowerCase().includes(value)
                )
              );
            }}
          />
        </div>
        <div className="mt-5 w-full">
          {deliverersToBeDisplayed.map((d, index) => (
            <div
              key={index}
              className={
                activeDelivererId === d.userId
                  ? "flex py-3 px-2 mt-2 rounded-md bg-gray-100 relative"
                  : "flex py-3 px-2 mt-2 rounded-md cursor-pointer hover:bg-gray-100 relative"
              }
              onClick={() => setActiveDelivererId(d.userId)}
            >
              <Avatar
                color="primary"
                className="bg-primary text-gray-200"
              ></Avatar>
              <div className="flex-1 ml-3">
                <small className="">{d.firstName}</small>
                <br />
                <span className="font-medium text-black">{d.lastName}</span>
                <br />
                <small className="text-black">
                  {d.phoneNumber.slice(0, 2) +
                    "-" +
                    d.phoneNumber.slice(2, 5) +
                    "-" +
                    d.phoneNumber.slice(5, 8)}
                </small>
                {" | "}
                <small className="text-black">{d.email}</small>
              </div>
              {activeDelivererId === d.userId && (
                <BsCheckCircleFill className="text-primary absolute right-2 top-2" />
              )}
            </div>
          ))}
        </div>
        <div className="w-full mt-5 flex justify-end">
          <LoadingButton
            variant="contained"
            className={isLoading ? "" : "bg-primary"}
            startIcon={<FiSave />}
            loading={isLoading}
            loadingPosition="start"
            onClick={handleSave}
          >
            Enregistrer
          </LoadingButton>
        </div>
      </div>
    </Dialog>
  );
};

export default AssignToDelivererDialog;
