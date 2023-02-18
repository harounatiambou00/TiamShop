import React from "react";
import { SubCategory } from "../../../data/models/SubCategory";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
// import required modules
import { Navigation, Pagination } from "swiper";
import { Button } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type Props = {
  subCategory: SubCategory;
};

const SubCategorySection = ({ subCategory }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="my-5">
      <div className="flex justify-between items-center">
        <h1 className="uppercase font-raleway text-xl font-normal">
          {subCategory.SubCategoryTitle}
        </h1>
        <Button
          size="small"
          color="primary"
          className="normal-case font-kanit font-light"
          endIcon={<BsPlus />}
          onClick={() =>
            navigate("/sub-category/" + subCategory.SubCategoryName)
          }
        >
          Voir plus
        </Button>
      </div>
      <Swiper
        id="app_category_subcategory_section_swiper"
        className="h-96 mt-2"
        draggable={true}
        slidesPerView={5}
        spaceBetween={15}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
      >
        {[0, 1, 2, 3, , 5, 6, 7, 8, 9].map((i) => {
          return (
            <SwiperSlide key={i} className="drop-shadow-sm">
              {i}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SubCategorySection;
