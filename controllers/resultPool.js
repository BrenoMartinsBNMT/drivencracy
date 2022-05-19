import { ObjectId } from "bson";
import db from "../db.js";

export async function ReasultPool(req, res) {
  let arrayNumberVotes = [];

  let { id } = req.params;

  let { _id, expireAt, title } = await db
    .collection("poll")
    .findOne({ _id: ObjectId(id) });

  if (!_id) {
    return res.sendStatus(404);
  }
  let hasChoices = await db
    .collection("choices")
    .find({ poolId: _id.toString() })
    .toArray();

  arrayNumberVotes = await db
    .collection("votes")
    .aggregate([
      { $group: { _id: "$title", votes: { $sum: 1 } } },
      { $sort: { votes: -1 } },
    ])
    .toArray();

  console.log(arrayNumberVotes);
  res.send({
    _id,
    expireAt,
    title,
    result: {
      title: arrayNumberVotes[0]._id,
      votes: arrayNumberVotes[0].votes,
    },
  });
}
