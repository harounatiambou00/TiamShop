import React, { ReactNode } from "react";

import "./animated-button.css";

import { CircularProgress } from "@mui/material";

type Props = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: ReactNode;
  isLoading: boolean;
};

const AnimatedButton = (props: Props) => {
  if (props.isLoading === false) {
    return (
      <div className="animated-button-wrapper">
        <button
          onClick={props.handleClick}
          className="border-2 border-primary text-primary after:bg-primary hover:text-white"
        >
          <span>{props.text}</span>
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-10 w-28 bg-gray-100 border-2 border-primary rounded-md">
        <CircularProgress size={30} />
      </div>
    );
  }
};

export default AnimatedButton;
