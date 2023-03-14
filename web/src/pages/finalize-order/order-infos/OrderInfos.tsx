import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import React from "react";
import PersonalInfos from "./personal-infos/PersonalInfos";
import { OrderToBeMadeType } from "../../../redux/slices/orderToBeMadeSlice";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import DeliveryAddress from "./delivery-address/DeliveryAddress";
import PayementMethods from "./payement-methods/PayementMethods";
import { MdKeyboardArrowDown, MdOutlineLocationOn } from "react-icons/md";
import { BsCheckCircleFill, BsInfoSquare, BsPatchCheck } from "react-icons/bs";
import { GiCheckMark, GiMoneyStack } from "react-icons/gi";
import { TbInfoSquare } from "react-icons/tb";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";

const OrderInfos = () => {
  const authenticatedClient = useAppSelector(
    (state: RootState) => state.authenticatedClient.client
  );
  const order = useAppSelector((state: RootState) => state.orderToBeMade);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [values, setValues] = React.useState<OrderToBeMadeType>({
    ordererFirstName:
      authenticatedClient !== null ? authenticatedClient.FirstName : "",
    ordererLastName:
      authenticatedClient !== null ? authenticatedClient.LastName : "",
    ordererEmail: authenticatedClient !== null ? authenticatedClient.Email : "",
    ordererPhoneNumber:
      authenticatedClient !== null ? authenticatedClient.PhoneNumber : "",
    ordererCompleteAddress:
      authenticatedClient !== null ? authenticatedClient.CompleteAddress : "",
    neighborhoodId:
      authenticatedClient !== null ? authenticatedClient.NeighborhoodId : null,
    clientId: authenticatedClient !== null ? authenticatedClient.userId : null,
    lines: order.lines,
  });

  React.useEffect(() => {
    if (authenticatedClient !== null) {
      setValues((current) => ({
        ...current,
        ordererFirstName: authenticatedClient.FirstName,
        ordererLastName: authenticatedClient.LastName,
        ordererEmail: authenticatedClient.Email,
        ordererPhoneNumber: authenticatedClient.PhoneNumber,
        ordererCompleteAddress: authenticatedClient.CompleteAddress,
        neighborhoodId: authenticatedClient.NeighborhoodId,
        clientId: authenticatedClient.userId,
        lines: order.lines,
      }));
    }
  }, [order, authenticatedClient]);

  return (
    <div className="sm:col-span-12 lg:col-span-7 mt-1 sm:mb-0 lg:mb-10">
      <Accordion
        className={activeStep === 0 ? "border-2 border-primary" : "border"}
        elevation={0}
        expanded={activeStep === 0}
      >
        <AccordionSummary
          className={
            activeStep >= 0
              ? "text-primary cursor-default"
              : "text-gray-400 cursor-default"
          }
          expandIcon={
            <MdKeyboardArrowDown className="sm:text-3xl lg:text-xl" />
          }
        >
          <div className="sm:text-4xl lg:text-xl font-kanit font-medium select-none flex items-center">
            {activeStep > 0 ? (
              <BsPatchCheck className="sm:text-5xl lg:text-2xl sm:mr-4 lg:mr-2 drop-shadow-sm" />
            ) : (
              <TbInfoSquare className="sm:text-5xl lg:text-2xl sm:mr-4 lg:mr-2" />
            )}

            <span>Informations personnelles</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <PersonalInfos
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            values={values}
            setValues={setValues}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={activeStep === 1 ? "border-2 border-primary" : "border"}
        elevation={0}
        expanded={activeStep === 1}
      >
        <AccordionSummary
          className={
            activeStep >= 1
              ? "text-primary cursor-default"
              : "text-gray-500 cursor-default"
          }
          expandIcon={<MdKeyboardArrowDown />}
        >
          <div className="sm:text-4xl lg:text-xl font-kanit font-medium select-none flex items-center">
            {activeStep > 1 ? (
              <BsPatchCheck className="sm:text-5xl lg:text-2xl sm:mr-4 lg:mr-2 drop-shadow-sm" />
            ) : (
              <HiOutlineLocationMarker className="sm:text-5xl lg:text-2xl sm:mr-4 lg:mr-2" />
            )}
            <span>Adresse de livraison</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <DeliveryAddress
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            values={values}
            setValues={setValues}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={activeStep === 2 ? "border-2 border-primary" : "border"}
        elevation={0}
        expanded={activeStep === 2}
      >
        <AccordionSummary
          className={
            activeStep >= 2
              ? "text-primary cursor-default"
              : "text-gray-500 cursor-default"
          }
          expandIcon={<MdKeyboardArrowDown />}
        >
          <div className="sm:text-4xl lg:text-xl font-kanit font-medium select-none flex items-center">
            {activeStep > 2 ? (
              <BsPatchCheck className="sm:text-5xl lg:text-2xl sm:mr-4 lg:mr-2 drop-shadow-sm" />
            ) : (
              <GiMoneyStack className="sm:text-5xl lg:text-2xl sm:mr-4 lg:mr-2" />
            )}
            <span>Méthodes de payement</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <PayementMethods
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default OrderInfos;
