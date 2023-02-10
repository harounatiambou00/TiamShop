import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormGroup,
  FormHelperText,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useRef } from "react";
import { MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlinePicture, AiOutlinePlusCircle } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import {
  ImageToBeAddedType,
  ProductCaracteristic,
  ValuesState,
} from "../AddProductDialog";
import { SubCategory } from "../../../../data/models/SubCategory";
import { Brand } from "../../../../data/models/Brand";
import { ErrorType } from "./ErrorType";
import { FiEdit } from "react-icons/fi";
import CaracteristicsSection from "./caracteristics-section/CaracteriticsSection";

type Props = {
  subCategories: SubCategory[];
  brands: Brand[];
  values: ValuesState;
  setValues: React.Dispatch<React.SetStateAction<ValuesState>>;
  handleChangeProductPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeProductQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeProductDiscountPercentage: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChangeProductDiscountEndEnd: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  images: ImageToBeAddedType[];
  setImages: React.Dispatch<React.SetStateAction<ImageToBeAddedType[]>>;
  caracteristics: ProductCaracteristic[];
  setCaracteristics: React.Dispatch<
    React.SetStateAction<ProductCaracteristic[]>
  >;
  formError: ErrorType;
  setFormError: React.Dispatch<React.SetStateAction<ErrorType>>;
  handleSave: () => void;
  isSaving: boolean;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form = ({
  subCategories,
  brands,
  values,
  setValues,
  handleChangeProductDiscountEndEnd,
  handleChangeProductDiscountPercentage,
  handleChangeProductQuantity,
  handleChangeProductPrice,
  formError,
  caracteristics,
  setCaracteristics,
  images,
  setImages,
  isSaving,
  setIsSaving,
}: Props) => {
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const updateImageInputRef = React.useRef<HTMLInputElement>(null);
  const [imageBeingUpdatedId, setImageBeingUpdatedId] = React.useState<
    number | null
  >(null);
  return (
    <div className="w-full flex justify-between p-5">
      <div className="w-1/2 pr-10 grid grid-cols-4 gap-4 h-fit">
        <div className="col-span-4">
          <div className="text-md font-medium">
            Nom du produit <span className="text-red-500">*</span>
          </div>
          <OutlinedInput
            fullWidth
            size="small"
            className="font-kanit"
            value={values.productName}
            onChange={(e) =>
              setValues({ ...values, productName: e.target.value })
            }
          />
          <FormHelperText
            className="font-kanit"
            error={
              formError === "PRODUCT_NAME_IS_REQUIRED" ||
              formError === "PRODUCT_NAME_MUST_BE_LESS_THAN_100_CHARACTERS" ||
              formError === "PRODUCT_NAME_ALREADY_EXISTS"
            }
          >
            {formError === "PRODUCT_NAME_IS_REQUIRED" &&
              "Vous devez renseigner le nom du produit."}
            {formError === "PRODUCT_NAME_MUST_BE_LESS_THAN_100_CHARACTERS" &&
              "Le nom d'un produit doit etre unique que contient au maximum 100 caractères."}
            {formError === "NONE" && "Veuillez saisir le nom du produit."}
          </FormHelperText>
        </div>
        <div className="col-span-4">
          <div className="text-md font-medium">
            Description du produit <span className="text-red-500">*</span>
          </div>
          <OutlinedInput
            fullWidth
            size="small"
            className="font-kanit"
            multiline
            rows={6}
            value={values.productDescription}
            onChange={(e) =>
              setValues({ ...values, productDescription: e.target.value })
            }
          />
          <FormHelperText
            className="font-kanit"
            error={formError === "PRODUCT_DESCRIPTION_IS_REQUIRED"}
          >
            {formError === "PRODUCT_DESCRIPTION_IS_REQUIRED" &&
              "Vous devez renseigner une description détaillée du produit."}
            {formError === "NONE" &&
              "Veuillez saisir la description du produit."}
          </FormHelperText>
        </div>

        <div className="col-span-2">
          <div className="text-md font-medium">
            Prix <span className="text-red-500">*</span>
          </div>
          <FormGroup>
            <OutlinedInput
              fullWidth
              size="small"
              type="number"
              className="font-raleway font-medium text-xl"
              endAdornment={
                <div className="h-full text-lg font-bold">FCFA</div>
              }
              value={
                values.productPrice === undefined ? "" : values.productPrice
              }
              onChange={handleChangeProductPrice}
            />
            <FormHelperText
              className="font-kanit"
              error={formError === "PRODUCT_PRICE_IS_REQUIRED"}
            >
              {formError === "PRODUCT_PRICE_IS_REQUIRED" &&
                "Vous devez renseigner le prix du produit."}
              {formError === "NONE" && "Le prix du produit en francs CFA."}
            </FormHelperText>
          </FormGroup>
        </div>
        <div className="col-span-2 flex flex-col items-end">
          <div className="w-1/2">
            <div className="text-md font-medium">
              Quantité <span className="text-red-500">*</span>
            </div>
            <FormGroup>
              <OutlinedInput
                fullWidth
                size="small"
                className="font-raleway font-medium text-xl"
                value={
                  values.productQuantity === undefined
                    ? ""
                    : values.productQuantity
                }
                onChange={handleChangeProductQuantity}
              />
              <FormHelperText
                className="font-kanit"
                error={formError === "PRODUCT_QUANTITY_IS_REQUIRED"}
              >
                {formError === "PRODUCT_QUANTITY_IS_REQUIRED" &&
                  "Vous devez renseigner la quantité du produit."}
              </FormHelperText>
            </FormGroup>
          </div>
        </div>
        <div className="col-span-2">
          <div className="text-md font-medium">
            Sous-catégorie <span className="text-red-500">*</span>
          </div>
          <FormGroup>
            <Select
              fullWidth
              value={values.subCategoryId}
              size="small"
              className="font-kanit font-light"
              onChange={(e) => {
                setValues({ ...values, subCategoryId: e.target.value });
              }}
            >
              {subCategories.map((subCategory) => {
                return (
                  <MenuItem
                    value={subCategory.SubCategoryId}
                    key={subCategory.SubCategoryId}
                    className="font-kanit font-light"
                  >
                    {subCategory.SubCategoryTitle}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText
              error={formError === "PRODUCT_SUBCATEGORY_IS_REQUIRED"}
              className="font-kanit"
            >
              {formError === "PRODUCT_SUBCATEGORY_IS_REQUIRED" &&
                "Vous devez renseigner la sous-catégorie du produit."}
            </FormHelperText>
          </FormGroup>
        </div>
        <div className="col-span-2">
          <div className="text-md font-medium">
            La marque du produit <span className="text-red-500">*</span>
          </div>
          <FormGroup>
            <Select
              fullWidth
              value={values.brandId}
              size="small"
              className="font-kanit font-light"
              onChange={(e) => {
                setValues({ ...values, brandId: e.target.value });
              }}
            >
              {brands.map((brand) => {
                return (
                  <MenuItem
                    value={brand.brandId}
                    key={brand.brandId}
                    className="font-kanit font-light"
                  >
                    {brand.BrandName}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText
              error={formError === "PRODUCT_BRAND_IS_REQUIRED"}
              className="font-kanit"
            >
              {formError === "PRODUCT_BRAND_IS_REQUIRED" &&
                "Vous devez renseigner la sous-catégorie du produit."}
            </FormHelperText>
          </FormGroup>
        </div>

        <div className="col-span-2">
          <div className="text-md font-medium">Garantie</div>
          <FormGroup>
            <OutlinedInput
              fullWidth
              size="small"
              type="text"
              className="font-kanit"
              value={values.waranty}
              onChange={(e) =>
                setValues({ ...values, waranty: e.target.value })
              }
            />
          </FormGroup>
        </div>
        <div className="col-span-2">
          <div className="text-md font-medium">Couleur</div>
          <FormGroup>
            <OutlinedInput
              fullWidth
              size="small"
              type="text"
              className="font-kanit"
              value={values.color}
              onChange={(e) => setValues({ ...values, color: e.target.value })}
            />
          </FormGroup>
        </div>
      </div>
      <div className="w-1/2">
        <div>
          <div className="text-md font-medium">
            Images <span className="text-red-500">*</span>
          </div>
          <div className="h-48 bg-gray-100 w-full rounded-md drop-shadow-xs p-2">
            <Swiper slidesPerView={3} spaceBetween={20} className="mb-2">
              <SwiperSlide className="h-full border-dashed border-2 border-primary rounded-md bg-transparent flex flex-col items-center justify-center">
                <AiOutlinePicture className="text-4xl text-primary" />
                <p className="text-sm font-light text-gray-500 ">
                  Déposez votre image ici, ou{" "}
                  <Button
                    size="small"
                    className="inline normal-case text-xm font-kanit font-light"
                    onClick={() => imagesInputRef.current?.click()}
                  >
                    cliquez pour parcourir
                  </Button>
                </p>
              </SwiperSlide>
              {images &&
                images.map((image) => {
                  return (
                    <SwiperSlide
                      className="h-full rounded-md bg-transparent drop-shadow-md"
                      key={image.id}
                    >
                      <ImageListItem className="h-11/12 w-11/12">
                        <img
                          src={image.base64}
                          alt={image.file.name}
                          className="h-full w-full"
                        />
                        <ImageListItemBar
                          className="bg-transparent"
                          position="top"
                          actionIcon={
                            <div className="w-full flex justify-between">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => {
                                  setImages(
                                    images.filter((i) => i.id !== image.id)
                                  );
                                }}
                              >
                                <MdClose />
                              </IconButton>
                            </div>
                          }
                          actionPosition="right"
                        />
                        <ImageListItemBar
                          className="bg-transparent"
                          position="bottom"
                          actionIcon={
                            <div className="w-full flex justify-between">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => {
                                  setImageBeingUpdatedId(image.id);
                                  updateImageInputRef.current?.click();
                                }}
                              >
                                <FiEdit />
                              </IconButton>
                            </div>
                          }
                          actionPosition="right"
                        />
                      </ImageListItem>
                    </SwiperSlide>
                  );
                })}
              <input
                className="hidden"
                accept="image/*"
                type="file"
                ref={updateImageInputRef}
                onChange={(e) => {
                  if (e.currentTarget && e.currentTarget.files) {
                    let file = e.currentTarget.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = () => {
                          setImages(
                            images.map((i) => {
                              if (i.id === imageBeingUpdatedId) {
                                i.file = file;
                                i.base64 = reader.result as string;
                              }
                              return i;
                            })
                          );
                        };
                      };
                    }
                  }
                  setImageBeingUpdatedId(null);
                }}
              />
            </Swiper>
            <small className="font-light text-gray-500">
              Vous devez ajouter au moins une image et au plus 10 images.
            </small>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={imagesInputRef}
              multiple
              onChange={(e) => {
                if (e.currentTarget && e.currentTarget.files !== null) {
                  setImages([]);
                  for (let i = 0; e.currentTarget.files.length; i++) {
                    let file = e.currentTarget.files[i];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setImages([
                        ...images,
                        {
                          id:
                            images.length !== 0
                              ? images[images.length - 1].id + 1
                              : 1,
                          file: file,
                          base64: reader.result as string,
                        },
                      ]);
                    };
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="mt-10">
          <Accordion className="bg-gray-50" elevation={0}>
            <AccordionSummary
              expandIcon={
                <MdKeyboardArrowDown className="font-medium text-2xl" />
              }
              className="pl-2 font-medium"
            >
              Voulez-vous appliquer une reduction au produit ?
            </AccordionSummary>
            <AccordionDetails className="grid gap-4 grid-cols-4">
              <div className="col-span-1">
                <div className="text-md font-medium">Poucentage</div>
                <FormGroup>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    type="number"
                    className="font-raleway font-medium text-lg"
                    endAdornment={<div className="h-full text-lg">%</div>}
                    value={
                      values.ProductDiscountPercentage === undefined
                        ? ""
                        : values.ProductDiscountPercentage
                    }
                    onChange={handleChangeProductDiscountPercentage}
                  />
                </FormGroup>
              </div>
              <div className="col-span-3">
                <div className="text-md font-medium">
                  Date de la fin de réduction
                </div>
                <FormGroup>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    type="date"
                    className="font-kanit"
                    value={values.ProductDiscountEndDate}
                    onChange={handleChangeProductDiscountEndEnd}
                  />
                </FormGroup>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="mt-10">
          <CaracteristicsSection
            caracteristics={caracteristics}
            setCaracteristics={setCaracteristics}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
