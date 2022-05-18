import db from "../db.js";

export async function ChoicePolls(req, res) {
  let { title, poolId } = req.body;
  if (!title.trim()) {
    return res.sendStatus(422);
  }
  try {
    let titleExist = await db.collection("polls").findOne({ title });
    if (titleExist) {
      return res.sendStatus(409);
    }
    let pollExist = await db.collection("polls").findOne({ poolId });
    if (!pollExist) {
      return res.sendStatus(404);
    }
  } catch {}
}
