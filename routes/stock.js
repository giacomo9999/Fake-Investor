const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Stock = require("../models/Stock.js");
const axios = require("axios");

// Get all stocks
router.get("/", (req, res, next) => {
  //   res.send("Router here.");
  Stock.find((err, stocks) => {
    // console.log("Back end getting stocks from DB...", stocks);
    const pricePromisesArray = [];
    const key = process.env.ALPHA_V;

    for (let i = 0; i < stocks.length; i++) {
      const url = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${stocks[i].stock_symbol}&apikey=${key}`;
      pricePromisesArray.push(axios.get(url));
    }

    Promise.all(pricePromisesArray).then(values => {
      console.log(
        "Values[0].data------------------",
        values[0].data["Stock Quotes"][0]["2. price"]
      );
    });

    if (err) return next(err);
    res.json(stocks);
  });
});

// .then(res => {
//     console.log("Res.data: ", res.data["Stock Quotes"]);
//     stocks[i].price = res.data["Stock Quotes"][0]["2. price"];
//   });

// Save stock
router.post("/", function(req, res, next) {
  Stock.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// "Add" route
router.post("/add", (req, res) => {
  // res.send(req.body);
  let newStock = new Stock({
    stock_symbol: req.body.stockSymbol,
    num_of_shares: req.body.numOfShares
  });
  console.log("Router: adding new stock: ", newStock);

  newStock
    .save()
    .then(newStock => res.json("Router says: Stock added successfully"))
    .catch(err => {
      res.status(400).send("Unable to save to database.");
    });
});

module.exports = router;
