import React from "react";
import ReactDOM from "react-dom/client";

import { StyledEngineProvider } from "@mui/material/styles";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/muiCustomTheme";

import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux";
import ScrollToTop from "./components/core/scroll-to-top/ScrollToTop";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop />
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
