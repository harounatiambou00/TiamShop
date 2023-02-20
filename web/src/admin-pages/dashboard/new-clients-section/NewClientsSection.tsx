import React from "react";
import { Client } from "../../../data/models";
import { Avatar, Button, IconButton } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { avatarColors } from "../../../utils/AvatarColors";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
type Props = {
  clients: Client[];
};

const NewClientsSection = ({ clients }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="mt-5 bg-white rounded-md drop-shadow-sm p-4">
      <div className="flex items-center justify-between">
        <h1 className="font-raleway text-xl font-medium mb-2">
          Les nouveaux clients
        </h1>
        <Button
          size="small"
          className="normal-case font-kanit font-light "
          startIcon={<BsPlus />}
          onClick={() => navigate("/admin/clients")}
        >
          Voir plus
        </Button>
      </div>
      <div className="">
        {clients.map((client) => (
          <div
            key={client.userId}
            className={
              clients.indexOf(client) % 2 === 0
                ? "p-2 flex items-center justify-between border-y-2 bg-gray-100"
                : "p-2 flex items-center justify-between border-y-2"
            }
          >
            <div className="flex items-center">
              <Avatar>{client.FirstName[0] + client.LastName[0]}</Avatar>
              <div className="ml-2 flex flex-col justify-center">
                <h3 className="text-base font-raleway font-medium">
                  {client.FirstName + " " + client.LastName}
                </h3>
                <span className="text-sm">{client.Email}</span>
                <span className="text-sm">
                  {client.PhoneNumber.slice(0, 2) +
                    "-" +
                    client.PhoneNumber.slice(2, 5) +
                    "-" +
                    client.PhoneNumber.slice(5, 8)}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <IconButton color="primary" className="mr-1">
                <MdOutlineEmail />
              </IconButton>
              <IconButton color="error">
                <AiOutlineDelete />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewClientsSection;
