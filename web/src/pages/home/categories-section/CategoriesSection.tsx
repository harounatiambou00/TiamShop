import React from "react";
import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoriesItem from "./categories-item/CategoriesItem";

import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Navigation, Pagination } from "swiper";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  let categories = useAppSelector(
    (state: RootState) => state.categories.categories
  );
  const navigate = useNavigate();
  return (
    <HomePageSection title="Nos rayons">
      <Swiper
        id="app_homepage_categories_swiper"
        className="h-48"
        draggable={true}
        slidesPerView={5}
        spaceBetween={30}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
      >
        {categories.map((category) => {
          return (
            <SwiperSlide
              key={category.CategoryId}
              className="drop-shadow-md rounded-md h-40 cursor-pointer hover:drop-shadow-lg"
              onClick={() => navigate(`/category/${category.CategoryName}`)}
            >
              <CategoriesItem category={category} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </HomePageSection>
  );
};

export default CategoriesSection;
