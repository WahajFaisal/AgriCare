import "reflect-metadata";
import express, { Request, Response } from "express";
import indexRouter from "./routes/index";
import AppData from "./config/dbconfig";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path = require("path");

const envPath = path.join(__dirname, "../config.env");

dotenv.config({ path: envPath });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/", indexRouter);

AppData.initialize()
  .then(() => {
    app.listen(8000, () => {
      console.log("Listening and Connected");
    });
  })
  .catch((err) => {
    console.log("error ", err);
  });
