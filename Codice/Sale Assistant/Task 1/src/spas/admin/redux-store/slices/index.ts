import * as extraActions from "../extra-actions";
import * as ajax from "./ajax";
import * as feedback from "./feedback";
import * as admin from "./admin";
import * as organization from "./organization";
import * as ui from "./ui";

import * as websiteUrls from "./websiteUrls";

import * as prospect from "./prospect";

import * as chat from "./chat";

import * as assistant from "./assistant";

import * as customer from "./customer";

export const reducers = {
  ajax: ajax.ajaxStore.reducer,
  feedback: feedback.feedbackStore.reducer,
  customer: customer.customerStore.reducer,
  admin: admin.adminStore.reducer,
  organization: organization.organizationStore.reducer,
  assistant: assistant.assistantStore.reducer,
  ui: ui.uiStore.reducer,
  chat: chat.chatStore.reducer,
  prospect: prospect.prospectStore.reducer,
  websiteUrls: websiteUrls.websiteUrlsStore.reducer,
};

export const actions = {
  ...extraActions,
  ...ajax.ajaxStore.actions,
  ...feedback.feedbackStore.actions,
  ...customer.customerStore.actions,
  ...admin.adminStore.actions,
  ...organization.organizationStore.actions,
  ...assistant.assistantStore.actions,
  ...ui.uiStore.actions,
  ...chat.chatStore.actions,
  ...prospect.prospectStore.actions,
  ...websiteUrls.websiteUrlsStore.actions,
};

export const selectors = {
  ...ajax.selectors,
  ...feedback.selectors,
  ...customer.selectors,
  ...admin.selectors,
  ...organization.selectors,
  ...assistant.selectors,
  ...ui.selectors,
  ...chat.selectors,
  ...prospect.selectors,
  ...websiteUrls.selectors,
};

export const sagas = [
  ...Object.values(ajax.sagas),
  ...Object.values(feedback.sagas),
  ...Object.values(customer.sagas),
  ...Object.values(admin.sagas),
  ...Object.values(organization.sagas),
  ...Object.values(assistant.sagas),
  ...Object.values(ui.sagas),
  ...Object.values(chat.sagas),
  ...Object.values(prospect.sagas),
  ...Object.values(websiteUrls.sagas),
];
