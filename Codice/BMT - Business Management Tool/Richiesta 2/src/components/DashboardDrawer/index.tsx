import React, { memo } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer, { DrawerProps } from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCardIcon from "@mui/icons-material/AddCard";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useDashboardDrawer } from "./index.hooks";
import { AppBarProps, Button, CircularProgress, Stack } from "@mui/material";
import { DashboardDrawerHeader } from "@/components/DashboardDrawerHeader";
import { LanguageMenu } from "@/components/LanguageMenu";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CategoryIcon from "@mui/icons-material/Category";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { ActivityForm } from "@/components/ActivityForm";
import AddIcon from "@mui/icons-material/Add";
import { CreateActivityDialog } from "@/components/CreateActivityDialog";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = ({ open, ...props }: AppBarProps & { open: boolean }) => {
  const theme = useTheme();

  return (
    <MuiAppBar
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}
      {...props}
    />
  );
};

const Drawer = ({ open, ...props }: DrawerProps & { open: boolean }) => {
  const theme = useTheme();

  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        }),
        ...(!open && {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        }),
      }}
      {...props}
    />
  );
};

type DashboardDrawerProps = {};

export const DashboardDrawer = memo(({}: DashboardDrawerProps) => {
  const {
    t,
    theme,
    open,
    handleDrawerOpen,
    handleDrawerClose,
    menuItems,
    navigate,
    handleLogout,
    isLoggingOut,
    locale,
    handleOpenCreateActivityDialog,
  } = useDashboardDrawer();

  const renderIcon = (menuItemId: string) => {
    switch (menuItemId) {
      case "customers":
        return <ApartmentIcon />;
      case "projects":
        return <CategoryIcon />;
      case "jobs":
        return <AssignmentIcon />;
      case "workers":
        return <AccountBoxIcon />;
      case "collaborators":
        return <WorkIcon />;
      case "employees":
        return <BadgeIcon />;
      case "internships":
        return <SchoolIcon />;
      case "taxes":
        return <PriceChangeIcon />;
      case "internship":
        return <SchoolIcon />;
      case "collaboration":
        return <WorkIcon />;
      case "employment":
        return <BadgeIcon />;
      case "serviceExpenses":
        return <AddCardIcon />;
      case "profile":
        return <AccountCircleIcon />;
      default:
        return <InboxIcon />;
    }
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            flex={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: "#fff" }}
            >
              Getapper - Business Management tool
            </Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleOpenCreateActivityDialog}
            >
              Activity
            </Button>
            <CreateActivityDialog />
            {/*<Button color="inherit" variant="contained" onclick={}>Prova</Button>*/}
            <LanguageMenu locale={locale} urlPattern={"/$locale/app"} />
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DashboardDrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DashboardDrawerHeader>
        <Divider />
        <List>
          {menuItems.map((menuItem, index) => (
            <ListItem
              key={menuItem.id}
              data-cy={`menu-item-${menuItem.id}`}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(menuItem.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {renderIcon(menuItem.id)}
                </ListItemIcon>
                <ListItemText
                  primary={menuItem.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={handleLogout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {isLoggingOut ? <CircularProgress size={24} /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText
                primary={t("generic.logout")}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
});

DashboardDrawer.displayName = "DashboardDrawer";
