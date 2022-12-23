import React from "react";

import { IoStatsChartSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { IconType } from "react-icons";

export type AdminDashboardLink = {
  title: string;
  isActive: boolean;
  to: string;
  icon: React.ReactNode | IconType;
};

export let adminDashboardLinks = [
  {
    title: "Tableau de bord",
    isActive: true,
    to: "/admin",
    icon: IoStatsChartSharp,
  },
  {
    title: "Les clients",
    isActive: false,
    to: "/admin/clients",
    icon: FaUsers,
  },
  {
    title: "Les catégories",
    isActive: false,
    to: "/admin/categories",
    icon: MdCategory,
  },
  {
    title: "Les commandes",
    isActive: false,
    to: "/admin/orders",
    icon: BiPurchaseTagAlt,
  },
  {
    title: "Les paniers",
    isActive: false,
    to: "/admin/carts",
    icon: BsCart4,
  },
  {
    title: "Les livraisons",
    isActive: false,
    to: "/admin/deliveries",
    icon: TbTruckDelivery,
  },
  {
    title: "Les marques",
    isActive: false,
    to: "/admin/brands",
    icon: TbTruckDelivery,
  },
];
