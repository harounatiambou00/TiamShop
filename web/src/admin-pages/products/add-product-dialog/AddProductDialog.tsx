import React from "react";
import SuccessSnackbar from "../../../components/core/suucess-snackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../components/core/error-snackbar/ErrorSnackbar";
import { Dialog, IconButton, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { BiArrowBack, BiSave } from "react-icons/bi";
import { LoadingButton } from "@mui/lab";
import Form from "./form/Form";
import moment from "moment";
import { ErrorType } from "./form/ErrorType";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subCategories: any[];
  brands: any[];
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type ValuesState = {
  productName: string;
  productDescription: string;
  productPrice: number | undefined;
  productQuantity: number | undefined;
  waranty: string;
  color: string;
  ProductDiscountPercentage: number | undefined;
  ProductDiscountEndDate: string;
  brandId: number | string;
  subCategoryId: number | string;
};

export type ProductCaracteristic = {
  id: number;
  key: string;
  value: string;
};

export type ImageToBeAddedType = {
  id: number;
  file: File;
  base64: string;
};

const AddProductDialog = ({ open, setOpen, subCategories, brands }: Props) => {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] =
    React.useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);

  const [values, setValues] = React.useState<ValuesState>({
    productName: "",
    productDescription: "",
    productPrice: undefined,
    productQuantity: undefined,
    waranty: "",
    color: "",
    ProductDiscountPercentage: undefined,
    ProductDiscountEndDate: moment().format("YYYY-MM-DD"),
    brandId: "",
    subCategoryId: "",
  });

  const handleChangeProductPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.startsWith("0")) return;
    if (value === "") {
      setValues({ ...values, productPrice: undefined });
      return;
    }
    if (!isNaN(Number(value))) if (Number(value) <= 0) return;

    setValues({ ...values, productPrice: Number(value) });
  };

  const handleChangeProductQuantity = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value;
    if (value.startsWith("0")) return;
    if (value === "") {
      setValues({ ...values, productQuantity: undefined });
      return;
    }
    if (!isNaN(Number(value))) if (Number(value) <= 0) return;
    if (!isNaN(Number(value))) if (Number(value) > 100000) return;

    setValues({ ...values, productQuantity: Number(value) });
  };

  const handleChangeProductDiscountPercentage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value;
    if (value.startsWith("0")) return;
    if (value === "") {
      setValues({ ...values, ProductDiscountPercentage: undefined });
      return;
    }
    if (!isNaN(Number(value))) if (Number(value) < 0) return;
    if (!isNaN(Number(value))) if (Number(value) > 99) return;

    setValues({ ...values, ProductDiscountPercentage: Number(value) });
  };

  const handleChangeProductDiscountEndEnd = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({
      ...values,
      ProductDiscountEndDate: moment(event.target.value).format("YYYY-MM-DD"),
    });
  };

  const [images, setImages] = React.useState<ImageToBeAddedType[]>([]);

  const [caracteristics, setCaracteristics] = React.useState<
    ProductCaracteristic[]
  >([]);

  const [errorMessage, setErrorMessage] = React.useState("");

  const [formError, setFormError] = React.useState<ErrorType>("NONE");
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const handleSave = async () => {
    setIsSaving(true);
    //Validations
    if (values.productName === "") {
      setFormError("PRODUCT_NAME_IS_REQUIRED");
      setIsSaving(false);
      return;
    } else if (values.productName.length > 100) {
      setFormError("PRODUCT_NAME_MUST_BE_LESS_THAN_100_CHARACTERS");
      setIsSaving(false);
      return;
    } else if (values.productDescription === "") {
      setFormError("PRODUCT_DESCRIPTION_IS_REQUIRED");
      setIsSaving(false);
      return;
    } else if (values.productPrice === undefined) {
      setFormError("PRODUCT_PRICE_IS_REQUIRED");
      setIsSaving(false);
      return;
    } else if (values.productQuantity === undefined) {
      setFormError("PRODUCT_QUANTITY_IS_REQUIRED");
      setIsSaving(false);
      return;
    } else if (
      values.subCategoryId === "" ||
      isNaN(Number(values.subCategoryId))
    ) {
      setFormError("PRODUCT_SUBCATEGORY_IS_REQUIRED");
      setIsSaving(false);
      return;
    } else if (values.brandId === "" || isNaN(Number(values.brandId))) {
      setFormError("PRODUCT_BRAND_IS_REQUIRED");
      setIsSaving(false);
      return;
    } else if (images.length === 0) {
      setFormError("PRODUCT_MUST_HAVE_AT_LEAST_ONE_IMAGE");
      setIsSaving(false);
      return;
    } else if (images.length > 10) {
      setFormError("PRODUCT_MUST_HAVE_LESS_THAN_11_IMAGES");
      setIsSaving(false);
      return;
    } else if (values.ProductDiscountPercentage !== undefined) {
      if (isNaN(Number(values.ProductDiscountPercentage))) {
        setFormError("INVALID_DISCOUNT_PERCENTAGE");
        setIsSaving(false);
        return;
      } else if (
        moment().toDate().getTime() >=
        new Date(values.ProductDiscountEndDate).getTime()
      ) {
        setFormError("INVALID_DISCOUNT_END_DATE");
        setIsSaving(false);
        return;
      } else {
        setFormError("NONE");
        setIsSaving(false);
      }
    } else {
      setFormError("NONE");
    }

    //Adding the product
    let addProductFormData = new FormData();

    for (let i = 0; i < images.length; i++) {
      addProductFormData.append("images", images[i].file);
    }
    addProductFormData.append("ProductName", values.productName);
    addProductFormData.append("ProductDescription", values.productDescription);
    addProductFormData.append("ProductPrice", values.productPrice.toString());
    addProductFormData.append(
      "ProductQuantity",
      values.productQuantity.toString()
    );
    values.waranty !== "" &&
      addProductFormData.append("Waranty", values.waranty);
    values.color !== "" && addProductFormData.append("Color", values.color);
    if (values.ProductDiscountPercentage !== undefined) {
      addProductFormData.append(
        "ProductDiscountPercentage",
        values.ProductDiscountPercentage.toString()
      );
      addProductFormData.append(
        "ProductDiscountEndDate",
        values.ProductDiscountEndDate
      );
    } else {
      addProductFormData.append("ProductDiscountPercentage", "0");
      addProductFormData.append("ProductDiscountEndDate", "");
    }
    addProductFormData.append("ProductPrincipalImageId", "");
    addProductFormData.append("SubCategoryId", values.subCategoryId.toString());
    addProductFormData.append("BrandId", values.brandId.toString());

    let addProductResponse = await fetch(
      process.env.REACT_APP_API_URL + "products",
      {
        method: "POST",
        body: addProductFormData,
      }
    );
    console.log(addProductResponse);
    let addProductResponseContent = await addProductResponse.json();
    console.log(addProductResponseContent);
    if (
      addProductResponseContent !== null &&
      addProductResponseContent.success
    ) {
      let productAddedId = addProductResponseContent.data;
      if (caracteristics.length > 0) {
        //If there are caracteristics we will add them
        for (var i of caracteristics) {
          let addProductCaracteristicResponse = await fetch(
            process.env.REACT_APP_API_URL + "product-caracteristics",
            {
              method: "POST",
              body: JSON.stringify({
                productCaracteristicKey: i.key,
                productCaracteristicValue: i.value,
                productID: productAddedId,
              }),
              headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
              },
            }
          );
          let content = await addProductCaracteristicResponse.json();
          if (!content.success) console.log(content);
        }
      }
      setFormError("NONE");
      setOpenSuccessSnackbar(true);
      setValues({
        productName: "",
        productDescription: "",
        productPrice: undefined,
        productQuantity: undefined,
        waranty: "",
        color: "",
        ProductDiscountPercentage: undefined,
        ProductDiscountEndDate: moment().format("YYYY-MM-DD"),
        brandId: "",
        subCategoryId: "",
      });
      setErrorMessage("");
      setCaracteristics([]);
      setImages([]);
      setOpen(false);
    } else {
      let error = addProductResponseContent.message;
      if (
        error ===
        "PRODUCT_ADDED_SUCCESSFULLY_BUT_SOMETHING_WENT_WRONG_WHILE_ADDING_THE_PRODUCT_DISCOUNT"
      ) {
        setErrorMessage(
          "Le produit a été ajouté avec succès mais nous avons rencontrer un problème lors de l'ajout de la réduction."
        );
      } else if (error === "BRAND_NOT_FOUND") {
        setErrorMessage("Cette marque de produit n'existe pas.");
      } else if (error === "SUBCATEGORY_NOT_FOUND") {
        setErrorMessage("Cette sous-catégorie de produit n'existe pas.");
      } else {
        setErrorMessage("Nous n'avons pas pu ajouter le produit");
      }
      setOpenErrorSnackbar(true);
    }
    setIsSaving(false);
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      TransitionComponent={Transition}
      className="bg-gray-100"
    >
      <div className="h-full w-full flex flex-col bg-white">
        <div className="h-20 flex items-center justify-between py-5 px-10 bg-white">
          <IconButton onClick={() => setOpen(false)} color="primary">
            <BiArrowBack />
          </IconButton>
          <h1 className="font-raleway text-primary font-bold text-xl ml-4 flex-1">
            Ajout d'un nouveau produit
          </h1>
          <LoadingButton
            variant="outlined"
            startIcon={<BiSave />}
            size="large"
            className="font-raleway"
            loading={isSaving}
            onClick={handleSave}
          >
            Enregistrer
          </LoadingButton>
        </div>
        <Form
          subCategories={subCategories}
          brands={brands}
          values={values}
          setValues={setValues}
          handleChangeProductDiscountEndEnd={handleChangeProductDiscountEndEnd}
          handleChangeProductDiscountPercentage={
            handleChangeProductDiscountPercentage
          }
          handleChangeProductPrice={handleChangeProductPrice}
          handleChangeProductQuantity={handleChangeProductQuantity}
          handleSave={handleSave}
          images={images}
          setImages={setImages}
          caracteristics={caracteristics}
          setCaracteristics={setCaracteristics}
          formError={formError}
          setFormError={setFormError}
          isSaving={isSaving}
          setIsSaving={setIsSaving}
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
    </Dialog>
  );
};

export default AddProductDialog;
