import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import Breadcumb from "./breadcumb/Breadcumb";
import SubCategorySection from "./subcategory-section/SubCategorySection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import BestSellers from "./best-sellers/BestSellers";

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
      {category && <BestSellers categoryId={category.CategoryId} />}
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
