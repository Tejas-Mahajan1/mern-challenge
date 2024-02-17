

const MonthDropdown = ({ selectedMonth, setSelectedMonth }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <select value={selectedMonth} onChange={handleChange}>
      {months.map((month) => (
        <option key={month} value={month}>{month}</option>
      ))}
    </select>
  );
};

export default MonthDropdown;
