import { PostActivitiesApi } from "@/endpoints/post-activities/interfaces";
import { StatusCodes, TestHandler } from "@/lib/response-handler";

const postActivitiesPath = "post-activities";

beforeAll(async () => {
  // await cleanDb();
});

describe("postActivities API", () => {
  test("It should ...", async () => {
    // const { statusCode, payload } = await TestHandler.invokeLambda<PostActivitiesApi.SuccessResponse>(postActivitiesPath);

    // expect(statusCode).toBe(StatusCodes.OK);
  });
});

afterAll(async () => {
  // await closeDbConnection();
});
