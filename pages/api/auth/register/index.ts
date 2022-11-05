import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import User from "models/User";
import bcrypt from "bcrypt";

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

  try {
    const { email, username, password, pictureUrl } = JSON.parse(req.body);
    const existed = await User.count({
      $or: [{ email: email }, { username: username }],
    });
    if (existed)
      return res.status(400).json({
        error: "A user with the given email or username existed!",
      });
    const user = await User.create({
      email,
      username,
      password: await bcrypt.hash(password, 10),
      pictureUrl,
      permission: 0,
    });
    res.status(200).json({
      success: true,
      user: user.toJSON(),
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
}
