let transactions = [];
let filterType = "All";

const form = document.getElementById("transaction-form");
const typeInput = document.getElementById("type");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const list = document.getElementById("transaction-list");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const balanceEl = document.getElementById("balance");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const type = typeInput.value;
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  if (amount > 0 && category.trim() !== "") {
    transactions.push({ type, amount, category });
    amountInput.value = "";
    categoryInput.value = "";
    render();
  }
});

function deleteTransaction(index) {
  transactions.splice(index, 1);
  render();
}

function setFilter(type) {
  filterType = type;
  render();
}

function render() {
  list.innerHTML = "";
  let income = 0, expense = 0;

  transactions.forEach((t, index) => {
    if (t.type === "Income") income += t.amount;
    else expense += t.amount;

    if (filterType === "All" || filterType === t.type) {
      const li = document.createElement("li");
      li.innerHTML = `
        ${t.type}: ₹${t.amount} (${t.category})
        <button onclick="deleteTransaction(${index})">🗑</button>
      `;
      list.appendChild(li);
    }
  });

  totalIncomeEl.textContent = income;
  totalExpenseEl.textContent = expense;
  balanceEl.textContent = income - expense;
}

render();
