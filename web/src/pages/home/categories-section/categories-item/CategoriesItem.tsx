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
      <div className="h-1/2 w-1/2">
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
      <h1 className="px-5 font-normal pt-2">{category.CategoryTitle}</h1>
    </div>
  ) : (
    <Skeleton className="w-full h-full" />
  );
};

export default CategoriesItem;
