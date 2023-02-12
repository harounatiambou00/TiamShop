import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import Breadcumb from "./breadcumb/Breadcumb";
import SubCategorySection from "./subcategory-section/SubCategorySection";
import { Button } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  let categories = useAppSelector(
    (state: RootState) => state.categories.categories
  );
  let category = categories.find((c) => c.CategoryName === categoryName);
  let allSubCategories = useAppSelector(
    (state: RootState) => state.subCategories.subCategories
  );
  let relatedSubCategories = allSubCategories.filter(
    (s) => s.CategoryId === category?.CategoryId
  );
  React.useEffect(() => {
    if (categoryName === null || categoryName === "" || category === undefined)
      navigate("/not-found");
  }, []);
  return (
    <div className="p-5">
      <Breadcumb category={category} />
      <h1 className="uppercase font-raleway mt-10 text-3xl font-normal">
        {category?.CategoryTitle}
      </h1>
      <div className="my-5 p-5">
        <div className="flex justify-between items-center">
          <h1 className="uppercase font-raleway text-xl font-normal">
            Tendances
          </h1>
          <Button
            size="small"
            color="primary"
            className="normal-case font-kanit font-light"
            endIcon={<BsPlus />}
          >
            Voir plus
          </Button>
        </div>
        <Swiper
          id="app_category_subcategory_section_swiper"
          className="h-96 mt-2"
          draggable={true}
          slidesPerView={5}
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
                {i}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="p-5">
        {relatedSubCategories.map((subCategory) => (
          <SubCategorySection
            key={subCategory.SubCategoryId}
            subCategory={subCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
