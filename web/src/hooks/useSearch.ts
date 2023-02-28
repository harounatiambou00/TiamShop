import { SearchValuesType } from "../data/SearchValuesType";
import { Brand } from "../data/models/Brand";
import { Category } from "../data/models/Category";
import ProductAndRelatedInfo from "../data/models/ProductAndRelatedInfo";

export default function useSearch() {
  const getUrl: (values: SearchValuesType) => string = (
    values: SearchValuesType
  ) => {
    let url = "/search?criteria=" + values.criteria;
    url += "&sort=" + values.sortBy;
    if (values.onlyAvailableProducts) url += "&onlyAvailableProducts=true";
    if (values.category !== null) url += "&category=" + values.category;
    if (values.brandId !== null) url += "&brandId=" + values.brandId;
    if (values.minPrice !== null) url += "&minPrice=" + values.minPrice;
    if (values.maxPrice !== null) url += "&maxPrice=" + values.maxPrice;
    if (values.discount !== null) url += "&discount=" + values.discount;
    url += "&rating=" + values.rating;
    return url;
  };

  const setValuesFormSearchParams = (
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

    let onlyAvailableProducts = searchParams.get("onlyAvailableProducts");
    setValues((v) => ({
      ...v,
      onlyAvailableProducts:
        onlyAvailableProducts === null || onlyAvailableProducts === "false"
          ? false
          : true,
    }));

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

  const getMatchedProducts = async (
    values: SearchValuesType,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setProducts: React.Dispatch<React.SetStateAction<ProductAndRelatedInfo[]>>
  ) => {
    setIsLoading(true);
    let url = process.env.REACT_APP_API_URL + "products/search-product";
    let request = {
      criteria: values.criteria.trim(),
      sortBy: values.sortBy,
      rating: values.rating,
    } as {
      criteria: string;
      onlyAvailableProducts?: boolean;
      sortBy?: string;
      category?: string;
      rating?: string;
      brandId?: number;
      minPrice?: number;
      maxPrice?: number;
      discount?: string;
    };

    if (values.onlyAvailableProducts !== false)
      request.onlyAvailableProducts = true;
    if (values.category !== null) request.category = values.category;
    if (values.minPrice !== null) request.minPrice = values.minPrice;
    if (values.maxPrice !== null) request.maxPrice = values.maxPrice;
    if (values.brandId !== null) request.brandId = values.brandId;
    if (values.discount !== null) request.discount = values.discount;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    let content = await response.json();
    if (content.success) {
      setProducts(content.data as ProductAndRelatedInfo[]);
    } else {
      setProducts([] as ProductAndRelatedInfo[]);
    }
    setIsLoading(false);
  };

  return [getUrl, setValuesFormSearchParams, getMatchedProducts] as const;
}
