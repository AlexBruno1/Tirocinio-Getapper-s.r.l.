import React, { memo } from "react";
import { useAdminOrganizationsListScene } from "./index.hooks";
import { Widget } from "@/components/Widget";
import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AppButton } from "@/components/AppButton";
import AddIcon from "@mui/icons-material/Add";
import { EditOrganizationDialog } from "@/components/EditOrganizationDialog";

type AdminOrganizationsListSceneProps = {};

export const AdminOrganizationsListScene = memo(
  ({}: AdminOrganizationsListSceneProps) => {
    const { columns, rows } = useAdminOrganizationsListScene();

    return (
      <>
        <Stack p={2} sx={{ height: "100%" }}>
          <Widget
            title="Organizzazioni"
            sx={{
              height: "100%",
            }}
          >
            <Stack spacing={2} sx={{ flex: 1 }}>
              <AppButton
                startIcon={<AddIcon />}
                path="/organizations/new"
                variant="outlined"
              >
                Crea una nuova organizzazione
              </AppButton>
              <DataGrid columns={columns} rows={rows} sx={{ flex: 1 }} />
            </Stack>
          </Widget>
        </Stack>
        <EditOrganizationDialog />
      </>
    );
  },
);

AdminOrganizationsListScene.displayName = "AdminOrganizationsListScene";
