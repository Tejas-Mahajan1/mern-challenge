const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productTransactionSchema = new Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
});

const ProductTransaction = mongoose.model(
  "ProductTransaction",
  productTransactionSchema
);

module.exports = ProductTransaction;
