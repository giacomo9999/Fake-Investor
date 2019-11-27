const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
  {
    user_name: { type: String },
    investment_data: [{ symbol: String, numOfShares: Number }]
  },
  { collection: "user_data" }
);

module.exports = mongoose.model("User", User);
