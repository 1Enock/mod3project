import { render, screen } from '@testing-library/react'
import HomePage from './HomePage'
import { BrowserRouter } from 'react-router-dom'

describe('HomePage', () => {
  const renderHomePage = () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
  }

  test('renders without crashing', () => {
    renderHomePage()
    expect(screen.getByRole('heading', { name: /Welcome to FinPlan/i })).toBeInTheDocument()
  })

  test('renders the main heading "Welcome to FinPlan"', () => {
    renderHomePage()
    const heading = screen.getByRole('heading', { name: /Welcome to FinPlan/i })
    expect(heading).toBeInTheDocument()
  })

  test('renders the description paragraph', () => {
    renderHomePage()
    const description = screen.getByText(/FinPlan is a simple, secure spending tracker/i)
    expect(description).toBeInTheDocument()
  })

  test('renders the "Go to login" button', () => {
    renderHomePage()
    const button = screen.getByRole('button', { name: /Go to login/i })
    expect(button).toBeInTheDocument()
  })

  test('renders all 5 feature cards', () => {
    renderHomePage()
    const featureHeadings = [
      'Safe sign-in',
      'Add expenses',
      'Real-time totals',
      'Charts and trends',
      'Manage entries',
    ]
    featureHeadings.forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument()
    })
  })

  test('renders feature card descriptions', () => {
    renderHomePage()
    const featureCards = screen.getAllByRole('heading', {
      level: 3,
    })
    expect(featureCards).toHaveLength(5)
    featureCards.forEach((card) => {
      expect(card).toBeInTheDocument()
    })
  })
})
