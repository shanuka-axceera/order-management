const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(cors());

app.use(bodyParser.json());
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

mongoose.connect(URL).catch(console.error);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongo DB Connection success");
});

app.route("/").get((req, res) => {
  res.send("SLIIT SPM");
});

const OrderAPI = require("./API/Order.Api.js");
app.use("/order", OrderAPI());

const CompleteOrderAPI = require("./API/completeOrder.Api");
app.use("/complete", CompleteOrderAPI());

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
