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

import { links, linkType } from "../../../../pages/account/Sidebar/types";

import { RootState } from "../../../../redux/store";
import { useAppSelector } from "../../../../hooks/redux-custom-hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/redux-custom-hooks/useAppDispatch";
import { setAuthenticatedClient } from "../../../../redux/slices/authenticatedClientSlice";
import { LoadingButton } from "@mui/lab";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccountButtonPopover = ({ open, setOpen }: Props) => {
  const navigate = useNavigate();
  let authenticatedClient = useAppSelector(
    (state: RootState) => state.authenticatedClient.client
  );

  const dispatch = useAppDispatch();

  const [logoutIsLoading, setLogoutIsLoading] = React.useState<boolean>(false);
  const logout = async () => {
    setLogoutIsLoading(true);
    let url = process.env.REACT_APP_API_URL + "auth/logout";
    let response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "text/plain",
      },
    });

    let content = await response.json();
    console.log(content);
    if (content && content.success) {
      dispatch(setAuthenticatedClient({ client: null }));
    }
    setLogoutIsLoading(false);
  };

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
        {!authenticatedClient && (
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
            {authenticatedClient && (
              <>
                <h1 className="pl-3 text-xl font-medium text-gray-600">
                  Mon Compte
                </h1>
                {links.map((link) => {
                  return (
                    <ListItemButton
                      key={link.name}
                      onClick={() =>
                        authenticatedClient
                          ? navigate(
                              "/account/" +
                                authenticatedClient.userId +
                                "/" +
                                link.to
                            )
                          : {}
                      }
                    >
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
        {authenticatedClient && (
          <div>
            <Divider />
            <div className="p-2">
              <LoadingButton
                fullWidth
                loading={logoutIsLoading}
                variant="contained"
                className={
                  logoutIsLoading
                    ? "mb-2  font-kanit font-light"
                    : "mb-2 bg-red-500 font-kanit font-light"
                }
                startIcon={<BiLogOut />}
                onClick={logout}
              >
                Se déconnecter
              </LoadingButton>
            </div>
          </div>
        )}
      </div>
    </Popover>
  );
};

export default AccountButtonPopover;
