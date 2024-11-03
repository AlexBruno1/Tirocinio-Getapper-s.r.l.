import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse, NextApiRequest } from "next";
import { PostActivitiesApi } from "./interfaces";
import { Activity } from "@/models/server/Activity";

export default async function handler(
  req: PostActivitiesApi.Request,
  res: NextApiResponse<PostActivitiesApi.EndpointResponse>,
  originalReq: NextApiRequest,
) {
  try {
    const { validationResult, queryStringParameters, payload } = req;

    if (!originalReq.session.user) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        {},
        StatusCodes.Unauthorized,
      );
    }

    if (!validationResult.isValid) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        { message: validationResult.message! },
        StatusCodes.BadRequest,
      );
    }

    const { userIds, title, reminderStrategy, reminderTime, params, deadline } =
      payload;

    const activity = await Activity.create(
      userIds,
      title,
      reminderStrategy,
      reminderTime,
      deadline,
    );

    return ResponseHandler.json<PostActivitiesApi.SuccessResponse>(res, {
      activity: activity.toClientVersion(),
    });
  } catch (e) {
    console.error(e);
    return ResponseHandler.json<ErrorResponse>(
      res,
      { message: "Internal error" },
      StatusCodes.InternalServerError,
    );
  }
}
