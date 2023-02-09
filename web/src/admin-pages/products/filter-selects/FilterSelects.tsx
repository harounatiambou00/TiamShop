import { FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { Product } from "../../../data/models/Product";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";

type Props = {
  products: Product[];
  displayedProducts: Product[];
  setDisplayedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

type PriceRangeType =
  | "Tous les prix"
  | "0-1000"
  | "1000-10000"
  | "10000-100000"
  | "100000-1000000"
  | ">1000000";

type DateRangeType = "";

const FilterSelects = ({
  products,
  displayedProducts,
  setDisplayedProducts,
}: Props) => {
  let subCategories = useAppSelector(
    (state: RootState) => state.subCategories.subCategories
  );
  let brands = useAppSelector((state: RootState) => state.allBrands.brands);
  const [subCategoryId, setSubCategoryId] = React.useState<string | number>(0);
  const [brandId, setBrandId] = React.useState<string | number>(0);
  const [priceRange, setPriceRange] =
    React.useState<PriceRangeType>("Tous les prix");
  return (
    <div className="flex items-center justify-right">
      <FormControl className="mr-5">
        <Select
          size="small"
          className="font-kanit font-light placeholder:font-kanit text-gray-500"
          defaultValue={0}
          value={subCategoryId}
          onChange={(e) => {
            if (e.target.value === 0 || e.target.value === "0") {
              setSubCategoryId(0);
              setDisplayedProducts(products);
            } else {
              setSubCategoryId(e.target.value);
              setDisplayedProducts(
                displayedProducts.filter(
                  (p) => p.subCategoryId === e.target.value
                )
              );
            }
          }}
        >
          <MenuItem value={0} className="font-kanit font-light text-gray-400">
            Toutes les catégories
          </MenuItem>
          {subCategories.map((subCategory) => (
            <MenuItem
              value={subCategory.SubCategoryId}
              className="font-kanit font-light"
              key={subCategory.SubCategoryId}
            >
              {subCategory.SubCategoryTitle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="mr-5">
        <Select
          size="small"
          className="font-kanit font-light placeholder:font-kanit text-gray-500"
          defaultValue={0}
          value={brandId}
          onChange={(e) => {
            if (e.target.value === 0 || e.target.value === "0") {
              setBrandId(0);
              setDisplayedProducts(products);
            } else {
              setBrandId(e.target.value);
              setDisplayedProducts(
                displayedProducts.filter((p) => p.brandId === e.target.value)
              );
            }
          }}
        >
          <MenuItem value={0} className="font-kanit font-light text-gray-400">
            Toutes les marques
          </MenuItem>
          {brands.map((brand) => (
            <MenuItem
              value={brand.brandId}
              className="font-kanit font-light"
              key={brand.brandId}
            >
              {brand.BrandName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="mr-5">
        <Select
          size="small"
          className="font-kanit font-light placeholder:font-kanit text-gray-500"
          value={priceRange}
          defaultValue="Tous les prix"
          onChange={(e) => {
            let value = e.target.value as PriceRangeType;
            setPriceRange(value);
            if ((value = "Tous les prix")) setDisplayedProducts(products);
            else if (value === "0-1000")
              setDisplayedProducts(
                displayedProducts.filter(
                  (p) => p.productPrice > 0 && p.productPrice <= 1000
                )
              );
            else if (value === "1000-10000")
              setDisplayedProducts(
                displayedProducts.filter(
                  (p) => p.productPrice > 1000 && p.productPrice <= 10000
                )
              );
            else if (value === "10000-100000")
              setDisplayedProducts(
                displayedProducts.filter(
                  (p) => p.productPrice > 10000 && p.productPrice <= 100000
                )
              );
            else if (value === "100000-1000000")
              setDisplayedProducts(
                displayedProducts.filter(
                  (p) => p.productPrice > 100000 && p.productPrice <= 1000000
                )
              );
            else if (value === ">1000000")
              setDisplayedProducts(
                displayedProducts.filter((p) => p.productPrice > 1000000)
              );
          }}
        >
          <MenuItem value="Tous les prix" className="font-kanit font-light ">
            Tout les prix
          </MenuItem>
          <MenuItem value="0-1000" className="font-kanit font-light">
            0-1000 FCFA
          </MenuItem>
          <MenuItem value="1000-10000" className="font-kanit font-light">
            1000-10000 FCFA
          </MenuItem>
          <MenuItem value="10000-100000" className="font-kanit font-light">
            10000-100000 FCFA
          </MenuItem>
          <MenuItem value="100000-1000000" className="font-kanit font-light">
            100000-1000000 FCFA
          </MenuItem>
          <MenuItem value=">1000000" className="font-kanit font-light">
            {">"} 1000000 FCFA
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl className="mr-5">
        <Select
          size="small"
          className="font-kanit font-light placeholder:font-kanit text-gray-500"
          defaultValue={0}
        >
          <MenuItem value={0} className="">
            Toutes les dates
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterSelects;
