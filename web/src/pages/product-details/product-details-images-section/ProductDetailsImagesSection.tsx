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

type Props = {
  images: CustomImage[];
};

const ProductDetailsImagesSection = ({ images }: Props) => {
  return (
    <div className="w-full lg:pr-5 static h-128">
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="flex items-center justify-center  rounded-lg drop-shadow-md bg-transparent h-full"
      >
        {images.map((image) => {
          return (
            <SwiperSlide>
              <img
                alt={image.imageName}
                src={
                  "data:" + image.imageExtension + ";base64," + image.imageBytes
                }
                className="w-96 h-96"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="absolute top-0 right-0 pt-3 pr-3">
        <div className="flex flex-col">
          <IconButton
            size="large"
            className="text-gray-500 hover:text-gray-700"
          >
            <RiHeartAddLine />
          </IconButton>
          <IconButton
            size="large"
            className="text-gray-500 hover:text-gray-700"
          >
            <MdOutlineCompareArrows />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsImagesSection;
