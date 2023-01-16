import React from "react";
import { SwiperSlide } from "swiper/react";
import { SubCategory } from "../../../../../../data/models/SubCategory";
import { CustomImage } from "../../../../../../data/models/Image";
import {
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
} from "@mui/material";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";

import "./styles.css";

type Props = {
  subCategory: SubCategory;
};
const SubCategoriesListItem = ({ subCategory }: Props) => {
  const [subCategoryImage, setSubCategoryImage] =
    React.useState<CustomImage | null>(null);

  const getCategoryImage = async () => {
    let url =
      process.env.REACT_APP_API_URL +
      "images/" +
      subCategory.SubCategoryImageId;
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

      setSubCategoryImage(image);
    }
  };

  React.useEffect(() => {
    getCategoryImage();
  }, []);
  return subCategoryImage ? (
    <ImageListItem className="h-full w-full cursor-pointer image_list_item">
      <img
        alt={subCategory.SubCategoryTitle}
        src={
          "data:" +
          subCategoryImage.imageExtension +
          ";base64," +
          subCategoryImage.imageBytes
        }
        className="h-32 text-center rounded-lg drop-shadow-lg"
      />
      <ImageListItemBar
        title={subCategory.SubCategoryTitle}
        className="font-kanit image_list_item_bar"
        actionIcon={
          <div className="image_list_item_bar_actions">
            <IconButton color="error">
              <MdDelete className="text-red-500" />
            </IconButton>
            <IconButton>
              <MdEdit className="text-gray-100" />
            </IconButton>
          </div>
        }
      />
    </ImageListItem>
  ) : (
    <Skeleton variant="rectangular" className="h-full w-full" />
  );
};

export default SubCategoriesListItem;
