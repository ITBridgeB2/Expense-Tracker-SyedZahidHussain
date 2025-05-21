import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseList from "./listofExpenses";
import ExpenseForm from "./expenseForm";
import ExpenseDetails from "./expenseDetails";
import EditExpense from "./editExpense";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExpenseList />} />
        <Route path="/addNewExpense" element={<ExpenseForm/>}/>
        <Route path="/viewExpense/:id" element={<ExpenseDetails/>}/>
        <Route path="/editExpense/:id" element={<EditExpense/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
