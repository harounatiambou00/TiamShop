import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomImage } from "../../data/models/Image";

export interface ImagesType {
  images: CustomImage[];
}

const initialState: ImagesType = {
  images: [],
};

export const imagesSlice = createSlice({
  name: "imagesSlice",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<ImagesType>) => {
      state.images = action.payload.images;
    },
  },
});

export const { setImages } = imagesSlice.actions;
