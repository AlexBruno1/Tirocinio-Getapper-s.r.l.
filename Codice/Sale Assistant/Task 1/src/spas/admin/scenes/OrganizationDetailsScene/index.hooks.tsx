import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectors } from "@/spas/admin/redux-store";
import { useParams } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Checkbox } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

export const useOrganizationDetailsScene = () => {
  const { organizationId } = useParams();
  const organizations = useSelector(selectors.getAdminOrganizations);
  const organization = useMemo(
    () => organizations.find((org) => org._id === organizationId),
    [organizations, organizationId],
  );

  return {
    organization,
  };
};
