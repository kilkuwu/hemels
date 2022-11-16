import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "GET")
    return res.status(400).json({
      response: "Unknown request",
    });

  await dbConnect();

  console.log(req.query);
  res.status(200).json({
    response: JSON.stringify(req.query),
  });
}
