import { RootState } from "@/spas/app/redux-store";
import { createSelector } from "@reduxjs/toolkit";
import { UserFe } from "@/models/client/UserFe";
import { getProjectsList } from "@/spas/app/redux-store/slices/project/project.selectors";
import { JobFe } from "@/models/client/JobFe";

export const getUserMe = createSelector(
  (state: RootState) => state?.user?.me,
  (user) => (user ? new UserFe(user) : null),
);
export const getCurrentUser = createSelector(
  (state: RootState) => state?.user?.current,
  (user) => (user ? new UserFe(user) : null),
);

export const getUsersList = createSelector(
  (state: RootState) => state?.user?.list ?? [],
  (usersList) => usersList.map((user) => new UserFe(user)),
);
