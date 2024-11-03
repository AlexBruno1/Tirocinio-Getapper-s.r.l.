import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";

export interface DeleteAdminSessionsMeParams {}
export interface DeleteAdminSessionsMeResponseData {}
export default apiActionBuilder<
  DeleteAdminSessionsMeParams,
  ApiSuccessAction<
    DeleteAdminSessionsMeResponseData,
    DeleteAdminSessionsMeParams
  >,
  ApiFailAction<DeleteAdminSessionsMeParams>
>(
  "apis/admin/sessions/me/delete",
  (
    params: DeleteAdminSessionsMeParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<DeleteAdminSessionsMeParams>(
      {
        path: "/admin/sessions/me",
        method: HttpMethod.DELETE,
      },
      options,
      params,
    ),
  }),
);
