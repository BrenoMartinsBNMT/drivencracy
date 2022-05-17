import express, { json, Router } from "express";
import dotenv from "dotenv";
import dayjs from "dayjs";
import cors from "cors";

import db from "./db.ja";

const router = Router();
const app = express();
app.use(json());
app.use(cors());
dotenv.config();

router.get("/", (req, res) => {
  res.send("chegou no servidor");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`O servidor está em pé ${port}`);
});
