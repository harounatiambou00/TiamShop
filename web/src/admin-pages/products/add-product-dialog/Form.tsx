import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormGroup,
  Input,
  List,
  ListItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlinePicture, AiOutlinePlusCircle } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Form = () => {
  return (
    <div className="w-full flex justify-between p-5">
      <div className="w-1/2 px-10 grid grid-cols-4 gap-4">
        <div className="col-span-4">
          <div className="text-md font-medium">
            Nom du produit <span className="text-red-500">*</span>
          </div>
          <OutlinedInput fullWidth size="small" className="font-kanit" />
        </div>
        <div className="col-span-4">
          <div className="text-md font-medium">
            Description du produit <span className="text-red-500">*</span>
          </div>
          <OutlinedInput
            fullWidth
            size="small"
            className="font-kanit"
            multiline
            rows={4}
          />
        </div>

        <div className="col-span-2">
          <div className="text-md font-medium">
            Prix <span className="text-red-500">*</span>
          </div>
          <FormGroup>
            <OutlinedInput
              fullWidth
              size="small"
              type="number"
              className="font-raleway font-medium text-xl"
              endAdornment={<div className="h-full text-xl">FCFA</div>}
            />
          </FormGroup>
        </div>
        <div className="col-span-2 flex flex-col items-end">
          <div className="w-1/2">
            <div className="text-md font-medium">
              Quantité <span className="text-red-500">*</span>
            </div>
            <FormGroup>
              <OutlinedInput
                fullWidth
                size="small"
                type="number"
                className="font-raleway font-medium text-xl"
              />
            </FormGroup>
          </div>
        </div>
        <div className="col-span-2">
          <div className="text-md font-medium">
            Sous-catégorie <span className="text-red-500">*</span>
          </div>
          <FormGroup>
            <Select
              fullWidth
              size="small"
              type="text"
              className="font-kanit font-light"
            />
          </FormGroup>
        </div>
        <div className="col-span-2">
          <div className="text-md font-medium">
            La marque du produit <span className="text-red-500">*</span>
          </div>
          <FormGroup>
            <Select
              fullWidth
              size="small"
              type="text"
              className="font-kanit font-light"
            />
          </FormGroup>
        </div>

        <div className="col-span-2">
          <div className="text-md font-medium">Garantie</div>
          <FormGroup>
            <OutlinedInput
              fullWidth
              size="small"
              type="text"
              className="font-kanit"
            />
          </FormGroup>
        </div>
        <div className="col-span-2">
          <div className="text-md font-medium">Couleur</div>
          <FormGroup>
            <OutlinedInput
              fullWidth
              size="small"
              type="text"
              className="font-kanit"
            />
          </FormGroup>
        </div>
      </div>
      <div className="w-1/2">
        <div>
          <div className="text-md font-medium">
            Images <span className="text-red-500">*</span>
          </div>
          <div className="h-48 bg-gray-100 w-full rounded-md drop-shadow-xs p-2">
            <Swiper slidesPerView={3} spaceBetween={20} className="mb-2">
              <SwiperSlide className="h-full border-dashed border-2 border-primary rounded-md bg-transparent flex flex-col items-center justify-center">
                <AiOutlinePicture className="text-4xl text-primary" />
                <p className="text-sm text-gray-500 ">
                  Déposez votre image ici, ou{" "}
                  <Button size="small" className="inline normal-case text-xm">
                    cliquez pour parcourir
                  </Button>
                </p>
              </SwiperSlide>
            </Swiper>
            <small className="font-light text-gray-500">
              Vous devez ajouter au moins une image et au plus 5 images.
            </small>
          </div>
        </div>
        <div className="mt-10">
          <Accordion className="hover:bg-gray-50" elevation={0}>
            <AccordionSummary
              expandIcon={
                <MdKeyboardArrowDown className="font-medium text-2xl" />
              }
              className="pl-0 font-medium"
            >
              Voulez-vous appliquer une reduction au produit ?
            </AccordionSummary>
            <AccordionDetails className="grid gap-4 grid-cols-4">
              <div className="col-span-1">
                <div className="text-md font-medium">Poucentage</div>
                <FormGroup>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    type="number"
                    className="font-raleway font-medium text-xl"
                    endAdornment={<div className="h-full text-xl">%</div>}
                  />
                </FormGroup>
              </div>
              <div className="col-span-3">
                <div className="text-md font-medium">
                  Date de la fin de réduction
                </div>
                <FormGroup>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    type="date"
                    className="font-kanit"
                  />
                </FormGroup>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="mt-10">
          <div className="flex justify-between items-center">
            <div className="text-md font-medium">Caractéristiques</div>
            <Button
              size="small"
              startIcon={<AiOutlinePlusCircle />}
              className="font-kanit normal-case font-light"
            >
              Ajouter
            </Button>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-1 text-center">Nom</div>
              <div className="col-span-3 text-center">Valeur</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
