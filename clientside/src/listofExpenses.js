import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses,setTotalExpenses]=useState({})
  //const [totalExpenses, setTotalExpenses] = useState({});

  const styles = {
        container: {
        // textAlign: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        maxWidth: "800px",
        margin: "auto",
      }};

 useEffect(() => {
  axios.get("http://localhost:9009/totalExpenses")
    .then(res => setTotalExpenses(res.data))
    .catch(error => console.error("Error fetching total expenses:", error));
}, []); // Runs only on component mount



  useEffect(() => {
    axios.get("http://localhost:9009/view")
    .then(res => setExpenses(res.data))
    .catch((error) => console.error("Error fetching post:", error))
  }, []);

  return (
    <div className="container mt-4 bg-dark">
        <h1 className="text-light bg-dark">&nbsp;&nbsp;&nbsp;&nbsp;Expense Tracker</h1>
        <div style={styles.container} >
<h3><strong>Total Spent :</strong> {totalExpenses.totalexpense}</h3>

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
            <td>{new Date(expense.date).toLocaleDateString()}</td>

              <td>{expense.category}</td>
              <td>₹{expense.amount}</td>
              <td>
                <Link to={`/viewExpense/${expense.id}`} >View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    <div align="center">
      <Link to="/addNewExpense"><button className="btn btn-primary">+Add NewExpense</button></Link>
      </div>
      </div>
      <br/>
       <br/>
    </div>
  );
};

export default ExpenseList;
