import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import { Category } from "../../data/models/Category";
import { Brand } from "../../data/models/Brand";
import {
  SearchValuesSortByType,
  SearchValuesType,
} from "../../data/SearchValuesType";
import useSearch from "../../hooks/useSearch";
import FiltersSection from "./filters-section/FiltersSection";
import {
  Alert,
  Button,
  FormControlLabel,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Switch,
} from "@mui/material";
import { RiFilter2Line } from "react-icons/ri";
import SmallScreensFiltersSectionWrapper from "./small-screens-filters-section-wrapper/SmallScreensFiltersSectionWrapper";
import ProductAndRelatedInfo from "../../data/models/ProductAndRelatedInfo";
import { ProductCard } from "../../components/core";
import { BiMessageError } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { Product } from "../../data/models/Product";

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

const SearchResultsPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [getUrl, setValuesFromSearchParams, getMatchedProducts] = useSearch();
  const navigate = useNavigate();
  let categories = useAppSelector(
    (state: RootState) => state.categories.categories
  ) as Category[];
  let brands = useAppSelector(
    (state: RootState) => state.allBrands.brands
  ) as Brand[];
  const [searchParams] = useSearchParams();
  let criteria = searchParams.get("criteria");
  const [values, setValues] = React.useState<SearchValuesType>({
    criteria: criteria !== null ? criteria : "",
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
  const [refresh, setRefresh] = React.useState<boolean>(false);

  React.useEffect(() => {
    setValuesFromSearchParams(setValues, searchParams, categories, brands);
    getMatchedProducts(values, setIsLoading, setMatchedProducts);
    setRefresh(!refresh);
    setCurrentPage(1);
  }, [searchParams]);

  React.useEffect(() => {
    setValuesFromSearchParams(setValues, searchParams, categories, brands);
    getMatchedProducts(values, setIsLoading, setMatchedProducts);
    setCurrentPage(1);
  }, [refresh]);

  const [openSmallScreensFiltersDialog, setOpenSmallScreensFiltersDialog] =
    React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const [numberOfPages, setNumberOfPages] = React.useState<number>(1);
  React.useEffect(() => {
    setNumberOfPages(
      matchedProducts.length / 15 < 0
        ? 1
        : matchedProducts.length % 15 === 0
        ? Math.floor(matchedProducts.length / 15)
        : Math.floor(matchedProducts.length / 15) + 1
    );
  }, [matchedProducts]);

  return (
    <div className="sm:py-10 lg:py-5 sm:px-5 lg:px-10">
      {isLoading ? (
        <Skeleton variant="rectangular" className="h-8 w-72 rounded-md" />
      ) : (
        <h1 className="font-raleway sm:text-3xl lg:text-xl font-medium">
          Resultats de la recherche : {values.criteria}
        </h1>
      )}
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
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              className="h-28 w-full rounded-md"
            />
          ) : (
            <div className="w-full bg-white sm:px-4 lg:px-10 sm:py-5 lg:py-3 drop-shadow-md rounded-md">
              <div className="w-full flex items-center justify-between">
                <div>
                  <span className="bg-gray-100 rounded-md px-3 sm:py-2 lg:py-1 flex items-center">
                    <FormControlLabel
                      control={
                        <Switch checked={values.onlyAvailableProducts} />
                      }
                      label={
                        <span className="font-kanit font-normal sm:text-xl lg:text-sm">
                          Afficher uniquement les articles en stock
                        </span>
                      }
                      onClick={() =>
                        navigate(
                          getUrl({
                            ...values,
                            onlyAvailableProducts:
                              !values.onlyAvailableProducts,
                          })
                        )
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
                    className="bg-orange-50 font-kanit font-light"
                    value={values.sortBy}
                  >
                    {sortByValues.map((s) => (
                      <MenuItem
                        key={s.name}
                        value={s.name}
                        onClick={() =>
                          navigate(getUrl({ ...values, sortBy: s.name }))
                        }
                        className="font-kanit font-light"
                      >
                        {s.title}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="w-full mt-2">
                {(values.category !== "all" ||
                  values.brandId !== null ||
                  values.discount !== null ||
                  values.maxPrice !== null ||
                  values.minPrice !== null ||
                  values.onlyAvailableProducts !== false ||
                  values.rating !== "all") && (
                  <h1 className="sm:text-3xl lg:text-xl w-full">
                    Filtres appliqués
                  </h1>
                )}
                <div className="flex flex-wrap w-full flex-row">
                  {values.category !== "all" && (
                    <span className="px-2 sm:text-lg lg:text-sm bg-red-100 rounded-full m-2">
                      Uniquement les{" "}
                      {
                        categories.find(
                          (c) => c.CategoryName === values.category
                        )?.CategoryTitle
                      }
                      <IconButton
                        size="small"
                        className="ml-2"
                        onClick={() =>
                          navigate(getUrl({ ...values, category: "all" }))
                        }
                      >
                        <MdClose className="text-red-600" />
                      </IconButton>
                    </span>
                  )}
                  {values.brandId !== null && (
                    <span className="px-2 sm:text-lg lg:text-sm bg-red-100 rounded-full  m-2">
                      Uniquement les produits de chez{" "}
                      {
                        brands.find((b) => b.brandId === values.brandId)
                          ?.BrandName
                      }
                      <IconButton
                        size="small"
                        className="ml-2"
                        onClick={() =>
                          navigate(getUrl({ ...values, brandId: null }))
                        }
                      >
                        <MdClose className="text-red-600" />
                      </IconButton>
                    </span>
                  )}
                  {values.onlyAvailableProducts === true && (
                    <span className="px-2 sm:text-lg lg:text-sm bg-red-100 rounded-full  m-2">
                      Uniquement les articles en stock
                      <IconButton
                        size="small"
                        className="ml-2"
                        onClick={() =>
                          navigate(
                            getUrl({ ...values, onlyAvailableProducts: false })
                          )
                        }
                      >
                        <MdClose className="text-red-600" />
                      </IconButton>
                    </span>
                  )}
                  {values.minPrice !== null && values.maxPrice !== null && (
                    <span className="px-2 sm:text-lg lg:text-sm bg-red-100 rounded-full  m-2">
                      Uniquement les articles coutant entre {values.minPrice} et{" "}
                      {values.maxPrice} FCFA
                      <IconButton
                        size="small"
                        className="ml-2"
                        onClick={() =>
                          navigate(
                            getUrl({
                              ...values,
                              minPrice: null,
                              maxPrice: null,
                            })
                          )
                        }
                      >
                        <MdClose className="text-red-600" />
                      </IconButton>
                    </span>
                  )}
                  {values.minPrice !== null && values.maxPrice === null && (
                    <span className="px-2 sm:text-lg lg:text-sm bg-red-100 rounded-full  m-2">
                      Uniquement les articles coutant plus de {values.minPrice}
                      FCFA
                      <IconButton
                        size="small"
                        className="ml-2"
                        onClick={() =>
                          navigate(getUrl({ ...values, minPrice: null }))
                        }
                      >
                        <MdClose className="text-red-600" />
                      </IconButton>
                    </span>
                  )}
                  {values.minPrice === null && values.maxPrice !== null && (
                    <span className="px-2 sm:text-lg lg:text-sm bg-red-100 rounded-full  m-2">
                      Uniquement les articles coutant moins de
                      {values.maxPrice} FCFA
                      <IconButton
                        size="small"
                        className="ml-2"
                        onClick={() =>
                          navigate(getUrl({ ...values, maxPrice: null }))
                        }
                      >
                        <MdClose className="text-red-600" />
                      </IconButton>
                    </span>
                  )}
                  {values.discount !== null && (
                    <span className="px-2 sm:text-lg lg:text-sm bg-red-100 rounded-full  m-2">
                      Uniquement les articles{" "}
                      {values.discount ===
                      "all_discounts_and_only_with_discount"
                        ? "en soldes"
                        : values.discount === "less_than_20_percent"
                        ? "avec moins de 20% de réduction"
                        : values.discount === "at_least_20_percent"
                        ? "avec 20% de réduction ou plus"
                        : values.discount === "at_least_30_percent"
                        ? "avec 30% de réduction ou plus"
                        : values.discount === "at_least_40_percent"
                        ? "avec 40% de réduction ou plus"
                        : values.discount === "at_least_50_percent"
                        ? "avec 50% de réduction ou plus"
                        : values.discount === "at_least_60_percent"
                        ? "avec 60% de réduction ou plus"
                        : values.discount === "at_least_70_percent"
                        ? "avec 70% de réduction ou plus"
                        : ""}
                      <IconButton
                        size="small"
                        className="ml-2"
                        onClick={() =>
                          navigate(getUrl({ ...values, discount: null }))
                        }
                      >
                        <MdClose className="text-red-600" />
                      </IconButton>
                    </span>
                  )}
                  {values.rating !== "all" && (
                    <span className="px-2 sm:text-lg lg:text-sm bg-red-100 rounded-full  m-2">
                      Uniquement les articles avec{" "}
                      {values.rating === "one_star"
                        ? "une note supérieure ou égale à 1 sur 5"
                        : values.rating === "two_stars"
                        ? "une note supérieure ou égale à 2 sur 5"
                        : values.rating === "three_stars"
                        ? "une note supérieure ou égale à 3 sur 5"
                        : values.rating === "four_stars"
                        ? "une note supérieure ou égale à 4 sur 5"
                        : values.rating === "five_stars"
                        ? "une note égale à 5"
                        : ""}
                      <IconButton
                        size="small"
                        className="ml-2"
                        onClick={() =>
                          navigate(getUrl({ ...values, rating: "all" }))
                        }
                      >
                        <MdClose className="text-red-600" />
                      </IconButton>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="mt-7 w-full flex items-center justify-between">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <Skeleton
                  variant="rectangular"
                  className="h-5 w-20 rounded-md mb-2"
                />
                <Skeleton
                  variant="rectangular"
                  className="h-5 w-40 rounded-md"
                />
              </div>
            ) : (
              <span className="text-gray-500 pl-2 font-normal sm:text-xl lg:text-sm text-center">
                {matchedProducts.length} resultats <br /> Vous avez vu{" "}
                {currentPage === numberOfPages
                  ? matchedProducts.length
                  : currentPage * 15}{" "}
                articles sur {matchedProducts.length}
              </span>
            )}
            {isLoading ? (
              <Skeleton variant="rectangular" className="h-8 w-60 rounded-md" />
            ) : (
              <Pagination
                page={currentPage}
                onChange={handleChangePage}
                count={numberOfPages}
                shape="rounded"
                color="secondary"
                variant="outlined"
                showFirstButton
                showLastButton
              />
            )}
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
            <div className="w-full mt-5 drop-shadow-sm rounded-md">
              {matchedProducts.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 w-full gap-5">
                  {matchedProducts
                    .slice(currentPage * 15 - 15, currentPage * 15)
                    .map((p, index) => (
                      <ProductCard
                        key={index}
                        product={
                          {
                            productId: p.productId,
                            productName: p.productName,
                            productDescription: p.productDescription,
                            productPrice: p.productPrice,
                            productDiscountId: p.productDiscountId,
                            productQuantity: p.productQuantity,
                            productPrincipalImageId: p.productPrincipalImageId,
                            productReference: p.productReference,
                            waranty: p.waranty,
                            color: p.color,
                          } as Product
                        }
                      />
                    ))}
                </div>
              )}
              {matchedProducts.length <= 0 && (
                <div className="w-full h-32 flex items-center justify-center">
                  <Alert
                    severity="error"
                    className="font-kanit font-light sm:text-3xl lg:text-base flex items-center "
                    icon={
                      <BiMessageError className="text-red-400  sm:text-5xl lg:text-2xl" />
                    }
                  >
                    Aucun article ne correspond à votre recherche.
                  </Alert>
                </div>
              )}
            </div>
          )}
          <div className="mt-14 w-full flex flex-col items-center justify-center">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <Skeleton
                  variant="rectangular"
                  className="h-5 w-20 rounded-md mb-2"
                />
                <Skeleton
                  variant="rectangular"
                  className="h-5 w-40 rounded-md"
                />
              </div>
            ) : (
              <span className="text-gray-500 pl-2 font-normal sm:text-xl lg:text-sm text-center">
                {matchedProducts.length} resultats <br /> Vous avez vu{" "}
                {currentPage === numberOfPages
                  ? matchedProducts.length
                  : currentPage * 15}{" "}
                articles sur {matchedProducts.length}
              </span>
            )}
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                className="h-8 w-60 rounded-md mt-5"
              />
            ) : (
              <Pagination
                page={currentPage}
                onChange={handleChangePage}
                count={numberOfPages}
                shape="rounded"
                color="secondary"
                variant="outlined"
                showFirstButton
                showLastButton
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
