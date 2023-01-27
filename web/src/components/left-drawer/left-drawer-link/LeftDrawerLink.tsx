import React, { ReactNode } from "react";

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SubCategory } from "../../../data/models/SubCategory";

type Props = {
  name: string;
  title: string;
  action?: () => void;
  subCategories?: SubCategory[];
  opennedCategory: string;
  setOpennedCategory: React.Dispatch<React.SetStateAction<string>>;
  icon?: ReactNode;
};

const LeftDrawerLink = ({
  name,
  title,
  action,
  subCategories,
  opennedCategory,
  setOpennedCategory,
  icon,
}: Props) => {
  const handleClickCategoryLink = (name: string) => {
    if (opennedCategory === name) setOpennedCategory("none");
    else setOpennedCategory(name);
  };
  if (subCategories) {
    return (
      <ListItem className="w-full flex flex-col items-start justify-between">
        <ListItemButton
          onClick={() => handleClickCategoryLink(name)}
          className="w-full flex items-center justify-between"
        >
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText
            primary={title}
            primaryTypographyProps={{
              sx: {
                fontFamily: "raleway, 'sans-serif'",
                fontSize: {
                  md: 30,
                  lg: 16,
                },
                fontWeight: 600,
              },
            }}
          />
          {opennedCategory === name ? (
            <MdOutlineKeyboardArrowUp className="sm:text-4xl lg:text-base" />
          ) : (
            <MdOutlineKeyboardArrowDown className="sm:text-4xl lg:text-base" />
          )}
        </ListItemButton>
        <Collapse in={opennedCategory === name} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subCategories.map((subCategory) => {
              return (
                <ListItemButton sx={{ pl: 4 }} key={subCategory.SubCategoryId}>
                  <ListItemText
                    primary={subCategory.SubCategoryTitle}
                    primaryTypographyProps={{
                      sx: {
                        fontFamily: "raleway, 'sans-serif'",
                        fontSize: {
                          md: 30,
                          lg: 16,
                        },
                      },
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </ListItem>
    );
  } else {
    return (
      <ListItem className="w-full flex flex-col items-start justify-between">
        <ListItemButton className="w-full flex items-center justify-between">
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText
            primary={title}
            primaryTypographyProps={{
              sx: {
                fontFamily: "raleway, 'sans-serif'",
                fontSize: {
                  md: 30,
                  lg: 16,
                },
                fontWeight: 600,
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  }
};

export default LeftDrawerLink;
