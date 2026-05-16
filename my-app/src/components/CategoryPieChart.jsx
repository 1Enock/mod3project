import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const COLORS = [
  '#4f46e5',
  '#f97316',
  '#06b6d4',
  '#ef4444',
  '#10b981',
  '#a78bfa',
  '#f59e0b',
  '#7c3aed',
]

function CategoryPieChart({ expenses = [] }) {
  const totals = {}
  expenses.forEach((e) => {
    const cat = e.category || 'Other'
    totals[cat] = (totals[cat] || 0) + Number(e.amount || 0)
  })

  const labels = Object.keys(totals)
  const data = {
    labels,
    datasets: [
      {
        data: labels.map((l) => totals[l]),
        backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length]),
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="chart-card">
      <h3>Spending by Category</h3>
      {labels.length ? <Pie data={data} /> : <p>No expenses yet.</p>}
    </div>
  )
}

export default CategoryPieChart
