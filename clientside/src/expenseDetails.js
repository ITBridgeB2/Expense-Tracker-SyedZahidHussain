import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExpenseDetails = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    axios.get(`http://localhost:9009/viewDetails/${id}`)
      .then(res => setExpense(res.data))
      .catch(() => setError("Failed to load expense details"));
  }, [id]);
   
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      axios.delete(`http://localhost:9009/deleteExpense/${id}`)
        .then(() => {
          alert("Expense deleted successfully!");
          navigate("/");
        })
        .catch(() => alert("Error deleting expense"));
    }
  };

  if (error) return <p className="alert alert-danger">{error}</p>;
  if (!expense) return <p>Loading expense details...</p>;

  return (
    <div className="container mt-4 bg-dark">
        <div className="text-light bg-dark" >
      <h1>Expense Details</h1>
      <div style={styles.container}  className="card p-3">
        <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
        <p><strong>Category:</strong> {expense.category}</p>
        <p><strong>Amount:</strong> ₹{expense.amount}</p>
        <p><strong>Updated On: </strong > {expense.created_at}</p>
         <div className="mt-3">
          <Link to={`/editExpense/${expense.id}`} className="btn btn-info me-3">
            Edit
          </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="btn btn-danger" onClick={handleDelete}>
             Delete
          </button>
        </div>
      </div>

      <Link to="/" className="btn btn-primary mt-3">Back to Expenses</Link>
      </div>
      <br/>
    </div>
  );
};

export default ExpenseDetails;
