import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper";
import SubCategoriesListItem from "./sub-categories-list-item/SubCategoriesListItem";

type Props = {
  categoryId: number;
};

const SubCategoriesList = ({ categoryId }: Props) => {
  const [subCategories, setSubCategories] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const getSubCategories = async () => {
    setIsLoading(true);
    const url =
      process.env.REACT_APP_API_URL +
      "categories/get-subcategories/" +
      categoryId;
    let response = await fetch(url);
    let content = await response.json();
    let data = content.data;
    console.log(data);

    for (let i of data) {
      setSubCategories((currentSubCategories) => [
        ...currentSubCategories,
        {
          ...{},
          SubCategoryId: i.subCategoryId,
          SubCategoryName: i.subCategoryName,
          SubCategoryTitle: i.subCategoryTitle,
          SubCategoryImageId: i.subCategoryImageId,
          SubCategoryRanking: i.subCategoryRanking,
          CategoryId: i.categoryId,
        },
      ]);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getSubCategories();
  }, []);
  return !isLoading ? (
    <Swiper
      slidesPerView={4}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper h-32 mt-4"
    >
      {subCategories.map((subCategory) => {
        return (
          <SwiperSlide key={subCategory.subCategoryId}>
            <SubCategoriesListItem subCategory={subCategory} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  ) : (
    <div>loading ...</div>
  );
};

export default SubCategoriesList;
