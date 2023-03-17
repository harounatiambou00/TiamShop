import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Admin } from "../data/models/Admin";
import { useAppDispatch } from "../hooks/redux-custom-hooks/useAppDispatch";
import { useAppSelector } from "../hooks/redux-custom-hooks/useAppSelector";
import { setAuthenticatedAdmin } from "../redux/slices/authenticatedAdminSlice";
import { RootState } from "../redux/store";

const AdminApp = () => {
  const dispatch = useAppDispatch();
  let authenticatedAdmin = useAppSelector(
    (state: RootState) => state.authenticatedAdmin.admin
  );
  const navigate = useNavigate();
  React.useEffect(() => {
    const getAuthenticatedAdmin = async () => {
      let url = process.env.REACT_APP_API_URL + "auth/admins/get-logged-admin";
      let response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      let content = await response.json();
      if (content) {
        if (content.success) {
          let data = content.data;

          let admin: Admin = {
            Id: data.userId,
            UserGuid: data.userGuid,
            FirstName: data.firstName,
            LastName: data.lastName,
            Email: data.email,
            PhoneNumber: data.phoneNumber,
            CompleteAddress: data.completeAddress,
            BirthDate: new Date(data.birthDate),
            JobTitle: data.jobTitle,
            JobDescription: data.jobDescription,
          };

          dispatch(setAuthenticatedAdmin({ admin: admin }));
          console.log(content);
        } else {
          navigate("/");
          dispatch(setAuthenticatedAdmin({ admin: null }));
        }
      }
    };

    getAuthenticatedAdmin();
  }, []);

  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
};

export default AdminApp;
