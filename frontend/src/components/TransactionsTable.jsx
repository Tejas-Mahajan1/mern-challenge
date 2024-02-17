import { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({selectedMonth}) => {
  const [transactions, setTransactions] = useState([]);
 
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://s3.amazonaws.com/roxiler.com/product_transaction.json?month=${selectedMonth}&search=${searchText}&page=${currentPage}`);
      setTransactions(response.data);
    };
    fetchData();
  }, [selectedMonth, searchText, currentPage]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2>Transactions</h2>
      <input type="text" placeholder="Search transactions" value={searchText} onChange={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date of Sale</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.price}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.dateOfSale}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default TransactionsTable;
