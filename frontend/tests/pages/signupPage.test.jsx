import { expect, describe, it} from 'vitest'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import { vi } from "vitest";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { signup } from "../../src/services/authentication";
import { SignupPage } from "../../src/pages/Signup/SignupPage";


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

     // Create a mock function for useNavigate
});

// Mocking the signup service
vi.mock("../../src/services/authentication", () => {
    const signupMock = vi.fn();
    return { signup: signupMock };
});

// Reusable function for filling out signup form
const completeSignupForm = async () => {
    const user = userEvent.setup();

    const usernameInputEl = screen.getByPlaceholderText("Username")
    const emailInputEl = screen.getByPlaceholderText("Email")
    const passwordInputEl = screen.getByPlaceholderText("Password")
    const submitButtonEl = screen.getByRole('submit-button');

    await user.type(usernameInputEl, "test user");
    await user.type(emailInputEl, "test@email.com");
    await user.type(passwordInputEl, "cHeck123Test!");
    await user.click(submitButtonEl);
  };


describe("Signup Page", () => {
    // beforeEach(() => {
    //     vi.resetAllMocks();
    // });

    it('renders correctly', () => {

        render(<SignupPage />, {wrapper:BrowserRouter})
        const usernameInputEl = screen.getByPlaceholderText("Username")
        const emailInputEl = screen.getByPlaceholderText("Email")
        const passwordInputEl = screen.getByPlaceholderText("Password")
        const submitButtonEl = screen.getByRole('submit-button');

        expect(usernameInputEl).toBeInTheDocument()
        expect(emailInputEl).toBeInTheDocument()
        expect(passwordInputEl).toBeInTheDocument()
        expect(submitButtonEl).toBeInTheDocument()
    })

    it('displays password security prompt when user entering password', async() => {
        render(<SignupPage />, {wrapper:BrowserRouter})
        const passwordInputEl = screen.getByPlaceholderText("Password")
        await userEvent.type(passwordInputEl, 'pass')
        expect(screen.getByText('Password must contain:')).toBeInTheDocument()
    })

    it('allows a user to sign up', async() => {
        signup.mockResolvedValueOnce({})
        render(<SignupPage />, {wrapper:BrowserRouter})
        await completeSignupForm()
        const navigateMock = useNavigate();
        expect(navigateMock).toHaveBeenCalledWith("/login")
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
    })

    it('displays error message when signup is not successfull', async () => {
        signup.mockRejectedValueOnce(new Error('signup error'))
        render(<SignupPage />, {wrapper:BrowserRouter})
        await completeSignupForm()
        expect(screen.getByText('signup error')).toBeInTheDocument()

    })

});
