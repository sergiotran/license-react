import { Box, IconButton, Collapse, Fade, Stack, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React from "react";
type Props = {};

const NAV_WIDTH = 300;

const Menu = styled("nav")({
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  maxHeight: "100%",
});

const Header = styled(Stack, {
  shouldForwardProp: (props) => props !== "isCollapsed",
})<{ isCollapsed: boolean }>(({ theme, isCollapsed }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: `28px 0 28px ${!isCollapsed ? 0 : 28}px`,
}));

const ToggleButton = styled(IconButton)({
  padding: 0,
  width: 40,
  background: "transparent",
  "&:hover": {
    background: "transparent",
  },
});

const CollapsibleNavigation: React.FC<Props> = () => {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);

  const handleToggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <Menu>
      <Collapse orientation="horizontal" in={isCollapsed} collapsedSize={40}>
        <Box
          width={NAV_WIDTH}
          sx={{
            backgroundColor: "primary.dark",
            height: "100vh",
          }}
        >
          <Header
            direction="row"
            alignItems="stretch"
            isCollapsed={isCollapsed}
          >
            <Fade in={isCollapsed} unmountOnExit>
              <Box flex={1} display="flex" alignItems="center">
                <img src="/imgs/logo.png" alt="logo" />
              </Box>
            </Fade>
            <Box
              flex={0}
              display="flex"
              justifyContent="center"
              marginTop={!isCollapsed ? 0 : "-28px"}
              marginBottom={!isCollapsed ? 0 : "-28px"}
              alignItems="center"
              sx={{
                backgroundColor: !isCollapsed
                  ? "transparent"
                  : "hsla(0,0%,100%,.2)",
              }}
            >
              <ToggleButton onClick={handleToggleCollapse}>
                {!isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
              </ToggleButton>
            </Box>
          </Header>
        </Box>
      </Collapse>
    </Menu>
  );
};

export default CollapsibleNavigation;
