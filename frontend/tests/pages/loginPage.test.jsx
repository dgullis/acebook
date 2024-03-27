import { expect, describe, it} from 'vitest'
import '@testing-library/jest-dom'
import {render, screen, waitFor, beforeEach } from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { useNavigate } from "react-router-dom";
import { login } from "../../src/services/authentication";
import { LoginPage } from "../../src/pages/Login/LoginPage";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual('react-router-dom')
  const MockLink = ({to, children}) => <a href={to}>{children}</a>
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock;
  return {
      ...actual,
      Link:MockLink,
      useNavigate: useNavigateMock
  }
});

// Mocking the login service
vi.mock("../../src/services/authentication", () => {
  const loginMock = vi.fn();
  return { login: loginMock };
});

// Reusable function for filling out login form
const completeLoginForm = async () => {
  const user = userEvent.setup();

  const emailInputEl = screen.getByPlaceholderText("Email")
  const passwordInputEl = screen.getByPlaceholderText("Password");
  const submitButtonEl = screen.getByRole('submit-button');

  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "Passw0rd123!T");
  await user.click(submitButtonEl);
};

describe("Login Page", () => {


  it('renders correctly', () => {
    render(<LoginPage />)
    const emailInputEl = screen.getByPlaceholderText("Email")
    const passwordInputEl = screen.getByPlaceholderText("Password");
    const submitButtonEl = screen.getByRole('submit-button');

    expect(emailInputEl).toBeInTheDocument()
    expect(passwordInputEl).toBeInTheDocument()
    expect(submitButtonEl).toBeInTheDocument()

  })

  it('directs to the feedpage after successful login', async () => {
    login.mockResolvedValueOnce({token: 'mockToken', user: {username:'mockUser'}})
    render(<LoginPage/>, {wrapper: BrowserRouter})
    await completeLoginForm()
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/posts")
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");

  });

  it('displays error message Email or password not entered if both inputs empty', async () => {
    render(<LoginPage/>, {wrapper: BrowserRouter})
    await userEvent.click(screen.getByRole('submit-button'))
    expect(screen.getByText('Email or password not entered')).toBeInTheDocument()
  })

  it('displays error message if login fails', async () => {
    login.mockRejectedValueOnce(new Error('user not found'))
    render(<LoginPage/>, {wrapper: BrowserRouter})
    await completeLoginForm()
    expect(screen.getByText('user not found')).toBeInTheDocument()
  })


  
  })

