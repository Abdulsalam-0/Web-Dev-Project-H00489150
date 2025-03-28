const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('totalIncome');
const expenseEl = document.getElementById('totalExpense');
const transactionList = document.getElementById('transactionList');
const addBtn = document.getElementById('addTransaction');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateTotals() {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, cur) => acc + cur.amount, 0);
  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, cur) => acc + cur.amount, 0);

  balanceEl.textContent = (income - expense).toFixed(2);
  incomeEl.textContent = income.toFixed(2);
  expenseEl.textContent = expense.toFixed(2);
}

function renderTransactions() {
  transactionList.innerHTML = '';
  transactions.forEach((t, index) => {
    const li = document.createElement('li');
    li.textContent = `${t.description}: ${t.amount} USD`;
    li.style.color = t.type === 'income' ? 'green' : 'red';

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '🗑️';
    deleteBtn.className = 'edit-delete';
    deleteBtn.onclick = () => deleteTransaction(index);

    const editBtn = document.createElement('span');
    editBtn.textContent = '✏️';
    editBtn.className = 'edit-delete';
    editBtn.onclick = () => editTransaction(index);

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    transactionList.appendChild(li);
  });
}

function addTransaction() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (!description || isNaN(amount)) return alert('Please enter valid values.');

  transactions.push({ description, amount, type });
  localStorage.setItem('transactions', JSON.stringify(transactions));
  descriptionInput.value = '';
  amountInput.value = '';
  renderTransactions();
  updateTotals();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderTransactions();
  updateTotals();
}

function editTransaction(index) {
  const t = transactions[index];
  descriptionInput.value = t.description;
  amountInput.value = t.amount;
  typeInput.value = t.type;
  deleteTransaction(index);
}

addBtn.addEventListener('click', addTransaction);
renderTransactions();
updateTotals();
