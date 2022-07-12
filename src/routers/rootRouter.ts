import express from "express";
import { renderHome } from "../controllers/renderController";

export const rootRouter = express.Router();

rootRouter.get("/", renderHome);
