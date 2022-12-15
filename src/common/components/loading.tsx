import React from "react";
import { CircularProgress, Stack } from "@mui/material";
import MainLayout from "../layouts/main-layout";

const Loading = () => {
  return (
    <MainLayout>
      <Stack
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Stack>
    </MainLayout>
  );
};

export default Loading;
