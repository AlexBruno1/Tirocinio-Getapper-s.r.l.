import { useCallback } from "react";
import { actions, selectors } from "@/spas/app/redux-store";
import { useDispatch, useSelector } from "react-redux";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";
import { IActivityFe } from "@/models/client/ActivityFe";

export const useCreateActivityDialog = () => {
  const dispatch = useDispatch();

  const isCreateActivityDialogOpen = useSelector(selectors.getIsDialogOpen)[
    DialogTypes.CREATE_ACTIVITY
  ];

  const isCreatingActivity = useSelector(
    selectors.getAjaxIsLoadingByApi(actions.postActivities.api),
  );

  const handleCloseDialog = useCallback(() => {
    dispatch(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_ACTIVITY,
        open: false,
      }),
    );
  }, [dispatch]);

  const handleSubmit = useCallback(
    (data: IActivityFe) => {
      dispatch(
        actions.postActivities.request({
          usersIds: data.userIds,
          title: data.title,
          reminderStrategy: data.reminderStrategy,
          reminderTime: data.reminderTime,
          deadline: data.deadline,
          params: {
            customersIds: data.params.customersIds,
            jobsIds: data.params.jobsIds,
            projectsIds: data.params.projectsIds,
            workersIds: data.params.workersIds,
          },
        }),
      );
    },
    [dispatch],
  );

  return {
    isCreatingActivity,
    isCreateActivityDialogOpen,
    handleCloseDialog,
    handleSubmit,
  };
};
