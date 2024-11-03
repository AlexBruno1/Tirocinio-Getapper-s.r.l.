import { GridColDef } from "@mui/x-data-grid";
import { AssistantFe } from "@/models/client/AssistantFe";
import React, { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chip, IconButton, Tooltip } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MessageIcon from "@mui/icons-material/Message";
import EditIcon from "@mui/icons-material/Edit";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";
import { useDispatch } from "react-redux";
import { actions } from "@/spas/admin/redux-store";
import { DialogTypes } from "@/spas/admin/redux-store/slices/ui/ui.interfaces";
import { AssistantStatus } from "@/models/common/AssistantCommon";

type AssistantListItem = {
  id: string;
  slug: string;
  name: string;
  status: AssistantStatus;
};

export const useAssistantsList = (
  assistants: AssistantFe[],
  handleOpenEditAssistantDialog,
  isAdmin?: boolean,
  viewColumns?: {
    viewChat: boolean;
    viewProspects: boolean;
    editAssistant: boolean;
  },
) => {
  const navigate = useNavigate();
  const { organizationId } = useParams();
  const dispatch = useDispatch();

  const onAssistantDialogOpen = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_ASSISTANT,
        open: true,
      }),
    );
  }, [dispatch]);

  const onInstructionsDialogOpen = useCallback(() => {
    dispatch(actions.setInstructionsDialog());
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.GENERATE_INSTRUCTIONS,
        open: true,
      }),
    );
  }, [dispatch]);

  const renderStatusIcon = (status: AssistantStatus) => {
    switch (status) {
      case AssistantStatus.Pending:
        return (
          <Chip
            icon={<HourglassFullIcon />}
            label="In lavorazione"
            color="default"
            variant="filled"
          />
        );
      case AssistantStatus.Active:
        return (
          <Chip
            icon={<CheckIcon />}
            label="Attivo"
            color="success"
            variant="filled"
          />
        );
      default:
        return (
          <Chip
            icon={<WarningIcon />}
            label="Azione necessaria"
            color="error"
            variant="filled"
          />
        );
    }
  };

  const renderViewAssistantLink = (params) => {
    const isUser = !isAdmin;
    const isAssistantActive = params.row.status === AssistantStatus.Active;

    if (isAdmin || (isUser && isAssistantActive)) {
      return (
        <Tooltip title={"Link assistente"} arrow>
          <IconButton href={`/assistant/${params.row.slug}`} target="_blank">
            <RemoveRedEyeIcon />
          </IconButton>
        </Tooltip>
      );
    }

    return null;
  };

  const columns: GridColDef<AssistantListItem>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "slug",
      headerName: "Slug",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Stato",
      width: 170,
      renderCell: (params) => renderStatusIcon(params.row.status),
    },
    {
      field: "viewAssistant",
      headerName: "",
      width: 60,
      renderCell: renderViewAssistantLink,
    },
    {
      field: "viewChat",
      headerName: "",
      width: 60,
      renderCell: (params) => (
        <Tooltip title={"Elenco chat"} arrow>
          <IconButton
            onClick={() =>
              navigate(
                `/organizations/${organizationId}/assistants/${params.id}/chats`,
              )
            }
          >
            <MessageIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "viewProspects",
      headerName: "",
      width: 60,
      renderCell: (params) => (
        <Tooltip title={"Elenco prospects"} arrow>
          <IconButton
            onClick={() =>
              navigate(
                `/organizations/${organizationId}/assistants/${params.id}/prospects`,
              )
            }
          >
            <HowToRegIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "editAssistant",
      headerName: "",
      hideable: true,
      width: 60,
      renderCell: (params) => (
        <Tooltip title={"Modifica assistente"} arrow>
          <IconButton
            color={"warning"}
            onClick={() => handleOpenEditAssistantDialog(params.row)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const columnVisibility = viewColumns
    ? viewColumns
    : {
        viewChat: false,
        viewProspects: false,
        editAssistant: false,
      };

  const rows = useMemo<AssistantListItem[]>(
    () =>
      assistants.map((assistant) => ({
        id: assistant._id?.toString(),
        slug: assistant.slug,
        name: assistant.name,
        status: assistant.status,
      })),
    [assistants],
  );

  return {
    columns,
    rows,
    onAssistantDialogOpen,
    onInstructionsDialogOpen,
    columnVisibility,
  };
};
