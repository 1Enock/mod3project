import { useState } from 'react'
import ExpenseForm from '../components/Expenseform'
import ExpenseList from '../components/ExpenseList'
import { logout } from '../firebase'

function Dashboard({ user }) {
  const [expenses, setExpenses] = useState([])

  const addExpense = (expense) => {
    setExpenses((current) => [expense, ...current])
  }

  const total = expenses.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="page-card">
      <div className="dashboard-top">
        <div>
          <h2>Hi, {user?.displayName || user?.email}</h2>
          <p>Track your spending.</p>
        </div>
        <button
          className="secondary"
          onClick={() => {
            logout().catch(() => {})
          }}
        >
          Logout
        </button>
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
