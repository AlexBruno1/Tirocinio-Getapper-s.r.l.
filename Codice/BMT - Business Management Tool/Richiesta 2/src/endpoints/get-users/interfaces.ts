import { ErrorResponse, RequestI } from "@/lib/response-handler";
import { IUserFe } from "@/models/client/UserFe";

export namespace GetUsersApi {
  export type QueryStringParameters = {};

  export type SuccessResponse = {
    message?: string;
    users: IUserFe[];
  };

  export type EndpointResponse = SuccessResponse | ErrorResponse;

  export interface Request extends RequestI<QueryStringParameters, null> {}
}
