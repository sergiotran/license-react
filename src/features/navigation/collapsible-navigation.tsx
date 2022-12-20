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
import { useAppSelector } from "@/app/store";
import {
  selectIsNavigationOpen,
  toggleNavigationOpen,
  setNavigationState,
  setIsNavigationFixed,
  selectIsNavigationFixed,
} from "./navigation-slice";
import { useDispatch } from "react-redux";

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
})<{ isFixed: boolean }>(({ isFixed }) => ({
  position: isFixed ? "fixed" : "relative",
  ...(isFixed
    ? {
        left: 0,
        top: 0,
        bottom: 0,
      }
    : {}),
  maxHeight: "100%",
  maxWidth: "100%",
  height: "100vh",
  zIndex: 1000,
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
})<{ isCollapsed: boolean } & ListItemButtonProps>(({ theme, isCollapsed }) => {
  const transition = theme.transitions.create("all");
  return {
    position: "relative",
    padding: 0,
    "& a": {
      padding: isCollapsed ? "0 40px" : "0",
      color: "#646C7B",
      textDecoration: "none",
      display: "flex",
      transition: transition,
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
  };
});

const Header = styled(Stack, {
  shouldForwardProp: (props) => props !== "isCollapsed",
})<{ isCollapsed: boolean }>(({ theme, isCollapsed }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: `28px 0 28px ${!isCollapsed ? 0 : 28}px`,
  minHeight: '81px'
}));

const ToggleButton = styled(IconButton)({
  padding: 0,
  width: 40,
  background: "transparent",
  "&:hover": {
    background: "transparent",
  },
});

export const NAVIGATION_ITEMS = {
  "Account Management": [
    {
      href: "/settings/account-information",
      value: "Account information",
      icon: "/icons/ic-account.svg",
    },
    {
      href: "/settings/security",
      value: "Security",
      icon: "/icons/ic-lock.svg",
    },
    {
      href: "/settings/licenses/manage",
      value: "License",
      icon: "/icons/ic-key.svg",
    },
    {
      href: "/settings/payment-method/manage",
      value: "Payment method",
      icon: "/icons/ic-credit.svg",
    },
  ],
  "User Management": [
    {
      href: "/settings/users/manage",
      value: "All Users",
      icon: "/icons/ic-users.svg",
    },
    {
      href: "/settings/permission/manage",
      value: "Roles & Permissions",
      icon: "/icons/ic-user-guard.svg",
    },
  ],
} as NavigationProps;

const CollapsibleNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useAppSelector(selectIsNavigationOpen);
  const isFixed = useAppSelector(selectIsNavigationFixed);

  const handleToggleCollapse = () => dispatch(toggleNavigationOpen());

  React.useEffect(() => {
    const handler = () => {
      const width = window.innerWidth;
      dispatch(setNavigationState(width > 768));
      dispatch(setIsNavigationFixed(width <= 768));
    };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <Menu isFixed={isFixed}>
      <Collapse orientation="horizontal" in={isOpen} collapsedSize={40}>
        <Stack
          width={NAV_WIDTH}
          sx={{
            backgroundColor: "primary.dark",
            height: "100vh",
          }}
        >
          <Header direction="row" alignItems="stretch" isCollapsed={isOpen}>
            <Fade in={isOpen} unmountOnExit>
              <Box flex={1} display="flex" alignItems="center">
                <img src="/imgs/logo.png" alt="logo" />
              </Box>
            </Fade>
            <Box
              flex={0}
              display="flex"
              justifyContent="center"
              marginTop={!isOpen ? 0 : "-28px"}
              marginBottom={!isOpen ? 0 : "-28px"}
              alignItems="center"
              sx={{
                backgroundColor: !isOpen ? "transparent" : "hsla(0,0%,100%,.2)",
              }}
            >
              <ToggleButton onClick={handleToggleCollapse}>
                {!isOpen ? <MenuIcon /> : <ChevronLeftIcon />}
              </ToggleButton>
            </Box>
          </Header>
          <List
            sx={{
              flex: 1,
              overflow: "auto",
            }}
          >
            {Object.entries(NAVIGATION_ITEMS).map(([title, items]) => {
              return (
                <React.Fragment key={title}>
                  {isOpen && (
                    <MenuSeparateTitle key={title}>{title}</MenuSeparateTitle>
                  )}
                  {items.map((item) => (
                    <NavigationItem
                      isCollapsed={isOpen}
                      key={item.href}
                      {...item}
                    />
                  ))}
                </React.Fragment>
              );
            })}
          </List>
        </Stack>
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
