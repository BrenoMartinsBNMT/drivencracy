import { ObjectID } from "bson";
import dayjs from "dayjs";
import db from "../db.js";
import sameOrAfter from "dayjs/plugin/isSameOrAfter.js";
import toArray from "dayjs/plugin/toArray.js";
import relative from "dayjs/plugin/relativeTime.js";
dayjs.extend(sameOrAfter);
dayjs.extend(toArray);
dayjs.extend(relative);

export async function ChoicePolls(req, res) {
  let { title, poolId } = req.body;
  let { expireAt } = await db
    .collection("poll")
    .findOne({ _id: ObjectID(poolId) });

  let a = dayjs(expireAt).$d;

  if (Date.now() - dayjs(a).valueOf() > 0) {
    return res.sendStatus(403);
  }
  if (Date.now() - expireAt > 0) {
    return res.sendStatus(403);
  }

  if (!expireAt) {
    return res.sendStatus(404);
  }

  if (!title.trim()) {
    return res.sendStatus(422);
  }
  try {
    let titleExist = await db
      .collection("choices")
      .findOne({ $and: [{ title }, { poolId }] });

    if (titleExist) {
      return res.sendStatus(409);
    }

    await db.collection("choices").insertOne({ poolId, title });
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}
