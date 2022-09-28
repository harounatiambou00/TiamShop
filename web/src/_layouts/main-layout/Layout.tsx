import React from "react";
import { Outlet } from "react-router-dom";

//components
import { Header, Footer } from "../../components";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
