import React from "react";

import { GiShoppingCart } from "react-icons/gi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Badge, IconButton } from "@mui/material";
import AccountButtonPopover from "./account-button-popover/AccountButtonPopover";

const Navlinks = () => {
  const [openAccountButtonPopover, setOpenAccountButtonPopover] =
    React.useState<boolean>(false);
  return (
    <div>
      <div className="items-center sm:flex lg:hidden text-primary">
        <IconButton className="sm:block lg:hidden items-center justify-center h-20 w-20 sm:mr-7">
          <Badge badgeContent={5} color="primary" overlap="circular">
            <GiShoppingCart className="text-6xl text-primary" />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          className="sm:block lg:hidden items-center justify-center h-20 w-20 sm:mr-7"
        >
          <Badge badgeContent={10} color="primary" overlap="circular">
            <MdOutlineFavoriteBorder className="text-6xl text-primary" />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          className="sm:block lg:hidden items-center justify-center h-20 w-20"
        >
          <AiOutlineUserAdd className="text-6xl text-primary" />
        </IconButton>
      </div>
      <div className="sm:hidden lg:flex h-full items-center">
        <div
          id="app-header-account-button"
          onClick={() => setOpenAccountButtonPopover(!openAccountButtonPopover)}
          className="sm:hidden lg:flex items-center justify-center h-4/6 w-40 rounded-md cursor-pointer mr-7 hover:text-primary transition delay-100 ease-in-out"
        >
          <HiOutlineUserCircle className="text-4xl mr-1" />
          <div className="flex flex-col items-start justify-center">
            <span className="text-xs">VOTRE</span>
            <span className="text-lg">COMPTE</span>
          </div>
          <RiArrowDropDownLine className="text-2xl ml-2" />
        </div>
        <AccountButtonPopover
          open={openAccountButtonPopover}
          setOpen={setOpenAccountButtonPopover}
        />
        <Badge
          className="sm:hidden lg:flex items-center h-4/6 w-28 rounded-md cursor-pointer  hover:text-primary transition delay-150 ease-in-out"
          badgeContent={5}
          color="secondary"
          overlap="circular"
        >
          <GiShoppingCart className="text-4xl mr-1" />
          <div className="flex flex-col items-start justify-center">
            <span className="text-xs">VOTRE</span>
            <span className="text-lg">PANIER</span>
          </div>
        </Badge>
      </div>
    </div>
  );
};

export default Navlinks;
