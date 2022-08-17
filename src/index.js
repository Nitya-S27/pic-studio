import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";
import store from "./store/userSlice";
import App from "./App";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <StyledEngineProvider>
        <App />
      </StyledEngineProvider>
    </Provider>
  </BrowserRouter>
);
