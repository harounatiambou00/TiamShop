export type SubCategoryLink = {
  title: string;
  name: string;
  to?: string;
};

export type CategoryNameType =
  | "none"
  | "computers"
  | "computers_components"
  | "phones_tablets"
  | "phones_components"
  | "storage"
  | "office_automation"
  | "home_appliance"
  | "tv_audio_photos";

export type CategoryLink = {
  title: string;
  name: CategoryNameType;
  to: string;
  subCategories?: Array<SubCategoryLink>;
};

export const categoryLinks = [
  {
    name: "computers",
    title: "Ordinateurs",
    to: "",
    subCategories: [
      {
        name: "laptops",
        title: "Ordinateurs portables",
        to: "",
      } as SubCategoryLink,
      {
        name: "pcs",
        title: "Ordinateurs de bureau",
        to: "",
      } as SubCategoryLink,
      {
        name: "pcs",
        title: "PCs Gamers",
        to: "",
      } as SubCategoryLink,
    ],
  },
  {
    name: "computers_components",
    title: "Accéssoires pour ordinateurs",
    to: "",
    subCategories: [
      {
        name: "cpus",
        title: "Processeurs",
        to: "",
      } as SubCategoryLink,
      {
        name: "ram",
        title: "Barettes RAM",
        to: "",
      } as SubCategoryLink,
      {
        name: "motherboard",
        title: "Cartes mères",
        to: "",
      } as SubCategoryLink,
      {
        name: "graphic_cards",
        title: "Cartes graphiques",
        to: "",
      } as SubCategoryLink,
      {
        name: "mouses_keyboards",
        title: "Claviers & Souris",
        to: "",
      } as SubCategoryLink,
      {
        name: "chargers",
        title: "Chargeurs",
        to: "",
      } as SubCategoryLink,
      {
        name: "headphones",
        title: "Casques & écouteurs",
        to: "",
      } as SubCategoryLink,
      {
        name: "mouse_pad",
        title: "Tapis de souris",
        to: "",
      } as SubCategoryLink,
      {
        name: "others",
        title: "Divers ...",
        to: "",
      } as SubCategoryLink,
    ],
  },
  {
    name: "phones_tablets",
    title: "Téléphones & Tablettes",
    to: "",
    subCategories: [
      {
        name: "smartphones",
        title: "Smartphones",
        to: "",
      } as SubCategoryLink,
      {
        name: "IPhone",
        title: "IPhone",
        to: "",
      } as SubCategoryLink,
      {
        name: "tablets",
        title: "Tablettes",
        to: "",
      } as SubCategoryLink,
      {
        name: "phones",
        title: "Téléphones simples",
        to: "",
      } as SubCategoryLink,
    ],
  },
  {
    name: "phones_components",
    title: "Accéssoires pour téléphones",
    to: "",
    subCategories: [
      {
        name: "protection_case",
        title: "Coques de protection",
        to: "",
      } as SubCategoryLink,
      {
        name: "anti_shock",
        title: "Anti-chocs",
        to: "",
      } as SubCategoryLink,
      {
        name: "chargers_cables",
        title: "Chargeurs & Cables",
        to: "",
      } as SubCategoryLink,
      {
        name: "power_bank",
        title: "Power banks",
        to: "",
      } as SubCategoryLink,
      {
        name: "headphones",
        title: "Ecouteurs",
        to: "",
      } as SubCategoryLink,
      {
        name: "others",
        title: "Divers ...",
        to: "",
      } as SubCategoryLink,
    ],
  },
  {
    name: "tv_audio_photos",
    title: "Audiovisuels",
    to: "",
    subCategories: [
      {
        name: "TV",
        title: "Téléviseurs",
        to: "",
      } as SubCategoryLink,
      {
        name: "Audio",
        title: "Son",
        to: "",
      } as SubCategoryLink,
      {
        name: "camera",
        title: "Appareils photo",
        to: "",
      } as SubCategoryLink,
      {
        name: "console_games",
        title: "Consoles & Jeux",
        to: "",
      } as SubCategoryLink,
      {
        name: "projecttor",
        title: "Vidéo projecteurs",
        to: "",
      } as SubCategoryLink,
    ],
  },
  {
    name: "home_appliance",
    title: "Electroménagers",
    to: "",
    subCategories: [
      {
        name: "air_conditionner",
        title: "Climatisation",
        to: "",
      } as SubCategoryLink,
      {
        name: "fan",
        title: "Ventilateurs",
        to: "",
      } as SubCategoryLink,
      {
        name: "fridge",
        title: "Refrigérateurs",
        to: "",
      } as SubCategoryLink,
      {
        name: "freezer",
        title: "Congélateurs",
        to: "",
      } as SubCategoryLink,
      {
        name: "washing_machine",
        title: "Machines à laver",
        to: "",
      } as SubCategoryLink,
      {
        name: "dishwasher",
        title: "Lave vaisselles",
        to: "",
      } as SubCategoryLink,
      {
        name: "ovens",
        title: "Fours",
        to: "",
      } as SubCategoryLink,
      {
        name: "microwaves",
        title: "Micro-onde",
        to: "",
      } as SubCategoryLink,
      {
        name: "mixer",
        title: "Mixeurs",
        to: "",
      } as SubCategoryLink,
      {
        name: "drummers",
        title: "Batteurs",
        to: "",
      } as SubCategoryLink,
      {
        name: "knifes",
        title: "Couteaux",
        to: "",
      } as SubCategoryLink,
      {
        name: "cofee_makers",
        title: "Cafétiaires",
        to: "",
      } as SubCategoryLink,
      {
        name: "iron",
        title: "Fers à repasser",
        to: "",
      } as SubCategoryLink,
      {
        name: "others",
        title: "Divers ...",
        to: "",
      } as SubCategoryLink,
    ],
  },
  {
    name: "storage",
    title: "Stockages",
    to: "",
    subCategories: [
      {
        name: "internal_hdd_disk",
        title: "Disques durs internes HDD",
        to: "",
      } as SubCategoryLink,
      {
        name: "internal_ssd_disk",
        title: "Disques durs internes SSD",
        to: "",
      } as SubCategoryLink,
      {
        name: "external_hdd_disk",
        title: "Disques durs externes HDD",
        to: "",
      } as SubCategoryLink,
      {
        name: "external_hdd_disk",
        title: "Disques durs externes SSD",
        to: "",
      } as SubCategoryLink,
      {
        name: "USB_KEYS",
        title: "Clés USB",
        to: "",
      } as SubCategoryLink,
      {
        name: "memory_card",
        title: "Cartes mémoires",
        to: "",
      } as SubCategoryLink,
      {
        name: "cd",
        title: "CD vièrges",
        to: "",
      } as SubCategoryLink,
    ],
  },
  {
    name: "office_automation",
    title: "Bureautique",
    to: "",
    subCategories: [
      {
        name: "printer",
        title: "Imprimantes",
        to: "",
      } as SubCategoryLink,
      {
        name: "phototcopier",
        title: "Photocopieurs",
        to: "",
      } as SubCategoryLink,
      {
        name: "fax",
        title: "FAX",
        to: "",
      } as SubCategoryLink,
      {
        name: "papers",
        title: "Feuilles RAM",
        to: "",
      } as SubCategoryLink,
      {
        name: "ancre",
        title: "Bouteilles d'ancres",
        to: "",
      } as SubCategoryLink,
    ],
  },
] as CategoryLink[];
