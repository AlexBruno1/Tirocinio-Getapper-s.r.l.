import React, { memo } from "react";
import { useAssistantsList } from "./index.hooks";
import { AssistantFe } from "@/models/client/AssistantFe";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { AppButton } from "@/components/AppButton";
import AddIcon from "@mui/icons-material/Add";
import DownloadingIcon from "@mui/icons-material/Downloading";
import { Widget } from "@/components/Widget";

type AssistantsListProps = {
  assistants: AssistantFe[];
  handleOpenEditAssistantDialog: (assistant: { id: string }) => void;
  isAdmin?: boolean;
  viewColumns?: {
    viewChat: boolean;
    viewProspects: boolean;
    editAssistant: boolean;
  };
  createButtonEnabled: boolean;
};

export const AssistantsList = memo(
  ({
    assistants,
    handleOpenEditAssistantDialog,
    isAdmin,
    viewColumns,
    createButtonEnabled,
  }: AssistantsListProps) => {
    const {
      columns,
      rows,
      onAssistantDialogOpen,
      onInstructionsDialogOpen,
      columnVisibility,
    } = useAssistantsList(
      assistants,
      handleOpenEditAssistantDialog,
      isAdmin,
      viewColumns,
    );

    return (
      <Widget title="Elenco Assistant">
        <Stack spacing={2} sx={{ flex: 1 }}>
          {createButtonEnabled ? (
            <AppButton
              startIcon={<AddIcon />}
              onClick={onAssistantDialogOpen}
              variant="contained"
            >
              Aggiungi Assistant
            </AppButton>
          ) : null}
          {isAdmin ? (
            <AppButton
              startIcon={<DownloadingIcon />}
              onClick={onInstructionsDialogOpen}
              variant="outlined"
            >
              Genera Istruzioni Assistente
            </AppButton>
          ) : null}

          <DataGrid
            columns={columns}
            rows={rows}
            sx={{ flex: 1 }}
            columnVisibilityModel={columnVisibility}
            slots={{ toolbar: GridToolbar }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
          />
        </Stack>
      </Widget>
    );
  },
);
AssistantsList.displayName = "AssistantsList";
