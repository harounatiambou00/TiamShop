import React from "react";
import { CustomImage } from "../../../../data/models/Image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { AiOutlinePicture } from "react-icons/ai";
import {
  Button,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { ImageToBoUpdatedType } from "../UpdateProductDialog";

type Props = {
  images: CustomImage[];
  setImages: React.Dispatch<React.SetStateAction<CustomImage[]>>;
  deleteImage: (imageId: number) => void;
  imagesToBeAddedFiles: File[];
  setImagesToBeAddedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imagesToBeUpdated: ImageToBoUpdatedType[];
  setImagesToBeUpdated: React.Dispatch<
    React.SetStateAction<ImageToBoUpdatedType[]>
  >;
  updateImage: (id: number, newFile: File) => void;
};

const ImagesSection = ({
  images,
  setImages,
  deleteImage,
  imagesToBeAddedFiles,
  setImagesToBeAddedFiles,
  imagesToBeUpdated,
  setImagesToBeUpdated,
  updateImage,
}: Props) => {
  const addImageInputRef = React.useRef<HTMLInputElement>(null);
  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget && e.currentTarget.files) {
      let file = e.currentTarget.files[0];
      if (file) {
        setImagesToBeAddedFiles((current) => [...current, file]);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImages([
            ...images,
            {
              ...{},
              imageId:
                images.length > 0 ? images[images.length - 1].imageId + 1 : 0, // By default. This value won't go to the server
              imageDescription: "",
              imageBytes: reader.result as string,
              imageName: file.name,
              imageSize: 0,
              imageExtension: file.type,
            },
          ]);
        };
      }
    }
  };

  const updateImageInputRef = React.useRef<HTMLInputElement>(null);
  const [imageBeingUpdatedId, setImageBeingUpdatedId] = React.useState<
    number | null
  >(null);

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={20}
      className="max-h-56 px-28 mt-10 items-center flex cursor-pointer col-span-2 mb-5"
    >
      <SwiperSlide className="w-56 h-48 bg-gray-200 rounded-lg border-2 border-gray-500 border-dashed flex flex-col items-center justify-center">
        <AiOutlinePicture className="text-4xl text-primary" />
        <p className="text-sm text-gray-500 ">
          Déposez votre image ici, ou{" "}
          <Button
            size="small"
            className="inline normal-case text-xm text-gray-500"
            onClick={() => addImageInputRef.current?.click()}
          >
            cliquez pour parcourir
          </Button>
        </p>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={addImageInputRef}
          onChange={addImage}
        />
      </SwiperSlide>
      {images.map((image) => (
        <SwiperSlide className="" key={image.imageId}>
          <ImageListItem>
            <img
              src={
                imagesToBeAddedFiles.find((i) => i.name === image.imageName) !==
                undefined //It means that the image is to be added. It's a new one
                  ? image.imageBytes
                  : imagesToBeUpdated.find((i) => i.id === image.imageId) ===
                    undefined
                  ? "data:" +
                    image.imageExtension +
                    ";base64," +
                    image.imageBytes
                  : imagesToBeUpdated.find((i) => i.id === image.imageId)
                      ?.base64
              }
              alt={image.imageName}
              className="w-48 h-48"
            />
            <ImageListItemBar
              className="bg-transparent"
              position="bottom"
              actionIcon={
                <div className="w-full flex justify-between">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => deleteImage(image.imageId)}
                  >
                    <BsTrash />
                  </IconButton>
                </div>
              }
              actionPosition="right"
            />
            {imagesToBeAddedFiles.find((i) => i.name === image.imageName) ===
              undefined && (
              <ImageListItemBar
                className="bg-transparent"
                position="top"
                actionIcon={
                  <div className="w-full flex justify-between">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setImageBeingUpdatedId(image.imageId);
                        updateImageInputRef.current?.click();
                      }}
                    >
                      <FiEdit />
                    </IconButton>
                  </div>
                }
                actionPosition="right"
              />
            )}
          </ImageListItem>
        </SwiperSlide>
      ))}
      <input
        className="hidden"
        type="file"
        accept="image/*"
        ref={updateImageInputRef}
        onChange={(e) => {
          if (
            e.currentTarget !== null &&
            e.currentTarget.files !== null &&
            imageBeingUpdatedId !== null
          ) {
            updateImage(
              imageBeingUpdatedId,
              e.currentTarget.files[e.currentTarget.files.length - 1]
            );
            setImageBeingUpdatedId(null);
          }
        }}
      />
    </Swiper>
  );
};

export default ImagesSection;
