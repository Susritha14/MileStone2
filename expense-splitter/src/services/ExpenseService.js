// src/services/ExpenseService.js
const EXPENSES_KEY = "expenses";

const ExpenseService = {
  getExpenses: () => {
    return JSON.parse(localStorage.getItem(EXPENSES_KEY)) || [];
  },

  addExpense: (expense) => {
    let expenses = ExpenseService.getExpenses();
    expenses.push({ id: Date.now(), ...expense });
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
    return expenses;
  },

  removeExpense: (id) => {
    let expenses = ExpenseService.getExpenses().filter(expense => expense.id !== id);
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
    return expenses;
  }
};

export default ExpenseService;
