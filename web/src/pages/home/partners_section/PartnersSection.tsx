import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import { Swiper, SwiperSlide } from "swiper/react";
import PartnersItem from "./PartnersItem";
import { Autoplay } from "swiper";

const PartnersSection = () => {
  let partners = useAppSelector((state: RootState) =>
    state.allBrands.brands.filter((b) => b.PartnershipDate !== null)
  );

  return (
    <HomePageSection title="Nos partenaires">
      <div className="p-5 bg-white mt-5 drop-shadow-sm">
        {/**Only on small screens */}
        <Swiper
          id="app_homepage_partners_swiper"
          className="sm:flex lg:hidden h-32"
          draggable={true}
          spaceBetween={60}
          slidesPerView={5}
          loop={partners.length > 6}
          autoplay={{
            delay: 350,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {partners.map((b) => {
            return (
              <SwiperSlide key={b.brandId} className="h-full">
                <PartnersItem brand={b} />
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
          loop={partners.length > 6}
          autoplay={{
            delay: 350,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {partners.map((b) => {
            return (
              <SwiperSlide key={b.brandId} className="h-full">
                <PartnersItem brand={b} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </HomePageSection>
  );
};

export default PartnersSection;
