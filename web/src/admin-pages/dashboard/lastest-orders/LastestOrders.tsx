import { Button } from "@mui/material";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const LastestOrders = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-5 bg-white rounded-md drop-shadow-sm p-4">
      <div className="flex items-center justify-between">
        <h1 className="font-raleway text-xl font-medium mb-2">
          Les nouvelles commandes
        </h1>
        <Button
          size="small"
          className="normal-case font-kanit font-light "
          startIcon={<BsPlus />}
          onClick={() => navigate("/admin/orders")}
        >
          Voir plus
        </Button>
      </div>
      <div className=""></div>
    </div>
  );
};

export default LastestOrders;
