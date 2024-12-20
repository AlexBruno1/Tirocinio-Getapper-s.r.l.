import { NextApiRequest, NextApiResponse } from "next";
import { ResponseHandler } from "@/lib/response-handler";
import validations from "./validations";
import handler from "./handler";
import { withIronSessionApiRoute } from "iron-session/next";
import { adminSessionOptions } from "@/lib/session";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return withIronSessionApiRoute(
    (req: NextApiRequest, res: NextApiResponse) => {
      return ResponseHandler.handleRequest(req, res, validations, handler);
    },
    adminSessionOptions,
  )(req, res);
}
