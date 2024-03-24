import React from 'react'
import { expect, describe, it} from 'vitest'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import AddComment from '../../src/components/AddComment/AddComment.jsx'
import { waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { postComment } from '../../src/services/posts.js'


describe('AddComment component', () => {

    vi.mock('../../src/services/posts.js', () => ({
        postComment: vi.fn(),
    }));

    it('renders correctly', () => {
        render (<AddComment />, {wrapper: BrowserRouter})
        expect(screen.getByRole('textbox')).toBeInTheDocument()

        const commentTextArea = (screen.getByRole('textbox'))
        expect(commentTextArea.placeholder).toBe('make a new comment');    })
    
    it('updates comment text when a user types', async () => {
        window.localStorage.setItem("token", "mockToken");
        window.localStorage.setItem("user", JSON.stringify({ username: "mockUser" }));
        
        render (<AddComment />, {wrapper: BrowserRouter})
        const user = userEvent.setup()
    
        const commentTextArea = (screen.getByRole('textbox'))
        user.type(commentTextArea, 'new comment');    
        
        await waitFor(() => {
            expect(commentTextArea.value).toBe('new comment');
        });
    
     
    
    });

    it('displays error message for empty comment', async () => {
        render (<AddComment />, {wrapper: BrowserRouter})
        const user = userEvent.setup()
        
        await user.click((screen.getByRole('button', {name: /Post Comment/i})))

        expect(screen.getByText('empty comment')).toBeInTheDocument();

    })

    it('submits comment and clears textarea on successful submission', async () => {
        window.localStorage.setItem("token", "mockToken");
        window.localStorage.setItem("user", JSON.stringify({ username: "mockUser" }));

        postComment.mockResolvedValue({message: "post comment successful"})
        render(<AddComment />);

        const commentTextArea = (screen.getByRole('textbox'))
        await userEvent.type(commentTextArea, 'new comment');
        await expect(commentTextArea.value).toBe('new comment');

        await userEvent.click((screen.getByRole('button', {name: /Post Comment/i})))

        console.log(postComment.mock.calls)
        
        await waitFor(() => {
            expect(commentTextArea.value).toBe('');
            expect(postComment).toHaveBeenCalledTimes(1);
        });

        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
    });

    it('handles error during comment submission', async () => {
        postComment.mockRejectedValueOnce(new Error('Error posting comment'));
        render(<AddComment />);
        const commentTextArea = (screen.getByRole('textbox'))
        await userEvent.type(commentTextArea, 'new comment');
        await userEvent.click((screen.getByRole('button', {name: /Post Comment/i})))

        await waitFor(() => {
            expect(screen.getByText('An error occured while posting comment')).toBeInTheDocument();
        });
    });



})



