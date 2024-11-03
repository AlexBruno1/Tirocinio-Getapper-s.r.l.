import {
  ErrorResponse,
  ResponseHandler,
  StatusCodes,
} from "@/lib/response-handler";
import { NextApiResponse } from "next";
import { GetUsersApi } from "./interfaces";
import { Job } from "@/models/server/Job";
import { User } from "@/models/server/User";

export default async function handler(
  req: GetUsersApi.Request,
  res: NextApiResponse<GetUsersApi.EndpointResponse>,
) {
  try {
    const { validationResult } = req;

    if (!validationResult.isValid) {
      return ResponseHandler.json<ErrorResponse>(
        res,
        { message: validationResult.message! },
        StatusCodes.BadRequest,
      );
    }

    const users = await User.getList({}, { limit: 0 });

    return ResponseHandler.json<GetUsersApi.SuccessResponse>(res, {
      users: users.map((u) => u.toClientVersion()),
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
