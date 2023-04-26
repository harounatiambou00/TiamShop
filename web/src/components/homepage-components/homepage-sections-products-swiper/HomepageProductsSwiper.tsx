import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "../../core";
import { Navigation, Pagination } from "swiper";

import "./styles.css";
import { Product } from "../../../data/models/Product";

type Props = {
  products: Product[];
  newProducts?: boolean;
  trendingProducts?: boolean;
};

const HomepageProductsSwiper = ({
  products,
  newProducts,
  trendingProducts,
}: Props) => {
  return (
    <div>
      {/**Only on small screens */}
      <Swiper
        id="app_homepage_products_swiper"
        className="sm:flex lg:hidden"
        draggable={true}
        slidesPerView={2}
        spaceBetween={15}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
      >
        {products.map((p) => {
          return (
            <SwiperSlide key={p.productId} className="drop-shadow-sm my-5">
              <ProductCard
                product={p}
                isNew={newProducts}
                isTrend={trendingProducts}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/**Only on large screens */}
      <Swiper
        id="app_homepage_products_swiper"
        className="sm:hidden lg:flex"
        draggable={true}
        slidesPerView={4}
        spaceBetween={15}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
      >
        {products.map((p) => {
          return (
            <SwiperSlide key={p.productId} className="drop-shadow-sm my-4">
              <ProductCard
                product={p}
                isNew={newProducts}
                isTrend={trendingProducts}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HomepageProductsSwiper;
