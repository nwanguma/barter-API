const { Schema, model } = require("mongoose");

const MatchSchema = new Schema(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true }
);

const Match = model("match", MatchSchema);

module.exports = Match;
