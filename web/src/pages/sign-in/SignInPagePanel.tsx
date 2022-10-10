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
    <div className="sm:hidden lg:block lg:h-full lg:w-8/12 bg-secondary">
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
          <SwiperSlide className="flex flex-col p-20">
            <img
              src={
                process.env.PUBLIC_URL + "assets/svg/client-sign-in/door.svg"
              }
              alt="delivery"
              className=""
            />
          </SwiperSlide>
          <SwiperSlide className="flex flex-col"></SwiperSlide>
          <SwiperSlide className="flex flex-col"></SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SignInPagePanel;
