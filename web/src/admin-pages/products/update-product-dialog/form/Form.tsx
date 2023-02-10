import React from "react";
import {
  FormGroup,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useAppSelector } from "../../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../../redux/store";
import { ValuesState } from "../UpdateProductDialog";
import { ErrorType } from "./ErrorType";

type Props = {
  values: ValuesState;
  setValues: React.Dispatch<React.SetStateAction<ValuesState>>;
  handleChangeProductPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeProductQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeProductDiscountPercentage: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChangeProductDiscountEndEnd: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  formError: ErrorType;
  setFormError: React.Dispatch<React.SetStateAction<ErrorType>>;
};

const Form = ({
  values,
  setValues,
  handleChangeProductDiscountEndEnd,
  handleChangeProductDiscountPercentage,
  handleChangeProductPrice,
  handleChangeProductQuantity,
  formError,
  setFormError,
}: Props) => {
  let brands = useAppSelector((state: RootState) => state.allBrands.brands);
  let subCategories = useAppSelector(
    (state: RootState) => state.subCategories.subCategories
  );
  return (
    <div className="px-10 grid grid-cols-4 mt-10 h-fit justify-start">
      <FormGroup className="col-span-4">
        <label className="font-kanit mb-1 pl-2">Nom</label>
        <OutlinedInput
          fullWidth
          size="small"
          type="text"
          value={values.productName}
          className="font-kanit font-light"
          onChange={(e) => {
            setValues({
              ...values,
              productName: e.target.value,
            });
          }}
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
          {formError === "NONE" &&
            values.productName === "" &&
            "Veuillez saisir le nom du produit."}
        </FormHelperText>
      </FormGroup>
      <FormGroup className="col-span-4 mt-5">
        <label className="font-kanit mb-1 pl-2">Description</label>
        <OutlinedInput
          fullWidth
          size="small"
          type="text"
          multiline
          rows={5}
          value={values.productDescription}
          onChange={(e) => {
            setValues({
              ...values,
              productDescription: e.target.value,
            });
          }}
          className="font-kanit font-light"
        />
        <FormHelperText
          className="font-kanit"
          error={formError === "PRODUCT_DESCRIPTION_IS_REQUIRED"}
        >
          {formError === "PRODUCT_DESCRIPTION_IS_REQUIRED" &&
            "Vous devez renseigner une description détaillée du produit."}
          {formError === "NONE" &&
            values.productDescription === "" &&
            "Veuillez saisir la description du produit."}
        </FormHelperText>
      </FormGroup>
      <FormGroup className="col-span-2 mt-5">
        <label className="font-kanit mb-1 pl-2">Prix</label>
        <OutlinedInput
          fullWidth
          size="small"
          type="text"
          value={values.productPrice === undefined ? "" : values.productPrice}
          onChange={handleChangeProductPrice}
          className="font-light font-amita"
          endAdornment={
            <div className="h-full font-medium flex items-center font-raleway">
              FCFA
            </div>
          }
        />
        <FormHelperText
          className="font-kanit"
          error={formError === "PRODUCT_PRICE_IS_REQUIRED"}
        >
          {formError === "PRODUCT_PRICE_IS_REQUIRED" &&
            "Vous devez renseigner le prix du produit."}
          {formError === "NONE" &&
            values.productPrice === undefined &&
            "Le prix du produit en francs CFA."}
        </FormHelperText>
      </FormGroup>
      <FormGroup className="col-span-2 flex justify-end items-end mt-5">
        <div className="w-1/2">
          <label className="font-kanit mb-1 pl-2">Quantité</label>
          <OutlinedInput
            fullWidth
            size="small"
            type="text"
            value={
              values.productQuantity === undefined ? "" : values.productQuantity
            }
            onChange={handleChangeProductQuantity}
            className="font-light font-amita"
          />
          <FormHelperText
            className="font-kanit"
            error={formError === "PRODUCT_QUANTITY_IS_REQUIRED"}
          >
            {formError === "PRODUCT_QUANTITY_IS_REQUIRED" &&
              "Vous devez renseigner la quantité du produit."}
          </FormHelperText>
        </div>
      </FormGroup>
      <FormGroup className="col-span-2 mt-5">
        <label className="font-kanit mb-1 pl-2">Sous-catégorie</label>
        <Select
          size="small"
          defaultValue={values.subCategoryId.toString()}
          value={values.subCategoryId.toString()}
          onChange={(e) => {
            setValues({
              ...values,
              subCategoryId: e.target.value,
            });
          }}
          className="font-kanit font-light"
        >
          {subCategories.map((subCategory) => (
            <MenuItem
              value={subCategory.SubCategoryId.toString()}
              key={subCategory.SubCategoryId}
              className="font-kanit font-light"
            >
              {subCategory.SubCategoryTitle}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText
          error={formError === "PRODUCT_SUBCATEGORY_IS_REQUIRED"}
          className="font-kanit"
        >
          {formError === "PRODUCT_SUBCATEGORY_IS_REQUIRED" &&
            "Vous devez renseigner la sous-catégorie du produit."}
        </FormHelperText>
      </FormGroup>
      <FormGroup className="col-span-2 ml-5 mt-5">
        <label className="font-kanit mb-1 pl-2">Marque</label>
        <Select
          size="small"
          defaultValue={values.brandId.toString()}
          className="font-kanit font-light"
          value={values.brandId.toString()}
          onChange={(e) => {
            setValues({
              ...values,
              brandId: e.target.value,
            });
          }}
        >
          {brands.map((brand) => (
            <MenuItem
              value={brand.brandId.toString()}
              key={brand.brandId}
              className="font-kanit font-light"
            >
              {brand.BrandName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText
          error={formError === "PRODUCT_BRAND_IS_REQUIRED"}
          className="font-kanit"
        >
          {formError === "PRODUCT_BRAND_IS_REQUIRED" &&
            "Vous devez renseigner la sous-catégorie du produit."}
        </FormHelperText>
      </FormGroup>
      <FormGroup className="col-span-2 mt-5">
        <label className="font-kanit mb-1 pl-2">Garantie</label>
        <OutlinedInput
          value={values.waranty}
          onChange={(e) => {
            setValues({
              ...values,
              waranty: e.target.value,
            });
          }}
          fullWidth
          size="small"
          className="font-kanit font-light"
        />
      </FormGroup>
      <FormGroup className="col-span-2 ml-5 mt-5">
        <label className="font-kanit mb-1 pl-2">Couleur</label>
        <OutlinedInput
          value={values.color}
          onChange={(e) => {
            setValues({
              ...values,
              color: e.target.value,
            });
          }}
          fullWidth
          size="small"
          className="font-kanit font-light"
        />
      </FormGroup>
      <div className="grid grid-cols-3 col-span-4 mt-5">
        <FormGroup className="col-span-1">
          <label className="font-kanit mb-1 pl-2">Réduction</label>
          <OutlinedInput
            fullWidth
            size="small"
            type="text"
            value={
              values.productDiscountPercentage === undefined
                ? ""
                : values.productDiscountPercentage
            }
            onChange={handleChangeProductDiscountPercentage}
            className="font-light font-amita"
            endAdornment={
              <div className="h-full font-medium flex items-center font-raleway">
                %
              </div>
            }
          />
        </FormGroup>
        <FormGroup className="col-span-1"></FormGroup>
        <FormGroup className="col-span-1 ">
          <label className="font-kanit mb-1 pl-2">Date de fin</label>
          <OutlinedInput
            fullWidth
            size="small"
            type="date"
            value={values.productDiscountEndDate.slice(0, 10)}
            onChange={handleChangeProductDiscountEndEnd}
            className="font-light font-amita"
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default Form;
