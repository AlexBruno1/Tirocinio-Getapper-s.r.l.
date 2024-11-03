import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { PostActivitiesApi } from "./interfaces";
import { yupObjectId } from "@/lib/mongodb/mongo-dao";

const queryStringParametersValidations =
  (): YupShapeByInterface<PostActivitiesApi.QueryStringParameters> => ({});

const payloadValidations =
  (): YupShapeByInterface<PostActivitiesApi.Payload> => ({
    userIds: yupObjectId().required(),
    title: yup.string().required(),
    reminderStrategy: yup.mixed().oneOf(["single", "repeating"]).required(),
    reminderTime: yup.number().required,
    deadline: yup.date().required,
    params: {
      customerId: yupObjectId(),
      projectId: yupObjectId(),
      jobId: yupObjectId(),
      workerId: yupObjectId(),
    },
  });

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
  payload: yup.object().shape(payloadValidations()),
});
