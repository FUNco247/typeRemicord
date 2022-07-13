import { RequestHandler } from "express";
import User from "../models/user";

interface IUserDataJson {
  username: string;
  password: string;
  nickname: string;
}

export const joinApi: RequestHandler = async (req, res, next) => {
  const newUser: IUserDataJson = req.body;
  const { username } = newUser;
  const existingId = await User.exists({ username });
  console.log(existingId);
  // if (existingId) {
  //   const error = new Error(" username already exist");
  //   return res.status(500).json({ error: error.message });
  // } else {
  //   await User.create(newUser);
  //   return res.status(200).json({ message: "user created" });
  // }
  try {
    await User.create(newUser);
    return res.status(200).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
};
