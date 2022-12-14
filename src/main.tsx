import React from "react";
import ReactDOM from "react-dom/client";
import theme from "@/app/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ReactQueryProvider from "./lib/react-query";
import { BrowserRouter } from "react-router-dom";
import Router from "@/app/router";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import SnackbarNoti from "./features/snackbar/snackbar";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Router />
              <SnackbarNoti />
            </PersistGate>
          </Provider>
        </BrowserRouter>
      </ThemeProvider>
    </ReactQueryProvider>
  </React.StrictMode>
);
