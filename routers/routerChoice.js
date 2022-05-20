import { Router } from "express";
import { ChoicePolls } from "../controllers/choicePoll.js";
import { VoteChoice } from "../controllers/voteChoice.js";
const routeChoice = Router();

routeChoice.post("/choice", ChoicePolls);

routeChoice.post("/choice/:id/vote", VoteChoice);

export default routeChoice;
