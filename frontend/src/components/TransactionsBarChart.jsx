import  { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const TransactionsBarChart = ({selectedMonth }) => {
  const [chartData, setChartData] = useState({});
 

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://s3.amazonaws.com/roxiler.com/product_transaction.json?month=${selectedMonth}`);
      setChartData(response.data.chartData);
    };
    fetchData();
  }, [selectedMonth]);

  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default TransactionsBarChart;
