import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as selectors from "./websiteUrls.selectors";
import { WebsiteUrlsState } from "./websiteUrls.interfaces";
import * as extraActions from "../../extra-actions";
import * as sagas from "./websiteUrls.sagas";

const initialState: WebsiteUrlsState = {
  list: [],
};

export const websiteUrlsStore = createSlice({
  name: "websiteUrls",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(extraActions.postWebsiteUrls.success, (state, action) => {
      const urls = action.payload.data.urls;
      urls.forEach((url) => {
        if (!state.list.includes(url)) {
          state.list.push(url);
        }
      });
    });
  },
});

export { selectors, sagas };
