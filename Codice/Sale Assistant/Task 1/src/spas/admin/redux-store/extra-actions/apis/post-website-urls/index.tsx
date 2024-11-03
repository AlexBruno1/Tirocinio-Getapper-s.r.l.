import {
  apiActionBuilder,
  apiRequestPayloadBuilder,
  ApiRequestPayloadBuilderOptions,
  ApiSuccessAction,
  ApiFailAction,
  HttpMethod,
} from "../api-builder";

export interface PostWebsiteUrlsParams {
  url: string;
}
export interface PostWebsiteUrlsResponseData {
  urls: string[];
}
export default apiActionBuilder<
  PostWebsiteUrlsParams,
  ApiSuccessAction<PostWebsiteUrlsResponseData, PostWebsiteUrlsParams>,
  ApiFailAction<PostWebsiteUrlsParams>
>(
  "apis/website-urls/post",
  (
    params: PostWebsiteUrlsParams,
    options?: ApiRequestPayloadBuilderOptions,
  ) => ({
    payload: apiRequestPayloadBuilder<PostWebsiteUrlsParams>(
      {
        path: "/website-urls",
        method: HttpMethod.POST,
        body: {
          url: params.url,
        },
      },
      options,
      params,
    ),
  }),
);
