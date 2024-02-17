const ProductTransaction = require("../models/ProductTransaction");

exports.initializeDatabase = async (req, res) => {
  try {
    const response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const products = await response.json();

    // Initialize the database with seed data
    await ProductTransaction.insertMany(products);

    res.send("Database initialized");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
exports.listTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "" } = req.query;
    const query = search
      ? {
          $or: [
            { title: new RegExp(search, "i") },
            { description: new RegExp(search, "i") },
          ],
        }
      : {};
    const transactions = await ProductTransaction.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
exports.statistics = async (req, res) => {
  const { month } = req.query;
  try {
    const totalSaleAmount = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: `${month}-\\d{2}` }, sold: true } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);
    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: { $regex: `${month}-\\d{2}` },
      sold: true,
    });
    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: { $regex: `${month}-\\d{2}` },
      sold: false,
    });
    res.json({
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].total : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to calculate statistics" });
  }
};
exports.combinedData = async (req, res) => {
  try {
    const { month } = req.query;

    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      ProductTransaction.find({ dateOfSale: { $regex: `.*-${month}-.*` } }),
      fetch(`http://localhost:3000/statistics?month=${month}`).then((res) =>
        res.json()
      ),
      fetch(`http://localhost:3000/bar-chart?month=${month}`).then((res) =>
        res.json()
      ),
      fetch(`http://localhost:3000/pie-chart?month=${month}`).then((res) =>
        res.json()
      ),
    ]);

    res.json({ transactions, statistics, barChart, pieChart });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
exports.barChart = async (req, res) => {
  try {
    const { month } = req.query;
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const barChartData = await Promise.all(
      priceRanges.map(async ({ min, max }) => {
        const count = await ProductTransaction.countDocuments({
          dateOfSale: { $regex: `.*-${month}-.*` },
          price: { $gte: min, $lt: max },
        });
        return { range: `${min}-${max}`, count };
      })
    );

    res.json(barChartData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
exports.pieChart = async (req, res) => {
  try {
    const { month } = req.query;
    const pieChartData = await ProductTransaction.aggregate([
      { $match: { dateOfSale: { $regex: `.*-${month}-.*` } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json(pieChartData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
