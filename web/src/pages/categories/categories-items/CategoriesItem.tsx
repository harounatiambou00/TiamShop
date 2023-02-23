import React from "react";
import { Category } from "../../../data/models/Category";
import { CustomImage } from "../../../data/models/Image";
import { ImageListItem, ImageListItemBar, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  category: Category;
};

const CategoriesItem = ({ category }: Props) => {
  const [categoryImage, setCategoryImage] = React.useState<CustomImage | null>(
    null
  );

  const getCategoryImage = async () => {
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
    getCategoryImage();
  }, []);

  const navigate = useNavigate();
  return (
    <ImageListItem
      className="px-5 pt-5 bg-white drop-shadow-sm hover:drop-shadow-md cursor-pointer transition-shadow ease-in-out duration-500"
      onClick={() => navigate("/category/" + category.CategoryName)}
    >
      {categoryImage ? (
        <img
          alt={category.CategoryTitle}
          src={
            "data:" +
            categoryImage.imageExtension +
            ";base64," +
            categoryImage.imageBytes
          }
          className=""
          loading="lazy"
        />
      ) : (
        <Skeleton variant="rectangular" className="h-20 w-20" />
      )}
      <ImageListItemBar
        title={
          <span className="font-raleway pt-2 text-sm uppercase font-medium ">
            {category.CategoryTitle}
          </span>
        }
        position="below"
      />
    </ImageListItem>
  );
};

export default CategoriesItem;
