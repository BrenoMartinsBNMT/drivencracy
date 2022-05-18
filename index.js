import express, { json } from "express";
import dotenv from "dotenv";
import dayjs from "dayjs";
import { pollRegister } from "./controllers/pollRegister.js";
import { ShowPolls } from "./controllers/showPolls.js";
import cors from "cors";
import { ChoicePolls } from "./controllers/choicePoll.js";

const app = express();

app.use(json());
app.use(cors());
dotenv.config();
app.get("/", async (req, res) => {
  res.send("ok");
});

app.post("/poll", pollRegister);
app.get("/poll", ShowPolls);
app.post("/choice", ChoicePolls);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`O servidor está em pé ${port}`);
});
