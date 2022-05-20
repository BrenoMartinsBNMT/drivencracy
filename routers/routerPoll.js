import { Router } from "express";
import { pollRegister } from "../controllers/pollRegister.js";
import { ShowPolls } from "../controllers/showPolls.js";
import { RequestChoices } from "../controllers/requestChoices.js";

import { ReasultPool } from "../controllers/resultPool.js";

const routePoll = Router();

routePoll.post("/poll", pollRegister);
routePoll.get("/poll", ShowPolls);
routePoll.get("/poll/:id/choice", RequestChoices);
routePoll.get("/poll/:id/result", ReasultPool);

export default routePoll;
