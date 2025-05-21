import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState({ amount: "", category: "", date: "" });


 const styles = {
        container: {
        // textAlign: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        maxWidth: "600px",
        margin: "auto",
      }};


  useEffect(() => {
    axios.get(`http://localhost:9009/viewDetails/${id}`)
      .then(res => setExpense(res.data))
      .catch(() => alert("Error fetching expense details"));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:9009/update/${id}`, expense)
      .then(() => {
        alert("Expense updated successfully!");
        navigate("/");
      })
      .catch(() => alert("Error updating expense"));
  };

  return (
    <div className="container mt-4 bg-dark">
      <h1 className="text-light bg-dark">Edit Expense</h1>
      <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input type="number" className="form-control" value={expense.amount} onChange={e => setExpense({...expense, amount: e.target.value})} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" className="form-control" value={expense.category} onChange={e => setExpense({...expense, category: e.target.value})} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" value={expense.date} onChange={e => setExpense({...expense, date: e.target.value})} required />
        </div>
        <button type="submit" className="btn btn-primary">Update Expense</button>
      </form>
      </div>
      <br/>
      <br/>
    </div>
  );
};

export default EditExpense;

