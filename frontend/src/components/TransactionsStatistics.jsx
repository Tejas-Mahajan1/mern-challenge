import  { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsStatistics = ({selectedMonth}) => {
  const [statistics, setStatistics] = useState({});
 

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://s3.amazonaws.com/roxiler.com/product_transaction.json?month=${selectedMonth}`);
      setStatistics(response.data.statistics);
    };
    fetchData();
  }, [selectedMonth]);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Amount of Sale: {statistics.totalSaleAmount}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
    </div>
  );
};

export default TransactionsStatistics;
