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
import { ProductCard } from "../../../components/core";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";

const NewProductsSection = () => {
  let allProducts = useAppSelector(
    (state: RootState) => state.allProducts.allProducts
  );
  const [productsToBeDisplayed, setProductsToBeDisplayed] = React.useState<
    ProductAndRelatedInfo[]
  >([]);
  React.useEffect(() => {
    setProductsToBeDisplayed(
      allProducts
        .filter((p) => p.createdAt !== null && typeof p.createdAt === "string")
        .sort((p1, p2) => {
          if (p1.createdAt !== null && p2.createdAt !== null) {
            if (new Date(p1.createdAt) > new Date(p2.createdAt)) return -1;
            else if (new Date(p1.createdAt) < new Date(p2.createdAt)) return 1;
            else return 0;
          } else return 0;
        })
        .slice(0, 9)
    );
  }, [allProducts]);
  return (
    <HomePageSection title="Nouvel arrivage">
      <Swiper
        id="app_homepage_new_products_swiper"
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
              <ProductCard product={p} isNew={true} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </HomePageSection>
  );
};

export default NewProductsSection;
