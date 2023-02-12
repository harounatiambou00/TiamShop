import React from "react";
import BillboardSection from "./billboard-section/BillboardSection";
import CategoriesSection from "./categories-section/CategoriesSection";
import PartnersSection from "./partners_section/PartnersSection";
import BrandsSection from "./brands_section/BrandsSection";
import BestSellersSection from "./best_sellers_section/BestSellersSection";
import OnDiscountSection from "./on-discounts-section/OnDiscountSection";
import AboutTiamtechSection from "./about-tiamtech-section/AboutTiamtechSection";
import OurStrenghsSection from "./our_strenghs_section/OurStrenghsSection";
import RecommendationSection from "./recommendation-section/RecommendationSection";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen pb-10">
      <BillboardSection />
      <div className="px-10 mt-10">
        <CategoriesSection />
        <RecommendationSection />
        <BestSellersSection />
        <BrandsSection />
        <OnDiscountSection />
        <PartnersSection />
      </div>
      <div className="w-full mt-10 flex items-center justify-center">
        <AboutTiamtechSection />
      </div>
      <OurStrenghsSection />
    </div>
  );
};

export default HomePage;
