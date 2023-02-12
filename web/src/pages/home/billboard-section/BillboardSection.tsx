import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

// import required modules
import { Navigation, Pagination } from "swiper";

const BillboardSection = () => {
  return (
    <div className="bg-white w-full">
      <Swiper
        id="app_homepage_billboard_swiper"
        className="w-full h-96"
        draggable={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
      >
        <SwiperSlide>
          <img
            className="w-full h-full"
            alt="hi"
            src="https://www.tunisianet.com.tn/modules/wbimageslider/views/img/0fbb6faaf0dae63ba9d1f5481279944f60c6cc1f_galaxy-s23.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full"
            alt="hi"
            src="https://www.tunisianet.com.tn/modules/wbimageslider/views/img/5967fb16051d9f3f881644041e27f6827dfffd49_katana-gf76.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full"
            alt="hi"
            src="https://www.tunisianet.com.tn/modules/wbimageslider/views/img/444d65d37de73b11413d10c3a3c2a7a2cf4dc60f_mal-schneider-site.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-full"
            alt="hi"
            src="https://www.tunisianet.com.tn/modules/wbimageslider/views/img/a67b6b2284b5a89ba5ecf165b4b0d9d50ead1df2_huawei.jpg"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BillboardSection;
