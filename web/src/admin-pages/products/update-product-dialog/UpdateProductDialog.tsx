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
import Form from "./form/Form";
import CaracteristicsSection from "./caracteristics-section/CaracteristicsSection";
import moment from "moment";
import ProductCaracteristic from "../../../data/models/ProductCaracteristic";
import { CustomImage } from "../../../data/models/Image";
import { ErrorType } from "./form/ErrorType";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductAndRelatedInfo;
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
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: number | undefined;
  productQuantity: number | undefined;
  waranty: string;
  color: string;
  productDiscountPercentage: number | undefined;
  productDiscountEndDate: string;
  productPrincipalImageId: number;
  brandId: number | string;
  subCategoryId: number | string;
};

export type ImageToBoUpdatedType = {
  id: number;
  file: File;
  base64: string;
};
const UpdateProductDialog = ({ open, setOpen, product }: Props) => {
  const navigate = useNavigate();

  const [openSuccessSnackbar, setOpenSuccessSnackbar] =
    React.useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);
  const [formError, setFormError] = React.useState<ErrorType>("NONE");
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
      productDiscountEndDate: moment().format("YYYY-MM-DD"),
      rating: 0,
      numberOfVotes: 0,
    });

  const [caracteristics, setCaracteristics] = React.useState<
    ProductCaracteristic[]
  >([]);
  const [images, setImages] = React.useState<CustomImage[]>([]);

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
            rating: data.rating,
            numberOfVotes: data.numberOfVotes,
          }));
          setCaracteristics(data.caracteristics);
          setImages(data.images);
        }
      } else {
        navigate("*");
      }
    };

    setValues({
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
      productDiscountPercentage:
        productAndRelatedInfo.productDiscountPercentage,
      productDiscountEndDate:
        typeof productAndRelatedInfo.productDiscountEndDate === "string"
          ? productAndRelatedInfo.productDiscountEndDate
          : "",
    });

    if (!product.productId || product.productId.length !== 36) navigate("/");
    //Getting the product
    else {
      setIsLoading(true);
      getProductAndRelatedInfo();
      setIsLoading(false);
    }
  }, [open]); // each time we open or close the dialog

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
    productDiscountEndDate:
      typeof productAndRelatedInfo.productDiscountEndDate === "string"
        ? productAndRelatedInfo.productDiscountEndDate
        : "",
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
      setValues({ ...values, productDiscountPercentage: undefined });
      return;
    }
    if (!isNaN(Number(value))) if (Number(value) < 0) return;
    if (!isNaN(Number(value))) if (Number(value) > 99) return;

    setValues({ ...values, productDiscountPercentage: Number(value) });
  };

  const handleChangeProductDiscountEndEnd = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({
      ...values,
      productDiscountEndDate: moment(event.target.value).format("YYYY-MM-DD"),
    });
  };

  const [caracteristicsToBeDeletedIds, setCaracteristicsToBeDeletedIds] =
    React.useState<number[]>([]);
  const handleDeleteCaracteristic = (caracteristicId: number) => {
    let newCaracteristics = caracteristics.filter(
      (c) => c.productCaracteristicId !== caracteristicId
    );

    if (newCaracteristics.length < caracteristics.length) {
      setCaracteristics(newCaracteristics);
      if (
        caracteristicsToBeAdded.find(
          (c) => c.productCaracteristicId === caracteristicId
        ) !== undefined
      ) {
        setCaracteristicsToBeAdded(
          caracteristicsToBeAdded.filter(
            (c) => c.productCaracteristicId !== caracteristicId
          )
        );
      } else {
        setCaracteristicsToBeDeletedIds([
          ...caracteristicsToBeDeletedIds,
          caracteristicId,
        ]);
      }
    }
  };

  const [caracteristicsToBeAdded, setCaracteristicsToBeAdded] = React.useState<
    ProductCaracteristic[]
  >([]);

  const [imagesToBeAddedFiles, setImagesToBeAddedFiles] = React.useState<
    File[]
  >([]);
  const [imagesToBeDeletedIds, setImagesToBeDeletedIds] = React.useState<
    number[]
  >([]);
  const deleteImage = (imageId: number) => {
    let theImage = images.find((i) => i.imageId === imageId);
    let newImages = images.filter((i) => i.imageId !== imageId);
    if (
      productAndRelatedInfo.images.find((i) => i.imageId === imageId) !==
      undefined
    ) {
      if (newImages.length < images.length) {
        setImages(newImages);
        setImagesToBeDeletedIds([...imagesToBeDeletedIds, imageId]);
      }
    } else {
      if (theImage !== undefined && theImage !== null) {
        setImages(newImages);
        setImagesToBeAddedFiles(
          imagesToBeAddedFiles.filter((i) => i.name !== theImage?.imageName)
        );
      }
    }
  };

  const [imagesToBeUpdated, setImagesToBeUpdated] = React.useState<
    ImageToBoUpdatedType[]
  >([]);
  const updateImage = (id: number, newFile: File) => {
    if (newFile) {
      if (images.find((i) => i.imageId === id) !== undefined) {
        let imageToBeUpdatedInstance = imagesToBeUpdated.find(
          (i) => i.id === id
        );
        if (imageToBeUpdatedInstance === undefined) {
          let base64 = "";
          const reader = new FileReader();
          reader.readAsDataURL(newFile);
          reader.onload = () => {
            base64 = reader.result as string;
            let newImageToBeUpdated = {
              id: id,
              file: newFile,
              base64: base64,
            };
            setImagesToBeUpdated([...imagesToBeUpdated, newImageToBeUpdated]);
          };
        } else {
          let base64 = "";
          const reader = new FileReader();
          reader.readAsDataURL(newFile);
          reader.onload = () => {
            base64 = reader.result as string;
            setImagesToBeUpdated((currentState) =>
              currentState.map((i) => {
                if (i.id === id) {
                  i.file = newFile;
                  i.base64 = base64;
                }
                return i;
              })
            );
          };
        }
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    /*Validations*/
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
    } else if (images && images.length === 0) {
      setFormError("PRODUCT_MUST_HAVE_AT_LEAST_ONE_IMAGE");
      setOpenErrorSnackbar(true);
      setErrorMessage("Vous devez ajouter au moins une image.");
      setIsSaving(false);
      return;
    } else if (images && images.length > 10) {
      setFormError("PRODUCT_MUST_HAVE_LESS_THAN_11_IMAGES");
      setOpenErrorSnackbar(true);
      setErrorMessage("Un produit ne peut pas avoir plus de 10 images.");
      setIsSaving(false);
      return;
    } else if (
      values.productDiscountPercentage !== undefined &&
      isNaN(Number(values.productDiscountPercentage))
    ) {
      setFormError("INVALID_DISCOUNT_PERCENTAGE");
      setIsSaving(false);
      return;
    } else {
      setFormError("NONE");
      setOpenErrorSnackbar(false);
      setErrorMessage("");
    }

    if (formError === "NONE") {
      //Updating the product
      if (
        images.find((i) => i.imageId === values.productPrincipalImageId) ===
        undefined
      ) {
        setValues((currentState) => {
          currentState.productPrincipalImageId = images[0].imageId;
          return currentState;
        });
      }
      let url = process.env.REACT_APP_API_URL + "products";
      let productUpdateFormData = new FormData();
      productUpdateFormData.append(
        "productId",
        productAndRelatedInfo.productId
      );
      productUpdateFormData.append("productName", values.productName);
      productUpdateFormData.append(
        "productDescription",
        values.productDescription
      );
      productUpdateFormData.append(
        "productPrice",
        values.productPrice.toString()
      );
      productUpdateFormData.append(
        "productQuantity",
        values.productQuantity.toString()
      );
      values.waranty !== "" &&
        productUpdateFormData.append("Waranty", values.waranty);
      values.color !== "" &&
        productUpdateFormData.append("Color", values.color);
      if (values.productDiscountPercentage !== undefined) {
        productUpdateFormData.append(
          "productDiscountPercentage",
          values.productDiscountPercentage.toString()
        );
        productUpdateFormData.append(
          "productDiscountEndDate",
          values.productDiscountEndDate
        );
      }
      productUpdateFormData.append(
        "productPrincipalImageId",
        values.productPrincipalImageId.toString()
      );
      productUpdateFormData.append("brandId", values.brandId.toString());
      productUpdateFormData.append(
        "subCategoryId",
        values.subCategoryId.toString()
      );
      let response = await fetch(url, {
        method: "PUT",
        body: productUpdateFormData,
      });
      let content = await response.json();
      if (content.success) {
        setOpenSuccessSnackbar(true);
      } else console.log(content);

      //Deleting the caracteristics
      for (let id of caracteristicsToBeDeletedIds) {
        let url =
          process.env.REACT_APP_API_URL + "product-caracteristics/" + id;
        let response = await fetch(url, {
          method: "DELETE",
        });
        let content = await response.json();
        if (content.success) {
          setCaracteristicsToBeDeletedIds(
            caracteristicsToBeDeletedIds.filter((i) => i !== id)
          );
        }
      }
      //addng new caracetristics
      for (let caracteristic of caracteristicsToBeAdded) {
        let url = process.env.REACT_APP_API_URL + "product-caracteristics";
        let request = {
          productCaracteristicKey: caracteristic.productCaracteristicKey,
          productCaracteristicValue: caracteristic.productCaracteristicValue,
          productID: caracteristic.productID,
        };

        let response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "text/plain",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });
        let content = await response.json();
        if (!content.success) console.log(content);
        setCaracteristicsToBeAdded(
          caracteristicsToBeAdded.filter(
            (c) =>
              c.productCaracteristicId !== caracteristic.productCaracteristicId
          )
        );
      }

      //Updating the updated caracteristics
      for (let caracteristic of productAndRelatedInfo.caracteristics) {
        let correspondantCaracteristic = caracteristics.find(
          (c) =>
            c.productCaracteristicId === caracteristic.productCaracteristicId
        );
        if (
          correspondantCaracteristic !== undefined &&
          (correspondantCaracteristic.productCaracteristicKey !==
            caracteristic.productCaracteristicKey ||
            correspondantCaracteristic.productCaracteristicValue !==
              caracteristic.productCaracteristicValue)
        ) {
          let url = process.env.REACT_APP_API_URL + "product-caracteristics";
          let request = {
            productCaracteristicId:
              correspondantCaracteristic.productCaracteristicId,
            productCaracteristicKey:
              correspondantCaracteristic.productCaracteristicKey,
            productCaracteristicValue:
              correspondantCaracteristic.productCaracteristicValue,
            productID: correspondantCaracteristic.productID,
          };

          let response = await fetch(url, {
            method: "PUT",
            headers: {
              Accept: "text/plain",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
          });

          let content = await response.json();
          if (!content.success) console.log(content);
        }
      }

      //Adding new Images
      for (let imageFile of imagesToBeAddedFiles) {
        let url =
          process.env.REACT_APP_API_URL +
          "product-images/add-product-image-with-file";
        let addImageFormData = new FormData();
        addImageFormData.append("productId", product.productId);
        addImageFormData.append("file", imageFile);
        let addImageResponse = await fetch(url, {
          method: "POST",
          body: addImageFormData,
        });
        let addImageResponseContent = await addImageResponse.json();
        if (addImageResponseContent.success) {
        } else {
          console.log(addImageResponseContent);
        }
      }

      //Updating the images
      for (let imageToBeUpdated of imagesToBeUpdated) {
        let url = process.env.REACT_APP_API_URL + "images";
        let formData = new FormData();
        formData.append("id", imageToBeUpdated.id.toString());
        formData.append("newFile", imageToBeUpdated.file);
        let response = await fetch(url, {
          method: "PUT",
          body: formData,
          headers: {
            Accept: "text/plain",
          },
        });
        let content = await response.json();

        if (content.success) {
          setImages(
            images.map((image) => {
              if (image.imageId === imageToBeUpdated.id) {
                image.imageBytes = imageToBeUpdated.base64.slice(
                  imageToBeUpdated.base64.indexOf(",") + 1
                );
                image.imageExtension = imageToBeUpdated.file.type;
              }
              return image;
            })
          );
          setImagesToBeUpdated(
            imagesToBeUpdated.filter((i) => i.id !== imageToBeUpdated.id)
          );
        }
        if (!content.success) console.log(content);
      }

      //Deleting the images  to be deleted
      for (let id of imagesToBeDeletedIds) {
        if (images.length > 1) {
          if (values.productPrincipalImageId !== id)
            setValues({
              ...values,
              productPrincipalImageId: images[0].imageId,
            });

          let deleteImageUrl =
            process.env.REACT_APP_API_URL +
            "product-images/delete-product-image-and-related-image-by-productId-and-imageId?" +
            "productId=" +
            product.productId +
            "&imageId=" +
            id;
          let deleteImageResponse = await fetch(deleteImageUrl, {
            method: "DELETE",
            headers: {
              Accept: "text/plain",
            },
          });

          let deleteImageResponseContent = await deleteImageResponse.json();
          if (deleteImageResponseContent.success) {
            setImagesToBeDeletedIds(
              imagesToBeDeletedIds.filter((i) => i !== id)
            );
          } else {
            console.log(deleteImageResponseContent);
          }
        }
      }
    }
    setIsSaving(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setValues({
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
          productDiscountPercentage:
            productAndRelatedInfo.productDiscountPercentage,
          productDiscountEndDate:
            typeof productAndRelatedInfo.productDiscountEndDate === "string"
              ? productAndRelatedInfo.productDiscountEndDate
              : "",
        });
        setCaracteristics(productAndRelatedInfo.caracteristics);
        setImages(productAndRelatedInfo.images);
        setImagesToBeAddedFiles([]);
        setImagesToBeUpdated([]);
        setCaracteristicsToBeDeletedIds([]);
        setImagesToBeDeletedIds([]);
        setOpen(false);
      }}
      fullScreen
      TransitionComponent={Transition}
    >
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full flex flex-col bg-white pb-10">
          <div className="h-20 flex items-center justify-between py-5 px-10 bg-white">
            <IconButton onClick={() => setOpen(false)} color="primary">
              <BiArrowBack />
            </IconButton>
            <h1 className="font-raleway text-primary font-bold text-xl ml-4 flex-1 items-center">
              Modification du produit{" "}
              <span className="font-kanit text-sm uppercase font-light text-green-700 rounded-full px-2 bg-green-100 ">
                {productAndRelatedInfo.productReference}
              </span>
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
          <div className="grid grid-cols-2">
            <ImagesSection
              images={images}
              setImages={setImages}
              deleteImage={deleteImage}
              imagesToBeAddedFiles={imagesToBeAddedFiles}
              setImagesToBeAddedFiles={setImagesToBeAddedFiles}
              imagesToBeUpdated={imagesToBeUpdated}
              setImagesToBeUpdated={setImagesToBeUpdated}
              updateImage={updateImage}
            />
            <Form
              values={values}
              setValues={setValues}
              handleChangeProductPrice={handleChangeProductPrice}
              handleChangeProductQuantity={handleChangeProductQuantity}
              handleChangeProductDiscountPercentage={
                handleChangeProductDiscountPercentage
              }
              handleChangeProductDiscountEndEnd={
                handleChangeProductDiscountEndEnd
              }
              formError={formError}
              setFormError={setFormError}
            />
            <CaracteristicsSection
              caracteristics={caracteristics as ProductCaracteristic[]}
              handleDeleteCaracteristic={handleDeleteCaracteristic}
              setCaracteristics={setCaracteristics}
              productID={productAndRelatedInfo.productId}
              caracteristicsToBeAdded={caracteristicsToBeAdded}
              setCaracteristicsToBeAdded={setCaracteristicsToBeAdded}
            />
          </div>
          <SuccessSnackbar
            open={openSuccessSnackbar}
            setOpen={setOpenSuccessSnackbar}
            text="Le produit a été modifié avec succès"
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
