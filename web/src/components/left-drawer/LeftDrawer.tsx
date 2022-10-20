import { Divider, Drawer, List } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineClose } from "react-icons/ai";
import { categoryLinks, CategoryNameType } from "../../data/category-links";
import LeftDrawerLink from "./left-drawer-link/LeftDrawerLink";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LeftDrawer = (props: Props) => {
  const [opennedCategory, setOpennedCategory] =
    React.useState<CategoryNameType>("none");
  const navigate = useNavigate();
  return (
    <div className="">
      <Drawer
        open={props.open}
        onClose={() => props.setOpen(false)}
        PaperProps={{
          sx: {
            width: {
              xs: "80%",
              lg: "28%",
            },
          },
        }}
        className="flex flex-col items-start"
      >
        <div className="bg-background sm:h-screen lg:h-auto sm:overflow-y-scroll">
          <div className="flex items-center justify-between sm:px-10 sm:py-4 lg:px-4 lg:py-2">
            <img
              src={"/" + process.env.PUBLIC_URL + "assets/images/logo.png"}
              alt="logo"
              className="sm:h-36 lg:h-20 cursor-pointer"
              onClick={() => navigate("/")}
            />

            <div
              className="lg:p-3 rounded-full hover:bg-orange-50 cursor-pointer transition delay-150"
              onClick={() => props.setOpen(false)}
            >
              <AiOutlineClose className="sm:text-4xl lg:text-xl text-gray-900" />
            </div>
          </div>
          <div className="lg:mt-5">
            <h1 className="sm:text-4xl lg:text-xl font-medium pl-4">
              Tendances
            </h1>
            <List disablePadding>
              <LeftDrawerLink
                name="none"
                title="Les plus vendus"
                opennedCategory={opennedCategory}
                setOpennedCategory={setOpennedCategory}
              />
              <LeftDrawerLink
                name="none"
                title="Nouveautés"
                opennedCategory={opennedCategory}
                setOpennedCategory={setOpennedCategory}
              />
              <LeftDrawerLink
                name="none"
                title="Recommandations"
                opennedCategory={opennedCategory}
                setOpennedCategory={setOpennedCategory}
              />
            </List>
            <Divider className="my-2" />
            <h1 className="sm:text-4xl lg:text-xl font-medium pl-4">
              Nos catégories
            </h1>
            <List disablePadding>
              {categoryLinks.map((link) => {
                return (
                  <LeftDrawerLink
                    key={link.name}
                    name={link.name}
                    title={link.title}
                    nestedLinks={link.subCategories}
                    opennedCategory={opennedCategory}
                    setOpennedCategory={setOpennedCategory}
                  />
                );
              })}
            </List>
            <Divider className="my-2" />
            <h1 className="sm:text-4xl lg:text-xl font-medium pl-4">
              Aide & Paramètres
            </h1>
            <List disablePadding>
              <LeftDrawerLink
                name="none"
                title="Votre compte"
                opennedCategory={opennedCategory}
                setOpennedCategory={setOpennedCategory}
              />
              <LeftDrawerLink
                name="none"
                title="Service Client"
                opennedCategory={opennedCategory}
                setOpennedCategory={setOpennedCategory}
              />
              <LeftDrawerLink
                name="none"
                title="Se déconnecter"
                opennedCategory={opennedCategory}
                setOpennedCategory={setOpennedCategory}
              />
            </List>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default LeftDrawer;
