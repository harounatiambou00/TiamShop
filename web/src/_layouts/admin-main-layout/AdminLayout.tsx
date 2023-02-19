import { Outlet } from "react-router-dom";

import { Header, Leftbar } from "../../components/admin-layout";

const AdminLayout = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="h-screen max-h-screen flex">
        <Leftbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
