import React, { useCallback, useEffect } from "react";
import { actions, selectors } from "@/spas/admin/redux-store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DialogTypes } from "@/spas/admin/redux-store/slices/ui/ui.interfaces";

export const useAdminAssistantsListScene = () => {
  const dispatch = useDispatch();
  const { organizationId } = useParams();

  useEffect(() => {
    dispatch(
      actions.getAdminAssistants.request({ organizationId: organizationId }),
    );
  }, [dispatch, organizationId]);

  const assistants = useSelector(selectors.getAssistantsList);

  const viewAllColumns = {
    viewChat: true,
    viewProspects: true,
    editAssistant: true,
  };

  const handleOpenEditAssistantDialog = useCallback(
    (assistant: { id: string }) => {
      const currentAssistant =
        assistants.find((ass) => ass._id?.toString() === assistant.id) || null;
      dispatch(actions.setCurrentAssistant(currentAssistant));
      dispatch(
        actions.setDialogOpen({
          dialogType: DialogTypes.EDIT_ASSISTANT,
          open: true,
        }),
      );
    },
    [dispatch, assistants],
  );

  return {
    assistants,
    handleOpenEditAssistantDialog,
    viewAllColumns,
  };
};
