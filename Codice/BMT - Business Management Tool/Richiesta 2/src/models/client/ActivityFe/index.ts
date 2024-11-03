import { ReminderStrategy } from "@/models/common/ActivityCommon";
import { ObjectIdFe } from "@/models/common/JsUtility";

export type IActivityFe = {
  _id: ObjectIdFe;
  userIds: Array<ObjectIdFe>;
  title: string;
  reminderStrategy: ReminderStrategy;
  reminderTime: number;
  deadline: Date;
  params?: {
    customersIds: Array<ObjectIdFe>;
    jobsIds: Array<ObjectIdFe>;
    projectsIds: Array<ObjectIdFe>;
    workersIds: Array<ObjectIdFe>;
  };
};

export class ActivityFe implements IActivityFe {
  _id: ObjectIdFe;
  userIds: Array<ObjectIdFe>;
  title: string;
  reminderStrategy: ReminderStrategy;
  reminderTime: number;
  deadline: Date;
  params?: {
    customersIds: Array<ObjectIdFe>;
    jobsIds: Array<ObjectIdFe>;
    projectsIds: Array<ObjectIdFe>;
    workersIds: Array<ObjectIdFe>;
  };
}
