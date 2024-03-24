import React from 'react'
import '@testing-library/jest-dom'
import {render, screen, waitFor} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import SignUpNavItem from '../../../src/components/NavBar/SignupNavItem'

test('navigates to login page', async () => {
    render(<SignUpNavItem />, {wrapper: BrowserRouter})
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', {name: /Sign Up/i}))

    await waitFor(() => {
    // Check if the navigation URL is correct ("/login")
    expect(window.location.pathname).toBe('/signup');
    });

});