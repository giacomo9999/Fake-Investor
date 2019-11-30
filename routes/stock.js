const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Stock = require("../models/Stock.js");

// Get all stocks
router.get("/", (req, res, next) => {
  //   res.send("Router here.");
  Stock.find((err, stocks) => {
    if (err) return next(err);
    res.json(stocks);
  });
});

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
