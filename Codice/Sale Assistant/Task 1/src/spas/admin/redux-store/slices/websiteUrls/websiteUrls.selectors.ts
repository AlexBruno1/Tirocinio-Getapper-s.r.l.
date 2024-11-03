import { RootState } from "@/spas/admin/redux-store";
import { createSelector } from "@reduxjs/toolkit";
import { AssistantFe } from "@/models/client/AssistantFe";
import websiteUrls from "@/pages/api/website-urls";
import * as url from "url";

export const getWebsiteUrls = (state: RootState) =>
  state?.websiteUrls?.list ?? [];
