export type SubCategoryLink = {
  title: string;
  name: string;
  to: string;
};

export type CategoryLink = {
  title: string;
  name: string;
  to: string;
  subCategories?: [];
};

export const categoryLinks = [
  {
    title: "computers",
    name: "Ordinateurs",
    to: "",
    subCategories: [],
  },
  {
    title: "computers_components",
    name: "Accéssoires ordinateurs",
    to: "",
    subCategories: [],
  },
  {
    title: "phones_tablets",
    name: "Téléphones & Tablettes",
    to: "",
    subCategories: [],
  },
  {
    title: "phones_components",
    name: "Accéssoires téléphones",
    to: "",
    subCategories: [],
  },
  {
    title: "storage",
    name: "Stockage",
    to: "",
    subCategories: [],
  },
  {
    title: "office_automation",
    name: "Bureautique",
    to: "",
    subCategories: [],
  },
  {
    title: "network_connectics",
    name: "Réseaux & Connectiques",
    to: "",
    subCategories: [],
  },
  {
    title: "softwares",
    name: "Logiciels",
    to: "",
    subCategories: [],
  },
] as CategoryLink[];
