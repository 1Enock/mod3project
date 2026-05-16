import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

function TrendLineChart({ expenses = [] }) {
  const totalsByDate = {}
  expenses.forEach((e) => {
    const ts = Number(e.id) || Date.now()
    const d = new Date(ts)
    const key = d.toISOString().slice(0, 10)
    totalsByDate[key] = (totalsByDate[key] || 0) + Number(e.amount || 0)
  })

  const labels = Object.keys(totalsByDate).sort()
  const data = {
    labels,
    datasets: [
      {
        label: 'Daily spending',
        data: labels.map((l) => totalsByDate[l]),
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79,70,229,0.12)',
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  }

  return (
    <div className="chart-card">
      <h3>Spending Over Time</h3>
      {labels.length ? <Line data={data} /> : <p>No expenses yet.</p>}
    </div>
  )
}

export default TrendLineChart
