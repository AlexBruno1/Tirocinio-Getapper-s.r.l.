export enum DialogTypes {
  EDIT_ORGANIZATION = "EDIT_ORGANIZATION",
  EDIT_ASSISTANT = "EDIT_ASSISTANT",
  CREATE_ASSISTANT = "CREATE_ASSISTANT",
  GENERATE_INSTRUCTIONS = "GENERATE_INSTRUCTIONS",
  OPEN_CHIP_DIALOG = "OPEN_CHIP_DIALOG",
}

export interface UiState {
  isDialogOpen: {
    [DialogTypes.EDIT_ORGANIZATION]: boolean;
    [DialogTypes.EDIT_ASSISTANT]: boolean;
    [DialogTypes.CREATE_ASSISTANT]: boolean;
    [DialogTypes.GENERATE_INSTRUCTIONS]: boolean;
    [DialogTypes.OPEN_CHIP_DIALOG]: boolean;
  };
}
