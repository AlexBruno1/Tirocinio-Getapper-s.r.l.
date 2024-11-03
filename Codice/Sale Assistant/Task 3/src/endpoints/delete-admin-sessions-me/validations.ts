import { YupShapeByInterface } from "@/lib/response-handler";
import * as yup from "yup";
import { DeleteAdminSessionsMeApi } from "./interfaces";

const queryStringParametersValidations =
  (): YupShapeByInterface<DeleteAdminSessionsMeApi.QueryStringParameters> => ({});

export default () => ({
  queryStringParameters: yup.object().shape(queryStringParametersValidations()),
});
