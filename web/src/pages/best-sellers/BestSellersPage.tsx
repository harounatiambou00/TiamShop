import BestSellersAndDiscountAndRecommendationsPagesSkeleton from "../../components/best-sellers-and-discounts-and-recommendation-pages-skeleton/BestSellersAndDiscountAndRecommendationsPagesSkeleton";

const BestSellersPage = () => {
  return (
    <div className="w-full">
      <BestSellersAndDiscountAndRecommendationsPagesSkeleton
        title="Nos Meilleures ventes"
        type="best_sellers"
      />
    </div>
  );
};

export default BestSellersPage;
