const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const stock = require("../routes/stock");

const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, "../dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");
const mongoURL = process.env.MONGO_CONN;

mongoose.Promise = global.Promise;

mongoose
  .connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Cannot connect to database " + err);
    }
  );

const mockResponse = {
  foo: "bar",
  bar: "foo"
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(DIST_DIR));

app.use("/api/stock", stock);

app.get("/api", (req, res) => {
  res.send(mockResponse);
});

app.get("/", (req, res) => {
  res.status(200).sendFile(HTML_FILE);
});

app.listen(port, function() {
  console.log("App listening on port: " + port);
});
