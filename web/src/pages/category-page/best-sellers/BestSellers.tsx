import React from "react";
import { Product } from "../../../data/models/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "../../../components/core";
import { Skeleton } from "@mui/material";
import { Navigation, Pagination } from "swiper";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";

type Props = {
  categoryId: number;
};

const BestSellers = ({ categoryId }: Props) => {
  const [allBestSellers, setAllBestSellers] = React.useState<Product[]>([]);
  const [productsToBeDisplayed, setProductsToBeDisplayed] = React.useState<
    Product[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const getAllBestSellers = async () => {
      setIsLoading(true);
      let url =
        process.env.REACT_APP_API_URL + "products/get-best-sellers-products";
      let response = await fetch(url);
      let content = await response.json();
      if (content.success) {
        setAllBestSellers([]);
        for (let i of content.data) {
          setAllBestSellers((current) => [
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
    };
    getAllBestSellers();
  }, []);
  let subCategories = useAppSelector(
    (state: RootState) => state.subCategories.subCategories
  );
  React.useEffect(() => {
    let products: Product[] = [];
    for (let i of allBestSellers) {
      let subCategory = subCategories.find(
        (s) => s.SubCategoryId === i.subCategoryId
      );
      if (subCategory !== undefined && subCategory.CategoryId === categoryId)
        products.push(i);
    }
    setProductsToBeDisplayed(products);
  }, [allBestSellers, categoryId, subCategories]);

  return (
    <div className="my-5 p-5">
      <div className="flex justify-between items-center">
        <h1 className="uppercase font-raleway text-xl font-normal">
          Tendances
        </h1>
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
          ? productsToBeDisplayed.map((p) => {
              return (
                <SwiperSlide key={p.productId} className="drop-shadow-sm my-5">
                  <ProductCard product={p} />
                </SwiperSlide>
              );
            })
          : [0, 1].map((index) => {
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
          ? productsToBeDisplayed.map((p) => {
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

export default BestSellers;
