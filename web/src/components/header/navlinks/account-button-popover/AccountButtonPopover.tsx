import {
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import React from "react";

import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FiUserPlus } from "react-icons/fi";
import { MdCompareArrows } from "react-icons/md";

import { useNavigate } from "react-router-dom";

import { links } from "../../../../pages/account/Sidebar/types";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccountButtonPopover = ({ open, setOpen }: Props) => {
  const navigate = useNavigate();
  /**
   * TODO Change the isAuthenticated state to a real one
   */
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  return (
    <Popover
      open={open}
      onClose={() => setOpen(false)}
      anchorEl={document.getElementById("app-header-account-button")}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      disableScrollLock
      disableAutoFocus
      id="account-button-popover"
    >
      <div className="w-60 bg-gray-50">
        {!isAuthenticated && (
          <div>
            <div className="p-2">
              <Button
                fullWidth
                variant="contained"
                className="mb-2 bg-primary font-kanit font-light"
                startIcon={<BiLogIn />}
                onClick={() => navigate("/sign-in")}
              >
                Connexion
              </Button>
              <Button
                fullWidth
                variant="outlined"
                className="font-kanit font-light"
                startIcon={<FiUserPlus />}
                onClick={() => navigate("/sign-up")}
              >
                Inscription
              </Button>
            </div>
            <Divider />
          </div>
        )}
        <div className="">
          <List>
            {isAuthenticated && (
              <>
                <h1 className="pl-3 text-xl font-medium text-gray-600">
                  Mon Compte
                </h1>
                {links.map((link) => {
                  return (
                    <ListItemButton>
                      <ListItemIcon>{link.icon}</ListItemIcon>
                      <ListItemText
                        primary={link.name}
                        primaryTypographyProps={{
                          sx: {
                            fontFamily: "Kanit, 'sans-serif'",
                            fontWeight: 300,
                          },
                        }}
                        sx={{
                          fontFamily: "Kanit, 'sans-serif'",
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </>
            )}
            <ListItemButton>
              <ListItemIcon>
                <MdCompareArrows className="text-xl" />
              </ListItemIcon>
              <ListItemText
                primary="Comparer"
                primaryTypographyProps={{
                  sx: {
                    fontFamily: "Kanit, 'sans-serif'",
                    fontWeight: 300,
                  },
                }}
                sx={{ fontFamily: "Kanit, 'sans-serif'" }}
              />
            </ListItemButton>
          </List>
        </div>
        {isAuthenticated && (
          <div>
            <Divider />
            <div className="p-2">
              <Button
                fullWidth
                variant="contained"
                className="mb-2 bg-red-500 font-kanit font-light"
                startIcon={<BiLogOut />}
                onClick={() => {}}
              >
                Se déconnecter
              </Button>
            </div>
          </div>
        )}
      </div>
    </Popover>
  );
};

export default AccountButtonPopover;
