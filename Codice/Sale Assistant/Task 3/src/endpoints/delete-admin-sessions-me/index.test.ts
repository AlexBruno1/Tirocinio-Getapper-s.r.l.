import { DeleteAdminSessionsMeApi } from "@/endpoints/delete-admin-sessions-me/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";

const deleteAdminSessionsMePath = "delete-admin-sessions-me";

beforeAll(async () => {
  // await cleanDb();
});

describe("deleteAdminSessionsMe API", () => {
  test("It should ...", async () => {
    // const { statusCode, payload } = await TestHandler.invokeLambda<DeleteAdminSessionsMeApi.SuccessResponse>(deleteAdminSessionsMePath);
    // expect(statusCode).toBe(StatusCodes.OK);
  });
});

afterAll(async () => {
  // await closeDbConnection();
});
