import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as selectors from "./ui.selectors";
import { DialogTypes, UiState } from "./ui.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./ui.sagas";

const initialState: UiState = {
  isDialogOpen: {
    [DialogTypes.CREATE_ACTIVITY]: false,
    [DialogTypes.CREATE_CUSTOMER]: false,
    [DialogTypes.EDIT_CUSTOMER]: false,
    [DialogTypes.CREATE_PROJECT]: false,
    [DialogTypes.EDIT_PROJECT]: false,
    [DialogTypes.CREATE_JOB]: false,
    [DialogTypes.EDIT_JOB]: false,
    [DialogTypes.CREATE_WORKER]: false,
    [DialogTypes.EDIT_WORKER]: false,
    [DialogTypes.CREATE_EDIT_WORKER_CREDENTIALS]: false,
    [DialogTypes.CREATE_WORKING_DAY]: false,
    [DialogTypes.EDIT_WORKING_DAY]: false,
    [DialogTypes.ASSOCIATE_JOBS]: false,
    [DialogTypes.CHECK_IMPORTED_ROWS]: false,
    [DialogTypes.CREATE_COLLABORATION_PAYMENT]: false,
    [DialogTypes.EDIT_COLLABORATION_PAYMENT]: false,
    [DialogTypes.CREATE_EMPLOYEE_PAYMENT]: false,
    [DialogTypes.EDIT_EMPLOYEE_PAYMENT]: false,
    [DialogTypes.CREATE_JOB_PAYMENT]: false,
    [DialogTypes.EDIT_JOB_PAYMENT]: false,
    [DialogTypes.CREATE_TAX]: false,
    [DialogTypes.EDIT_TAX]: false,
    [DialogTypes.CREATE_SERVICE_EXPENSE]: false,
    [DialogTypes.EDIT_SERVICE_EXPENSE]: false,
    [DialogTypes.TRANSACTIONS_DETAIL]: false,
    [DialogTypes.CREATE_EXTRA_INCOME]: false,
    [DialogTypes.EDIT_EXTRA_INCOME]: false,
  },
};

export const uiStore = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDialogOpen: (
      state,
      action: PayloadAction<{
        dialogType: DialogTypes;
        open: boolean;
      }>,
    ) => {
      state.isDialogOpen = {
        ...(state.isDialogOpen ?? initialState.isDialogOpen),
        [action.payload.dialogType]: action.payload.open,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(extraActions.postSessions.success, (state, action) => {
      state.isDialogOpen = initialState.isDialogOpen;
    });
    builder.addCase(
      extraActions.postJobCsvAssociations.success,
      (state, action) => {
        state.isDialogOpen[DialogTypes.ASSOCIATE_JOBS] = false;
      },
    );
    builder.addCase(
      extraActions.postWorkersWorkingDaysByWorkerId.success,
      (state, action) => {
        state.isDialogOpen[DialogTypes.CHECK_IMPORTED_ROWS] = false;
      },
    );
    builder.addCase(extraActions.postCollaboratorPayments.success, (state) => {
      state.isDialogOpen[DialogTypes.CREATE_COLLABORATION_PAYMENT] = false;
    });
    builder.addCase(
      extraActions.patchCollaboratorPaymentsByCollaboratorPaymentId.success,
      (state) => {
        state.isDialogOpen[DialogTypes.EDIT_COLLABORATION_PAYMENT] = false;
      },
    );
    builder.addCase(extraActions.postEmployeePayments.success, (state) => {
      state.isDialogOpen[DialogTypes.CREATE_EMPLOYEE_PAYMENT] = false;
    });
    builder.addCase(
      extraActions.patchEmployeePaymentsByEmployeePaymentId.success,
      (state) => {
        state.isDialogOpen[DialogTypes.EDIT_EMPLOYEE_PAYMENT] = false;
      },
    );
    builder.addCase(extraActions.postJobPaymentsByJobId.success, (state) => {
      state.isDialogOpen[DialogTypes.CREATE_JOB_PAYMENT] = false;
    });
    builder.addCase(
      extraActions.patchJobsPaymentsByJobIdAndPaymentId.success,
      (state) => {
        state.isDialogOpen[DialogTypes.EDIT_JOB_PAYMENT] = false;
      },
    );
    builder.addCase(extraActions.postTaxes.success, (state) => {
      state.isDialogOpen[DialogTypes.CREATE_TAX] = false;
    });
    builder.addCase(extraActions.patchTaxesByTaxId.success, (state) => {
      state.isDialogOpen[DialogTypes.EDIT_TAX] = false;
    });
  },
});

export { selectors, sagas };
