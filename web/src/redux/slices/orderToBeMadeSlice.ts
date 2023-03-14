import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CreateOrderLineDTO from "../../data/models/CreateOrderLineDTO";

export interface OrderToBeMadeType {
  ordererFirstName: string;
  ordererLastName: string;
  ordererEmail: string;
  ordererPhoneNumber: string;
  ordererCompleteAddress: string;
  clientId: number | null;
  neighborhoodId: number;
  lines: CreateOrderLineDTO[];
}

const initialState: OrderToBeMadeType = {
  ordererFirstName: "",
  ordererLastName: "",
  ordererEmail: "",
  ordererPhoneNumber: "",
  ordererCompleteAddress: "",
  clientId: null,
  neighborhoodId: 0,
  lines: [],
};

export const orderToBeMadeSlice = createSlice({
  name: "orderToBeMadeSlice",
  initialState,
  reducers: {
    setOrderToBeMade: (state, action: PayloadAction<OrderToBeMadeType>) => {
      state.ordererFirstName = action.payload.ordererFirstName;
      state.ordererLastName = action.payload.ordererLastName;
      state.ordererEmail = action.payload.ordererEmail;
      state.ordererPhoneNumber = action.payload.ordererPhoneNumber;
      state.ordererCompleteAddress = action.payload.ordererCompleteAddress;
      state.clientId = action.payload.clientId;
      state.neighborhoodId = action.payload.neighborhoodId;
      state.lines = action.payload.lines;
    },
  },
});

export const { setOrderToBeMade } = orderToBeMadeSlice.actions;
