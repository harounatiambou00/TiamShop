import React from "react";
import { Product } from "../../../../data/models/Product";
import {
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useAppSelector } from "../../../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../../../redux/store";
import { ValuesState } from "../UpdateProductDialog";

type Props = {
  values: ValuesState;
  setValues: React.Dispatch<React.SetStateAction<ValuesState>>;
};

const Form = ({ values, setValues }: Props) => {
  let brands = useAppSelector((state: RootState) => state.allBrands.brands);
  let subCategories = useAppSelector(
    (state: RootState) => state.subCategories.subCategories
  );
  return (
    <div className="px-10 grid grid-cols-4 mt-10 items-start justify-start">
      <FormControl className="col-span-4">
        <label className="font-kanit mb-1 pl-2">Nom</label>
        <OutlinedInput
          fullWidth
          size="small"
          type="text"
          value={values.productName}
          className="font-kanit font-light"
        />
      </FormControl>
      <FormControl className="col-span-4 mt-5">
        <label className="font-kanit mb-1 pl-2">Description</label>
        <OutlinedInput
          fullWidth
          size="small"
          type="text"
          multiline
          rows={5}
          value={values.productDescription}
          className="font-kanit font-light"
        />
      </FormControl>
      <FormControl className="col-span-2 mt-5">
        <label className="font-kanit mb-1 pl-2">Prix</label>
        <OutlinedInput
          fullWidth
          size="small"
          type="text"
          value={values.productPrice}
          className="font-light font-amita"
          endAdornment={
            <div className="h-full font-medium flex items-center font-raleway">
              FCFA
            </div>
          }
        />
      </FormControl>
      <FormControl className="col-span-2 flex justify-end items-end mt-5">
        <div className="w-1/2">
          <label className="font-kanit mb-1 pl-2">Quantité</label>
          <OutlinedInput
            fullWidth
            size="small"
            type="text"
            value={values.productQuantity}
            className="font-light font-amita"
          />
        </div>
      </FormControl>
      <FormControl className="col-span-2 mt-5">
        <label className="font-kanit mb-1 pl-2">Sous-catégorie</label>
        <Select
          size="small"
          defaultValue={values.subCategoryId.toString()}
          className="font-kanit font-light"
        >
          {subCategories.map((subCategory) => (
            <MenuItem
              value={subCategory.SubCategoryId.toString()}
              className="font-kanit font-light"
            >
              {subCategory.SubCategoryTitle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="col-span-2 ml-5 mt-5">
        <label className="font-kanit mb-1 pl-2">Marque</label>
        <Select
          size="small"
          defaultValue={values.brandId.toString()}
          className="font-kanit font-light"
        >
          {brands.map((brand) => (
            <MenuItem
              value={brand.brandId.toString()}
              className="font-kanit font-light"
            >
              {brand.BrandName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="col-span-2 mt-5">
        <label className="font-kanit mb-1 pl-2">Garantie</label>
        <OutlinedInput
          value={values.waranty}
          fullWidth
          size="small"
          className="font-kanit font-light"
        />
      </FormControl>
      <FormControl className="col-span-2 ml-5 mt-5">
        <label className="font-kanit mb-1 pl-2">Couleur</label>
        <OutlinedInput
          value={values.color}
          fullWidth
          size="small"
          className="font-kanit font-light"
        />
      </FormControl>
      <div className="grid grid-cols-3 col-span-4 mt-5">
        <FormControl className="col-span-1">
          <label className="font-kanit mb-1 pl-2">Réduction</label>
          <OutlinedInput
            fullWidth
            size="small"
            type="text"
            value={values.productDiscountPercentage}
            className="font-light font-amita"
            endAdornment={
              <div className="h-full font-medium flex items-center font-raleway">
                %
              </div>
            }
          />
        </FormControl>
        <FormControl className="col-span-1"></FormControl>
        <FormControl className="col-span-1 ">
          <label className="font-kanit mb-1 pl-2">Date de fin</label>
          <OutlinedInput
            fullWidth
            size="small"
            type="date"
            value={values.productDiscountEndDate}
            className="font-light font-amita"
          />
        </FormControl>
      </div>
    </div>
  );
};

export default Form;
