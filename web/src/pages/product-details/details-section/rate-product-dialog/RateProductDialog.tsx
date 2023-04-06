import React from "react";
import ProductAndRelatedInfo from "../../../../data/models/ProductAndRelatedInfo";
import { Button, CircularProgress, Dialog, IconButton } from "@mui/material";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { useAppSelector } from "../../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../../redux/store";
import { ProductGrade } from "../../../../data/models/ProductGrade";

type Props = {
  product: ProductAndRelatedInfo;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Stars = ({
  grade,
  handleChangeRate,
}: {
  grade: number;
  handleChangeRate: (grade: 0 | 1 | 2 | 3 | 4 | 5) => void;
}) => {
  if (grade < 0 || grade > 5)
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <AiOutlineStar key={i} className="text-yellow-500 text-2xl mr-1" />
        ))}
      </div>
    );
  else {
    let round = grade.toFixed();

    return (
      <div className="flex items-center h-12">
        {[1, 2, 3, 4, 5].map((i) => {
          if (i <= Number(round))
            return (
              <IconButton
                color="warning"
                className=" mr-1"
                key={i}
                onClick={() => {
                  i >= 1 && i <= 5 && i === 1
                    ? handleChangeRate(0)
                    : handleChangeRate(i as 0 | 1 | 2 | 3 | 4 | 5);
                }}
              >
                <AiFillStar className="text-yellow-500 text-2xl hover:text-3xl" />
              </IconButton>
            );
          else {
            return (
              <IconButton
                className=" mr-1"
                color="warning"
                key={i}
                onClick={() => {
                  i >= 1 && i <= 5 && handleChangeRate(i as 1 | 2 | 3 | 4 | 5);
                }}
              >
                <AiOutlineStar className="text-yellow-500 text-2xl cursor-pointer hover:text-3xl" />
              </IconButton>
            );
          }
        })}
      </div>
    );
  }
};

const RateProductDialog = ({ product, open, setOpen }: Props) => {
  const authenticatedClient = useAppSelector(
    (state: RootState) => state.authenticatedClient.client
  );
  const [clientCurrentRate, setClientCurrentRate] =
    React.useState<ProductGrade>({
      productGradeId: 0,
      grade: 0,
      productId: product.productId,
      userId: 0,
    });
  const handleChangeRate = (grade: 0 | 1 | 2 | 3 | 4 | 5) => {
    setGrade(grade);
  };

  const handleSave = async () => {
    if (authenticatedClient !== null) {
      if (clientCurrentRate?.productGradeId === 0) {
        //We will add
        let url = process.env.REACT_APP_API_URL + "product-grades";
        let response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            grade: grade,
            productId: product.productId,
            userId: authenticatedClient.userId,
          }),
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
          },
        });
        let content = await response.json();
        if (content.success) setOpen(false);
      } else {
        //We will update
        let url = process.env.REACT_APP_API_URL + "product-grades";
        let response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify({ ...clientCurrentRate, grade: grade }),
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
          },
        });
        let content = await response.json();
        if (content.success) setOpen(false);
      }
    }
  };
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const getUserCurrentRate = async () => {
      setIsLoading(true);
      if (authenticatedClient !== null) {
        let url =
          process.env.REACT_APP_API_URL +
          "product-grades/get-product-grades-by-product-id-and-user-id";
        let request = {
          productId: product.productId,
          userId: authenticatedClient?.userId,
        };

        let response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(request),
          headers: {
            Accept: "text/plain",
            "Content-Type": "application/json",
          },
        });

        let content = await response.json();
        if (!content.success) {
          setClientCurrentRate({
            productGradeId: 0,
            grade: 0,
            productId: product.productId,
            userId: authenticatedClient.userId,
          } as ProductGrade);
        } else {
          const data = content.data as ProductGrade;
          setClientCurrentRate({
            productGradeId: data.productGradeId,
            grade: data.grade,
            productId: data.productId,
            userId: data.userId,
          } as ProductGrade);
        }
      }
      setIsLoading(true);
      getUserCurrentRate();
      setIsLoading(false);
    };
    getUserCurrentRate();
  }, [open, authenticatedClient, product]);

  const [grade, setGrade] = React.useState(0);
  React.useEffect(() => {
    if (clientCurrentRate) setGrade(clientCurrentRate.grade);
    else setGrade(0);
  }, [clientCurrentRate]);

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      {isLoading ? (
        <div className="w-32 h-32 flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="py-10 px-7 text-center">
          <h1 className="font-raleway text-2xl font-medium">
            Votre avis sur ce produit
          </h1>
          <div className="flex items-center justify-between font-light bg-stone-100 px-5 py-2 mt-2 rounded-full ">
            {clientCurrentRate !== undefined && (
              <Stars grade={grade} handleChangeRate={handleChangeRate} />
            )}
            <span>{clientCurrentRate?.grade} sur 5</span>
          </div>
          <small className="font-light text-gary-600">
            Vous pouvez le modifier en appuyant sur les étoiles.
          </small>
          <div className="flex items-center justify-between mt-5">
            <Button
              className="font-raleway"
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              className="bg-primary"
              startIcon={<FiSave />}
              onClick={() => handleSave()}
            >
              Sauvegarder
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default RateProductDialog;
