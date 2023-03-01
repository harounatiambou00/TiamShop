import { Alert, CircularProgress, Collapse } from "@mui/material";
import React from "react";
import useSearch from "../../../../hooks/useSearch";
import ProductAndRelatedInfo from "../../../../data/models/ProductAndRelatedInfo";
import { SearchValuesType } from "../../../../data/SearchValuesType";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  criteria: string;
  category: string;
};

const DesktopSearchbarSuggestionPopover = ({
  open,
  setOpen,
  criteria,
  category,
}: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [, , getMatchedProducts] = useSearch();
  const [suggestionProducts, setSuggestionProducts] = React.useState<
    ProductAndRelatedInfo[]
  >([]);

  React.useEffect(() => {
    let searchingValues = {
      criteria: criteria,
      onlyAvailableProducts: false,
      minPrice: null,
      maxPrice: null,
      category: category,
      brandId: null,
      discount: null,
      rating: "all",
      sortBy: "correspondance",
    } as SearchValuesType;
    criteria.trim() !== "" &&
      getMatchedProducts(searchingValues, setIsLoading, setSuggestionProducts);
  }, [criteria, category]);
  const navigate = useNavigate();
  return (
    <Collapse
      in={open}
      style={{ transformOrigin: "0 0 0" }}
      {...(open ? { timeout: 500 } : {})}
    >
      <div className="">
        {isLoading ? (
          <div className="w-large-screens-searchbar-width h-96 bg-white border-2 border-t-0 border-primary rounded-b-md flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : suggestionProducts.length > 0 ? (
          <div className="w-large-screens-searchbar-width h-96 bg-white border-2 border-t-0 border-primary rounded-b-md overflow-y-scroll text-black px-5 pt-4">
            {suggestionProducts.map((p) => (
              <div
                key={p.productId}
                className="z-50 w-full py-2 px-3 mb-3 hover:bg-gray-100 hover:drop-shadow-sm cursor-pointer rounded-md"
                onClick={() => {
                  navigate("/product-details/" + p.productId);
                  setOpen(false);
                }}
              >
                <div className="w-full flex items-center">
                  <img
                    src={
                      "data:" +
                      p.images[0].imageExtension +
                      ";base64," +
                      p.images[0].imageBytes
                    }
                    alt=""
                    className="h-16"
                  />
                  <div className="pl-3 h-full">
                    <h1 className="font-raleway font-medium">
                      {p.productName}
                    </h1>
                    <div className="font-amita font-medium align-top text-md">
                      {p.productPrice -
                        (p.productDiscountPercentage / 100) *
                          p.productPrice}{" "}
                      <span className="font-raleway">FCFA</span>
                      {p.productDiscountPercentage > 0 && (
                        <span className="font-amita font-semibold text-red-600 inline ml-2 text-xs line-through">
                          {p.productPrice} fcfa
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-large-screens-searchbar-width h-96 bg-white border-2 border-t-0 border-primary rounded-b-md text-black px-5 pt-4 flex justify-between items-center">
            <Alert severity="error" className="ml-48 font-kanit">
              Aucun article à vous suggérer.
            </Alert>
          </div>
        )}
      </div>
    </Collapse>
  );
};

export default DesktopSearchbarSuggestionPopover;
