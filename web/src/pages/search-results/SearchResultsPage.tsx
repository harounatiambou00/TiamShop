import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import { Category } from "../../data/models/Category";
import { Brand } from "../../data/models/Brand";
import { SearchValuesType } from "../../data/SearchValuesType";
import useSearch from "../../hooks/useSearch";
import FiltersSection from "./filters-section/FiltersSection";
import {
  Button,
  FormControlLabel,
  Pagination,
  Select,
  Skeleton,
  Switch,
} from "@mui/material";
import DisplayProducsSection from "./display-products-section/DisplayProducsSection";
import { RiFilter2Line } from "react-icons/ri";
import SmallScreensFiltersSectionWrapper from "./small-screens-filters-section-wrapper/SmallScreensFiltersSectionWrapper";

const SearchResultsPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const [getUrl, setValuesFromSearchParams] = useSearch();
  let categories = useAppSelector(
    (state: RootState) => state.categories.categories
  ) as Category[];
  let brands = useAppSelector(
    (state: RootState) => state.allBrands.brands
  ) as Brand[];
  const [searchParams, setSearchParams] = useSearchParams();
  let criteria = searchParams.get("criteria");
  const [values, setValues] = React.useState<SearchValuesType>({
    criteria: criteria !== null ? criteria : "",
    minPrice: null,
    maxPrice: null,
    category: null,
    brandId: null,
    discount: null,
    rating: "all",
    sortBy: "correspondance",
  });

  React.useEffect(() => {
    setValuesFromSearchParams(
      values,
      setValues,
      searchParams,
      categories,
      brands
    );
  }, [searchParams]);
  const [openSmallScreensFiltersDialog, setOpenSmallScreensFiltersDialog] =
    React.useState<boolean>(false);
  return (
    <div className="sm:py-16 lg:py-5 sm:px-5 lg:px-10">
      <h1 className="font-raleway sm:text-3xl lg:text-xl font-medium">
        Resultats de la recherche : {values.criteria}
      </h1>
      <div className="mt-5 grid grid-cols-12 gap-4">
        <div className="sm:hidden lg:block col-span-3">
          <FiltersSection values={values} setValues={setValues} />
        </div>
        <SmallScreensFiltersSectionWrapper
          values={values}
          setValues={setValues}
          openDialog={openSmallScreensFiltersDialog}
          setOpenDialog={setOpenSmallScreensFiltersDialog}
        />
        <div className="sm:col-span-12 lg:col-span-9 px-5">
          <div className="w-full bg-white sm:px-4 lg:px-10 sm:py-5 lg:py-3 drop-shadow-md rounded-md flex items-center justify-between">
            <div>
              <span className="bg-gray-100 rounded-md px-3 sm:py-2 lg:py-1 flex items-center">
                <FormControlLabel
                  control={<Switch />}
                  label={
                    <span className="font-kanit font-normal sm:text-xl lg:text-sm">
                      Afficher uniquement les articles en stock
                    </span>
                  }
                />
              </span>
              <Button
                className="sm:flex lg:hidden text-2xl mt-5"
                size="large"
                variant="outlined"
                endIcon={<RiFilter2Line className="sm:text-4xl" />}
                onClick={() => setOpenSmallScreensFiltersDialog(true)}
              >
                Filtres
              </Button>
            </div>
            <div className="flex flex-col sm:w-72 lg:w-48">
              <label className="font-raleway font-semibold rounded-none sm:text-3xl lg:text-sm">
                Trier par
              </label>
              <Select
                sx={{
                  height: {
                    sm: 60,
                    lg: 40,
                  },
                }}
                color="secondary"
                MenuProps={{ disableScrollLock: true }}
                className="bg-orange-50"
              ></Select>
            </div>
          </div>
          <div className="mt-7 w-full flex items-center justify-between">
            <span className="text-gray-500 pl-2 font-normal sm:text-xl lg:text-sm text-center">
              100 resultats <br /> Vous avez vu 15 articles sur 100
            </span>
            <Pagination
              count={6}
              shape="rounded"
              color="secondary"
              variant="outlined"
              showFirstButton
              showLastButton
            />
          </div>
          {isLoading ? (
            <div className="w-full mt-5 drop-shadow-sm rounded-md">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    className="h-96 rounded-md"
                    animation="wave"
                  />
                ))}
              </div>
            </div>
          ) : (
            <DisplayProducsSection />
          )}
          <div className="mt-14 w-full flex flex-col items-center justify-center">
            <span className="text-gray-500 pl-2 font-normal sm:text-xl lg:text-sm text-center mb-4">
              100 resultats <br /> Vous avez vu 15 articles sur 100
            </span>
            <Pagination
              count={6}
              shape="rounded"
              color="secondary"
              variant="outlined"
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
