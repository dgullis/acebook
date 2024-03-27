import { expect, describe, it} from 'vitest'
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HomePage } from "../../src/pages/Home/HomePage";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'


describe("Home Page", () => {
  it("renders correctly", () => {
    // We need the Browser Router so that the Link elements load correctly
    render(<HomePage />, {wrapper: BrowserRouter})

    const aceBook = (screen.getAllByText('aceBook'))
    expect(aceBook).toHaveLength(2)
    const signUpButtons =screen.getAllByRole('button', {name: 'Sign up'})
    expect(signUpButtons).toHaveLength(2)
    const logInButtons =screen.getAllByRole('button', {name: 'Log in'})
    expect(logInButtons).toHaveLength(2)
    expect(screen.getByRole('button', {name: 'About aceBook'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Home'})).toBeInTheDocument()
    expect(screen.getByText(/aceBook is a project completed on the Makers Academy software development bootcamp./i)).toBeInTheDocument()

  });

  it('navigates to sign up page after clicking the button', async() => {
    render(<HomePage />, {wrapper: BrowserRouter})
    const signUpButtons = screen.getAllByRole('button', {name: 'Sign up'})
    await userEvent.click(signUpButtons[0])
    await waitFor(() => {
      expect(window.location.pathname).toBe('/signup');
    })

  })

  it('navigates to log in page after clicking the button', async() => {
    render(<HomePage />, {wrapper: BrowserRouter})
    const logInButtons = screen.getAllByRole('button', {name: 'Log in'})
    await userEvent.click(logInButtons[0])
    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    })
  })

})
