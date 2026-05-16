import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="page-card home-page">
      <div className="home-hero">
        <h2>Welcome to FinPlan</h2>
        <p>
          FinPlan is a simple, secure spending tracker that helps you manage your money from sign-in to dashboard.
          Add expenses with titles, amounts and categories, see your total spending, remove old items, and explore
          visual insights that reveal how your money is used over time.
        </p>
        <button className="primary" onClick={() => navigate('/login')}>
          Go to login
        </button>
      </div>
      <div className="home-features">
        <div className="feature-card">
          <h3>Safe sign-in</h3>
          <p>Access your personal expense dashboard from anywhere using secure login.</p>
        </div>
        <div className="feature-card">
          <h3>Add expenses</h3>
          <p>Quickly add spending items with amount, title and category so every purchase is tracked.</p>
        </div>
        <div className="feature-card">
          <h3>Real-time totals</h3>
          <p>Watch your total spending and transaction count update instantly as you log expenses.</p>
        </div>
        <div className="feature-card">
          <h3>Charts and trends</h3>
          <p>Visualize spending by category and track your daily spending trends with easy charts.</p>
        </div>
        <div className="feature-card">
          <h3>Manage entries</h3>
          <p>Remove old items and keep your expense history clean and accurate.</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
