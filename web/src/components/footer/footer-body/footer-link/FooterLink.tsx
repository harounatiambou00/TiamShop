import React from "react";
import { useNavigate } from "react-router-dom";

import { MdKeyboardArrowRight } from "react-icons/md";

import "./footerLink.css";

type Props = {
  href: string | undefined;
  to: string | undefined;
  text: string | React.ReactNode;
  icon?: React.ReactNode;
};

const FooterLink = ({ href, to, text, icon }: Props) => {
  const navigate = useNavigate();
  if (href) {
    return (
      <div className="flex items-center footer__link after:bg-primary">
        {icon ? (
          icon
        ) : (
          <MdKeyboardArrowRight className="text-xl text-gray-50 opacity-80  font-medium mb-2" />
        )}
        <a className="text-sm text-gray-50 opacity-80 inline mb-1" href={href}>
          {text}
        </a>
      </div>
    );
  } else if (to) {
    return (
      <div className="flex items-center footer__link text-gray-50 opacity-80 hover:text-amber-400 hover:underline sm:mb-4 lg:mb-1">
        {icon ? (
          icon
        ) : (
          <MdKeyboardArrowRight className="sm:text-3xl lg:text-xl font-medium" />
        )}
        <span
          className="cursor-pointer sm:text-2xl lg:text-sm block"
          onClick={() => navigate(to)}
        >
          {text}
        </span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center footer__link text-gray-50 opacity-80 sm:mb-4 lg:mb-2">
        {icon ? (
          icon
        ) : (
          <MdKeyboardArrowRight className="sm:text-3xl lg:text-xl font-medium" />
        )}
        <span className="sm:text-3xl lg:text-sm block ">{text}</span>
      </div>
    );
  }
};

export default FooterLink;
