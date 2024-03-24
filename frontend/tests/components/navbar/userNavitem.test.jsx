import React from 'react'
import '@testing-library/jest-dom'
import {render, screen, waitFor} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import UserNavItem from '../../../src/components/NavBar/UserNavItem'

test('navigates to user profile page', async () => {

    //mock user objects expected by component
    const userProp = {
        username: "mockUser",
        image: "mockURL"
    }
    render(<UserNavItem user={userProp} />, {wrapper: BrowserRouter})
    const user = userEvent.setup()

    await user.click(screen.getByRole('link', { name: /mockUser/i }))

    await waitFor(() => {
        expect(window.location.pathname).toBe('/users/mockUser');
    });


});