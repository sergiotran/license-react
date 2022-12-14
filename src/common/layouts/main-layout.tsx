import { Box, Paper, styled, Typography } from "@mui/material";
import React from "react";

import CollapsibleNavigation from "../components/collapsible-navigation";

const Main = styled("main")({
  height: "100%",
  maxHeight: "100%",
  overflow: "auto",
  padding: "34px 40px 0",
  flex: 1,
});

const Title = styled(Typography)({
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "24px",
  lineHeight: "33px",
  marginBottom: '37px',
  textAlign: 'center'
});

const MainLayout: React.FC<{ title?: string } & React.PropsWithChildren> = ({
  children,
  title,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <CollapsibleNavigation />
      <Main>
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
