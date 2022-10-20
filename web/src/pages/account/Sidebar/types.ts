import React from "react";

import { AiOutlineUser, AiOutlineGift } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoSettingsOutline, IoReceiptOutline } from "react-icons/io5";

export type linkType =
  | "settings"
  | "details"
  | "orders"
  | "favorites"
  | "receipts";

export type linksType = {
  name: string;
  to: string;
  title: linkType;
  icon: React.ReactNode;
};

export const links = [
  {
    name: "Mes informations",
    to: "",
    title: "details",
    icon: React.createElement(AiOutlineUser),
  },
  {
    name: "Mes commandes",
    to: "my-orders",
    title: "orders",
    icon: React.createElement(AiOutlineGift),
  },
  {
    name: "Mes favories",
    to: "my-favorites",
    title: "favorites",
    icon: React.createElement(MdOutlineFavoriteBorder),
  },
  {
    name: "Mes reçus",
    to: "my-receipts",
    title: "receipts",
    icon: React.createElement(IoReceiptOutline),
  },
  {
    name: "Paramètres",
    to: "my-settings",
    title: "settings",
    icon: React.createElement(IoSettingsOutline),
  },
] as linksType[];
