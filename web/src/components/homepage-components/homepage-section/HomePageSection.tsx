import { Button } from "@mui/material";
import React from "react";
import { BsPlus } from "react-icons/bs";

type Props = {
  title: string;
  children: React.ReactNode;
  handleClickSeeMoreButton?: () => void;
};

const HomePageSection: React.FC<Props> = ({
  title,
  children,
  handleClickSeeMoreButton,
}: Props) => {
  return (
    <div className="sm:mt-16 lg:mt-10">
      <div className="flex justify-between items-center sm:mb-5 lg:mb-0">
        <h1 className="uppercase sm:text-3xl lg:text-xl font-raleway font-medium">
          {title}
        </h1>
        {handleClickSeeMoreButton && (
          <Button
            size="small"
            color="primary"
            className="normal-case sm:text-xl lg:text-xs font-kanit font-light"
            endIcon={<BsPlus />}
            onClick={handleClickSeeMoreButton}
          >
            Voir plus
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

export default HomePageSection;
