import React from "react";
import { CustomImage } from "../../../../data/models/Image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { AiOutlinePicture } from "react-icons/ai";
import {
  Button,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

type Props = {
  images: CustomImage[];
};

const ImagesSection = ({ images }: Props) => {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={20}
      className="max-h-56 px-28 mt-10 items-center flex cursor-pointer col-span-2 mb-5"
    >
      <SwiperSlide className="w-56 h-48 bg-gray-200 rounded-lg border-2 border-gray-500 border-dashed flex flex-col items-center justify-center">
        <AiOutlinePicture className="text-4xl text-primary" />
        <p className="text-sm text-gray-500 ">
          Déposez votre image ici, ou{" "}
          <Button
            size="small"
            className="inline normal-case text-xm text-gray-500"
          >
            cliquez pour parcourir
          </Button>
        </p>
        <input type="file" className="hidden" accept="image/*" />
      </SwiperSlide>
      {images.map((image) => (
        <SwiperSlide className="">
          <ImageListItem>
            <img
              src={
                "data:" + image.imageExtension + ";base64," + image.imageBytes
              }
              alt={image.imageName}
              className="w-48 h-48"
            />
            <ImageListItemBar
              className="bg-transparent"
              position="bottom"
              actionIcon={
                <div className="w-full flex justify-between">
                  <IconButton size="small" color="error">
                    <BsTrash />
                  </IconButton>
                </div>
              }
              actionPosition="right"
            />
            <ImageListItemBar
              className="bg-transparent"
              position="top"
              actionIcon={
                <div className="w-full flex justify-between">
                  <IconButton size="small">
                    <FiEdit />
                  </IconButton>
                </div>
              }
              actionPosition="right"
            />
          </ImageListItem>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImagesSection;
