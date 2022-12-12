import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@/app/routes";
import theme from "@/app/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ReactQueryProvider from "./lib/react-query";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReactQueryProvider>
  </React.StrictMode>
);
