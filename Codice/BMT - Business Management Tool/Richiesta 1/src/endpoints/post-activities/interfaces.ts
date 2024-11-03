import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { ObjectId } from "mongodb";
import { ReminderStrategy } from "@/models/common/ActivityCommon";
import { date } from "yup";
import { IActivityFe } from "@/models/client/ActivityFe";

export namespace PostActivitiesApi {
  export type QueryStringParameters = {};

  export type Payload = {
    userIds: Array<ObjectId>;
    title: string;
    reminderStrategy: ReminderStrategy;
    reminderTime: number;
    deadline: Date;
    params: {
      customersIds: Array<ObjectId>;
      jobsIds: Array<ObjectId>;
      projectsIds: Array<ObjectId>;
      workersIds: Array<ObjectId>;
    };
  };

  export type SuccessResponse = {
    message?: string;
    activity: IActivityFe;
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, Payload> {}
}
