import React from "react";
import { footerLinks } from "../../../data/footer/footer-links";
import FooterLink from "./footer-link/FooterLink";

const FooterBody = () => {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:flex lg:justify-between">
      {footerLinks.map((category) => {
        return (
          <div
            key={category.name}
            className={category.name === "contacts" ? "col-span-2" : ""}
          >
            <h1 className="sm:text-3xl lg:text-xl text-gray-50 opacity-90 uppercase font-raleway font-medium mb-2 sm:mt-5 lg:mt-0">
              {category.text}
            </h1>
            <div>
              {category.links.map((link) => {
                return (
                  <FooterLink
                    key={link.href}
                    href={link.href}
                    to={link.to}
                    text={link.text}
                    icon={link.icon}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FooterBody;
