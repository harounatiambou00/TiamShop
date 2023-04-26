import React from "react";
import { SubCategory } from "../../../data/models/SubCategory";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
// import required modules
import { Navigation, Pagination } from "swiper";
import { Button, Skeleton } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../data/models/Product";
import { ProductCard } from "../../../components/core";

type Props = {
  subCategory: SubCategory;
};

const SubCategorySection = ({ subCategory }: Props) => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const getProducts = async () => {
      if (subCategory !== undefined) {
        setIsLoading(true);
        let url =
          process.env.REACT_APP_API_URL +
          "products/get-products-of-subcategory?subCategoryId=" +
          subCategory.SubCategoryId +
          "&limit=10";
        let response = await fetch(url);
        let content = await response.json();
        if (content.success) {
          setProducts([]);
          for (let i of content.data) {
            setProducts((current) => [
              ...current,
              {
                productId: i.productId,
                productReference: i.productReference,
                productName: i.productName,
                productDescription: i.productDescription,
                productPrice: i.productPrice,
                productQuantity: i.productQuantity,
                createdAt:
                  i.createdAt !== null && typeof i.createdAt === "string"
                    ? new Date(
                        parseInt(i.createdAt.slice(0, 4)),
                        parseInt(i.createdAt.slice(5, 7)) - 1,
                        parseInt(i.createdAt.slice(8, 10))
                      )
                    : null,
                waranty: i.waranty,
                color: i.color,
                productPrincipalImageId: i.productPrincipalImageId,
                brandId: i.brandId,
                subCategoryId: i.subCategoryId,
                productDiscountId: i.productDiscountId,
              },
            ]);
          }
        }
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);
  return (
    <div className="my-5">
      <div className="flex justify-between items-center">
        <h1 className="uppercase font-raleway text-xl font-normal">
          {subCategory.SubCategoryTitle}
        </h1>
        <Button
          size="small"
          color="primary"
          className="normal-case font-kanit font-light"
          endIcon={<BsPlus />}
          onClick={() =>
            navigate("/sub-category/" + subCategory.SubCategoryName)
          }
        >
          Voir plus
        </Button>
      </div>
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
        {!isLoading
          ? products.map((p) => {
              return (
                <SwiperSlide key={p.productId} className="drop-shadow-sm my-5">
                  <ProductCard product={p} />
                </SwiperSlide>
              );
            })
          : [0, 1].map((i) => {
              return (
                <SwiperSlide key={i} className="drop-shadow-sm my-5">
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    className="w-full h-full"
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
        {!isLoading
          ? products.map((p) => {
              return (
                <SwiperSlide key={p.productId} className="drop-shadow-sm my-5">
                  <ProductCard product={p} />
                </SwiperSlide>
              );
            })
          : [0, 1, 2, 3].map((index) => {
              return (
                <SwiperSlide key={index} className="drop-shadow-sm my-5">
                  <Skeleton
                    variant="rectangular"
                    animation="pulse"
                    className="w-full h-full"
                  />
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
};

export default SubCategorySection;
