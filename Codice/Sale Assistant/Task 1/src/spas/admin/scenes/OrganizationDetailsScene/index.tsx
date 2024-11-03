import React, { memo } from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
  TextField,
} from "@mui/material";
import { useOrganizationDetailsScene } from "./index.hooks";
import { Widget } from "@/components/Widget";
import { Outlet } from "react-router-dom";
import List from "@mui/material/List";
import { WebsiteUrlsList } from "@/components/WebsiteUrlsList";

export const OrganizationDetailsScene = memo((props) => {
  const { organization } = useOrganizationDetailsScene();

  return (
    <Box
      sx={{
        backgroundImage: `url(${organization?.backgroundMedia})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Stack spacing={2}>
        <Widget>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={organization?.logoMedia?.url || "path/to/default/logo.png"}
                alt="Logo"
                sx={{ borderRadius: 2, marginRight: 2, width: 56, height: 56 }}
              />
              <Typography variant="h4" color="textPrimary">
                {organization?.name || "Nome Organizzazione"}
              </Typography>
            </Stack>
          </Stack>
        </Widget>
        <Outlet />
      </Stack>
    </Box>
  );
});

OrganizationDetailsScene.displayName = "OrganizationDetailsScene";
