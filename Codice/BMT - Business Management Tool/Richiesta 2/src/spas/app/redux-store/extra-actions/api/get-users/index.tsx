import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";
import { IUserFe } from "@/models/client/UserFe";

export interface GetUsersParams {}
export interface GetUsersResponseData {
  users: IUserFe[];
}
export default apiActionBuilder<
  GetUsersParams,
  ApiSuccessAction<GetUsersResponseData, GetUsersParams>,
  ApiFailAction<GetUsersParams>
>(
  "apis/users/get",
  (params: GetUsersParams, options?: ApiRequestPayloadBuilderOptions) => ({
    payload: apiRequestPayloadBuilder<GetUsersParams>(
      {
        path: "/users",
        method: HttpMethod.GET,
      },
      options,
      params,
    ),
  }),
);
