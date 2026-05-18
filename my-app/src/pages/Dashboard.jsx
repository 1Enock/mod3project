import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import ExpenseForm from '../components/Expenseform'
import ExpenseList from '../components/ExpenseList'
import { logout, db } from '../firebase'
import CategoryPieChart from '../components/CategoryPieChart'
import TrendLineChart from '../components/TrendLineChart'

function Dashboard({ user }) {
  const [expenses, setExpenses] = useState([])
  const navigate = useNavigate()

  // Load expenses from Firebase on mount
  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, 'expenses'),
      where('userId', '==', user.uid)
    )

    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      console.log('Firestore snapshot received:', items)
      setExpenses(items)
    }, (err) => {
      console.error('Error listening to expenses:', err)
    })

    return unsub
  }, [user])

  const addExpense = async (expense) => {
    if (!user || !user.uid) {
      console.error('Cannot add expense: user not authenticated')
      return
    }

    try {
      const docRef = await addDoc(collection(db, 'expenses'), {
        ...expense,
        userId: user.uid,
        createdAt: serverTimestamp()
      })
      console.log('Expense added:', docRef.id)
    } catch (error) {
      console.error('Error adding expense:', error)
    }
  }

  const removeExpense = async (expenseId) => {
    try {
      await deleteDoc(doc(db, 'expenses', expenseId))
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
