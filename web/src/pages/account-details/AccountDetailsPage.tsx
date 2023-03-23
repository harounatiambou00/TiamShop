import { Button, IconButton } from "@mui/material";
import React from "react";

import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Client } from "../../data/models/AccountPageClient";

import FormGroup from "./form-group/FormGroup";

const AccountDetailsPage = () => {
  const navigate = useNavigate();
  const [readOnly, setReadOnly] = React.useState(true);
  const [client, setClient] = React.useState<Client>({
    userId: 0,
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    CompleteAddress: "",
    BirthDate: "",
    NeighborhoodId: 0,
  });
  const clientId = useOutletContext();

  React.useEffect(() => {
    if (isNaN(Number(clientId))) {
      navigate("/");
    }
  });

  const getClient = async () => {
    let url =
      process.env.REACT_APP_API_URL + "users/get-user-by-id/" + clientId;
    let response = await fetch(url);
    let content = await response.json();
    if (content.success) {
      let data = content.data;
      setClient((prevClient) => ({ ...prevClient, userId: data.userId }));
      setClient((prevClient) => ({ ...prevClient, FirstName: data.firstName }));
      setClient((prevClient) => ({ ...prevClient, LastName: data.lastName }));
      setClient((prevClient) => ({ ...prevClient, Email: data.email }));
      setClient((prevClient) => ({
        ...prevClient,
        PhoneNumber: data.phoneNumber,
      }));
      setClient((prevClient) => ({
        ...prevClient,
        CompleteAddress: data.completeAddress,
      }));
      setClient((prevClient) => ({
        ...prevClient,
        BirthDate: data.birthDate.slice(0, 10),
      }));
      setClient((prevClient) => ({
        ...prevClient,
        NeighborhoodId: data.neighborhoodId,
      }));
    } else {
      navigate("/");
    }
  };

  React.useEffect(() => {
    getClient();
  }, []);
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="sm:text-4xl lg:text-2xl font-medium text-gray-600">
          Mes informations personnelles
        </h1>
        <div className="sm:block lg:hidden">
          {readOnly ? (
            <IconButton onClick={() => setReadOnly(!readOnly)} color="primary">
              <FiEdit className="text-4xl" />
            </IconButton>
          ) : (
            <IconButton onClick={() => setReadOnly(!readOnly)} color="error">
              <MdOutlineCancel className="text-4xl" />
            </IconButton>
          )}
        </div>
        <div className="sm:hidden lg:block">
          <Button
            variant="contained"
            className={
              readOnly
                ? "bg-primary font-kanit normal-case font-normal"
                : "bg-red-600 font-kanit normal-case font-normal"
            }
            startIcon={readOnly ? <FiEdit /> : <MdOutlineCancel />}
            onClick={() => setReadOnly(!readOnly)}
          >
            {readOnly ? "Modifier" : "Annuler"}
          </Button>
        </div>
      </div>
      <span className="sm:text-xl lg:text-sm">
        Ici, vous avez la possibilté de voir et modifier toutes les informations
        vous concernant.
      </span>
      <div className="px-14">
        {client !== null && (
          <FormGroup
            readOnly={readOnly}
            client={client}
            setReadOnly={setReadOnly}
          />
        )}
      </div>
    </div>
  );
};

export default AccountDetailsPage;
