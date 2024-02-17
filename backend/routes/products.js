const express = require("express");
const {
  initializeDatabase,
  listTransactions,
  combinedData,
  barChart,
  pieChart,
  statistics,
} = require("../controllers/productsController");

const router = express.Router();

router.route("/initialize-database").get(initializeDatabase);
router.route("/list-transactions").get(listTransactions);
router.route("/statistics").get(statistics);
router.route("/bar-chart").get(barChart);
router.route("/pie-chart").get(pieChart);
router.route("/combined-data").get(combinedData);

module.exports = router;

