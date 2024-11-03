import { put, takeEvery } from "redux-saga/effects";
import { actions } from "@/spas/app/redux-store";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";

export function* uiSaga() {
  yield takeEvery(actions.postCustomers.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_CUSTOMER,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.patchCustomersByCustomerId.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.EDIT_CUSTOMER,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.postProjects.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_PROJECT,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.patchProjectsByProjectId.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.EDIT_PROJECT,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.postJobs.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_JOB,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.patchJobsByJobId.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.EDIT_JOB,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.postWorkers.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_WORKER,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.patchWorkersByWorkerId.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.EDIT_WORKER,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.postUsers.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_EDIT_WORKER_CREDENTIALS,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.postWorkingDays.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_WORKING_DAY,
        open: false,
      }),
    );
  });
  yield takeEvery(actions.patchWorkingDaysByWorkingDayId.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.EDIT_WORKING_DAY,
        open: false,
      }),
    );
  });
  yield takeEvery(
    actions.patchWorkersWorkingDaysByWorkerIdAndWorkingDayId.success,
    function* () {
      yield put(
        actions.setDialogOpen({
          dialogType: DialogTypes.EDIT_WORKING_DAY,
          open: false,
        }),
      );
    },
  );
  yield takeEvery(actions.postServiceExpenses.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_SERVICE_EXPENSE,
        open: false,
      }),
    );
  });
  yield takeEvery(
    actions.patchServiceExpensesByServiceExpenseId.success,
    function* () {
      yield put(
        actions.setDialogOpen({
          dialogType: DialogTypes.EDIT_SERVICE_EXPENSE,
          open: false,
        }),
      );
    },
  );
}
