import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/admin/redux-store";
import { GridColDef } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Chip, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { ObjectIdFe } from "@/models/common/JsUtility";
import { DialogTypes } from "@/spas/admin/redux-store/slices/ui/ui.interfaces";
import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";
import { OrganizationStatus } from "@/models/common/OrganizationCommon";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const useAdminOrganizationsListScene = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actions.getAdminOrganizations.request({}));
  }, [dispatch]);

  const organizations = useSelector(selectors.getAdminOrganizations);

  const handleOpenEditOrganizationDialog = useCallback(
    (currentOrganizationId: ObjectIdFe) => {
      const currentOrganization = organizations.find(
        (organization) => organization._id === currentOrganizationId,
      );
      dispatch(actions.setCurrentOrganization(currentOrganization));
      dispatch(
        actions.setDialogOpen({
          dialogType: DialogTypes.EDIT_ORGANIZATION,
          open: true,
        }),
      );
    },
    [dispatch, organizations],
  );

  const renderStatusIcon = useCallback((status: OrganizationStatus) => {
    switch (status) {
      case OrganizationStatus.Disabled:
        return (
          <Chip
            icon={<HighlightOffIcon />}
            label="Disabilitato"
            color="error"
            variant="filled"
          />
        );
      case OrganizationStatus.Active:
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
            icon={<CheckIcon />}
            label="Attivo"
            color="success"
            variant="filled"
          />
        );
    }
  }, []);

  const rows = useMemo(
    () =>
      organizations.map((organization) => ({
        id: organization._id,
        name: organization.name,
        status: organization.status,
      })),
    [organizations],
  );

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: "Nome",
        flex: 1,
      },
      {
        field: "status",
        headerName: "Stato",
        width: 170,
        renderCell: (params) => renderStatusIcon(params.row.status),
      },
      {
        field: "viewOrganization",
        headerName: "",
        width: 60,
        renderCell: (params) => {
          return (
            <Tooltip title={"Visualizza info organizzazione"} arrow>
              <IconButton
                onClick={() =>
                  navigate(`/organizations/${params.id}`, {
                    state: { organizationId: params.id },
                  })
                }
              >
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
          );
        },
      },
      {
        field: "editOrganization",
        headerName: "",
        renderCell: (params) => {
          return (
            <Tooltip title={"Modifica organizzazione"} arrow>
              <IconButton
                color={"warning"}
                onClick={() => handleOpenEditOrganizationDialog(params.row.id)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          );
        },
      },
    ],
    [navigate, handleOpenEditOrganizationDialog, renderStatusIcon],
  );

  return { columns, rows, navigate };
};
