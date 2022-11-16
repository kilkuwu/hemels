import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import Question from "models/Question";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const question = await Question.create(JSON.parse(req.body));
        res.status(201).json({
          data: question,
        });
      } catch (err) {
        res.status(400).json({
          error: err,
        });
      }
      break;
    case "GET":
      try {
        const { limit, tags } = req.query;
        console.log(tags);

        const questions = await Question.find(
          {
            tags: {
              $all: tags,
            },
          },
          {},
          { limit: Number(limit) }
        );
        res.status(201).json({
          data: questions,
        });
      } catch (err) {
        res.status(400).json({
          error: JSON.stringify(err),
        });
      }
      break;
    default:
      res.status(400).json({
        response: "Unknown request",
      });
  }
}
