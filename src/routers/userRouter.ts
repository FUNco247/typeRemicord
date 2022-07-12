import express from "express";
import { renderJoin } from "../controllers/renderController";
import { joinApi } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.route("/join").get(renderJoin).post(joinApi);
