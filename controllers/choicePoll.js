import { ObjectId } from "bson";
import db from "../db.js";

export async function ChoicePolls(req, res) {
  let { title, poolId } = req.body;
  let pollExist = await db
    .collection("polls")
    .findOne({ _id: new ObjectId(poolId) });
  if (!pollExist) {
    return res.sendStatus(404);
  }
  if (!title.trim()) {
    return res.sendStatus(422);
  }
  try {
    let titleExist = await db
      .collection("choices")
      .findOne({ choices: [title] });
    if (titleExist) {
      return res.sendStatus(409);
    }
    let { choices } = await db.collection("choices").find({});
    await db.collection("choices").insertOne([...choices, { poolId, title }]);
  } catch {}
}
