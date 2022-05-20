import express, { json } from "express";
import dotenv from "dotenv";
import routePoll from "./routers/routerPoll.js";
import routeChoice from "./routers/routerChoice.js";
import cors from "cors";
const app = express();

app.use(json());
app.use(cors());
app.use(routePoll);
app.use(routeChoice);
dotenv.config();
app.get("/", async (req, res) => {
  res.send("ok");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`O servidor está em pé ${port}`);
});
