const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cores = require("cors");
const bodyParser = require("body-parser");
const ProductTransaction = require("./models/ProductTransaction");

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017/product_transactions", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());
app.use(cores());

const router = require("./routes/products");
app.use("/api/v1", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
