import { put, takeEvery } from "redux-saga/effects";
import { actions } from "@/spas/admin/redux-store";
import { DialogTypes } from "@/spas/admin/redux-store/slices/ui/ui.interfaces";

export function* assistantSaga() {
  yield takeEvery(actions.postAdminOrganizations.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_ASSISTANT,
        open: true,
      }),
    );
  });

  yield takeEvery(actions.getAdminAssistants.success, function* (action) {
    if (action.payload.data.assistants.length === 0) {
      yield put(
        actions.setDialogOpen({
          dialogType: DialogTypes.CREATE_ASSISTANT,
          open: true,
        }),
      );
    }
  });

  yield takeEvery(actions.postAdminAssistants.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_ASSISTANT,
        open: false,
      }),
    );
  });

  yield takeEvery(actions.postAdminAssistants.success, function* (action) {
    if (action.payload.data.assistant.status === "pending") {
      yield put(
        actions.setDialogOpen({
          dialogType: DialogTypes.OPEN_CHIP_DIALOG,
          open: true,
        }),
      );
    }
  });

  yield takeEvery(
    actions.patchAdminAssistantsByAssistantId.success,
    function* () {
      yield put(
        actions.setDialogOpen({
          dialogType: DialogTypes.EDIT_ASSISTANT,
          open: false,
        }),
      );
    },
  );
}
