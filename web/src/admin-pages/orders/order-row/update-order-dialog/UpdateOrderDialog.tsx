import {
  AppBar,
  Dialog,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  Slide,
  Toolbar,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import Order from "../../../../data/models/Order";
import { MdArrowBack } from "react-icons/md";
import { LoadingButton } from "@mui/lab";
import { BiSave } from "react-icons/bi";
import { Neighborhood } from "../../../../data/models/Neighborhood";
import OrderLine from "../../../../data/models/OrderLine";
import ProductAndRelatedInfo from "../../../../data/models/ProductAndRelatedInfo";
import { TbDiscount2 } from "react-icons/tb";
import {
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { HiBadgeCheck } from "react-icons/hi";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  order: Order;
  readOnly: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ValuesStateType = {
  ordererFirstName: string;
  ordererLastName: string;
  ordererCompleteAddress: string;
  neighborhoodId: number;
  lines: OrderLine[];
};

const UpdateOrderDialog = ({ open, setOpen, order, readOnly }: Props) => {
  const [isLoading] = React.useState(false);
  const [neighborhoods, setNeighborhoods] = React.useState<Neighborhood[]>([]);
  const [orderLines, setOrderLines] = React.useState<OrderLine[]>([]);

  React.useEffect(() => {
    const getNeighborhoods = async () => {
      let url = process.env.REACT_APP_API_URL + "neighborhoods";
      let response = await fetch(url);
      let content = await response.json();
      if (content.success) {
        for (let i of content.data) {
          setNeighborhoods((current) => [
            ...current,
            {
              ...current,
              neighborhoodId: i.neighborhoodId,
              neighborhoodName: i.neighborhoodName,
            },
          ]);
        }
      }
    };
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
    setNeighborhoods([]);
    getNeighborhoods();
    setOrderLines([]);
    getOrderLines();
  }, []);

  const [values, setValues] = React.useState<ValuesStateType>({
    ordererFirstName: order.ordererFirstName,
    ordererCompleteAddress: order.ordererCompleteAddress,
    ordererLastName: order.ordererLastName,
    neighborhoodId: order.neighborhoodId,
    lines: [],
  });

  React.useEffect(() => {
    setValues((current) => ({
      ...current,
      lines: orderLines,
    }));
  }, [orderLines]);

  const [
    linesProductsAndTheirRelatedInfos,
    setLinesProductsAndTheirRelatedInfos,
  ] = React.useState<ProductAndRelatedInfo[]>([]);
  const [getProductsIsLoading, setGetProductsIsLoading] = React.useState(false);
  React.useEffect(() => {
    const getProductsAndTheirRelatedInfos = async () => {
      setGetProductsIsLoading(true);
      setLinesProductsAndTheirRelatedInfos([]);
      for (let line of values.lines) {
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
      setGetProductsIsLoading(false);
    };
    getProductsAndTheirRelatedInfos();
  }, [values.lines]);

  const [summaryValues, setSummayValues] = React.useState<{
    numberOfProducts: number;
    totalExpensesPrice: number;
    totalDiscount: number;
    deliveryPrice: number;
    taxes: number;
    total: number;
  }>({
    numberOfProducts: values.lines.length,
    totalExpensesPrice: 0,
    totalDiscount: 0,
    deliveryPrice: 0,
    taxes: 0,
    total: 0,
  });
  React.useEffect(() => {
    let totalExpenses = 0;
    for (let line of values.lines) {
      let product = linesProductsAndTheirRelatedInfos.find(
        (pr) => pr.productId === line.productId
      );
      if (product !== undefined)
        totalExpenses += product.productPrice * line.quantity;
    }

    let totalDiscount = 0;
    for (let line of values.lines) {
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
      numberOfProducts: values.lines.length,
      totalDiscount: totalDiscount,
      totalExpensesPrice: totalExpenses,
      deliveryPrice: totalExpenses > 500000 ? 0 : 1000,
      taxes: 0,
      total:
        totalExpenses > 500000
          ? totalExpenses - totalDiscount
          : totalExpenses - totalDiscount + 1000,
    }));
  }, [values, linesProductsAndTheirRelatedInfos]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullScreen
      TransitionComponent={Transition}
      className="bg-gray-50"
    >
      <div className="bg-gray-50 grid grid-cols-2 gap-10 pt-24 pb-10 px-5">
        <AppBar className="bg-white" elevation={1}>
          <Toolbar className="bg-white flex justify-between py-4 text-black">
            <div className="flex items-center">
              <IconButton className="text-black" onClick={() => setOpen(false)}>
                <MdArrowBack />
              </IconButton>
              <h1 className="text-xl font-medium text-primary ml-2">
                {!readOnly
                  ? "Modification de la commande"
                  : "Aperçu de la commande"}{" "}
                <span className="ml-2 px-2 bg-orange-100 text-orange-800 rounded-full text-sm">
                  {order.orderReference.toUpperCase()}
                </span>
              </h1>
            </div>
            {readOnly ? (
              <div className="px-3 py-2 rounded-full bg-slate-100 flex items-center">
                <span className="mr-2 select-none font-light">
                  Visualisation
                </span>
                <AiOutlineEye className="text-xl" />
              </div>
            ) : (
              <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                variant="outlined"
                className="font-kanit font-normal"
                startIcon={<BiSave />}
              >
                Enregistrer
              </LoadingButton>
            )}
          </Toolbar>
        </AppBar>
        <div className="">
          <div className="">
            <h1 className="text-2xl font-raleway font-bold">1. L'acheteur</h1>
            <div className="mt-2 grid grid-cols-12 gap-3">
              <div className="flex flex-col col-span-6">
                <label htmlFor="" className="font-normal">
                  Prénom
                </label>
                <OutlinedInput
                  fullWidth
                  size="small"
                  className="w-full font-kanit bg-white"
                  value={values.ordererFirstName}
                  onChange={(e) =>
                    setValues((current) => ({
                      ...current,
                      ordererFirstName: e.target.value,
                    }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="flex flex-col col-span-6">
                <label htmlFor="" className="font-normal">
                  Nom
                </label>
                <OutlinedInput
                  fullWidth
                  size="small"
                  className="w-full font-kanit bg-white"
                  value={values.ordererLastName}
                  onChange={(e) =>
                    setValues((current) => ({
                      ...current,
                      ordererLastName: e.target.value,
                    }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="flex flex-col col-span-6">
                <label htmlFor="" className="font-normal">
                  Email
                </label>
                <OutlinedInput
                  fullWidth
                  size="small"
                  className="w-full font-kanit bg-white"
                  disabled
                  value={order.ordererEmail}
                />
              </div>
              <div className="flex flex-col col-span-4">
                <label htmlFor="" className="font-normal">
                  Numéro de téléphone
                </label>
                <OutlinedInput
                  fullWidth
                  size="small"
                  className="w-full font-kanit bg-white"
                  disabled
                  value={
                    order.ordererPhoneNumber.slice(0, 2) +
                    "-" +
                    order.ordererPhoneNumber.slice(2, 4) +
                    "-" +
                    order.ordererPhoneNumber.slice(4, 8)
                  }
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="" className="font-normal">
                  Inscrit ?
                </label>
                <OutlinedInput
                  fullWidth
                  size="small"
                  className="w-full font-kanit bg-white"
                  disabled
                  value={order.clientId !== null ? "Oui" : "Non"}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-2xl font-raleway font-bold">2. Livraison</h1>
            <div className="mt-2 grid grid-cols-12 gap-3">
              <div className="flex flex-col col-span-6">
                <label htmlFor="" className="font-normal">
                  Ville
                </label>
                <OutlinedInput
                  fullWidth
                  size="small"
                  className="w-full font-kanit bg-white"
                  disabled
                  value="Niamey"
                />
              </div>
              <div className="flex flex-col col-span-6">
                <label htmlFor="" className="font-normal">
                  Quartier
                </label>
                <Select
                  disabled={readOnly}
                  size="small"
                  className="w-full bg-white font-kanit "
                  value={values.neighborhoodId ? values.neighborhoodId : ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (!isNaN(Number(value)))
                      setValues((current) => ({
                        ...current,
                        neighborhoodId: Number(value),
                      }));
                  }}
                >
                  <MenuItem value=""></MenuItem>
                  {neighborhoods.map((n, index) => (
                    <MenuItem
                      key={index}
                      className="text-sm font-kanit font-light"
                      value={n.neighborhoodId}
                    >
                      {n.neighborhoodName}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col col-span-12">
                <label htmlFor="" className="font-normal">
                  Adresse
                </label>
                <OutlinedInput
                  fullWidth
                  size="small"
                  className="w-full font-kanit bg-white"
                  multiline
                  rows={2}
                  value={values.ordererCompleteAddress}
                  onChange={(e) =>
                    setValues((current) => ({
                      ...current,
                      ordererCompleteAddress: e.target.value,
                    }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="flex flex-col col-span-4">
                <label htmlFor="" className="font-normal">
                  Status
                </label>
                <OutlinedInput
                  fullWidth
                  size="small"
                  className="w-full font-kanit bg-white"
                  disabled
                  value={
                    order.deliveryId === null
                      ? "Non assignée"
                      : order.deliveredAt !== null
                      ? "Livrée"
                      : ""
                  }
                />
              </div>
              <div className="flex flex-col col-span-4">
                <label htmlFor="" className="font-normal">
                  Livreur
                </label>
                <OutlinedInput
                  fullWidth
                  size="small"
                  className="w-full font-kanit bg-white"
                  disabled
                  value="Abdoul-Wahabou"
                />
              </div>
              {!readOnly && order.deliveryId === null && (
                <div className="flex flex-col col-span-4">
                  <label htmlFor="" className="font-normal">
                    Ajouter à une livraison
                  </label>
                  <Select
                    size="small"
                    MenuProps={{ disableScrollLock: true }}
                    className="bg-white"
                    value=""
                  >
                    <MenuItem value=""></MenuItem>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <h1 className="text-2xl font-raleway font-bold">
              3. Produits commandées
            </h1>
            <div className="mt-5">
              {values.lines.map((line, index) => {
                let product = linesProductsAndTheirRelatedInfos.find(
                  (p) => p.productId === line.productId
                );
                return product !== undefined ? (
                  <div
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-white px-3 py-2 flex"
                        : "px-3 py-2 flex"
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
                      <h1 className="uppercase sm:text-2xl lg:text-sm font-medium">
                        {product.productName}
                      </h1>
                      <h1 className="uppercase sm:text-2xl lg:text-sm font-medium">
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
                      {product.productQuantity > 0 ? (
                        <div className="px-3 w-fit rounded-full bg-green-100 text-green-700 flex items-center text-sm mt-2">
                          <HiBadgeCheck className="inline mr-2" /> En stock
                        </div>
                      ) : (
                        <div className="px-3 w-fit rounded-full bg-red-100 text-red-700 flex items-center text-sm mt-2">
                          <HiBadgeCheck className="inline mr-2" /> Indisponible
                        </div>
                      )}
                    </div>
                    {!readOnly && (
                      <div className="flex flex-col items-end justify-between h-full">
                        {values.lines.length > 1 && (
                          <IconButton
                            className="w-fit h-fit mb-5"
                            color="error"
                            onClick={() => {
                              setValues((current) => ({
                                ...current,
                                lines: current.lines.filter(
                                  (l) => l.productId !== line.productId
                                ),
                              }));
                            }}
                          >
                            <AiOutlineDelete className="sm:text-4xl lg:text-base" />
                          </IconButton>
                        )}
                        <div className="w-fit flex items-center">
                          <input
                            type="number"
                            className="bg-white outline-none border-2 border-primary sm:w-24 sm:h-16 lg:w-8 lg:h-8 rounded-l-md sm:text-3xl lg:text-sm font-normal text-center"
                            value={values.lines[index].quantity}
                            onChange={(e) => {}}
                            disabled
                            readOnly
                          />
                          <div className="bg-white lg:h-8 sm:h-16 border-y-2 border-r-2 border-primary rounded-r-md  flex items-center justify-between">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => {
                                let newValues = values;
                                for (
                                  let i = 0;
                                  i < newValues.lines.length;
                                  i++
                                ) {
                                  if (
                                    newValues.lines[i].productId ===
                                    line.productId
                                  ) {
                                    newValues.lines[i].quantity -= 1;
                                  }
                                }
                                setValues(newValues);
                              }}
                              disabled={line.quantity <= 1}
                            >
                              <AiOutlineMinus className="sm:text-3xl lg:text-xs" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="primary"
                              className="sm:ml-5 lg:ml-0"
                              disabled={
                                line.quantity >= product.productQuantity
                              }
                              onClick={() => {
                                let newValues = values;
                                for (
                                  let i = 0;
                                  i < newValues.lines.length;
                                  i++
                                ) {
                                  if (
                                    newValues.lines[i].productId ===
                                    line.productId
                                  ) {
                                    newValues.lines[i].quantity += 1;
                                  }
                                }
                                setValues(newValues);
                              }}
                            >
                              <AiOutlinePlus className="sm:text-3xl lg:text-xs" />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    className="w-full h-28"
                    animation="wave"
                    key={index}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-5 w-full bg-white drop-shadow-sm py-5 px-10 rounded-md">
            <h1 className="text-2xl font-raleway font-bold">4. Resumé</h1>
            <div className="w-full py-2 flex items-center justify-between sm:text-3xl lg:text-base font-normal mt-5">
              <h3 className="">
                Montant total{" "}
                <small className="align-bottom">(sans réduction)</small>
              </h3>
              <h3 className="">{summaryValues.totalExpensesPrice} FCFA</h3>
            </div>
            <div className="w-full py-2 border-t flex items-center justify-between sm:text-3xl lg:text-base font-normal">
              <h3 className="">Réduction </h3>
              <h3 className="">{summaryValues.totalDiscount} FCFA</h3>
            </div>
            <div className="w-full py-2 border-t flex items-center justify-between sm:text-3xl lg:text-base font-normal">
              <h3 className="">Livraison</h3>
              <h3 className="">{summaryValues.deliveryPrice} FCFA</h3>
            </div>
            <div className="w-full py-2 border-t flex items-center justify-between sm:text-3xl lg:text-base font-normal">
              <h3 className="">Taxes</h3>
              <h3 className="">{summaryValues.taxes} FCFA</h3>
            </div>
            <div className="w-full py-2 border-t flex items-center justify-between sm:text-4xl lg:text-lg font-medium">
              <h3 className="uppercase">Total à payer</h3>
              <h3 className="">{summaryValues.total} FCFA</h3>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateOrderDialog;
