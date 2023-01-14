import React from "react";
import { Category } from "../../../../data/models/Category";
import { CustomImage } from "../../../../data/models/Image";
import {
  Avatar,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material";

import { BiTrash } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

type Props = {
  category: Category;
};

const CategoryListItem = ({ category }: Props) => {
  const [categoryImage, setCategoryImage] = React.useState<CustomImage | null>(
    null
  );

  const getBrandImage = async () => {
    let url =
      process.env.REACT_APP_API_URL + "images/" + category.CategoryImageId;
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

      setCategoryImage(image);
    }
  };

  React.useEffect(() => {
    getBrandImage();
  }, []);
  return categoryImage !== null ? (
    <div className="w-full flex flex-col items-center justify-center mb-32">
      <h1 className="text-2xl font-medium opacity-80 mb-4 text-center">
        {category.CategoryTitle}
      </h1>
      <img
        alt={category.CategoryTitle}
        src={
          "data:" +
          categoryImage.imageExtension +
          ";base64," +
          categoryImage.imageBytes
        }
        className="h-40 text-center rounded-lg drop-shadow-lg"
      />
      <div className="mt-4 flex items-center justify-center">
        <IconButton>
          <FiEdit />
        </IconButton>
        <Button
          size="large"
          color="error"
          startIcon={<BiTrash />}
          className="normal-case font-raleway ml-2"
        >
          Supprimer
        </Button>
      </div>
    </div>
  ) : (
    <Skeleton variant="circular" />
  );
};

export default CategoryListItem;
