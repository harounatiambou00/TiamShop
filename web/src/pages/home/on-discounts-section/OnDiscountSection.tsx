import React from "react";
import HomePageSection from "../../../components/homepage-components/homepage-section/HomePageSection";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Navigation, Pagination } from "swiper";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import { ProductCard } from "../../../components/core";
import { useNavigate } from "react-router-dom";

const OnDiscountSection = () => {
  let allProducts = useAppSelector(
    (state: RootState) => state.allProducts.allProducts
  );
  const [productsToBeDisplayed, setProductsToBeDisplayed] = React.useState<
    ProductAndRelatedInfo[]
  >([]);
  React.useEffect(() => {
    setProductsToBeDisplayed(
      allProducts
        .filter(
          (p) =>
            p.productDiscountPercentage !== 0 &&
            p.productDiscountEndDate !== null
        )
        .sort((p1, p2) => {
          if (p1.productDiscountPercentage > p2.productDiscountPercentage)
            return -1;
          else if (p1.productDiscountPercentage < p2.productDiscountPercentage)
            return 1;
          else return 0;
        })
        .slice(0, 10)
    );
  }, [allProducts]);
  const navigate = useNavigate();
  return (
    <HomePageSection
      title="En solde"
      handleClickSeeMoreButton={() => navigate("/on-discount-products")}
    >
      <Swiper
        id="app_homepage_categories_swiper"
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
        {productsToBeDisplayed.map((p) => {
          return (
            <SwiperSlide key={p.productId} className="drop-shadow-sm">
              <ProductCard product={p} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </HomePageSection>
  );
};

export default OnDiscountSection;
