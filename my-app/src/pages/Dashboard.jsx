import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ExpenseForm from '../components/Expenseform'
import ExpenseList from '../components/ExpenseList'
import { logout } from '../firebase'
import CategoryPieChart from '../components/CategoryPieChart'
import TrendLineChart from '../components/TrendLineChart'

function Dashboard({ user }) {
  const [expenses, setExpenses] = useState([])
  const navigate = useNavigate()

  // Load expenses from localStorage on mount
  useEffect(() => {
    if (!user) return

    const stored = localStorage.getItem(`expenses_${user.uid}`)
    const items = stored ? JSON.parse(stored) : []
    setExpenses(items)
  }, [user])

  const addExpense = (expense) => {
    if (!user || !user.uid) {
      console.error('Cannot add expense: user not authenticated')
      return
    }

    try {
      const updated = [...expenses, expense]
      setExpenses(updated)
      localStorage.setItem(`expenses_${user.uid}`, JSON.stringify(updated))
      console.log('Expense added:', expense.id)
    } catch (error) {
      console.error('Error adding expense:', error)
    }
  }

  const removeExpense = (expenseId) => {
    try {
      const updated = expenses.filter(item => item.id !== expenseId)
      setExpenses(updated)
      localStorage.setItem(`expenses_${user.uid}`, JSON.stringify(updated))
      console.log('Expense removed:', expenseId)
    } catch (error) {
      console.error('Error removing expense:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      navigate('/login')
    }
  }

  const total = expenses.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="page-card">
      <div className="dashboard-top">
        <div>
          <h2>Hi, {user?.displayName || user?.email}</h2>
          <p>Track your spending.</p>
        </div>
        <button className="secondary" onClick={handleLogout}>
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

      <div className="charts-grid">
        <CategoryPieChart expenses={expenses} />
        <TrendLineChart expenses={expenses} />
      </div>

      <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={expenses} onRemove={removeExpense} />
    </div>
  )
}

export default Dashboard
