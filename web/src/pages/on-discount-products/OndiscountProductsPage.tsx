import BestSellersAndDiscountAndRecommendationsPagesSkeleton from "../../components/best-sellers-and-discounts-and-recommendation-pages-skeleton/BestSellersAndDiscountAndRecommendationsPagesSkeleton";

const OndiscountProductsPage = () => {
  return (
    <div className="w-full">
      <BestSellersAndDiscountAndRecommendationsPagesSkeleton
        title="Soldes"
        type="on_discount_products"
      />
    </div>
  );
};

export default OndiscountProductsPage;
