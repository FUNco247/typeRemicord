import express from "express";
import { renderJoin } from "../controllers/renderController";

export const userRouter = express.Router();

userRouter.get("/join", renderJoin);
