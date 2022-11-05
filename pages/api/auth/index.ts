import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import User from "models/User";
import bcrypt from "bcrypt";
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

  const { email, password } = JSON.parse(req.body);
  const user = await User.findOne({
    email: email,
  });
  if (user == null)
    return res.status(404).json({
      error: "Cannot find a user with the given email",
    });
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      error: "Wrong password",
    });
  }
  const foundUser = user.toJSON();
  delete foundUser.password;
  const token = jwt.sign(foundUser, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1d",
  });
  res.status(200).json({
    token: token,
  });
}
