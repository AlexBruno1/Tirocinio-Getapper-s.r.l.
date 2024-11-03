export enum ActivityStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
}

export enum ReminderType {
  DEADLINE = "deadline",
  DAY_OF_THE_WEEK = "dayOfTheWeek",
  DAY_OF_THE_MONTH = "dayOfTheMonth",
  LAST_DAY_OF_THE_MONTH = "lastDayOfTheMonth",
}

export type ReminderStrategy = {
  type: ReminderType;
  deadline: Date | null;
};

export const activityStrategySelectOptions = Object.values(ReminderType).map(
  (strategy) => ({
    value: strategy,
    label: strategy,
  }),
);
