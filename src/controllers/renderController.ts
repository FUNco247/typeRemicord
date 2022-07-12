import { RequestHandler } from "express";

export const renderHome: RequestHandler = (req, res) => {
  res.render("landingPage");
};

export const renderJoin: RequestHandler = (req, res) => {
  res.render("user/join");
};
