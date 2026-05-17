import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AuthPage from './AuthPage'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

const mockSignIn = jest.fn()
const mockSignUp = jest.fn()
const mockSignInWithGoogle = jest.fn()
jest.mock('../firebase', () => ({
  signIn: (...args) => mockSignIn(...args),
  signUp: (...args) => mockSignUp(...args),
  signInWithGoogle: () => mockSignInWithGoogle(),
}))

describe('AuthPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('toggles to signup mode and back', async () => {
    render(<AuthPage />)
    const toggleButton = screen.getByRole('button', { name: /Create an account/i })
    await userEvent.click(toggleButton)
    expect(screen.getByText(/Already have an account/i)).toBeInTheDocument()
    const backButton = screen.getByRole('button', { name: /Sign in/i })
    await userEvent.click(backButton)
    expect(screen.getByText(/New here\?/i)).toBeInTheDocument()
  })

  test('successful sign in calls onLogin and navigates', async () => {
    mockSignIn.mockResolvedValue({ user: { uid: 'u1' } })
    const onLogin = jest.fn()
    render(<AuthPage onLogin={onLogin} />)

    await userEvent.type(screen.getByLabelText(/Email/i), 'a@b.com')
    await userEvent.type(screen.getByLabelText(/Password/i), 'pass')
    await userEvent.click(screen.getByRole('button', { name: /Sign in/i }))

    // wait for promises to resolve
    await new Promise((r) => setTimeout(r, 0))

    expect(mockSignIn).toHaveBeenCalledWith('a@b.com', 'pass')
    expect(onLogin).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })

  test('shows formatted error messages from firebase codes', async () => {
    mockSignIn.mockRejectedValue({ code: 'auth/wrong-password' })
    render(<AuthPage />)

    await userEvent.type(screen.getByLabelText(/Email/i), 'a@b.com')
    await userEvent.type(screen.getByLabelText(/Password/i), 'bad')
    await userEvent.click(screen.getByRole('button', { name: /Sign in/i }))

    await new Promise((r) => setTimeout(r, 0))

    expect(screen.getByText(/Incorrect password/i)).toBeInTheDocument()
  })

  test('google sign-in error shows provider-specific message', async () => {
    mockSignInWithGoogle.mockRejectedValue({ code: 'auth/popup-closed-by-user' })
    render(<AuthPage />)

    await userEvent.click(screen.getByRole('button', { name: /Continue with Google/i }))

    await new Promise((r) => setTimeout(r, 0))

    expect(screen.getByText(/Google sign-in popup was closed/i)).toBeInTheDocument()
  })
})
