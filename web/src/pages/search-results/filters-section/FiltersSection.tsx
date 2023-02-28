import React from "react";
import {
  SearchValuesDiscountType,
  SearchValuesRatingType,
  SearchValuesType,
} from "../../../data/SearchValuesType";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Rating,
} from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAppSelector } from "../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../redux/store";

import "./styles.css";
import UnderlinedLink from "../../../components/core/underlined-link/UnderlinedLink";
import { BsSearch } from "react-icons/bs";
import { Category } from "../../../data/models/Category";
import { Brand } from "../../../data/models/Brand";
import { BiCheckbox, BiCheckboxSquare } from "react-icons/bi";
import { HiOutlineFilter } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useSearch from "../../../hooks/useSearch";

type Props = {
  values: SearchValuesType;
  setValues: React.Dispatch<React.SetStateAction<SearchValuesType>>;
};

type DiscountType = {
  name: SearchValuesDiscountType;
  title: string;
};
const discounts = [
  {
    name: "less_than_20_percent",
    title: "Moins de 20% de réduction",
  },
  {
    name: "at_least_20_percent",
    title: "20% de réduction ou plus",
  },
  {
    name: "at_least_30_percent",
    title: "30% de réduction ou plus",
  },
  {
    name: "at_least_40_percent",
    title: "40% de réduction ou plus",
  },
  {
    name: "at_least_50_percent",
    title: "50% de réduction ou plus",
  },

  {
    name: "at_least_60_percent",
    title: "60% de réduction ou plus",
  },

  {
    name: "at_least_70_percent",
    title: "70% de réduction ou plus",
  },
  {
    name: "all_discounts_and_only_with_discount",
    title: "Toutes les reductions",
  },
] as DiscountType[];

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

const FiltersSection = ({ values, setValues }: Props) => {
  const categories = useAppSelector(
    (state: RootState) => state.categories.categories
  ) as Category[];
  const allBrands = useAppSelector(
    (state: RootState) => state.allBrands.brands
  ) as Brand[];
  const [brandsToBeDisplayed, setBrandsToBeDisplayed] =
    React.useState<Brand[]>(allBrands);
  React.useEffect(() => {
    setBrandsToBeDisplayed(allBrands);
  }, [allBrands]);
  const navigate = useNavigate();
  const [getUrl] = useSearch();
  return (
    <div className=" drop-shadow-sm sm:border-0 lg:border-r py-2  border-gray-300 h-fit">
      <div className="text-2xl sm:hidden lg:block mb-3 font-normal text-primary">
        <HiOutlineFilter className="inline text-primary" /> FILTRES
      </div>
      <Accordion
        elevation={0}
        className="bg-transparent"
        disableGutters
        defaultExpanded
      >
        <AccordionSummary
          className="font-semibold font-raleway sm:text-4xl lg:text-base rounded-t-md uppercase text-primary"
          expandIcon={
            <MdKeyboardArrowDown className="sm:text-4xl lg:text-lg text-primary" />
          }
        >
          Choisir un rayon
        </AccordionSummary>
        <AccordionDetails className="">
          {categories.map((c, index) => (
            <div
              key={index}
              className={
                values.category === c.CategoryName
                  ? "pl-2 border border-primary my-1"
                  : "pl-2"
              }
            >
              <UnderlinedLink
                text={c.CategoryTitle}
                action={() =>
                  navigate(getUrl({ ...values, category: c.CategoryName }))
                }
              />
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={0} className="bg-transparent" disableGutters>
        <AccordionSummary
          className="font-semibold font-raleway sm:text-4xl lg:text-base uppercase text-primary"
          expandIcon={
            <MdKeyboardArrowDown className="sm:text-4xl lg:text-lg text-primary" />
          }
        >
          Prix
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex items-center w-full">
            <div className="w-1/2 sm:pr-5 lg:pr-1">
              <label className="sm:text-3xl lg:text-sm font-normal">
                Minimum (FCFA)
              </label>
              <OutlinedInput
                fullWidth
                sx={{
                  height: {
                    sm: 75,
                    lg: 40,
                  },
                }}
                className="sm:mt-3 lg:mt-0 font-kanit font-light sm:text-3xl lg:text-base"
                size="small"
                type="number"
                value={values.minPrice ? values.minPrice : ""}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value === "") {
                    setValues({ ...values, minPrice: null });
                  } else {
                    if (value.startsWith("0")) return;
                    if (isNaN(Number(value))) return;
                    if (isNaN(Number(value)) && Number(value) < 0) return;
                    else {
                      setValues({ ...values, minPrice: Number(value) });
                    }
                  }
                }}
                error={
                  values.minPrice !== null &&
                  values.maxPrice !== null &&
                  values.minPrice > values.maxPrice
                }
              />
            </div>
            <div className="w-1/2 sm:pl-5 lg:pl-1">
              <label className="sm:text-3xl lg:text-sm font-normal">
                Maximum (FCFA)
              </label>
              <OutlinedInput
                fullWidth
                sx={{
                  height: {
                    sm: 75,
                    lg: 40,
                  },
                }}
                className="sm:mt-3 lg:mt-0 font-kanit font-light sm:text-3xl lg:text-base"
                size="small"
                value={values.maxPrice ? values.maxPrice : ""}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value === "") {
                    setValues({ ...values, maxPrice: null });
                  } else {
                    if (value.startsWith("0")) return;
                    if (isNaN(Number(value))) return;
                    if (isNaN(Number(value)) && Number(value) < 0) return;
                    else {
                      setValues({ ...values, maxPrice: Number(value) });
                    }
                  }
                }}
                error={
                  values.minPrice !== null &&
                  values.maxPrice !== null &&
                  values.minPrice > values.maxPrice
                }
              />
            </div>
          </div>
          <span className="sm:text-xl lg:text-xs mt-2 text-red-600 text-center">
            {values.minPrice !== null &&
              values.maxPrice !== null &&
              values.minPrice > values.maxPrice &&
              "Le minmum doit impérativement etre inférieur au maximum."}
          </span>
          <Button
            fullWidth
            variant="outlined"
            className="mt-4 font-raleway font-medium sm:h-20 lg:h-auto sm:text-3xl lg:text-base"
            color="secondary"
            onClick={() => {
              if (
                values.minPrice !== null &&
                values.maxPrice !== null &&
                values.minPrice > values.maxPrice
              )
                return;
              else navigate(getUrl(values));
            }}
            disabled={
              (values.minPrice !== null &&
                values.maxPrice !== null &&
                values.minPrice > values.maxPrice) ||
              (values.minPrice === null && values.maxPrice === null)
            }
          >
            Appliquer la fourchette de prix
          </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={0} className="bg-transparent" disableGutters>
        <AccordionSummary
          className="font-semibold font-raleway sm:text-4xl lg:text-base uppercase text-primary"
          expandIcon={
            <MdKeyboardArrowDown className="sm:text-4xl lg:text-lg text-primary" />
          }
        >
          Réduction
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup className="pl-3">
            {discounts.map((d, index) => (
              <FormControlLabel
                onClick={() => {
                  if (d.name !== values.discount)
                    navigate(getUrl({ ...values, discount: d.name }));
                  else navigate(getUrl({ ...values, discount: null }));
                }}
                key={index}
                control={
                  <Radio
                    icon={<BiCheckbox className="sm:text-5xl lg:text-2xl" />}
                    checkedIcon={
                      <BiCheckboxSquare className="sm:text-5xl lg:text-2xl" />
                    }
                    checked={values.discount === d.name}
                  />
                }
                label={
                  <span className="font-raleway font-medium sm:text-3xl lg:text-base text-gray-700">
                    {d.title}
                  </span>
                }
              />
            ))}
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={0} className="bg-transparent" disableGutters>
        <AccordionSummary
          className="font-semibold font-raleway sm:text-4xl lg:text-base uppercase text-primary"
          expandIcon={
            <MdKeyboardArrowDown className="sm:text-4xl lg:text-lg text-primary" />
          }
        >
          Marque
        </AccordionSummary>
        <AccordionDetails>
          <OutlinedInput
            fullWidth
            sx={{
              height: {
                sm: 75,
                lg: 40,
              },
            }}
            endAdornment={<BsSearch className="sm:text-3xl lg:text-base" />}
            className="font-kanit font-light sm:pl-5 lg:pl-0 sm:text-3xl lg:text-base"
            onChange={(e) => {
              let value = e.target.value;
              if (value === "") setBrandsToBeDisplayed(allBrands);
              else
                setBrandsToBeDisplayed(
                  allBrands.filter((b) =>
                    b.BrandName.toLowerCase().includes(value.toLowerCase())
                  )
                );
            }}
          />
          <div className="sm:mt-10 lg:mt-4">
            {brandsToBeDisplayed.map((b, index) => (
              <FormControlLabel
                key={index}
                onClick={() => {
                  if (values.brandId === b.brandId)
                    navigate(getUrl({ ...values, brandId: null }));
                  else navigate(getUrl({ ...values, brandId: b.brandId }));
                }}
                control={
                  <Checkbox
                    size="small"
                    icon={<BiCheckbox className="sm:text-5xl lg:text-2xl" />}
                    checkedIcon={
                      <BiCheckboxSquare className="sm:text-5xl lg:text-2xl" />
                    }
                    checked={values.brandId === b.brandId}
                  />
                }
                label={
                  <span className="font-raleway sm:text-3xl lg:text-sm">
                    {b.BrandName}
                  </span>
                }
                className="sm:mx-5 lg:mx-1 sm:my-2 lg:my-0 sm:px-5 lg:px-1 hover:bg-orange-100 rounded-lg"
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={0} className="bg-transparent" disableGutters>
        <AccordionSummary
          className="font-semibold font-raleway sm:text-4xl lg:text-base rounded-b-md uppercase text-primary"
          expandIcon={
            <MdKeyboardArrowDown className="sm:text-4xl lg:text-lg text-primary" />
          }
        >
          Note minimale
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col">
            {ratings.map((rating) => (
              <Button
                key={rating.value}
                className={
                  values.rating === rating.name
                    ? "my-1 px-1 w-fit border"
                    : "my-1 px-1 w-fit"
                }
                variant={values.rating === rating.name ? "outlined" : "text"}
                disableRipple={values.rating === rating.name}
                onClick={() =>
                  navigate(getUrl({ ...values, rating: rating.name }))
                }
              >
                <Rating
                  value={rating.value}
                  readOnly
                  className="sm:text-5xl lg:text-xl"
                />{" "}
              </Button>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FiltersSection;
