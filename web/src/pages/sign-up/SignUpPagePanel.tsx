import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";

import "./panel.css";

const SignUpPagePanel: React.FC = () => {
  return (
    <div className="sm:hidden lg:block lg:h-full lg:w-5/12 bg-gray-50">
      <div className="h-full">
        <Swiper
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="w-full"
        >
          <SwiperSlide className="flex flex-col">
            <h1 className="text-6xl font-semibold text-gray-600 font-amita fixed top-16">
              Livraison instantanée
            </h1>
            <img
              src={
                process.env.PUBLIC_URL +
                "assets/svg/client-sign-up/delivery.svg"
              }
              alt="delivery"
              className="h-5/6"
            />
          </SwiperSlide>
          <SwiperSlide className="flex flex-col">
            <h1 className="text-6xl font-semibold text-gray-600 font-amita fixed top-20">
              Partout à Niamey
            </h1>
            <img
              src={
                process.env.PUBLIC_URL +
                "assets/svg/client-sign-up/anywhere.svg"
              }
              alt="delivery"
              className="h-5/6"
            />
          </SwiperSlide>
          <SwiperSlide className="flex flex-col">
            <h1 className="text-6xl font-semibold text-gray-600 font-amita">
              Des prix accostables
            </h1>
            <img
              src={
                process.env.PUBLIC_URL +
                "assets/svg/client-sign-up/affordable-prices.svg"
              }
              alt="delivery"
              className="h-5/6"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SignUpPagePanel;
