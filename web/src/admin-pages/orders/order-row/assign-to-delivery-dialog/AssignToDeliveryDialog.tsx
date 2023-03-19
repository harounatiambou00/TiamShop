import React from "react";
import Order from "../../../../data/models/Order";
import { Dialog, Grow, IconButton, OutlinedInput } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { LoadingButton } from "@mui/lab";
import { FiSave } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { MdArrowBack } from "react-icons/md";
import Delivery from "../../../../data/models/Delivery";
import DisplayDelivery from "./display-delivery/DisplayDelivery";
import { useAppSelector } from "../../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  order: Order;
  currentDeliveryId: number | null;
  refreshOrders: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

const AssignToDeliveryDialog = ({
  open,
  setOpen,
  order,
  currentDeliveryId,
  refreshOrders,
}: Props) => {
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
    setDeliveriesToBeDisplayed(
      deliveries.filter((d) => d.deliveryStatus === "TODO")
    );
  }, [deliveries]);

  const [activeDeliveryId, setActiveDeliveryId] = React.useState<number | null>(
    currentDeliveryId !== null ? currentDeliveryId : null
  );

  const authenticatedAdmin = useAppSelector(
    (state: RootState) => state.authenticatedAdmin.admin
  );
  const navigate = useNavigate();
  React.useEffect(() => {
    if (authenticatedAdmin === null) navigate("/admin-sign-in");
  }, [authenticatedAdmin]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [requiredDeliveryError, setRequiredDeliveryError] =
    React.useState(false);
  const handleSave = async () => {
    if (authenticatedAdmin !== null) {
      setIsLoading(true);
      if (activeDeliveryId === null) setRequiredDeliveryError(true);
      else setRequiredDeliveryError(false);

      if (!requiredDeliveryError && activeDeliveryId !== null) {
        let url =
          process.env.REACT_APP_API_URL + "orders/put-order-in-delivery";

        let response = await fetch(url, {
          method: "PUT",
          headers: {
            Accept: "text/plain",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminGuid: authenticatedAdmin.UserGuid,
            orderId: order.orderId,
            deliveryId: activeDeliveryId,
          }),
        });

        let content = await response.json();
        if (content.success) {
          refreshOrders();
          setOpen(false);
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      maxWidth="xs"
      fullWidth
    >
      <div className="p-5">
        <div className="flex items-center">
          <IconButton
            color="primary"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            <MdArrowBack />
          </IconButton>
          <h4 className="font-normal">
            Ajoutez la commande{" "}
            <span className="font-medium bg-gray-100 text-primary rounded-full px-2">
              {order.orderReference.toUpperCase()}
            </span>{" "}
            à une livraison
          </h4>
        </div>

        <div className="mt-5 w-full">
          <OutlinedInput
            size="small"
            fullWidth
            startAdornment={<BsSearch className="mr-2 text-xl text-primary" />}
            className="font-kanit"
            placeholder="Entrez la réference de la livraison"
            onChange={(e) =>
              setDeliveriesToBeDisplayed(
                deliveries.filter(
                  (d) =>
                    d.deliveryStatus === "TODO" &&
                    d.deliveryReference
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                )
              )
            }
          />
        </div>
        <div className="mt-5 w-full">
          <span className="font-kanit font-light">
            {deliveriesToBeDisplayed.length} livraison(s) sont en cours de
            préparation.
          </span>
        </div>
        <div className="w-full mt-5">
          {deliveriesToBeDisplayed.map((d, index) => (
            <DisplayDelivery
              key={index}
              delivery={d}
              isActive={activeDeliveryId === d.deliveryId}
              setActiveDeliveryId={setActiveDeliveryId}
            />
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

export default AssignToDeliveryDialog;
