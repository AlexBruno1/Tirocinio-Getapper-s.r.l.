import { ObjectId } from "mongodb";
import { ReminderStrategy } from "@/models/common/ActivityCommon";
import { string } from "yup";
import { ObjectIdFe } from "@/models/common/JsUtility";

export type IActivityFe = {
  _id: ObjectIdFe;
  userIds: Array<ObjectId>;
  title: string;
  reminderStrategy: ReminderStrategy;
  reminderTime: number;
  deadline: Date;
  params?: {
    customersIds: Array<ObjectId>;
    jobsIds: Array<ObjectId>;
    projectsIds: Array<ObjectId>;
    workersIds: Array<ObjectId>;
  };
};

export class ActivityFe implements IActivityFe {
  _id: ObjectIdFe;
  userIds: Array<ObjectId>;
  title: string;
  reminderStrategy: ReminderStrategy;
  reminderTime: number;
  deadline: Date;
  params?: {
    customersIds: Array<ObjectId>;
    jobsIds: Array<ObjectId>;
    projectsIds: Array<ObjectId>;
    workersIds: Array<ObjectId>;
  };
}
