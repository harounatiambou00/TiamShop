import React from "react";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import { Swiper, SwiperSlide } from "swiper/react";
import BrandsItem from "./brands-item/BrandsItem";

const BrandsSection = () => {
  let brands = useAppSelector((state: RootState) =>
    state.allBrands.brands.filter((b) => b.PartnershipDate === null)
  );
  return (
    <HomePageSection title="Nos marques">
      <Swiper
        id="app_homepage_partners_swiper"
        className="h-28 bg-transparent"
        draggable={true}
        spaceBetween={30}
        slidesPerView={5}
      >
        {brands.map((b) => {
          return (
            <SwiperSlide key={b.brandId} className="">
              <BrandsItem brand={b} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </HomePageSection>
  );
};

export default BrandsSection;
