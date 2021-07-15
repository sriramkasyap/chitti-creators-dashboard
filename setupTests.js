/* eslint-disable import/no-extraneous-dependencies */
import dotenv from "dotenv";

dotenv.config({
  path: "./.env.test.local",
});

process.env.MONGO_DB = `chitti-${Math.floor(Math.random() * 6)}`;
// Random database name
