import React from 'react'
import { expect, describe, it} from 'vitest'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { likePost } from '../../src/services/posts'
import { createNotification } from '../../src/services/user'
import { waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import LikeButton from '../../src/components/LikeButton/LikeButton'

describe('LikeButton component', () => {

    vi.mock('../../src/services/posts', () => ({
        likePost: vi.fn()
    }))

    vi.mock('../../src/services/user', () => ({
        createNotification: vi.fn()
    }))

    it('renders correctly', () => {

        const props = {
            token: 'mockToken',
            postId: 'mockPostId',
            userId: 'mockUserId',
            setUserLikesPost: vi.fn(),
            loggedInUsername: 'mockUsername',
            post_userId: 'mockPostUserId',
            userLikesPost: true
        };

        render(<LikeButton {...props}/>, {wrapper: BrowserRouter})
        expect(screen.getByRole('button', { name: '' })).toBeInTheDocument()

    })

    it('triggers like post when clicked', async() => {
        likePost.mockResolvedValueOnce({})

        const props = {
            token: 'mockToken',
            postId: 'mockPostId',
            userId: 'mockUserId',
            setUserLikesPost: vi.fn(),
            loggedInUsername: 'mockUsername',
            post_userId: 'mockPostUserId',
            userLikesPost: true
        };

        render(<LikeButton {...props}/>, {wrapper: BrowserRouter})
        await userEvent.click(screen.getByRole('button', { name: '' }))

        await waitFor(() => {
            expect(likePost).toHaveBeenCalledWith(
                props.token,
                props.postId,
                props.userId
            );
        })
    })
    
    it('triggers createNotification when clicked', async () => {
        likePost.mockResolvedValueOnce({})
        createNotification.mockResolvedValueOnce({})

        const props = {
            token: 'mockToken',
            postId: 'mockPostId',
            userId: 'mockUserId',
            setUserLikesPost: vi.fn(),
            loggedInUsername: 'mockUsername',
            post_userId: 'mockPostUserId',
            userLikesPost: true
        };

        render(<LikeButton {...props}/>, {wrapper: BrowserRouter})
        await userEvent.click(screen.getByRole('button', { name: '' }))

        expect(createNotification).toHaveBeenCalledWith({
            username: props.loggedInUsername,
            entity_userId: props.post_userId,
            token: props.token,
            notificationType: 'post-unlike',
        });

        expect(props.setUserLikesPost).toHaveBeenCalledTimes(1);
    })
})