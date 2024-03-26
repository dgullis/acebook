import React from 'react'
import { expect, describe, it} from 'vitest'
import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import Friends from '../../src/components/Friends/Friends'

describe('Friends component', () => {
    const friends = [
        {_id: 1, username:'user1' , image: 'user1.img'},
        {_id: 2, username:'user2' , image: 'user2.img'},
        {_id: 3, username:'user3' , image: 'user3.img'}
]
    it('renders correctly displaying list of friends username and image as clickable link to their profile page', () => {

        
        render(<Friends friends={friends}/>, {wrapper: BrowserRouter} )

        expect(screen.queryByText('user1')).toBeInTheDocument()
        expect(screen.queryByText('user2')).toBeInTheDocument()
        expect(screen.queryByText('user3')).toBeInTheDocument()
    })

    it('navigates to userpage when clicking username', async () => {
        render(<Friends friends={friends}/>, {wrapper: BrowserRouter} )

        await expect(screen.getByRole('link', { name: /user1/i })).toBeInTheDocument();
        await userEvent.click(screen.getByRole('link', { name: /user1/i }))
        await waitFor(() => {
            expect(window.location.pathname).toBe('/users/user1');
        });

    })
})