import React, { ReactNode } from "react";

import "./animated-button.css";

import { CircularProgress } from "@mui/material";

type Props = {
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: ReactNode;
  isLoading: boolean;
};

const AnimatedButton = (props: Props) => {
  if (props.isLoading === false) {
    return (
      <div className="animated-button-wrapper">
        <button
          onClick={props.handleClick && props.handleClick}
          className="border-2 border-primary sm:text-white lg:text-primary after:bg-primary sm:bg-primary lg:bg-inherit hover:text-white sm:h-20 lg:h-12 rounded-md sm:drop-shadow-lg"
        >
          <span className="sm:text-3xl lg:text-base uppercase font-raleway">
            {props.text}
          </span>
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-14 bg-gray-100 border-2 border-primary rounded-md">
        <CircularProgress size={30} />
      </div>
    );
  }
};

export default AnimatedButton;
