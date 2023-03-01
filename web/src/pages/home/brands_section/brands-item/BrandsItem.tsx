import { Skeleton } from "@mui/material";
import React from "react";
import { Brand } from "../../../../data/models/Brand";
import { CustomImage } from "../../../../data/models/Image";

type Props = {
  brand: Brand;
};

const BrandsItem = ({ brand }: Props) => {
  const [brandImage, setBrandImage] = React.useState<CustomImage | null>(null);

  const getBrandImage = async () => {
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

      setBrandImage(image);
    }
  };

  React.useEffect(() => {
    getBrandImage();
  }, []);

  return brandImage ? (
    <div className="h-full w-full flex items-center justify-center">
      <img
        alt={brand.BrandName}
        src={
          "data:" +
          brandImage.imageExtension +
          ";base64," +
          brandImage.imageBytes
        }
        className="h-auto w-auto"
      />
    </div>
  ) : (
    <Skeleton className="h-full w-full" />
  );
};

export default BrandsItem;
