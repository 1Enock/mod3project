import { useState } from 'react'
import ExpenseForm from '../components/Expenseform'
import ExpenseList from '../components/ExpenseList'

function Dashboard({ user, onLogout }) {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Morning coffee', amount: 3.5, category: 'Food' },
    { id: 2, title: 'Transit pass', amount: 12.0, category: 'Transport' },
  ])

  const addExpense = (expense) => {
    setExpenses((current) => [expense, ...current])
  }

  const total = expenses.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="page-card">
      <div className="dashboard-top">
        <div>
          <h2>Hi, {user}</h2>
          <p>Track your spending in a clean orange and blue dashboard.</p>
        </div>
        <button className="secondary" onClick={onLogout}>Logout</button>
      </div>

      <div className="summary-panel">
        <div className="summary-box summary-blue">
          <span>Total spent</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <div className="summary-box summary-orange">
          <span>Spending items</span>
          <strong>{expenses.length}</strong>
        </div>
      </div>

      <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  )
}

export default Dashboard
