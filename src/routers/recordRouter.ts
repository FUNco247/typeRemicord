import express from "express";
import { renderWriteRecord } from "../controllers/renderController";

export const recordRouter = express.Router();

recordRouter.route("/").get(renderWriteRecord);
