import express, { json } from "express";
import dotenv from "dotenv";
import dayjs from "dayjs";
import cors from "cors";

import db from "./db.ja";

const app = express();
app.use(json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`O servidor está em pé ${port}`);
});
