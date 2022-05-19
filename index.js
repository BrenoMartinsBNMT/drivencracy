import express, { json } from "express";
import dotenv from "dotenv";
import dayjs from "dayjs";
import { pollRegister } from "./controllers/pollRegister.js";
import { ShowPolls } from "./controllers/showPolls.js";
import cors from "cors";
import { ChoicePolls } from "./controllers/choicePoll.js";
import { RequestChoices } from "./controllers/requestChoices.js";
import { VoteChoice } from "./controllers/voteChoice.js";
import { ReasultPool } from "./controllers/resultPool.js";

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
app.get("/poll/:id/choice", RequestChoices);
app.post("/choice/:id/vote", VoteChoice);
app.get("/poll/:id/result", ReasultPool);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`O servidor está em pé ${port}`);
});
