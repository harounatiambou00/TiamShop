import React from "react";
import { Page } from "../../components/core";

import { Breadcumb } from "../../components/client-account-page-components";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { Client } from "../../data/models/Client";
import moment from "moment";

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();

  React.useEffect(() => {
    if (isNaN(Number(clientId))) {
      navigate("/");
    }
  });
  return (
    <Page>
      <div>
        <Breadcumb />
      </div>
      <h1 className="mt-3 ml-2 text-4xl font-medium text-gray-700">
        Mon compte
      </h1>
      <div className="min-h-full flex mt-5">
        <div className="lg:w-2/12 rounded-md drop-shadow-md">
          <Sidebar />
        </div>
        <div className="lg:w-10/12 bg-white rounded-md border-2 ml-10">
          <Outlet context={[clientId]} />
        </div>
      </div>
    </Page>
  );
};

export default AccountPage;
