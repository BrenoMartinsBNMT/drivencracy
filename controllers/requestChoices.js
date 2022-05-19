import db from "../db.js";

export async function RequestChoices(req, res) {
  let { id } = req.params;
  let choices = await db.collection("choices").find({ poolId: id }).toArray();
  if (choices.length === 0) {
    return res.sendStatus(404);
  }
  res.send(choices);
}
