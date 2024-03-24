import React from 'react'
import '@testing-library/jest-dom'
import {render, screen, waitFor} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import LogoutNavItem from '../../../src/components/NavBar/LogoutNavItem'


test('navigates to login page', async () => {
    window.localStorage.setItem("token", "mockToken");
    window.localStorage.setItem("user", JSON.stringify({ username: "mockUser" }));
    
    // Mock confirming logout on window
    window.confirm = () => true;

    render(<LogoutNavItem />, {wrapper: BrowserRouter})
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', {name: /Log out/i}))

    await waitFor(() => {
        expect(window.location.pathname).toBe('/login');
    });

    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");

});