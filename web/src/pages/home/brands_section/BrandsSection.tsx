import React from "react";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import { Swiper, SwiperSlide } from "swiper/react";
import BrandsItem from "./brands-item/BrandsItem";
import { Autoplay } from "swiper";
import { Skeleton } from "@mui/material";

const BrandsSection = () => {
  let brands = useAppSelector((state: RootState) =>
    state.allBrands.brands.filter((b) => b.PartnershipDate === null)
  );
  return (
    <HomePageSection title="Nos marques">
      <div className="p-5 bg-white mt-5 drop-shadow-sm">
        {/**Only on small screens */}
        <Swiper
          id="app_homepage_partners_swiper"
          className="sm:flex lg:hidden h-32"
          draggable={true}
          spaceBetween={60}
          slidesPerView={5}
          loop={brands.length > 6}
          autoplay={{
            delay: 350,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {brands.length > 0
            ? brands.map((b) => {
                return (
                  <SwiperSlide key={b.brandId} className="h-full">
                    <BrandsItem brand={b} />
                  </SwiperSlide>
                );
              })
            : [0, 1, 2].map((b) => {
                return (
                  <SwiperSlide key={b} className="h-full">
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      className="h-full w-full rounded-md"
                    />
                  </SwiperSlide>
                );
              })}
        </Swiper>
        {/**Only on large screens */}
        <Swiper
          id="app_homepage_partners_swiper"
          className="sm:hidden lg:flex h-24"
          draggable={true}
          spaceBetween={60}
          slidesPerView={6}
          loop={brands.length > 6}
          autoplay={{
            delay: 350,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {brands.length > 0
            ? brands.map((b) => {
                return (
                  <SwiperSlide key={b.brandId} className="h-full">
                    <BrandsItem brand={b} />
                  </SwiperSlide>
                );
              })
            : [0, 1, 2, 3].map((b) => {
                return (
                  <SwiperSlide key={b} className="h-full">
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      className="h-full w-full rounded-md"
                    />
                  </SwiperSlide>
                );
              })}
        </Swiper>
      </div>
    </HomePageSection>
  );
};

export default BrandsSection;
