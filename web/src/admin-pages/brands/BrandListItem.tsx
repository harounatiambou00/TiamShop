import React from "react";
import { Brand } from "../../data/models/Brand";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Skeleton,
  IconButton,
} from "@mui/material";
import { CustomImage } from "../../data/models/Image";
import { BiTrash } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

type Props = {
  brand: Brand;
};

const BrandListItem = (props: Props) => {
  const [brandImage, setBrandImage] = React.useState<CustomImage | null>(null);

  const getBrandImage = async () => {
    let url =
      process.env.REACT_APP_API_URL + "images/" + props.brand.BrandImageId;
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
      console.log(brandImage);
    }
  };

  React.useEffect(() => {
    getBrandImage();
  }, []);

  return (
    <Card className="p-0">
      <CardActionArea
        href={props.brand.BrandWebsiteLink}
        target="blank"
        className="h-10/12 flex flex-col items-center justify-between"
      >
        {brandImage ? (
          <div>
            <CardMedia
              component="img"
              alt={brandImage.imageName}
              sx={{
                "& .MuiCardMedia-img": {
                  height: "100px",
                  width: "100px",
                },
              }}
              image={
                "data:" +
                brandImage.imageExtension +
                ";base64," +
                brandImage.imageBytes
              }
            />
          </div>
        ) : (
          <Skeleton variant="rectangular" height={140} />
        )}
        <CardContent>
          <h1 className="text-lg font-raleway font-medium text-center">
            {props.brand.BrandName}
          </h1>
          {props.brand.PartnershipDate && (
            <div className="text-center mt-1">
              <span className="text-sm text-green-900 bg-green-200 px-2 rounded-2xl drop-shadow-md">
                Partenaire
              </span>
            </div>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions className="w-full h-1/4 p-0 m-0">
        <div className="w-1/2 h-full text-end">
          <IconButton color="error">
            <BiTrash />
          </IconButton>
        </div>
        <div className="w-1/2 h-full text-start">
          <IconButton color="primary">
            <FiEdit />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default BrandListItem;
