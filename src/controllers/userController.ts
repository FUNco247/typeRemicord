import { RequestHandler } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
interface ILoginUser {
  username: string;
  password: string;
}

interface IJoinUser extends ILoginUser {
  nickname: string;
}

export const joinApi: RequestHandler = async (req, res, next) => {
  const newUser: IJoinUser = req.body;
  const { username } = newUser;
  try {
    const existingId = await User.exists({ username });
    if (existingId) {
      return res.status(409).json({ message: "이미 존재하는 아이디입니다." });
    }
    await User.create(newUser);
    return res.status(200).json({ message: "환영합니다." });
  } catch (error) {
    next(error);
  }
};

interface IDBUser extends IJoinUser {
  _id: ObjectId;
}

declare module "express-session" {
  interface SessionData {
    logedIn: boolean;
    user: IDBUser;
  }
}

export const loginApi: RequestHandler = async (req, res, next) => {
  const loginUser: ILoginUser = req.body;
  const { username, password } = loginUser;
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: "존재하지 않는 아이디입니다." });
    } else {
      const passwordValidation = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!passwordValidation) {
        return res
          .status(401)
          .json({ message: "비밀번호가 일치하지 않습니다." });
      } else {
        req.session.logedIn = true;
        req.session.user = existingUser;
        return res.status(200).json({ message: `환영합니다.` });
      }
    }
  } catch (error) {}
};
