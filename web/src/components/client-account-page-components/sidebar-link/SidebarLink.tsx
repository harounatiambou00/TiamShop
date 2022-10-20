import { Button } from "@mui/material";
import React from "react";

type Props = {
  name: string;
  to: string;
  isActive: boolean;
  title: string;
  icon: React.ReactNode;
  handleNavigate: () => void;
};

const SidebarLink = (props: Props) => {
  if (props.isActive) {
    return (
      <div className="w-full mb-3">
        <Button
          fullWidth
          size="large"
          variant="contained"
          className="bg-primary normal-case font-kanit justify-start font-light"
          startIcon={props.icon}
        >
          {props.name}
        </Button>
      </div>
    );
  } else {
    return (
      <div className="w-full mb-3">
        <Button
          fullWidth
          size="large"
          className="normal-case font-kanit justify-start font-light"
          startIcon={props.icon}
          onClick={props.handleNavigate}
        >
          {props.name}
        </Button>
      </div>
    );
  }
};

export default SidebarLink;
