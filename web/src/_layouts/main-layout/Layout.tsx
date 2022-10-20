import React from "react";
import { Outlet } from "react-router-dom";

//components
import { Header, Footer, LeftDrawer } from "../../components";

const Layout = () => {
  //left drawer toggle state
  const [openLeftDrawer, setOpenLeftDrawer] = React.useState<boolean>(false);

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
    </div>
  );
};

export default Layout;
