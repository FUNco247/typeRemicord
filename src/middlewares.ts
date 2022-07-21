import { RequestHandler } from "express";

export const localsMiddleware: RequestHandler = (req, res, next) => {
  res.locals.logedIn = req.session.logedIn;
  res.locals.logedInUser = req.session.user || {};
  next();
};
