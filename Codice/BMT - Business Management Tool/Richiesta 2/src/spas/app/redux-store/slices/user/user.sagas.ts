import { put, select, take, takeEvery } from "redux-saga/effects";
import { actions, selectors } from "@/spas/app/redux-store";
import domNavigation from "@/models/client/DomNavigation";
import { IUserFe } from "@/models/client/UserFe";
import { UserRoles } from "@/models/common/UserCommon";
import { Action } from "redux";
import { PayloadAction } from "@reduxjs/toolkit";
import { DialogTypes } from "@/spas/app/redux-store/slices/ui/ui.interfaces";

export function* startupUserSaga() {
  yield takeEvery(actions.appStartup, function* () {
    yield put(actions.getUsers.request({}));
  });
  yield takeEvery(actions.appStartup, function* () {
    yield put(actions.getUsersMe.request({}));
  });
  yield takeEvery(actions.patchUsersByUserId.success, function* () {
    yield put(
      actions.setDialogOpen({
        dialogType: DialogTypes.CREATE_EDIT_WORKER_CREDENTIALS,
        open: false,
      }),
    );
  });
}

export function* userSaga() {
  yield takeEvery(actions.postSessions.success, function* () {
    yield put(actions.getUsersMe.request({}));
    const action = yield take([
      actions.getUsersMe.success,
      actions.getUsersMe.fail,
    ]);
    if (action.type === actions.getUsersMe.fail.type) {
      const me: IUserFe = yield select(selectors.getUserMe);

      if (me.language && me.language !== domNavigation.locale) {
        yield put(
          actions.patchUsersMe.request({ language: domNavigation.locale }),
        );
      }
    }
  });

  yield takeEvery(actions.deleteSessionsMe.success, function* () {
    domNavigation.navigate(`/${domNavigation.locale}/app/authentication`);
  });

  yield takeEvery(actions.getUsersMe.success, function* (action) {
    const me: IUserFe = yield select(selectors.getUserMe);

    domNavigation.navigate(`/${me.language}/app`);

    yield put(actions.getJobs.request({}));
    if (action.payload.data.user.role === UserRoles.Admin) {
      yield put(actions.getCustomers.request({}));
      yield put(actions.getProjects.request({}));
      yield put(actions.getWorkers.request({}));
    } else {
      yield put(actions.getWorkersMe.request({}));
      yield put(actions.getWorkingDays.request({}));
    }
  });
}

export function* unauthorizedRedirectSaga() {
  yield takeEvery(
    (action: Action) => /^apis\/(.*?)\/fail$/.test(action.type),
    function* (
      action: PayloadAction<{
        status: number;
      }>,
    ) {
      const { status } = action.payload;

      if (status === 401) {
        domNavigation.navigate(`/${domNavigation.locale}/app/authentication`);
      }
    },
  );
}
