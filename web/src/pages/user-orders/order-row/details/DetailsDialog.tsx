import React from "react";
import Order from "../../../../data/models/Order";
import { Neighborhood } from "../../../../data/models/Neighborhood";
import Delivery from "../../../../data/models/Delivery";
import {
  Dialog,
  Divider,
  IconButton,
  Rating,
  Skeleton,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { MdClose } from "react-icons/md";
import ProductAndRelatedInfo from "../../../../data/models/ProductAndRelatedInfo";
import OrderLine from "../../../../data/models/OrderLine";
import { TbDiscount2 } from "react-icons/tb";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  order: Order;
  neighborhood: Neighborhood | null;
  delivery: Delivery | null;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DetailsDialog = ({
  open,
  setOpen,
  order,
  neighborhood,
  delivery,
}: Props) => {
  const [orderLines, setOrderLines] = React.useState<OrderLine[]>([]);
  const getOrderLines = async () => {
    let url =
      process.env.REACT_APP_API_URL +
      "orders/get-lines-of-order/" +
      order.orderId;

    let response = await fetch(url, {
      headers: {
        Accept: "text/plain",
      },
    });
    let content = await response.json();
    if (content.success) {
      let data = content.data;
      setOrderLines([]);
      for (let i of data)
        setOrderLines((current) => [
          ...current,
          {
            orderLineId: i.orderLineId,
            orderId: i.orderId,
            quantity: i.quantity,
            discountPercentage: i.discountPercentage,
            productId: i.productId,
          },
        ]);
    }
  };

  React.useEffect(() => {
    getOrderLines();
  }, []);

  const [
    linesProductsAndTheirRelatedInfos,
    setLinesProductsAndTheirRelatedInfos,
  ] = React.useState<ProductAndRelatedInfo[]>([]);
  const [getProductsIsLoading, setGetProductsIsLoading] = React.useState(false);
  React.useEffect(() => {
    const getProductsAndTheirRelatedInfos = async () => {
      setGetProductsIsLoading(true);
      setLinesProductsAndTheirRelatedInfos([]);
      for (let line of orderLines) {
        let url =
          process.env.REACT_APP_API_URL +
          "products/get-product-and-all-related-info/" +
          line.productId;
        let response = await fetch(url, {
          headers: {
            Accept: "text/plain",
          },
        });
        let content = await response.json();
        if (content.success) {
          let data = content.data;
          setLinesProductsAndTheirRelatedInfos((current) => [
            ...current,
            {
              productId: data.productId,
              productReference: data.productReference,
              productName: data.productName,
              productDescription: data.productDescription,
              productPrice: data.productPrice,
              productQuantity: data.productQuantity,
              createdAt:
                data.createdAt !== null && typeof data.createdAt === "string"
                  ? new Date(
                      parseInt(data.createdAt.slice(0, 4)),
                      parseInt(data.createdAt.slice(5, 7)) - 1,
                      parseInt(data.createdAt.slice(8, 10))
                    )
                  : null,
              waranty: data.waranty,
              color: data.color,
              productPrincipalImageId: data.productPrincipalImageId,
              brandId: data.brandId,
              subCategoryId: data.subCategoryId,
              productDiscountId: data.productDiscountId,

              images: data.images,
              caracteristics: data.caracteristics,
              productDiscountPercentage: data.productDiscountPercentage,
              productDiscountEndDate: data.productDiscountEndDate,
              rating: data.rating,
              numberOfVotes: data.numberOfVotes,
            },
          ]);
        }
      }
      //setGetProductsIsLoading(false);
    };
    getProductsAndTheirRelatedInfos();
  }, [orderLines]);

  const [summaryValues, setSummayValues] = React.useState<{
    numberOfProducts: number;
    totalExpensesPrice: number;
    totalDiscount: number;
    deliveryPrice: number;
    taxes: number;
    total: number;
  }>({
    numberOfProducts: orderLines.length,
    totalExpensesPrice: 0,
    totalDiscount: 0,
    deliveryPrice: 0,
    taxes: 0,
    total: 0,
  });
  React.useEffect(() => {
    let totalExpenses = 0;
    for (let line of orderLines) {
      let product = linesProductsAndTheirRelatedInfos.find(
        (pr) => pr.productId === line.productId
      );
      if (product !== undefined)
        totalExpenses += product.productPrice * line.quantity;
    }

    let totalDiscount = 0;
    for (let line of orderLines) {
      let product = linesProductsAndTheirRelatedInfos.find(
        (pr) => pr.productId === line.productId
      );
      if (product !== undefined)
        totalDiscount +=
          ((product.productPrice * product.productDiscountPercentage) / 100) *
          line.quantity;
    }
    setSummayValues((s) => ({
      ...s,
      numberOfProducts: orderLines.length,
      totalDiscount: totalDiscount,
      totalExpensesPrice: totalExpenses,
      deliveryPrice: totalExpenses > 500000 ? 0 : 1000,
      taxes: 0,
      total:
        totalExpenses > 500000
          ? totalExpenses - totalDiscount
          : totalExpenses - totalDiscount + 1000,
    }));
  }, [orderLines, linesProductsAndTheirRelatedInfos]);
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      maxWidth="lg"
      fullWidth
      keepMounted
    >
      <div className="px-5 pt-5 pb-2 flex items-center justify-between">
        <h1 className="uppercase font-raleway font-bold sm:text-4xl lg:text-lg text-primary">
          Détails sur la commande{" "}
          <span className="ml-1 bg-amber-100 text-primary px-2 rounded-full font-kanit font-normal">
            {order.orderReference.toUpperCase()}
          </span>
        </h1>
        <IconButton color="primary" onClick={() => setOpen(false)}>
          <MdClose className="sm:text-4xl lg:text-base" />
        </IconButton>
      </div>
      <Divider />
      <div className="p-5 grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-5 ">
        <div>
          <div className="">
            <h1 className="uppercase font-raleway font-bold sm:text-3xl lg:text-base text-primary">
              Informations personnelles
            </h1>
            <div className="mt-1 grid grid-cols-2 gap-4 ">
              <div className="sm:text-2xl lg:text-base">
                <h1 className="text-gray-600 font-light">Prénom</h1>
                <h1 className="">{order.ordererFirstName}</h1>
              </div>
              <div className="sm:text-2xl lg:text-base">
                <h1 className="text-gray-600 font-light">Nom</h1>
                <h1 className="">{order.ordererLastName}</h1>
              </div>
              <div className="sm:text-2xl lg:text-base">
                <h1 className="text-gray-600 font-light">Email</h1>
                <h1 className="">{order.ordererEmail}</h1>
              </div>
              <div className="sm:text-2xl lg:text-base">
                <h1 className="text-gray-600 font-light">
                  Numéro de téléphone
                </h1>
                <h1 className="">
                  +227{" "}
                  {order.ordererPhoneNumber.slice(0, 2) +
                    "-" +
                    order.ordererPhoneNumber.slice(2, 5) +
                    "-" +
                    order.ordererPhoneNumber.slice(5, 8)}
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h1 className="uppercase font-raleway font-bold sm:text-3xl lg:text-base text-primary">
              Livraison
            </h1>
            <div className="mt-1 grid grid-cols-2 gap-4 ">
              <div className="sm:text-2xl lg:text-base">
                <h1 className="text-gray-600 font-light">Ville</h1>
                <h1 className="">Niamey</h1>
              </div>
              <div className="sm:text-2xl lg:text-base">
                <h1 className="text-gray-600 font-light">Quartier</h1>
                <h1 className="">{neighborhood?.neighborhoodName}</h1>
              </div>
              <div className="sm:text-2xl lg:text-base">
                <h1 className="text-gray-600 font-light">Status</h1>
                <h1
                  className={
                    delivery?.deliveryStatus === "DONE"
                      ? "px-2 w-fit normal-case font-kanit font-normal bg-green-100 text-green-800  rounded-full cursor-default"
                      : delivery?.deliveryStatus === "IN_PROGRESS"
                      ? "px-2 w-fit normal-case font-kanit font-normal bg-orange-100 text-orange-800 rounded-full cursor-default"
                      : "px-2 w-fit normal-case font-kanit font-normal rounded-full bg-red-100 text-red-800 cursor-default"
                  }
                >
                  {delivery?.deliveryStatus === "DONE"
                    ? "Livrée"
                    : delivery?.deliveryStatus === "IN_PROGRESS"
                    ? "En cours"
                    : order.rejectedAt !== null
                    ? "Annulée"
                    : "En préparation"}
                </h1>
              </div>
              <div className="sm:text-2xl lg:text-base">
                <h1 className="text-gray-600 font-light">Adresse complète</h1>
                <h1 className="">{order.ordererCompleteAddress}</h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h1 className="uppercase font-raleway font-bold sm:text-3xl lg:text-base text-primary sm:mt-5 lg:mt-0">
              La commande
            </h1>
            <div className="w-full mt-4">
              {orderLines.map((line, index) => {
                let product = linesProductsAndTheirRelatedInfos.find(
                  (p) => p.productId === line.productId
                );
                return product !== undefined && !getProductsIsLoading ? (
                  <div
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-gray-100 px-3 py-2 flex relative rounded-md"
                        : "px-3 py-2 flex relative rounded-md"
                    }
                  >
                    <img
                      alt={product.images[0].imageName}
                      src={
                        "data:" +
                        product.images[0].imageExtension +
                        ";base64," +
                        product.images[0].imageBytes
                      }
                      className="sm:h-40 lg:h-24"
                    />
                    <div className="flex-1 flex flex-col sm:pl-5 lg:pl-2">
                      <h1 className="uppercase sm:text-2xl lg:text-base font-normal">
                        {product.productName}
                      </h1>
                      <h1 className="uppercase sm:text-2xl lg:text-base font-normal">
                        {product.productPrice} FCFA
                      </h1>
                      {line.discountPercentage > 0 && (
                        <span className="px-2 bg-red-100 text-red-700 rounded-full sm:text-2xl lg:text-sm w-fit">
                          <TbDiscount2 className="inline sm:text-3xl lg:text-xl" />{" "}
                          <span className="ml-1">
                            {(product.productPrice * line.discountPercentage) /
                              100}{" "}
                            FCFA de réduction
                          </span>
                        </span>
                      )}
                      <div className="sm:mt-4 lg:mt-1 flex items-center">
                        <Rating
                          value={product.rating}
                          readOnly
                          size="small"
                          className="sm:text-3xl lg:text-base "
                        />
                        <span className="ml-1 text-sm text-gray-500 align-middle">
                          {product.numberOfVotes} vote(s)
                        </span>
                      </div>
                    </div>
                    <div className="absolute right-2 bottom-2 border-2 bg-white rounded-md py-2 px-4 sm:text-2xl lg:text-base">
                      {line.quantity}
                    </div>
                  </div>
                ) : getProductsIsLoading ? (
                  <div className={"rounded-md px-3 py-2 flex sm:mt-4 lg:t-0"}>
                    <Skeleton
                      variant="rectangular"
                      className="sm:h-40 lg:h-28 sm:w-40 lg:w-28 rounded-md"
                      animation="wave"
                    />
                    <div className="flex-1 flex flex-col sm:pl-5 lg:pl-2">
                      <Skeleton
                        variant="rectangular"
                        className="sm:h-9 lg:h-6 w-3/4 mb-2 rounded-md"
                        animation="wave"
                      />
                      <Skeleton
                        variant="rectangular"
                        className="sm:h-9 lg:h-6 w-1/2 mb-2 rounded-md"
                        animation="wave"
                      />
                      <Skeleton
                        variant="rectangular"
                        className="sm:h-8 lg:h-5 w-5/12 mb-2 rounded-md"
                        animation="wave"
                      />
                      <Skeleton
                        variant="rectangular"
                        className="sm:h-7 lg:h-5 w-1/4 mb-2 rounded-md"
                        animation="wave"
                      />
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          <div className="mt-8 w-full ">
            <h1 className="uppercase font-raleway font-bold sm:text-3xl lg:text-base text-primary mb-2">
              Resumé
            </h1>
            <div className="w-full py-2 flex items-center justify-between sm:text-3xl lg:text-base font-normal bg-gray-100 px-5">
              <h3 className="">
                Montant total{" "}
                <small className="align-bottom">(sans réduction)</small>
              </h3>
              <h3 className="">{summaryValues.totalExpensesPrice} FCFA</h3>
            </div>
            <div className="w-full py-2 px-5 border-t flex items-center justify-between sm:text-3xl lg:text-base font-normal">
              <h3 className="">Réduction </h3>
              <h3 className="">{summaryValues.totalDiscount} FCFA</h3>
            </div>
            <div className="w-full py-2 px-5 bg-gray-100 border-t flex items-center justify-between sm:text-3xl lg:text-base font-normal">
              <h3 className="">Livraison</h3>
              <h3 className="">{summaryValues.deliveryPrice} FCFA</h3>
            </div>
            <div className="w-full py-2 px-5 border-t flex items-center justify-between sm:text-3xl lg:text-base font-normal">
              <h3 className="">Taxes</h3>
              <h3 className="">{summaryValues.taxes} FCFA</h3>
            </div>
            <div className="w-full py-2 px-5 bg-gray-100 border-t flex items-center justify-between sm:text-4xl lg:text-lg font-medium">
              <h3 className="uppercase">Total à payer</h3>
              <h3 className="">{summaryValues.total} FCFA</h3>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </Dialog>
  );
};

export default DetailsDialog;
