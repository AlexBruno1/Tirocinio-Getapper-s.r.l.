import { createSlice } from "@reduxjs/toolkit";
import * as selectors from "./user.selectors";
import { UserState } from "./user.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./user.sagas";

const initialState: UserState = {
  me: null,
  current: null,
  list: [],
};

export const userStore = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(extraActions.getUsers.success, (state, action) => {
      state.list = action.payload.data.users;
    });
    builder.addCase(extraActions.getUsersMe.success, (state, action) => {
      state.me = action.payload.data.user;
    });
    builder.addCase(extraActions.getUsersByUserId.success, (state, action) => {
      state.current = action.payload.data.user;
    });
  },
});

export { selectors, sagas };
