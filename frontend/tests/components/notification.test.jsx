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
import Notification from '../../src/components/Notification/Notification'
import { deleteNotification } from '../../src/services/user'

describe('Notification component', () => {
    vi.mock('../../src/services/user', () => ({
        deleteNotification: vi.fn()
    }))

    it('renders correctly', () => {
        const props = {

            username: 'mockUser',
            notification: {message: 'mock user notification'},
            token: 'mockToken',
            userPageRender: () => {}
        }

        render(<Notification {...props}/>, {wrapper: BrowserRouter})

        expect(screen.getByRole('button', {name: 'x'})).toBeInTheDocument()
        expect(screen.getByText('mock user notification')).toBeInTheDocument()

    })

    it('triggers deleteNotification when button clicked', async () => {
        deleteNotification.mockResolvedValueOnce({})

        const props = {

            username: 'mockUser',
            notification: {message: 'mock user notification'},
            token: 'mockToken',
            userPageRender: () => {}
        }

        render(<Notification {...props}/>, {wrapper: BrowserRouter})
        await userEvent.click(screen.getByRole('button', {name: 'x'}))
        expect(deleteNotification).toHaveBeenCalledTimes(1)
        
    })
})