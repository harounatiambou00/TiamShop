import React from "react";
import { BsDot } from "react-icons/bs";
import { TbLineDashed } from "react-icons/tb";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Fev",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mars",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Avr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Mai",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Juin",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Juillet",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Aout",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const OrdersAndRevenusGraph = () => {
  return (
    <div className="bg-white mt-10 pt-5">
      <div className="w-full flex items-center justify-between px-5">
        <h1 className=" text-2xl font-raleway font-medium mb-3">
          Revenus
          <span className="text-sm align-bottom">
            ( en milliers de fcfa )
          </span>{" "}
          & Commandes
        </h1>
        <div className="flex items-center">
          <span className="flex items-center mr-5 text-lg font-normal">
            <TbLineDashed className="text-3xl text-secondary" /> Revenus
          </span>
          <span className="flex items-center text-lg font-normal">
            <TbLineDashed className="text-3xl text-primary" /> Commandes
          </span>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <LineChart
          data={data}
          width={1000}
          height={400}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#003049"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#d67d3e"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </div>
    </div>
  );
};

export default OrdersAndRevenusGraph;
