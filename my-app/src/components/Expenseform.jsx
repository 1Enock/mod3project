import { useState } from 'react'

const defaultForm = {
  title: '',
  amount: '',
  category: '',
}

function Expenseform({ onAdd }) {
  const [form, setForm] = useState(defaultForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const amount = parseFloat(form.amount)
    if (!form.title.trim() || Number.isNaN(amount) || amount <= 0) return

    onAdd({
      id: Date.now(),
      title: form.title.trim(),
      amount,
      category: form.category.trim() || 'Other',
    })

    setForm(defaultForm)
  }

  return (
    <div className="expense-card">
      <h3>Add spending</h3>
      <form className="expense-form" onSubmit={handleSubmit}>
        <label htmlFor="title">What did you spend on?</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Coffee, groceries, rent..."
        />

        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          value={form.amount}
          onChange={handleChange}
        />
        <label htmlFor="category">Category </label>
        <input
          id="category"
          name="category"
          type="text"
          value={form.category}
          onChange={handleChange}
          placeholder="Food, transport, entertainment..."
        />
        <button type="submit" className="primary">Add expense</button>
      </form>
    </div>
  )
}

export default Expenseform
