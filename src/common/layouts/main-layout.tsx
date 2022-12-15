import { useAppSelector } from "@/app/store";
import {
  selectIsNavigationOpen,
  selectIsNavigationFixed,
} from "@/features/navigation/navigation-slice";
import { Box, Paper, styled, Typography } from "@mui/material";
import React from "react";

import CollapsibleNavigation from "@/features/navigation/collapsible-navigation";

const Main = styled("main", {
  shouldForwardProp: (props) => props !== "isFullHeight",
})<{ isFullHeight: boolean }>(({ isFullHeight }) => ({
  height: "100%",
  maxHeight: "100%",
  overflow: "auto",
  padding: "34px 40px 0",
  flex: 1,
  ...(isFullHeight ? {
    display: 'flex',
    flexDirection: 'column'
  } : {})
}));

const Title = styled(Typography)({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "24px",
  lineHeight: "33px",
  marginBottom: "37px",
  textAlign: "center",
});

const MainLayout: React.FC<
  { title?: string; isFullHeight?: boolean } & React.PropsWithChildren
> = ({ children, title, isFullHeight = false }) => {
  const isNavigationOpen = useAppSelector(selectIsNavigationOpen);
  const isNavigationFixed = useAppSelector(selectIsNavigationFixed);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        paddingLeft: !isNavigationOpen && isNavigationFixed ? 3 : 0,
      }}
    >
      <CollapsibleNavigation />
      <Main isFullHeight={isFullHeight}>
        {(() => {
          if (title !== "undefined") {
            return (
              <>
                {!!title && <Title>{title}</Title>}
                <Paper
                  sx={{
                    backgroundColor: "white",
                    padding: 4,
                  }}
                  elevation={0}
                >
                  {children}
                </Paper>
              </>
            );
          }

          return children;
        })()}
      </Main>
    </Box>
  );
};

export default MainLayout;
