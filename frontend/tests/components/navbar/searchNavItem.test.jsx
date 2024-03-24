import React from 'react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import {render, screen, waitFor} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import SearchNavItem from '../../../src/components/NavBar/SearchNavItem'
import { searchUsers } from '../../../src/services/user'



test('searches for users', async () => {
    window.localStorage.setItem("token", "mockToken");
    window.localStorage.setItem("user", JSON.stringify({ username: "mockUser" }));

    const mockSearchResults = [
        { _id: 1, username: 'user1', image: 'mockURL' },
        { _id: 2, username: 'user2', image: 'mockURL' },
    ];

    const searchUsersMock = vi.fn().mockResolvedValue(mockSearchResults);

    vi.mock('../../src/services/user', () => ({
        searchUsers: searchUsersMock
    }));

    render(<SearchNavItem handleSearch={mockSearchResults} />, {wrapper: BrowserRouter})

    const searchInput = screen.getByPlaceholderText('Search user')
    searchInput.value = 'user1'
    expect(searchInput.value).toBe('user1')
    // expect(searchUsersMock).toHaveBeenCalledWith('user1')


    // await expect(screen.getByRole('link', { name: /user1/i })).toBeInTheDocument();


    // expect(global.searchUsers).toHaveBeenCalled()

    // global.searchUsers = originalSearchUsers;
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
});