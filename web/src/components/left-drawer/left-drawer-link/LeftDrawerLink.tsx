import React, { ReactNode } from "react";

import {
  SubCategoryLink,
  CategoryNameType,
} from "../../../data/category-links";
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

type Props = {
  name: CategoryNameType;
  title: string;
  action?: () => void;
  nestedLinks?: Array<SubCategoryLink>;
  opennedCategory: CategoryNameType;
  setOpennedCategory: React.Dispatch<React.SetStateAction<CategoryNameType>>;
  icon?: ReactNode;
};

const LeftDrawerLink = ({
  name,
  title,
  action,
  nestedLinks,
  opennedCategory,
  setOpennedCategory,
  icon,
}: Props) => {
  const handleClickCategoryLink = (name: CategoryNameType) => {
    if (opennedCategory === name) setOpennedCategory("none");
    else setOpennedCategory(name);
  };
  if (nestedLinks) {
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
            {nestedLinks.map((subCategory) => {
              return (
                <ListItemButton sx={{ pl: 4 }} key={subCategory.name}>
                  <ListItemText
                    primary={subCategory.title}
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
