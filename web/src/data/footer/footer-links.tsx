import { IoLocationOutline } from "react-icons/io5";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";

export type FooterLinkType = {
  href?: string;
  to?: string;
  text: string | React.ReactNode;
  icon?: React.ReactNode;
};

export const footerLinks = [
  {
    name: "customerService",
    text: "Service client",
    links: [
      {
        to: "contact-us",
        text: "Contactez-nous",
      } as FooterLinkType,
      {
        to: "stores",
        text: "Nos magasins",
      } as FooterLinkType,
      {
        to: "about-us",
        text: "A propos",
      } as FooterLinkType,
      {
        to: "faq",
        text: "FAQ",
      } as FooterLinkType,
    ],
  },
  {
    name: "legalInformation",
    text: "Informations légales",
    links: [
      {
        to: "policy",
        text: "Politique & Conditions d'utilisation",
      } as FooterLinkType,
      {
        to: "repayment-info",
        text: "Politique de remboursements",
      } as FooterLinkType,
      {
        to: "privacy-policy",
        text: "Politique de confidentialité",
      } as FooterLinkType,
      {
        to: "delivery-info",
        text: "Politique de livraisons",
      } as FooterLinkType,
    ],
  },
  {
    name: "contacts",
    text: "Contacts",
    links: [
      {
        icon: (
          <IoLocationOutline className="sm:text-4xl lg:text-xl text-gray-50 mr-2 opacity-70" />
        ),
        text: "90 Ave Mohamed V, Monastir 5000, Tunisia",
      } as FooterLinkType,
      {
        icon: (
          <FiPhoneCall className="sm:text-4xl lg:text-xl text-gray-50 mr-2 opacity-70" />
        ),
        text: "+216 52-178-506",
      } as FooterLinkType,
      {
        icon: (
          <MdEmail className="sm:text-4xl lg:text-xl text-gray-50 mr-2 opacity-70" />
        ),
        text: (
          <span>
            tiamtech.co@gmail.com <br /> harounatiambou.pro@gmail.com
          </span>
        ),
      } as FooterLinkType,
    ],
  },
];
