// src/components/ExpenseSummary.js
import React from "react";
import CalculationService from "../services/CalculationService";
import FriendService from "../services/FriendService";
import ExpenseService from "../services/ExpenseService";
import "./ExpenseSummary.css";

const ExpenseSummary = () => {
  const expenses = ExpenseService.getExpenses();
  const friends = FriendService.getFriends();
  const totalExpenses = CalculationService.calculateTotal(expenses);
  const balances = CalculationService.splitExpensesEqually(expenses, friends);
  const settlements = CalculationService.settleBalances(balances);

  return (
    <div className="expense-summary">
      <h2>Expense Summary</h2>
      <p><strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}</p>
      <h3>Individual Balances</h3>
      <ul>
        {Object.entries(balances).map(([friend, balance]) => (
          <li key={friend}>
            {friend}: {balance >= 0 ? `+${balance.toFixed(2)}` : `-${Math.abs(balance).toFixed(2)}`}
          </li>
        ))}
      </ul>
      <h3>Settlements</h3>
      <ul>
        {settlements.length > 0 ? settlements.map((settle, index) => (
          <li key={index}>{settle}</li>
        )) : <p>No settlements required.</p>}
      </ul>
    </div>
  );
};

export default ExpenseSummary;
