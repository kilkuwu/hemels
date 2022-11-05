import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import User from "models/User";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method != "POST") {
    return res.status(400).json({
      error: "Unknown request",
    });
  }

  await dbConnect();

  const { accessToken } = JSON.parse(req.body);
  try {
    const decoded: any = jwt.verify(accessToken, process.env.JWT_PRIVATE_KEY);
    const user = await User.findOne({
      email: decoded.email,
    });
    if (user == null)
      return res.status(404).json({
        error: "Cannot find a user with the given email",
      });
    const foundUser = user.toJSON();
    delete foundUser.password;
    const token = jwt.sign(foundUser, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({
      token: token,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
}
