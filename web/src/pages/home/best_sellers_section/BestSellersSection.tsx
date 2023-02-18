import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

// import required modules
import { Navigation, Pagination } from "swiper";
import { ProductCard } from "../../../components/core";
import { useNavigate } from "react-router-dom";

const BestSellersSection = () => {
  let products = useAppSelector(
    (state: RootState) => state.allProducts.allProducts
  );
  const navigate = useNavigate();
  return (
    <HomePageSection
      title="Les plus populaires cette semaine"
      handleClickSeeMoreButton={() => navigate("/best-sellers")}
    >
      <Swiper
        id="app_homepage_best_sellers_swiper"
        className="h-96"
        draggable={true}
        slidesPerView={4}
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
              {products[0] && (
                <ProductCard product={products[0]} isTrend={true} />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </HomePageSection>
  );
};

export default BestSellersSection;
