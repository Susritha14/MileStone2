// src/services/CalculationService.js
const CalculationService = {
  calculateTotal: (expenses) => {
    return expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  },

  splitExpensesEqually: (expenses, friends) => {
    if (friends.length === 0) return {};

    const total = CalculationService.calculateTotal(expenses);
    const equalShare = total / friends.length;

    let balances = {};
    friends.forEach(friend => (balances[friend.name] = -equalShare));

    expenses.forEach(expense => {
      balances[expense.payer] += parseFloat(expense.amount);
    });

    return balances;
  },

  settleBalances: (balances) => {
    let transactions = [];
    let creditors = [], debtors = [];

    Object.entries(balances).forEach(([name, balance]) => {
      if (balance > 0) creditors.push({ name, amount: balance });
      else if (balance < 0) debtors.push({ name, amount: -balance });
    });

    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);

    while (creditors.length && debtors.length) {
      let creditor = creditors[0];
      let debtor = debtors[0];

      let amount = Math.min(creditor.amount, debtor.amount);
      transactions.push(`${debtor.name} owes ${creditor.name} $${amount.toFixed(2)}`);

      creditor.amount -= amount;
      debtor.amount -= amount;

      if (creditor.amount === 0) creditors.shift();
      if (debtor.amount === 0) debtors.shift();
    }

    return transactions;
  }
};

export default CalculationService;
