import db from "../db.js";

export async function ShowPolls(req, res) {
  try {
    let infosPolls = await db.collection("poll").find({}).toArray();
    res.send(infosPolls);
  } catch {
    res.sendStatus(404);
  }
}
