import React from "react";
import ReactDOM from "react-dom/client";

import { StyledEngineProvider } from "@mui/material/styles";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/muiCustomTheme";

import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </BrowserRouter>
  </ThemeProvider>
);
