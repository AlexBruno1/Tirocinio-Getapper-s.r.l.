import { useTheme } from "@mui/material/styles";
import React, { useCallback, useMemo, useState } from "react";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/app/redux-store";
import { UserRoles } from "@/models/common/UserCommon";
import { WorkGroups } from "@/models/common/WorkGroup";
import { Locales } from "@/models/common/Translation";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";

export const useDashboardDrawer = () => {
  const [t] = useTypedTranslations();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const me = useSelector(selectors.getUserMe);
  const worker = useSelector(selectors.getWorkerMe);
  const isLoggingOut = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.deleteSessionsMe.api),
  );
  const { languageCode } = useParams();
  const locale = languageCode as Locales;

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const menuItems = useMemo(
    () =>
      me?.role === UserRoles.Admin
        ? [
            {
              id: "cashflow",
              label: t("generic.cashflow"),
              path: "cashflow",
            },
            {
              id: "customers",
              label: t("generic.customers"),
              path: "customers",
            },
            {
              id: "projects",
              label: t("generic.projects"),
              path: "projects",
            },
            {
              id: "jobs",
              label: t("generic.jobs"),
              path: "jobs",
            },
            {
              id: "workers",
              label: t("generic.workers"),
              path: "workers",
            },
            {
              id: "internships",
              label: t("generic.internships"),
              path: "internships",
            },
            {
              id: "collaborators",
              label: t("generic.collaborators"),
              path: "collaborators",
            },
            {
              id: "employees",
              label: t("generic.employees"),
              path: "employees",
            },
            {
              id: "taxes",
              label: t("generic.taxes"),
              path: "taxes",
            },
            {
              id: "serviceExpenses",
              label: t("generic.serviceExpenses"),
              path: "service-expense",
            },
            {
              id: "Bills",
              label: t("generic.bill"),
              path: "bills",
            },
          ]
        : worker
        ? [
            ...[
              WorkGroups.INTERNSHIP,
              WorkGroups.COLLABORATION,
              WorkGroups.EMPLOYMENT,
            ]
              .filter((wG) => worker.workGroups[wG]?.enabled)
              .map((workGroup) => ({
                id: workGroup,
                label: t(`workGroups.${workGroup}`),
                path: workGroup,
              })),
            {
              id: "profile",
              label: t("generic.profile"),
              path: "personalprofile",
            },
          ]
        : [],
    [t, me, worker],
  );

  const handleLogout = useCallback(() => {
    dispatch(actions.deleteSessionsMe.request({}));
  }, [dispatch]);

  const handleOpenCreateActivityDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_ACTIVITY,
        open: true,
      }),
    );
  }, [dispatch]);

  return {
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
  };
};
