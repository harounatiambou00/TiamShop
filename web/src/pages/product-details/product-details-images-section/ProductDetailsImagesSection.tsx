import React from "react";
import { CustomImage } from "../../../data/models/Image";
import { IconButton } from "@mui/material";
import { RiHeartAddLine } from "react-icons/ri";
import { MdOutlineCompareArrows } from "react-icons/md";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import { AiOutlineShareAlt } from "react-icons/ai";

type Props = {
  images: CustomImage[];
};

const ProductDetailsImagesSection = ({ images }: Props) => {
  return (
    <div className="w-full lg:px-10 relative h-128">
      <Swiper
        id="app_product_details_page_images_swiper"
        pagination={true}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="flex items-center justify-center rounded-lg h-3/4 z-40"
      >
        {images.map((image) => {
          return (
            <SwiperSlide key={image.imageId}>
              <img
                alt={image.imageName}
                src={
                  "data:" + image.imageExtension + ";base64," + image.imageBytes
                }
                className="w-72 h-72"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        slidesPerView={5}
        className="w-full flex justify-center items-center pl-5"
      >
        {images.map((image) => {
          return (
            <SwiperSlide
              key={image.imageId}
              className="w-20 h-20 border-2 mr-2 rounded-md flex items-center justify-center cursor-pointer"
            >
              <img
                alt={image.imageName}
                src={
                  "data:" + image.imageExtension + ";base64," + image.imageBytes
                }
                className="h-16"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="absolute top-0 left-5 z-50 pt-3 pr-3">
        <div className="flex flex-col">
          <IconButton color="primary" className="border-2">
            <RiHeartAddLine />
          </IconButton>
          <IconButton color="primary" className="">
            <MdOutlineCompareArrows />
          </IconButton>
          <IconButton color="primary" className="">
            <AiOutlineShareAlt />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsImagesSection;
