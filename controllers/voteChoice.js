import db from "../db.js";
import dayjs from "dayjs";
import { ObjectID, ObjectId } from "bson";

export async function VoteChoice(req, res) {
  let { id } = req.params;
  if (id.length < 24) {
    return res.sendStatus(422);
  }
  let { _id, title, poolId } = await db
    .collection("choices")
    .findOne({ _id: ObjectId(id) });
  if (!_id) {
    return res.sendStatus(404);
  }
  let { expireAt } = await db
    .collection("poll")
    .findOne({ _id: ObjectID(poolId) });

  let dayCompare = dayjs(expireAt).$d;

  if (Date.now() - dayjs(dayCompare).valueOf() > 0) {
    return res.sendStatus(403);
  }
  await db.collection("votes").insertOne({
    title,
    id,
    date: `${dayjs().utc(-3).add(1, "month").format("YYYY-MM-DD")} ${dayjs()
      .utc(-3)
      .set("hour", 0)
      .set("minute", 0)
      .format("HH:mm")}`,
  });

  res.sendStatus(201);
}
