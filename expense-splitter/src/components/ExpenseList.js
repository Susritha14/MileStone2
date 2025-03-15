// src/components/ExpenseList.js
import React, { useState } from "react";
import ExpenseService from "../services/ExpenseService";
import FriendService from "../services/FriendService";
import "./ExpenseList.css";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState(ExpenseService.getExpenses());
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [description, setDescription] = useState("");

  const addExpense = () => {
    if (amount === "" || payer === "") return;
    setExpenses(ExpenseService.addExpense({ amount, payer, description }));
    setAmount("");
    setPayer("");
    setDescription("");
  };

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="">Select Payer</option>
        {FriendService.getFriends().map(friend => (
          <option key={friend.id} value={friend.name}>{friend.name}</option>
        ))}
      </select>
      <button onClick={addExpense}>Add Expense</button>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>{expense.description} - {expense.amount} paid by {expense.payer}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
