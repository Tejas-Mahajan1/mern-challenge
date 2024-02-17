import TransactionsTable from "./components/TransactionsTable";
import TransactionsStatistics from "./components/TransactionsStatistics";
import TransactionsBarChart from "./components/TransactionsBarChart";
import "./App.css";
import MonthDropdown from "./components/MonthDropdown";
import SearchButton from "./components/SearchButton";
import { useState , useEffect } from "react";
import axios from 'axios';

const App = () => {

  const [selectedMonth, setSelectedMonth] = useState('March');
  const [searchText, setSearchText] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://s3.amazonaws.com/roxiler.com/product_transaction.json?month=${selectedMonth}`);
      setFilteredTransactions(response.data.transactions);
    };
    fetchData();
  }, [selectedMonth]);

  const handleSearch = async () => {
    const response = await axios.get(`https://s3.amazonaws.com/roxiler.com/product_transaction.json?month=${selectedMonth}&search=${searchText}`);
    setFilteredTransactions(response.data.transactions);
  };
  return (
    <center>
      <h1>Transactions Dashboard</h1>
      <div>
        <MonthDropdown selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
        <input
          type="text"
          placeholder="Search transactions"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SearchButton handleSearch={handleSearch} />
      </div>
      <TransactionsTable transactions={filteredTransactions} selectedMonth={selectedMonth} />
      <TransactionsStatistics selectedMonth={selectedMonth}  />
      <TransactionsBarChart selectedMonth={selectedMonth}   />
    </center>
  );
};

export default App;
