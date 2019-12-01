const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Stock = require("../models/Stock.js");
const axios = require("axios");

// Get all stocks
router.get("/", (req, res, next) => {
  //   res.send("Router here.");
  Stock.find((err, stocks) => {
    console.log("Back end getting stocks from DB...", stocks);
    const newStockObj = {};
    stocks.forEach(entry => {
      newStockObj[entry.stock_symbol] = { shares: entry.num_of_shares };
    });

    const pricePromisesArray = [];
    const key = process.env.ALPHA_V;

    for (let i = 0; i < stocks.length; i++) {
      const url = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${stocks[i].stock_symbol}&apikey=${key}`;
      pricePromisesArray.push(
        axios
          .get(url)
          .then(
            entry =>
              (newStockObj[
                entry.data["Stock Quotes"][0]["1. symbol"]
              ].price = Number(entry.data["Stock Quotes"][0]["2. price"]))
          )
      );
    }

    Promise.all(pricePromisesArray).then(() => console.log(newStockObj));

    if (err) return next(err);
    res.json(newStockObj);
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
