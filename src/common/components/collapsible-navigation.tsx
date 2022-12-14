import {
  Box,
  IconButton,
  Collapse,
  Fade,
  Stack,
  styled,
  Typography,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItemButtonProps,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React from "react";
import { NavLink } from "react-router-dom";

type NavigationProps = {
  [title: string]: Array<NavigationItemProps>;
};
type NavigationItemProps = {
  href: string;
  value: string;
  icon?: string;
};

const NAV_WIDTH = 300;

const Menu = styled("nav", {
  shouldForwardProp: (props) => props !== "isFixed",
})<{ isFixed: boolean }>(({isFixed}) => ({
  position: isFixed ? "fixed" : "relative",
  ...(isFixed ? {
    left: 0,
    top: 0,
    bottom: 0,
  } : {}),
  maxHeight: "100%",
  maxWidth: "100%",
  height: "100vh",
}));

const MenuSeparateTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.primary.main,
  margin: "28px 0 17px",
  padding: "0 40px",
  fontSize: 15,
  lineHeight: "20px",
  textTransform: "uppercase",
}));

const MenuItemIcon = styled("img")({
  minWidth: "initial",
  width: 20,
  height: "auto",
  display: "block",
});

const MenuItem = styled(ListItemButton, {
  shouldForwardProp: (props) => props !== "isCollapsed",
})<{ isCollapsed: boolean } & ListItemButtonProps>(
  ({ theme, isCollapsed }) => ({
    position: "relative",
    padding: 0,
    "& a": {
      padding: isCollapsed ? "0 40px" : "0",
      color: "#646C7B",
      textDecoration: "none",
      display: "flex",
      ...(!isCollapsed
        ? {
            width: 40,
            height: 40,
            flex: 0,
            flexBasis: 40,
            justifyContent: "center",
          }
        : {
            alignItems: "center",
            flex: 1,
            gap: 16,
          }),
      "&:hover, &.active": {
        backgroundColor: "#1D273C",
      },
      "& span": {
        lineHeight: "48px",
        fontSize: 15,
        fontWeight: 400,
      },
    },
    "&:hover a, & a.active": {
      color: theme.palette.primary.main,
    },
  })
);

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

const NAVIGATION_ITEMS = {
  "Account Management": [
    {
      href: "/dashboard/account-information",
      value: "Account information",
      icon: "/icons/ic-account.svg",
    },
    {
      href: "/dashboard/security",
      value: "Security",
      icon: "/icons/ic-lock.svg",
    },
    {
      href: "/dashboard/licenses",
      value: "License",
      icon: "/icons/ic-key.svg",
    },
    {
      href: "/dashboard/payment",
      value: "Payment method",
      icon: "/icons/ic-credit.svg",
    },
  ],
  "User Management": [
    {
      href: "/dashboard/users",
      value: "All Users",
      icon: "/icons/ic-users.svg",
    },
    {
      href: "/dashboard/roles",
      value: "Roles & Permissions",
      icon: "/icons/ic-user-guard.svg",
    },
  ],
} as NavigationProps;

const CollapsibleNavigation: React.FC = () => {
  const [isFixed, setIsFixed] = React.useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true);

  const handleToggleCollapse = () => setIsCollapsed(!isCollapsed);

  React.useEffect(() => {
    const handler = () => {
      const width = window.innerWidth;
      setIsCollapsed(width > 768);
      setIsFixed(width <= 768);
    };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <Menu isFixed={isFixed}>
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
          <List>
            {Object.entries(NAVIGATION_ITEMS).map(([title, items]) => {
              return (
                <React.Fragment key={title}>
                  {isCollapsed && (
                    <MenuSeparateTitle key={title}>{title}</MenuSeparateTitle>
                  )}
                  {items.map((item) => (
                    <NavigationItem
                      isCollapsed={isCollapsed}
                      key={item.href}
                      {...item}
                    />
                  ))}
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      </Collapse>
    </Menu>
  );
};

const NavigationItem: React.FC<
  { isCollapsed: boolean } & NavigationItemProps
> = (itemProps) => {
  return (
    <MenuItem isCollapsed={itemProps.isCollapsed}>
      <NavLink to={itemProps.href}>
        <ListItemIcon style={{ minWidth: "initial" }}>
          <MenuItemIcon src={itemProps.icon} alt={itemProps.value} />
        </ListItemIcon>
        {itemProps.isCollapsed && <ListItemText primary={itemProps.value} />}
      </NavLink>
    </MenuItem>
  );
};

export default CollapsibleNavigation;
