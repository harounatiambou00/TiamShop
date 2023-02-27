import { SearchValuesType } from "../data/SearchValuesType";
import { Brand } from "../data/models/Brand";
import { Category } from "../data/models/Category";

export default function useSearch() {
  const getUrl: (values: SearchValuesType) => string = (
    values: SearchValuesType
  ) => {
    let url = "/search?criteria=" + values.criteria;
    url += "&sort=" + values.sortBy;
    if (values.category) url += "&category=" + values.category;
    if (values.brandId !== null) url += "&brandId=" + values.brandId;
    if (values.minPrice !== null) url += "&minPrice=" + values.minPrice;
    if (values.maxPrice !== null) url += "&maxPrice=" + values.maxPrice;
    if (values.discount) url += "&discount=" + values.discount;
    url += "&rating=" + values.rating;
    return url;
  };

  const setValuesFormSearchParams = (
    values: SearchValuesType,
    setValues: React.Dispatch<React.SetStateAction<SearchValuesType>>,
    searchParams: URLSearchParams,
    categories: Category[],
    brands: Brand[]
  ) => {
    let criteria = searchParams.get("criteria");
    setValues((v) => ({
      ...v,
      criteria: criteria !== null ? criteria : "",
    }));

    setValues((v) => {
      let sortBy = searchParams.get("sort");
      if (
        sortBy !== null &&
        (sortBy === "correspondance" ||
          sortBy === "asc_prices" ||
          sortBy === "desc_prices" ||
          sortBy === "asc_ratings" ||
          sortBy === "desc_ratings" ||
          sortBy === "asc_sales" ||
          sortBy === "desc_sales")
      )
        return {
          ...v,
          sortBy: sortBy,
        };
      else
        return {
          ...v,
          sortBy: "correspondance",
        };
    });

    let categoryName = searchParams.get("category");
    let category: Category | undefined = undefined;
    if (categoryName)
      category = categories.find((c) => c.CategoryName === categoryName);
    setValues((v) => ({
      ...v,
      category: category !== undefined ? category.CategoryName : "all",
    }));

    let brandId = searchParams.get("brandId");
    let brand: Brand | undefined = undefined;
    if (!isNaN(Number(brandId)))
      brand = brands.find((b) => b.brandId === Number(brandId));
    setValues((v) => ({
      ...v,
      brandId: brand !== undefined ? brand.brandId : null,
    }));

    setValues((v) => {
      let minPriceString = searchParams.get("minPrice");
      let maxPriceString = searchParams.get("maxPrice");
      let minPrice: number = NaN;
      let maxPrice: number = NaN;
      if (minPriceString !== null) minPrice = Number(minPriceString);
      if (maxPriceString !== null) maxPrice = Number(maxPriceString);

      if (isNaN(minPrice) && isNaN(maxPrice)) {
        return {
          ...v,
          minPrice: null,
          maxPrice: null,
        };
      } else if (!isNaN(minPrice) && isNaN(maxPrice)) {
        return {
          ...v,
          minPrice: minPrice,
          maxPrice: null,
        };
      } else if (isNaN(minPrice) && !isNaN(maxPrice)) {
        return {
          ...v,
          minPrice: null,
          maxPrice: maxPrice,
        };
      } else {
        if (minPrice > maxPrice) {
          return {
            ...v,
            minPrice: null,
            maxPrice: null,
          };
        } else {
          return {
            ...v,
            minPrice: minPrice,
            maxPrice: maxPrice,
          };
        }
      }
    });

    setValues((v) => {
      let discount = searchParams.get("discount");
      if (
        discount === "all_discounts_and_only_with_discount" ||
        discount === "less_than_20_percent" ||
        discount === "at_least_20_percent" ||
        discount === "at_least_30_percent" ||
        discount === "at_least_40_percent" ||
        discount === "at_least_50_percent" ||
        discount === "at_least_60_percent" ||
        discount === "at_least_70_percent"
      )
        return {
          ...v,
          discount: discount,
        };
      else
        return {
          ...v,
          discount: null,
        };
    });

    setValues((v) => {
      let rating = searchParams.get("rating");
      if (
        rating === "all" ||
        rating === "one_star" ||
        rating === "two_stars" ||
        rating === "three_stars" ||
        rating === "four_stars" ||
        rating === "five_stars"
      )
        return {
          ...v,
          rating: rating,
        };
      else
        return {
          ...v,
          rating: "all",
        };
    });
  };

  return [getUrl, setValuesFormSearchParams] as const;
}
