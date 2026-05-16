function ExpenseList({ expenses }) {
  if (!expenses.length) {
    return <div className="expense-card empty">No spending yet. Add your first item above.</div>
  }

  return (
    <div className="expense-card">
      <h3>Recent spending</h3>
      <ul className="expense-list">
        {expenses.map((item) => (
          <li key={item.id} className="expense-item">
            <div>
              <strong>{item.title}</strong>
              <span>{item.category}</span>
            </div>
            <div>${item.amount.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExpenseList
