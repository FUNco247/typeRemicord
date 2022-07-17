import express, { Express, NextFunction, Response, Request } from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";
import "./db";
import { rootRouter } from "./routers/rootRouter";
import { userRouter } from "./routers/userRouter";

const app: Express = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(morgan("dev")); // HTTP logger middleware
app.use(express.json()); //built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.

const sessionSecret = process.env.SESSION_SECRET as string | string[];
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 86400000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use("/clients", express.static("dist"));

app.use("/", rootRouter);
app.use("/user", userRouter);

app.use(function handleError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  return res.json({ message: error.message });
});

const PORT = process.env.PORT;
const handleListening = () =>
  console.log(`server is running ⚡️ port no.${PORT}`);
app.listen(PORT, handleListening);
