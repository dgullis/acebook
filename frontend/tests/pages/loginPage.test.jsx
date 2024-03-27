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

  const emailInputEl = screen.getByLabelText("email");
  const passwordInputEl = screen.getByLabelText("password");
  const submitButtonEl = screen.getByRole('button', {name: 'Log In'});

  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "1234");
  await user.click(submitButtonEl);
};

describe("Login Page", () => {
  // beforeEach(() => {
  //   vi.resetAllMocks();
  // });

  it('renders correctly', () => {
    render(<LoginPage />)
    console.log(document.body.innerHTML)
    const emailInputEl = screen.getByLabelText("email")
    expect(emailInputEl).toBeInTheDocument()
  })

  // it("allows a user to login", async () => {
  //   render(<LoginPage />);

  //   await completeLoginForm();

  //   expect(login).toHaveBeenCalledWith("test@email.com", "1234");
  // });

  // it("navigates to /posts on successful login", async () => {
  //   render(<LoginPage />);

  //   login.mockResolvedValue("secrettoken123");
  //   const navigateMock = useNavigate();

  //   await completeLoginForm();

  //   expect(navigateMock).toHaveBeenCalledWith("/posts");
  // });

  // it("navigates to /login on unsuccessful login", async () => {
  //   render(<LoginPage />);

  //   login.mockRejectedValue(new Error("Error logging in"));
  //   const navigateMock = useNavigate();

  //   await completeLoginForm();

  //   expect(navigateMock).toHaveBeenCalledWith("/login");
  // });
});
