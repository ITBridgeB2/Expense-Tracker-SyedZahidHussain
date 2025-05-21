import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
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
        maxWidth: "600px",
        margin: "auto",
      }};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !date) {
      setError("All fields are required!");
      return;
    }

    axios.post("http://localhost:9009/add", { amount, category, date })
      .then(() => { alert("New Expense added Sucessfully");
        navigate("/");})
      .catch(() => setError("Failed to add expense. Try again."));
  };

  return (
    <div className="container mt-4 bg-dark">
         <h1 className="text-light bg-dark">Add New Expense</h1>
        <div style={styles.container} >
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div    className="mb-3">
          <label className="form-label">Amount</label>
          <input type="number" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" className="form-control" value={category} onChange={e => setCategory(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Expense</button>
      </form>
      </div>
      <br/>
      <br/>
    </div>
  );
};

export default ExpenseForm;
