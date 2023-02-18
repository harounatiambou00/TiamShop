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
    <div className="mt-10">
      <div className="flex justify-between items-center mb-2">
        <h1 className="uppercase text-xl font-raleway font-medium">{title}</h1>
        {handleClickSeeMoreButton && (
          <Button
            size="small"
            color="primary"
            className="normal-case font-kanit font-light"
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
