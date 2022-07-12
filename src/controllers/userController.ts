import { RequestHandler } from "express";

interface IUserDataJson {
  username: string;
  passward: string;
  nickname: string;
}

export const joinApi: RequestHandler = (req, res) => {
  const newUser: IUserDataJson = req.body;
  console.log(newUser);
};
