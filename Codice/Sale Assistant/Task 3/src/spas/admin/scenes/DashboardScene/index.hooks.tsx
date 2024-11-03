import domNavigation from "@/models/client/DomNavigation";
import { useNavigate } from "react-router-dom";
import { DrawerElement } from "@/components/DashboardDrawer";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteAdminSessionsMe } from "@/spas/admin/redux-store/extra-actions";

export const useDashboardScene = () => {
  domNavigation.navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(deleteAdminSessionsMe.request({}));
    domNavigation.navigate("/login");
  };

  const elements: DrawerElement[] = [
    {
      label: "Organizzazioni ",
      icon: <CorporateFareIcon />,
      onClick: () => {
        domNavigation.navigate("organizations");
      },
    },
    {
      label: "Logout",
      icon: <LogoutIcon />,
      onClick: () => {
        handleLogout();
      },
    },
  ];

  return { elements };
};
