import React from "react";
import { Product } from "../../../data/models/Product";
import { MenuItem, OutlinedInput, Rating, Select } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import {
  SearchValuesRatingType,
  SearchValuesSortByType,
  SearchValuesType,
} from "../../../data/SearchValuesType";
import useSearch from "../../../hooks/useSearch";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";

type Props = {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getAllProducts: () => void;
};

type SortByType = {
  name: SearchValuesSortByType;
  title: string;
};

const sortByValues = [
  {
    name: "correspondance",
    title: "Pertinence",
  },
  {
    name: "asc_prices",
    title: "Prix croissants",
  },
  {
    name: "desc_prices",
    title: "Prix décroissants",
  },
  {
    name: "asc_ratings",
    title: "Notes croissantes",
  },
  {
    name: "desc_ratings",
    title: "Notes décroissantes",
  },
  {
    name: "asc_sales",
    title: "Les moins vendus",
  },
  {
    name: "desc_sales",
    title: "Les moins plus vendus",
  },
] as SortByType[];

type RatingType = {
  name: SearchValuesRatingType;
  value: 0 | 1 | 2 | 3 | 4 | 5;
};

const ratings = [
  {
    name: "five_stars",
    value: 5,
  },
  {
    name: "four_stars",
    value: 4,
  },
  {
    name: "three_stars",
    value: 3,
  },
  {
    name: "two_stars",
    value: 2,
  },
  {
    name: "one_star",
    value: 1,
  },
  {
    name: "all",
    value: 0,
  },
] as RatingType[];

type PriceRangeType =
  | "Tous les prix"
  | "0-1000"
  | "1000-10000"
  | "10000-100000"
  | "100000-1000000"
  | ">1000000";

const SearchAndFilterSection = ({
  setProducts,
  setIsLoading,
  getAllProducts,
}: Props) => {
  let categories = useAppSelector(
    (state: RootState) => state.categories.categories
  );
  let brands = useAppSelector((state: RootState) => state.allBrands.brands);

  const [getUrl, setValuesFromSearchParams, getMatchedProducts] = useSearch();
  const [values, setValues] = React.useState<SearchValuesType>({
    criteria: "",
    onlyAvailableProducts: false,
    minPrice: null,
    maxPrice: null,
    category: null,
    brandId: null,
    discount: null,
    rating: "all",
    sortBy: "correspondance",
  });
  const [matchedProducts, setMatchedProducts] = React.useState<
    ProductAndRelatedInfo[]
  >([]);
  React.useEffect(() => {
    getMatchedProducts(values, setIsLoading, setMatchedProducts);
  }, [values]);

  //Converting matchedProducts to Product[]
  React.useEffect(() => {
    let newProducts = [] as Product[];
    for (let i = 0; i < matchedProducts.length; i++) {
      newProducts.push({
        productId: matchedProducts[i].productId,
        productReference: matchedProducts[i].productReference,
        productName: matchedProducts[i].productName,
        productDescription: matchedProducts[i].productDescription,
        productPrice: matchedProducts[i].productPrice,
        productQuantity: matchedProducts[i].productQuantity,
        createdAt: null,
        waranty: matchedProducts[i].waranty,
        color: matchedProducts[i].color,
        productPrincipalImageId: matchedProducts[i].productPrincipalImageId,
        brandId: matchedProducts[i].brandId,
        subCategoryId: matchedProducts[i].subCategoryId,
        productDiscountId: matchedProducts[i].productDiscountId,
      });
    }

    setProducts(newProducts);
  }, [matchedProducts]);

  const [priceRange, setPriceRange] =
    React.useState<PriceRangeType>("Tous les prix");

  return (
    <div className="flex flex-col items-center justify-between mt-5">
      <div className="w-9/12">
        <OutlinedInput
          size="small"
          value={values.criteria}
          onChange={(e) =>
            setValues((current) => ({
              ...current,
              criteria: e.target.value,
            }))
          }
          className="w-full font-kanit font-light placeholder:font-kanit bg-white"
          placeholder="Recherchez un produit"
          startAdornment={<BsSearch className="text-xl text-gray-600 mr-5" />}
        />
      </div>
      <div className="flex items-center w-10/12 mt-5">
        <div className="mr-2 w-1/5">
          <label htmlFor="" className="font-kanit font-normal text-gray-600">
            Catégorie
          </label>
          <Select
            value={values.category ? values.category : "all"}
            onChange={(e) => {
              let value = e.target.value;
              if (
                categories.find((c) => c.CategoryName === value) !== undefined
              )
                setValues((current) => ({
                  ...current,
                  category: value,
                }));
              else {
                setValues((current) => ({
                  ...current,
                  category: null,
                }));
              }
            }}
            MenuProps={{
              sx: {
                maxHeight: 400,
              },
            }}
            size="small"
            className="font-kanit w-full font-normal text-sm placeholder:font-kanit bg-white"
          >
            <MenuItem value="all" className="font-kanit font-normal text-sm">
              Toutes les catégories
            </MenuItem>
            {categories.map((c, index) => (
              <MenuItem
                value={c.CategoryName}
                key={index}
                className="font-kanit font-normal text-sm"
              >
                {c.CategoryTitle}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="mr-2 w-1/5">
          <label htmlFor="" className="font-kanit font-normal text-gray-600">
            Marque
          </label>
          <Select
            MenuProps={{
              sx: {
                maxHeight: 400,
              },
            }}
            value={values.brandId !== null ? values.brandId : 0}
            onChange={(e) => {
              let value = e.target.value;
              let numberValue = Number(value);
              if (
                value === "" ||
                numberValue === 0 ||
                isNaN(numberValue) ||
                brands.find((b) => b.brandId === numberValue) === undefined
              ) {
                setValues((current) => ({
                  ...current,
                  brandId: null,
                }));
              } else {
                setValues((current) => ({
                  ...current,
                  brandId: numberValue,
                }));
              }
            }}
            size="small"
            className="font-kanit w-full font-normal text-sm placeholder:font-kanit bg-white"
          >
            <MenuItem
              value={0}
              className="font-kanit text-sm font-normal bg-white"
            >
              Toutes les marques
            </MenuItem>
            {brands.map((brand) => (
              <MenuItem
                value={brand.brandId}
                className="font-kanit font-normal text-sm"
                key={brand.brandId}
              >
                {brand.BrandName}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="mr-2 w-1/5">
          <label htmlFor="" className="font-kanit font-normal text-gray-600">
            Prix
          </label>
          <Select
            MenuProps={{
              sx: {
                maxHeight: 400,
              },
            }}
            size="small"
            className="font-kanit w-full font-normal text-sm placeholder:font-kanit bg-white"
            value={priceRange}
            onChange={(e) => {
              let value = e.target.value as PriceRangeType;
              setPriceRange(value);
              if (value === "Tous les prix") {
                setValues((current) => ({
                  ...current,
                  minPrice: null,
                  maxPrice: null,
                }));
              } else if (value === "0-1000") {
                setValues((current) => ({
                  ...current,
                  minPrice: 0,
                  maxPrice: 1000,
                }));
              } else if (value === "1000-10000") {
                setValues((current) => ({
                  ...current,
                  minPrice: 1000,
                  maxPrice: 10000,
                }));
              } else if (value === "10000-100000") {
                setValues((current) => ({
                  ...current,
                  minPrice: 100000,
                  maxPrice: 100000,
                }));
              } else if (value === "100000-1000000") {
                setValues((current) => ({
                  ...current,
                  minPrice: 100000,
                  maxPrice: 1000000,
                }));
              } else if (value === ">1000000") {
                setValues((current) => ({
                  ...current,
                  minPrice: 1000000,
                  maxPrice: null,
                }));
              }
            }}
          >
            <MenuItem
              value="Tous les prix"
              className="font-kanit font-normal text-sm "
            >
              Tout les prix
            </MenuItem>
            <MenuItem
              value="0-1000"
              className="font-kanit font-normal text-sm "
            >
              Moins de 1000 FCFA
            </MenuItem>
            <MenuItem
              value="1000-10000"
              className="font-kanit font-normal text-sm "
            >
              1000-10000 FCFA
            </MenuItem>
            <MenuItem
              value="10000-100000"
              className="font-kanit font-normal text-sm "
            >
              10000-100000 FCFA
            </MenuItem>
            <MenuItem
              value="100000-1000000"
              className="font-kanit font-normal text-sm "
            >
              100000-1000000 FCFA
            </MenuItem>
            <MenuItem
              value=">1000000"
              className="font-kanit font-normal text-sm "
            >
              Plus de 1000000 FCFA
            </MenuItem>
          </Select>
        </div>
        <div className="mr-2 w-1/5">
          <label htmlFor="" className="font-kanit font-normal text-gray-600">
            Note
          </label>
          <Select
            MenuProps={{
              sx: {
                maxHeight: 400,
              },
            }}
            value={values.rating}
            onChange={(e) => {
              try {
                let value = e.target.value as SearchValuesRatingType;

                setValues((current) => ({
                  ...current,
                  rating: value,
                }));
              } catch (error) {
                setValues((current) => ({
                  ...current,
                  rating: "all",
                }));
              }
            }}
            size="small"
            className="font-kanit w-full align-middle font-normal text-sm placeholder:font-kanit bg-white"
          >
            {ratings.map((r) => (
              <MenuItem
                key={r.name}
                value={r.name}
                className="font-kanit text-sm"
              >
                <Rating value={r.value} readOnly size="small" />
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="mr-2 w-1/5">
          <label htmlFor="" className="font-kanit font-normal text-gray-600">
            Trier par
          </label>
          <Select
            MenuProps={{
              sx: {
                maxHeight: 400,
              },
            }}
            value={values.sortBy}
            onChange={(e) => {
              try {
                let value = e.target.value as SearchValuesSortByType;

                setValues((current) => ({
                  ...current,
                  sortBy: value,
                }));
              } catch (error) {
                setValues((current) => ({
                  ...current,
                  sortBy: "correspondance",
                }));
              }
            }}
            size="small"
            className="font-kanit w-full font-normal text-sm placeholder:font-kanit bg-white"
          >
            {sortByValues.map((s) => (
              <MenuItem
                key={s.name}
                value={s.name}
                className="font-kanit text-sm font-normal"
              >
                {s.title}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterSection;
