import React from "react";
import BillboardSection from "./billboard-section/BillboardSection";
import CategoriesSection from "./categories-section/CategoriesSection";
import AboutTiamtechSection from "./about-tiamtech-section/AboutTiamtechSection";
import OurStrenghsSection from "./our_strenghs_section/OurStrenghsSection";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen pb-10">
      <BillboardSection />
      <div className="px-10 mt-10">
        <CategoriesSection />
        {/*
        <RecommendationSection />
        <BestSellersSection />
        <BrandsSection />
        <OnDiscountSection />
        <PartnersSection />
        <NewProductsSection />*/}
      </div>
      <OurStrenghsSection />
      <div className="w-full mt-10 flex items-center justify-center">
        <AboutTiamtechSection />
      </div>
    </div>
  );
};

export default HomePage;
