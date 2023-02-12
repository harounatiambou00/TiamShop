import React from "react";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import { Swiper, SwiperSlide } from "swiper/react";
import PartnersItem from "./PartnersItem";

const PartnersSection = () => {
  let partners = useAppSelector((state: RootState) =>
    state.allBrands.brands.filter((b) => b.PartnershipDate !== null)
  );

  return (
    <HomePageSection title="Nos partenaires">
      <Swiper
        id="app_homepage_partners_swiper"
        className="h-28 bg-transparent"
        draggable={true}
        spaceBetween={30}
        slidesPerView={5}
      >
        {partners.map((p) => {
          return (
            <SwiperSlide key={p.brandId} className="">
              <PartnersItem brand={p} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </HomePageSection>
  );
};

export default PartnersSection;
