import React from "react";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import { IconButton, Select, Skeleton } from "@mui/material";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TbDiscount2 } from "react-icons/tb";
import { useAppDispatch } from "../../../hooks/redux-custom-hooks/useAppDispatch";
import { setOrderToBeMade } from "../../../redux/slices/orderToBeMadeSlice";
import CreateOrderLineDTO from "../../../data/models/CreateOrderLineDTO";

type Props = {
  readOnly: boolean;
};

const OrderSummary = ({ readOnly }: Props) => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state: RootState) => state.orderToBeMade);
  const [products, setProducts] = React.useState<ProductAndRelatedInfo[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const getProducts = async () => {
    setIsLoading(true);
    for (let line of order.lines) {
      let url =
        process.env.REACT_APP_API_URL +
        "products/get-product-and-all-related-info/" +
        line.productId;
      const response = await fetch(url);
      const content = await response.json();
      if (content.success) {
        let data = content.data as ProductAndRelatedInfo;
        if (data !== null) {
          setProducts((currentState) => [
            ...currentState,
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
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    setProducts([]);
    getProducts();
  }, [order]);

  const [summaryValues, setSummayValues] = React.useState<{
    numberOfProducts: number;
    totalExpensesPrice: number;
    totalDiscount: number;
    deliveryPrice: number;
    taxes: number;
    total: number;
  }>({
    numberOfProducts: order.lines.length,
    totalExpensesPrice: 0,
    totalDiscount: 0,
    deliveryPrice: 0,
    taxes: 0,
    total: 0,
  });
  React.useEffect(() => {
    let totalExpenses = 0;
    for (let line of order.lines) {
      let product = products.find((pr) => pr.productId === line.productId);
      if (product !== undefined)
        totalExpenses += product.productPrice * line.quantity;
    }

    let totalDiscount = 0;
    for (let line of order.lines) {
      let product = products.find((pr) => pr.productId === line.productId);
      if (product !== undefined)
        totalDiscount +=
          ((product.productPrice * product.productDiscountPercentage) / 100) *
          line.quantity;
    }
    setSummayValues((s) => ({
      ...s,
      numberOfProducts: order.lines.length,
      totalDiscount: totalDiscount,
      totalExpensesPrice: totalExpenses,
      deliveryPrice: totalExpenses > 500000 ? 0 : 1000,
      taxes: 0,
      total:
        totalExpenses > 500000
          ? totalExpenses - totalDiscount
          : totalExpenses - totalDiscount + 1000,
    }));
  }, [order, products]);
  return (
    <div className="sm:col-span-12 lg:col-span-5 sm:ml-0 lg:ml-5 sm:order-first lg:order-last">
      <h1 className="sm:text-4xl lg:text-2xl sm:mb-3 lg:mb-1 font-medium text-gray-700">
        Aperçu de la commande
      </h1>
      <div className="w-full bg-white rounded-md border-2">
        {!isLoading ? (
          <div className="w-full">
            {order.lines.map((line, index) => {
              var product = products.find(
                (p) => p.productId === line.productId
              );
              if (product !== undefined)
                return (
                  <div
                    key={index}
                    className={
                      index % 2 === 0
                        ? "flex sm:p-5 lg:p-2 sm:mb-5 lg:mb-2"
                        : "flex sm:p-5 lg:p-2 sm:mb-5 lg:mb-2 bg-gray-100"
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
                      {product.productDiscountPercentage > 0 && (
                        <span className="px-2 bg-red-100 text-red-600 rounded-full sm:text-2xl lg:text-sm w-fit">
                          <TbDiscount2 className="inline sm:text-3xl lg:text-xl" />{" "}
                          <span className="ml-1">
                            {product.productDiscountPercentage} % de réduction
                          </span>
                        </span>
                      )}
                    </div>
                    {!readOnly && (
                      <div className="flex flex-col items-end justify-between h-full">
                        {order.lines.length > 1 && (
                          <IconButton
                            className="w-fit h-fit mb-5"
                            color="error"
                            onClick={() => {
                              let newOrder = {
                                ordererFirstName: order.ordererFirstName,
                                ordererLastName: order.ordererLastName,
                                ordererEmail: order.ordererEmail,
                                ordererPhoneNumber: order.ordererPhoneNumber,
                                ordererCompleteAddress:
                                  order.ordererCompleteAddress,
                                clientId: order.clientId,
                                neighborhoodId: order.neighborhoodId,
                                lines: order.lines.filter(
                                  (l) => l.productId !== line.productId
                                ),
                              };
                              dispatch(setOrderToBeMade(newOrder));
                            }}
                          >
                            <AiOutlineDelete className="sm:text-4xl lg:text-base" />
                          </IconButton>
                        )}
                        <div className="w-fit flex items-center">
                          <input
                            type="number"
                            className="bg-white outline-none border-2 border-primary sm:w-24 sm:h-16 lg:w-8 lg:h-8 rounded-l-md sm:text-3xl lg:text-sm font-normal text-center"
                            value={line.quantity}
                            onChange={(e) => {}}
                            disabled
                            readOnly
                          />
                          <div className="bg-white lg:h-8 sm:h-16 border-y-2 border-r-2 border-primary rounded-r-md  flex items-center justify-between">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => {
                                let newOrder = {
                                  ordererFirstName: order.ordererFirstName,
                                  ordererLastName: order.ordererLastName,
                                  ordererEmail: order.ordererEmail,
                                  ordererPhoneNumber: order.ordererPhoneNumber,
                                  ordererCompleteAddress:
                                    order.ordererCompleteAddress,
                                  clientId: order.clientId,
                                  neighborhoodId: order.neighborhoodId,
                                  lines: order.lines.map((l) => {
                                    if (l.productId === line.productId) {
                                      if (l.quantity > 1) {
                                        return {
                                          orderId: 0,
                                          quantity: l.quantity - 1,
                                          productId: l.productId,
                                        } as CreateOrderLineDTO;
                                      }
                                    }
                                    return l;
                                  }),
                                };
                                dispatch(setOrderToBeMade(newOrder));
                              }}
                              disabled={line.quantity <= 1}
                            >
                              <AiOutlineMinus className="sm:text-3xl lg:text-xs" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="primary"
                              className="sm:ml-5 lg:ml-0"
                              onClick={() => {
                                let newOrder = {
                                  ordererFirstName: order.ordererFirstName,
                                  ordererLastName: order.ordererLastName,
                                  ordererEmail: order.ordererEmail,
                                  ordererPhoneNumber: order.ordererPhoneNumber,
                                  ordererCompleteAddress:
                                    order.ordererCompleteAddress,
                                  clientId: order.clientId,
                                  neighborhoodId: order.neighborhoodId,
                                  lines: order.lines.map((l) => {
                                    if (l.productId === line.productId) {
                                      if (
                                        product !== undefined &&
                                        l.quantity + 1 <=
                                          product.productQuantity
                                      ) {
                                        return {
                                          orderId: 0,
                                          quantity: l.quantity + 1,
                                          productId: l.productId,
                                        } as CreateOrderLineDTO;
                                      }
                                    }
                                    return l;
                                  }),
                                };
                                dispatch(setOrderToBeMade(newOrder));
                              }}
                              disabled={
                                line.quantity >= product.productQuantity
                              }
                            >
                              <AiOutlinePlus className="sm:text-3xl lg:text-xs" />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              else return null;
            })}
          </div>
        ) : (
          <div className="w-full">
            {order.lines.map((line, index) => (
              <div key={index} className="flex sm:p-5 lg:p-2 sm:mb-5 lg:mb-2">
                <Skeleton
                  variant="rectangular"
                  className="sm:h-40 lg:h-24 sm:w-40 lg:w-28 rounded-md"
                  animation="wave"
                />
                <div className="flex-1 flex flex-col sm:pl-5 lg:pl-2">
                  <Skeleton
                    variant="rectangular"
                    className="sm:h-10 lg:h-6 w-11/12 rounded-md"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    className="sm:h-10 lg:h-6 w-1/2 rounded-md sm:mt-4 lg:mt-2"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    className="sm:h-6 lg:h-6 w-1/4 rounded-full sm:mt-4 lg:mt-2"
                    animation="wave"
                  />
                </div>
                <div className="flex flex-col items-end justify-between h-full">
                  <Skeleton
                    variant="circular"
                    className="sm:h-10 lg:h-6 sm:w-10 lg:w-6 rounded-full mt-2"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    className="sm:h-12 lg:h-8 sm:w-32 lg:w-20 rounded-md mt-2"
                    animation="wave"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {!isLoading ? (
          <div className="px-5 py-2">
            <div className="w-full py-2 border-t flex items-center justify-between sm:text-3xl lg:text-base font-normal">
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
        ) : (
          <div className="px-5 py-2">
            <div className="w-full py-2 border-t flex items-center justify-between text-lg">
              <Skeleton
                variant="rectangular"
                className="sm:h-10 lg:h-6 sm:w-60 lg:w-40 rounded-md"
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                className="sm:h-10 lg:h-6 sm:w-60 lg:w-40 rounded-md"
                animation="wave"
              />
            </div>
            <div className="w-full py-2 border-t flex items-center justify-between text-lg">
              <Skeleton
                variant="rectangular"
                className="sm:h-10 lg:h-6 sm:w-56 lg:w-36 rounded-md"
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                className="sm:h-10 lg:h-6 sm:w-40 lg:w-32 rounded-md"
                animation="wave"
              />
            </div>
            <div className="w-full py-2 border-t flex items-center justify-between text-lg">
              <Skeleton
                variant="rectangular"
                className="sm:h-10 lg:h-6 sm:w-40 lg:w-32 rounded-md"
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                className="sm:h-10 lg:h-6 sm:w-28 lg:w-20 rounded-md"
                animation="wave"
              />
            </div>
            <div className="w-full py-2 border-t flex items-center justify-between text-lg">
              <Skeleton
                variant="rectangular"
                className="sm:h-10 lg:h-6 sm:w-40 lg:w-20 rounded-md"
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                className="sm:h-10 lg:h-6 sm:w-40 lg:w-20 rounded-md"
                animation="wave"
              />
            </div>
            <div className="w-full py-2 border-t flex items-center justify-between">
              <Skeleton
                variant="rectangular"
                className="sm:h-10 lg:h-6 sm:w-48 lg:w-32 rounded-md"
                animation="wave"
              />
              <Skeleton
                variant="rectangular"
                className="sm:h-10 lg:h-6 sm:w-60 lg:w-48 rounded-md"
                animation="wave"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
