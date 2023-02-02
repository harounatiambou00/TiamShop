import { CircularProgress, Dialog, IconButton, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import SuccessSnackbar from "../../../components/core/suucess-snackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../components/core/error-snackbar/ErrorSnackbar";
import { LoadingButton } from "@mui/lab";
import { BiArrowBack, BiSave } from "react-icons/bi";
import ProductAndRelatedInfo from "../../../data/models/ProductAndRelatedInfo";
import { useNavigate } from "react-router-dom";
import ImagesSection from "./images-section/ImagesSection";
import { Product } from "../../../data/models/Product";
import Form from "./form/Form";
import CaracteristicsSection from "./caracteristics-section/CaracteristicsSection";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type ProductCaracteristic = {
  key: string;
  value: string;
};

export type ValuesState = {
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: number | undefined;
  productQuantity: number | undefined;
  waranty: string;
  color: string;
  productDiscountPercentage: number | undefined;
  productDiscountStartDate: string;
  productDiscountEndDate: string | Date | null;
  productPrincipalImageId: number;
  brandId: number | string;
  subCategoryId: number | string;
};

const UpdateProductDialog = ({ open, setOpen, product }: Props) => {
  const navigate = useNavigate();

  const [openSuccessSnackbar, setOpenSuccessSnackbar] =
    React.useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const [productAndRelatedInfo, setProductAndRelatedInfo] =
    React.useState<ProductAndRelatedInfo>({
      productId: "",
      productReference: "",
      productName: "",
      productDescription: "",
      productPrice: 0,
      productQuantity: 0,
      createdAt: null,
      waranty: "",
      color: "",
      productPrincipalImageId: 0,
      brandId: 0,
      subCategoryId: 0,
      productDiscountId: 0,
      images: [],
      caracteristics: [],
      productDiscountPercentage: 0,
      productDiscountEndDate: null,
    });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const getProductAndRelatedInfo = async () => {
      let url =
        process.env.REACT_APP_API_URL +
        "products/get-product-and-all-related-info/" +
        product.productId;
      const response = await fetch(url);
      const content = await response.json();
      if (content.success) {
        let data = content.data as ProductAndRelatedInfo;
        if (data !== null) {
          setProductAndRelatedInfo((currentState) => ({
            ...currentState,
            productId: data.productId,
            productReference: data.productReference,
            productName: data.productName,
            productDescription: data.productDescription,
            productPrice: data.productPrice,
            productQuantity: data.productQuantity,
            createdAt:
              data.createdAt !== null && typeof data.createdAt === "string"
                ? new Date(
                    parseInt(data.createdAt.slice(0, 4)),
                    parseInt(data.createdAt.slice(5, 7)) - 1,
                    parseInt(data.createdAt.slice(8, 10))
                  )
                : null,
            waranty: data.waranty,
            color: data.color,
            productPrincipalImageId: data.productPrincipalImageId,
            brandId: data.brandId,
            subCategoryId: data.subCategoryId,
            productDiscountId: data.productDiscountId,

            images: data.images,
            caracteristics: data.caracteristics,
            productDiscountPercentage: data.productDiscountPercentage,
            productDiscountEndDate: data.productDiscountEndDate,
          }));
        }
      } else {
        navigate("*");
      }
    };

    if (!product.productId || product.productId.length !== 36) navigate("/");
    //Getting the product
    else {
      setIsLoading(true);
      getProductAndRelatedInfo();
      setIsLoading(false);
    }
  }, []);

  const [values, setValues] = React.useState<ValuesState>({
    productId: product.productId,
    productName: product.productName,
    productDescription: product.productDescription,
    productPrice: product.productPrice,
    productQuantity: product.productQuantity,
    waranty: product.waranty,
    color: product.color,
    productPrincipalImageId: product.productPrincipalImageId,
    brandId: product.brandId,
    subCategoryId: product.subCategoryId,
    productDiscountPercentage: productAndRelatedInfo.productDiscountPercentage,
    productDiscountStartDate: "",
    productDiscountEndDate: productAndRelatedInfo.productDiscountEndDate,
  });

  return (
    <Dialog
      open={open}
      onChange={() => setOpen(false)}
      fullScreen
      TransitionComponent={Transition}
    >
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full flex flex-col bg-white pb-10">
          <div className="h-20 flex items-center justify-between py-5 px-10 bg-white">
            <IconButton onClick={() => setOpen(false)} color="primary">
              <BiArrowBack />
            </IconButton>
            <h1 className="font-raleway text-primary font-bold text-xl ml-4 flex-1">
              Modification du produit
            </h1>
            <LoadingButton
              variant="outlined"
              startIcon={<BiSave />}
              size="large"
              className="font-raleway"
              loading={isSaving}
            >
              Enregistrer
            </LoadingButton>
          </div>
          <div className="grid grid-cols-2">
            <ImagesSection images={productAndRelatedInfo.images} />
            <Form values={values} setValues={setValues} />
            <CaracteristicsSection
              caracteristics={productAndRelatedInfo.caracteristics}
            />
          </div>
          <SuccessSnackbar
            open={openSuccessSnackbar}
            setOpen={setOpenSuccessSnackbar}
            text="Le produit a été ajouté avec succès"
          />
          <ErrorSnackbar
            open={openErrorSnackbar}
            setOpen={setOpenErrorSnackbar}
            text={errorMessage}
          />
        </div>
      )}
    </Dialog>
  );
};

export default UpdateProductDialog;
