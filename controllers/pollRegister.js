import db from "../db.js";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear.js";
import UTC from "dayjs/plugin/utc.js";
dayjs.extend(UTC);
export async function pollRegister(req, res) {
  let { title, expireAt } = req.body;
  title.trim();
  if (!title) {
    return res.sendStatus(422);
  }
  if (!expireAt) {
    expireAt = `${dayjs()
      .utc(-3)
      .add(1, "month")
      .format("YYYY-MM-DD")} ${dayjs()
      .utc(-3)
      .set("hour", 0)
      .set("minute", 0)
      .format("HH:mm")}`;
  }
  try {
    await db.collection("poll").insertOne({ title, expireAt });
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}
