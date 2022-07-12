import { connect } from "mongoose";

const DB_URL = process.env.DB_URL;

if (DB_URL) {
  connect(DB_URL);
  console.log(`connected to DB ${DB_URL}`);
} else {
  throw new Error("DB connect error");
}
