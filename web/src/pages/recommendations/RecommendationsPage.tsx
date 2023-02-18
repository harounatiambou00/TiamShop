import React from "react";
import BestSellersAndDiscountAndRecommendationsPagesSkeleton from "../../components/best-sellers-and-discounts-and-recommendation-pages-skeleton/BestSellersAndDiscountAndRecommendationsPagesSkeleton";

const RecommendationsPage = () => {
  return (
    <div className="w-full">
      <BestSellersAndDiscountAndRecommendationsPagesSkeleton
        title="Recommendations"
        subTitle="Tiamshop vous recommande une selection unique comme vous."
        type="best_sellers"
      />
    </div>
  );
};

export default RecommendationsPage;
