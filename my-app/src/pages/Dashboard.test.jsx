import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dashboard from './Dashboard'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

const mockLogout = jest.fn()
jest.mock('../firebase', () => ({
  logout: () => mockLogout(),
}))

describe('Dashboard', () => {
  beforeEach(() => jest.clearAllMocks())

  test('renders user greeting and calls logout then navigates', async () => {
    mockLogout.mockResolvedValue()
    render(<Dashboard user={{ displayName: 'Test User' }} />)

    expect(screen.getByText(/Hi, Test User/i)).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /Logout/i }))

    // wait for any async handlers
    await new Promise((r) => setTimeout(r, 0))

    expect(mockLogout).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })
})
