import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "@/spas/admin/redux-store";
import { DialogTypes } from "@/spas/admin/redux-store/slices/ui/ui.interfaces";
import { useCallback } from "react";

export const useAssistantStateChipDialog = () => {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(selectors.getIsDialogOpen)[
    DialogTypes.OPEN_CHIP_DIALOG
  ];

  const onDialogClose = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.OPEN_CHIP_DIALOG,
        open: false,
      }),
    );
    dispatch(actions.setInstructionsDialog());
  }, [dispatch]);

  return {
    isDialogOpen,
    onDialogClose,
  };
};
