import React from 'react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import {render, screen, waitFor} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import SearchResultsDropDown from '../../../src/components/NavBar/SearchResultsDropDown'
import { searchUsers } from '../../../src/services/user'

test('displays found users', async () => {
    window.localStorage.setItem("token", "mockToken");
    window.localStorage.setItem("user", JSON.stringify({ username: "mockUser" }));

    const mockSearchResults = [
        { _id: 1, username: 'user1', image: 'mockURL' },
        { _id: 2, username: 'user2', image: 'mockURL' },
    ];

    render(< SearchResultsDropDown
        foundUsers = {mockSearchResults}
        setShowSearchResults = {true}
        />, {wrapper: BrowserRouter})

    await expect(screen.getByRole('link', { name: /user1/i })).toBeInTheDocument();
    await expect(screen.getByRole('link', { name: /user2/i })).toBeInTheDocument();

    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
});

test('displays no users', async () => {
    window.localStorage.setItem("token", "mockToken");
    window.localStorage.setItem("user", JSON.stringify({ username: "mockUser" }));

    render(< SearchResultsDropDown
        foundUsers = {[]}
        setShowSearchResults = {true}
        />, {wrapper: BrowserRouter})

    await expect(screen.getByText('No users found')).toBeInTheDocument();

    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
});

test('clicking on found user navigates to their profile page', async () => {
    window.localStorage.setItem("token", "mockToken");
    window.localStorage.setItem("user", JSON.stringify({ username: "mockUser" }));

    const mockSearchResults = [
        { _id: 1, username: 'user1', image: 'mockURL' },
        { _id: 2, username: 'user2', image: 'mockURL' },
    ];

    render(< SearchResultsDropDown
        foundUsers = {mockSearchResults}
        setShowSearchResults = {true}
        />, {wrapper: BrowserRouter})

    await expect(screen.getByRole('link', { name: /user1/i })).toBeInTheDocument();

    const user = userEvent.setup()

    await user.click(screen.getByRole('link', {name: /user1/i}))

    await waitFor(() => {
        expect(window.location.pathname).toBe('/users/user1');
    });

    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
});

// const searchUsersMock = vi.fn().mockResolvedValue(mockSearchResults);

// vi.mock('../../src/services/user', () => ({
//     searchUsers: searchUsersMock
// }));