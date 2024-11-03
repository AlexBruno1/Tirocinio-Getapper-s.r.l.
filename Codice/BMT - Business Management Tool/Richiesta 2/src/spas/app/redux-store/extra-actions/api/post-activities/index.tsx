import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { IActivityFe } from "@/models/client/ActivityFe";
import { ObjectId } from "mongodb";
import { ObjectIdFe } from "@/models/common/JsUtility";
import { ReminderStrategy } from "@/models/common/ActivityCommon";

export interface PostActivitiesParams {
  usersIds: Array<ObjectIdFe>;
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
export interface PostActivitiesResponseData {
  activity: IActivityFe;
}
export default apiActionBuilder<
  PostActivitiesParams,
  ApiSuccessAction<PostActivitiesResponseData, PostActivitiesParams>,
  ApiFailAction<PostActivitiesParams>
>(
  "apis/activities/post",
  (
    params: PostActivitiesParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<PostActivitiesParams>(
      {
        path: "/activities",
        method: HttpMethod.POST,
        body: {
          usersIds: params.usersIds,
          title: params.title,
          reminderStrategy: params.reminderStrategy,
          reminderTime: params.reminderTime,
          deadline: params.deadline,
          params: {
            customersIds: params.params.customersIds,
            jobsIds: params.params.jobsIds,
            projectsIds: params.params.projectsIds,
            workersIds: params.params.workersIds,
          },
        },
      },
      options,
      params,
    ),
  }),
);
