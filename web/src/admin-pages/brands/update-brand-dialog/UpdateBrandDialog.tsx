import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormGroup,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  OutlinedInput,
  Skeleton,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { Brand } from "../../../data/models/Brand";
import { CustomImage } from "../../../data/models/Image";
import { BiArrowBack, BiSave } from "react-icons/bi";
import { LoadingButton } from "@mui/lab";
import SuccessSnackbar from "../../../components/core/suucess-snackbar/SuccessSnackbar";
import ErrorSnackbar from "../../../components/core/error-snackbar/ErrorSnackbar";
import { MdClose } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { HiLink } from "react-icons/hi";
import moment from "moment";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshBrands: () => void;
  brand: Brand;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ValuesStateType = {
  brandName: string;
  brandWebsiteLink: string;
  isAPartner: boolean;
};

const UpdateBrandDialog = ({ open, setOpen, refreshBrands, brand }: Props) => {
  const imageInput = React.useRef<HTMLInputElement>(null);
  const [brandImage, setbrandImage] = React.useState<CustomImage | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const getBrandImage = async () => {
    setIsLoading(true);
    let url = process.env.REACT_APP_API_URL + "images/" + brand.BrandImageId;
    let response = await fetch(url);
    let content = await response.json();
    if (content.success) {
      let data = content.data;
      let image: CustomImage = {
        imageId: data.imageId,
        imageName: data.imageName,
        imageDescription: data.imageDescription,
        imageExtension: data.imageExtension,
        imageBytes: data.imageBytes,
        imageSize: data.imageSize,
      };

      setbrandImage(image);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    getBrandImage();
  }, []);

  const [savingIsLoading, setSavingIsLoading] = React.useState<boolean>(false);

  // New image
  const [newImage, setNewImage] = React.useState<File | null>(null);
  const [newImageBase64, setNewImageBase64] = React.useState<string | null>(
    null
  );

  const [openSuccessSnackbar, setOpenSuccessSnackbar] =
    React.useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);
  const [values, setValues] = React.useState<ValuesStateType>({
    brandName: brand.BrandName,
    brandWebsiteLink: brand.BrandWebsiteLink,
    isAPartner: brand.PartnershipDate !== null,
  });
  const handleSave = async () => {
    setSavingIsLoading(true);
    let url = process.env.REACT_APP_API_URL + "brands";
    let formData = new FormData();

    if (newImage && newImageBase64) formData.append("newImageFile", newImage);
    formData.append("BrandId", brand.brandId.toString());
    formData.append("BrandName", values.brandName);
    values.isAPartner &&
      brand.PartnershipDate === null &&
      formData.append("PartnershipDate", moment().format().slice(0, 19));
    values.brandWebsiteLink !== "" &&
      formData.append("BrandWebsiteLink", values.brandWebsiteLink);
    formData.append("BrandImageId", brand.BrandImageId.toString());
    console.log(formData);
    let response = await fetch(url, {
      method: "PUT",
      body: formData,
    });

    let content = await response.json();

    if (content.success) {
      setOpenSuccessSnackbar(true);
      setTimeout(() => refreshBrands(), 3000);
    } else {
      setOpenErrorSnackbar(true);
      console.log(content);
    }
    setSavingIsLoading(false);
  };

  React.useEffect(() => {
    if (newImage) {
      const reader = new FileReader();
      reader.readAsDataURL(newImage);
      reader.onloadend = () => {
        setNewImageBase64(reader.result as string);
      };
    } else {
      setNewImageBase64(null);
    }
  }, [newImage]);
  return !isLoading && brandImage ? (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      TransitionComponent={Transition}
      maxWidth="md"
    >
      <div className="h-full w-full flex-col flex bg-white">
        <div className="h-20 flex w-full items-center justify-between py-5 px-10 bg-white">
          <IconButton onClick={() => setOpen(false)} color="primary">
            <BiArrowBack />
          </IconButton>
          <h1 className="font-raleway text-primary font-bold text-xl ml-4 flex-1 items-center">
            Modification de la marque "{brand.BrandName}"
          </h1>
          <LoadingButton
            variant="outlined"
            startIcon={<BiSave />}
            size="large"
            className="font-raleway"
            loading={savingIsLoading}
            onClick={handleSave}
          >
            Enregistrer
          </LoadingButton>
        </div>
        <div className="p-5">
          <div className="flex">
            <div className="w-1/2">
              {brandImage && (
                <ImageListItem className="cursor-pointer">
                  <img
                    alt={brand.BrandName}
                    src={
                      newImageBase64
                        ? newImageBase64
                        : "data:" +
                          brandImage.imageExtension +
                          ";base64," +
                          brandImage.imageBytes
                    }
                    className="text-center"
                  />
                  {newImage && newImageBase64 && (
                    <ImageListItemBar
                      className="bg-transparent"
                      position="bottom"
                      actionIcon={
                        <div className="w-full flex justify-between">
                          <Button
                            size="small"
                            variant="contained"
                            className="bg-gray-400 font-kanit font-light normal-case"
                            startIcon={<MdClose />}
                            onClick={() => setNewImage(null)}
                          >
                            Réinitialiser
                          </Button>
                        </div>
                      }
                      actionPosition="left"
                    />
                  )}
                  <ImageListItemBar
                    className="bg-transparent"
                    position="top"
                    actionIcon={
                      <div className="w-full flex justify-between">
                        <Button
                          size="small"
                          variant="contained"
                          className="bg-primary font-kanit font-light normal-case"
                          startIcon={<FiEdit />}
                          onClick={() => imageInput.current?.click()}
                        >
                          Modifier
                        </Button>
                      </div>
                    }
                    actionPosition="right"
                  />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={imageInput}
                    onChange={(event) => {
                      event.preventDefault();
                      event.currentTarget &&
                        event.currentTarget.files &&
                        setNewImage(event.currentTarget.files[0]);
                    }}
                  />
                </ImageListItem>
              )}
            </div>
            <div className="w-1/2 px-5">
              <div className="mb-5">
                <label className="mb-2">Nom de la marque</label>
                <OutlinedInput
                  fullWidth
                  size="small"
                  value={values.brandName}
                  onChange={(e) =>
                    setValues({ ...values, brandName: e.target.value })
                  }
                  className="font-kanit font-light"
                />
              </div>
              <div className="mb-5">
                <label className="mb-2">
                  Lien vers le site web de la marque
                </label>
                <OutlinedInput
                  value={values.brandWebsiteLink}
                  onChange={(e) =>
                    setValues({ ...values, brandWebsiteLink: e.target.value })
                  }
                  fullWidth
                  size="small"
                  endAdornment={<HiLink />}
                  className="font-kanit font-light"
                />
              </div>
              <FormGroup className="">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={values.isAPartner}
                      onChange={(e) => {
                        if (e.target.checked)
                          setValues({ ...values, isAPartner: true });
                        else setValues({ ...values, isAPartner: false });
                      }}
                    />
                  }
                  label={<span className="font-kanit">Marque partenaire</span>}
                />
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
      <SuccessSnackbar
        open={openSuccessSnackbar}
        setOpen={setOpenSuccessSnackbar}
        text="La marque a été modifiée avec succès."
      />
      <ErrorSnackbar
        open={openErrorSnackbar}
        setOpen={setOpenErrorSnackbar}
        text="Nous n'avons pas pu modifier la marque, réessayez plus tard."
      />
    </Dialog>
  ) : (
    <Dialog
      fullScreen
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      className="bg-gray-100"
    >
      <div className="h-full w-full flex items-center justify-center">
        <Skeleton variant="circular" />
      </div>
    </Dialog>
  );
};

export default UpdateBrandDialog;
