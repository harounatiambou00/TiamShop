export type SearchValuesDiscountType =
  | "all_discounts_and_only_with_discount"
  | "less_than_20_percent"
  | "at_least_20_percent"
  | "at_least_30_percent"
  | "at_least_40_percent"
  | "at_least_50_percent"
  | "at_least_60_percent"
  | "at_least_70_percent"
  | null;

export type SearchValuesRatingType =
  | "all"
  | "one_star"
  | "two_stars"
  | "three_stars"
  | "four_stars"
  | "five_stars";

export type SearchValuesSortByType =
  | "correspondance"
  | "asc_prices"
  | "desc_prices"
  | "asc_ratings"
  | "desc_ratings"
  | "asc_sales"
  | "desc_sales";

export type SearchValuesType = {
  criteria: string;
  onlyAvailableProducts: boolean;
  minPrice: number | null;
  maxPrice: number | null;
  category: string | null;
  brandId: number | null;
  discount: SearchValuesDiscountType;
  rating: SearchValuesRatingType;
  sortBy: SearchValuesSortByType;
};
