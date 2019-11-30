const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Stock = new Schema(
  {
    stock_symbol: { type: String },
    investment_data: { numOfShares: Number }
  },
  { collection: "user_data" }
);

module.exports = mongoose.model("Stock", Stock);
