import React from 'react'
import '@testing-library/jest-dom'
import { expect, describe, it} from 'vitest'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import DeleteButton from '../../src/components/DeleteButton/DeleteButton'
import { deleteThePost } from '../../src/services/posts'

describe('DeleteButton component', () => {

    vi.mock('../../src/services/posts', () => ({
        deleteThePost: vi.fn()
    }))

    it('renders correctly', () => {
        render(<DeleteButton 
            showButton = {true}
        />, {wrapper: BrowserRouter})
        
        const deleteButton = screen.getByRole('button', { name: '' });
        expect(deleteButton).toBeInTheDocument()

    })

    it('displays confirm delete modal on click', async() => {
        render(<DeleteButton 
            showButton = {true}
        />, {wrapper: BrowserRouter})

        await userEvent.click(screen.getByRole('button', {name: ''}))
        expect(screen.getByText('Delete post?')).toBeInTheDocument()

    })

    it('closes the modal when deletion is cancele', async() => {
        render(<DeleteButton 
            showButton = {true}
        />, {wrapper: BrowserRouter})

        await userEvent.click(screen.getByRole('button', {name: ''}))
        expect(screen.getByText('Delete post?')).toBeInTheDocument()
        await userEvent.click(screen.getByRole('button', {name: 'No'}))
        expect(screen.queryByText('Delete post?')).not.toBeInTheDocument()

    })

    it('calls deletePost when confirm delete is chosen on modal', async () => {
        deleteThePost.mockResolvedValueOnce({})
        render(<DeleteButton 
            showButton = {true}
        />, {wrapper: BrowserRouter})

        await userEvent.click(screen.getByRole('button', {name: ''}))
        expect(screen.getByText('Delete post?')).toBeInTheDocument()
        await userEvent.click(screen.getByRole('button', {name: 'Yes'}))
        
        await waitFor(() => {
            expect(deleteThePost).toHaveBeenCalledTimes(1);
        })
    })
})