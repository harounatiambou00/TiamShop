import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";

import "./panel.css";

const SignInPagePanel: React.FC = () => {
  return (
    <div className="sm:hidden lg:block lg:h-full lg:w-8/12 bg-white">
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
            <img
              src={
                process.env.PUBLIC_URL + "assets/images/sign-in/every_where.jpg"
              }
              alt="delivery"
              className=""
            />
          </SwiperSlide>
          <SwiperSlide className="flex flex-col">
            <img
              src={
                process.env.PUBLIC_URL + "assets/images/sign-in/the_best.jpg"
              }
              alt="delivery"
              className=""
            />
          </SwiperSlide>
          <SwiperSlide className="flex flex-col">
            <img
              src={
                process.env.PUBLIC_URL +
                "assets/images/sign-in/rapid_delivery.png"
              }
              alt="delivery"
              className=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SignInPagePanel;
