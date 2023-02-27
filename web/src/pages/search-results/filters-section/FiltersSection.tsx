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
            <div key={index} className="pl-2">
              <UnderlinedLink text={c.CategoryTitle + " (50)"} />
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
                Minimum
              </label>
              <OutlinedInput
                fullWidth
                sx={{
                  height: {
                    sm: 75,
                    lg: 40,
                  },
                }}
                className="sm:mt-3 lg:mt-0"
                size="small"
              />
            </div>
            <div className="w-1/2 sm:pl-5 lg:pl-1">
              <label className="sm:text-3xl lg:text-sm font-normal">
                Maximum
              </label>
              <OutlinedInput
                fullWidth
                sx={{
                  height: {
                    sm: 75,
                    lg: 40,
                  },
                }}
                className="sm:mt-3 lg:mt-0"
                size="small"
              />
            </div>
          </div>
          <Button
            fullWidth
            variant="outlined"
            className="mt-4 font-raleway font-medium sm:h-20 lg:h-auto sm:text-3xl lg:text-base"
            color="secondary"
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
                key={index}
                control={
                  <Radio
                    icon={<BiCheckbox className="sm:text-5xl lg:text-2xl" />}
                    checkedIcon={
                      <BiCheckboxSquare className="sm:text-5xl lg:text-2xl" />
                    }
                    checked
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
                control={
                  <Checkbox
                    size="small"
                    icon={<BiCheckbox className="sm:text-5xl lg:text-2xl" />}
                    checkedIcon={
                      <BiCheckboxSquare className="sm:text-5xl lg:text-2xl" />
                    }
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
          Notes de la clientèle
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col">
            {ratings.map((rating) => (
              <Button key={rating.value} className="my-1 px-1 w-fit">
                <Rating
                  value={rating.value}
                  readOnly
                  className="sm:text-5xl lg:text-xl"
                />{" "}
                <span className="font-raleway ml-2 sm:text-3xl lg:text-base">
                  (30)
                </span>
              </Button>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FiltersSection;
