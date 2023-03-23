import React from "react";
import { Page } from "../../components/core";

import { Outlet, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";
import Breadcumb from "../../components/core/breadcumb/Breadcumb";
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { BiMenuAltLeft } from "react-icons/bi";
import { linkType, links } from "./Sidebar/types";
import { LoadingButton } from "@mui/lab";
import { TbLogout } from "react-icons/tb";
import { useAppDispatch } from "../../hooks/redux-custom-hooks/useAppDispatch";
import { setAuthenticatedClient } from "../../redux/slices/authenticatedClientSlice";

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  let authenticatedClient = useAppSelector(
    (state: RootState) => state.authenticatedClient.client
  );

  React.useEffect(() => {
    if (
      isNaN(Number(clientId)) ||
      !authenticatedClient ||
      authenticatedClient.userId !== Number(clientId)
    ) {
      navigate("/");
    }
  });
  const [openMenuPopper, setOpenMenuPopper] = React.useState<boolean>(false);
  const menuPopperAnchorRef = React.useRef<HTMLButtonElement>(null);
  const handleToggleMenuPopover = () => {
    setOpenMenuPopper((prev) => !prev);
  };

  const handleCloseMenuPopper = (event: Event) => {
    if (
      menuPopperAnchorRef.current &&
      menuPopperAnchorRef.current.contains(event.target as HTMLButtonElement)
    ) {
      return;
    }

    setOpenMenuPopper(false);
  };

  const [activeLink, setActiveLink] = React.useState<linkType>("details");
  const handleNavigate = (prop: linkType) => {
    setActiveLink(prop);
    if (prop === "details") {
      navigate("");
    } else if (prop === "favorites") {
      navigate("my-favorites");
    } else if (prop === "orders") {
      navigate("my-orders");
    } else if (prop === "receipts") {
      navigate("my-receipts");
    } else if (prop === "settings") {
      navigate("my-settings");
    }
  };

  const dispatch = useAppDispatch();
  const [logoutIsLoading, setLogoutIsLoading] = React.useState<boolean>(false);
  const logout = async () => {
    setLogoutIsLoading(true);
    let url = process.env.REACT_APP_API_URL + "auth/logout";
    let response = await fetch(url, {
      method: "POST",
      credentials: "include",
    });

    let content = await response.json();
    if (content && content.success) {
      dispatch(setAuthenticatedClient({ client: null }));
    }
    setLogoutIsLoading(false);
  };
  return (
    <Page>
      <div>
        <Breadcumb
          items={[
            {
              title: "Mon compte",
            },
          ]}
        />
      </div>
      <div className="flex w-full items-center justify-between sm:mt-7 lg:mt-5 sm:px-3 lg:px-2">
        <h1 className="sm:text-5xl lg:text-4xl font-medium text-gray-700">
          Mon compte
        </h1>
        <Button
          className="sm:flex lg:hidden text-4xl normal-case font-kanit font-light"
          startIcon={<BiMenuAltLeft className="text-5xl" />}
          onClick={handleToggleMenuPopover}
          ref={menuPopperAnchorRef}
        >
          Menu
        </Button>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={openMenuPopper}
          anchorEl={menuPopperAnchorRef.current}
          role={undefined}
          transition
          disablePortal
          placement="bottom-end"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseMenuPopper}>
                  <MenuList autoFocusItem className="p-3">
                    {links.map((link, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          handleNavigate(link.title);
                          handleToggleMenuPopover();
                        }}
                        className={
                          activeLink === link.title
                            ? "font-kanit font-light text-4xl bg-primary text-white rounded-md drop-shadow-md py-5 mb-2"
                            : "font-kanit font-light text-4xl py-5 mb-2 text-primary"
                        }
                      >
                        <div className="text-5xl mr-5">{link.icon}</div>
                        {link.name}
                      </MenuItem>
                    ))}
                    <MenuItem className="font-kanit font-light text-4xl py-5 mt-10 mb-2 text-primary">
                      <LoadingButton
                        loading={logoutIsLoading}
                        loadingPosition="start"
                        fullWidth
                        variant="contained"
                        color="error"
                        startIcon={<TbLogout className="text-5xl mr-2" />}
                        onClick={logout}
                        className={
                          logoutIsLoading
                            ? "normal-case font-kanit justify-start font-light text-4xl"
                            : "bg-red-600 normal-case font-kanit justify-start font-light text-4xl"
                        }
                      >
                        Se déconnecter
                      </LoadingButton>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <div className="min-h-full flex mt-5">
        <div className="lg:w-2/12 sm:w-0 sm:hidden lg:block rounded-md drop-shadow-md">
          <Sidebar />
        </div>
        <div className="lg:w-10/12 sm:w-full bg-white rounded-md border-2 sm:ml-0 lg:ml-10 p-5">
          <Outlet context={[clientId]} />
        </div>
      </div>
    </Page>
  );
};

export default AccountPage;
