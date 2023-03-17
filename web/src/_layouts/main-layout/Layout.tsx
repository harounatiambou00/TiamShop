import React from "react";
import { Outlet } from "react-router-dom";

//components
import { Header, Footer, LeftDrawer } from "../../components";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAppSelector } from "../../hooks/redux-custom-hooks/useAppSelector";
import { RootState } from "../../redux/store";

const Layout = () => {
  //left drawer toggle state
  const [openLeftDrawer, setOpenLeftDrawer] = React.useState<boolean>(false);

  const globalLoading = useAppSelector(
    (state: RootState) => state.globalLoading.isLoading
  );
  return (
    <div className="">
      <LeftDrawer open={openLeftDrawer} setOpen={setOpenLeftDrawer} />
      <Header
        openLeftDrawer={openLeftDrawer}
        setOpenLeftDrawer={setOpenLeftDrawer}
      >
        <span></span>
      </Header>
      <div className="sm:mt-header-sm-height lg:mt-header-lg-height">
        <Outlet />
      </div>
      <Footer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 10000 }}
        open={globalLoading}
      >
        <CircularProgress />
      </Backdrop>
    </div>
  );
};

export default Layout;
