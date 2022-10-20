import React from "react";
import { motion } from "framer-motion";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DesktopSearchbarSuggestionPopover = ({ open, setOpen }: Props) => {
  let className = open
    ? "w-large-screens-searchbar-width h-96 fixed bg-white z-50 border-b-2 border-l-2 border-r-2 drop-shadow-md border-primary rounded-b-md overflow-y-scroll transition-transform text-gray-700"
    : "hidden";

  return (
    <motion.div id="desktop-searchbar-suggestion-popover" className={className}>
      Hi
    </motion.div>
  );
};

export default DesktopSearchbarSuggestionPopover;
