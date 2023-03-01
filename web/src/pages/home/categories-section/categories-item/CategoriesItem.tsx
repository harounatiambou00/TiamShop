import React from "react";
import { Category } from "../../../../data/models/Category";
import { CustomImage } from "../../../../data/models/Image";
import { Skeleton } from "@mui/material";

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
  return categoryImage ? (
    <div className="flex flex-col items-center justify-between">
      <div className="h-3/4 w-3/4">
        <img
          alt={category.CategoryTitle}
          src={
            "data:" +
            categoryImage.imageExtension +
            ";base64," +
            categoryImage.imageBytes
          }
          className="h-full w-full"
        />
      </div>
      <h1 className="px-5 font-normal pt-2 sm:text-2xl lg:text-base">
        {category.CategoryTitle}
      </h1>
    </div>
  ) : (
    <Skeleton
      variant="rectangular"
      className="w-full h-full rounded-md"
      animation="wave"
    />
  );
};

export default CategoriesItem;
