import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as selectors from "./ui.selectors";
import { DialogTypes, UiState } from "./ui.interfaces";
import * as sagas from "./ui.sagas";
import * as extraActions from "@/spas/admin/redux-store/extra-actions";

const initialState: UiState = {
  isDialogOpen: {
    [DialogTypes.EDIT_ORGANIZATION]: false,
    [DialogTypes.EDIT_ASSISTANT]: false,
    [DialogTypes.CREATE_ASSISTANT]: false,
    [DialogTypes.GENERATE_INSTRUCTIONS]: false,
    [DialogTypes.OPEN_CHIP_DIALOG]: false,
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
    builder.addCase(
      extraActions.patchAdminAssistantsByAssistantId.success,
      (state, action) => {
        state.isDialogOpen[DialogTypes.EDIT_ASSISTANT] = false;
      },
    );
    builder.addCase(extraActions.clearSession, () => initialState);
  },
});

export { selectors, sagas };
