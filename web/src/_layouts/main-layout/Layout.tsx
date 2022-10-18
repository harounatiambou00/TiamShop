import React from "react";
import { Outlet } from "react-router-dom";

//components
import { Header, Footer } from "../../components";

const Layout = () => {
  return (
    <div>
      <Header>
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
