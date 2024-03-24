import React from 'react'
import { expect, describe, it} from 'vitest'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import EditUserModal from '../../src/components/EditUserModal/EditUserModal.jsx'

describe('EditUserModal component', () => {
    
    it('renders correctly', () => {
        render(<EditUserModal />, {wrapper: BrowserRouter})

        expect(screen.getByRole('button', {name: 'Edit profile'}))
    })

    it('displays modal when Edit profile button clicked', async () => {
        render(<EditUserModal />, {wrapper: BrowserRouter})

        await userEvent.click(screen.getByRole('button', {name: 'Edit profile'}))
        await expect(screen.queryByText('Profile picture')).toBeInTheDocument();

    })

    it('modal closes when close button clicked', async () => {
        render(<EditUserModal />, {wrapper: BrowserRouter})

        await userEvent.click(screen.getByRole('button', {name: 'Edit profile'}))
        await userEvent.click(screen.getByRole('button', {name: 'Close'}))
        expect(screen.getByRole('button', {name: 'Edit profile'}))

    })

    it('opens EditProfilePictureModal when edit button clicked', async () => {
        render(<EditUserModal />, {wrapper: BrowserRouter})

        await userEvent.click(screen.getByRole('button', {name: 'Edit profile'}))
        const editButtons = screen.getAllByRole('button', { name: 'Edit' })
        const firstEditButton = editButtons[0]
        await userEvent.click(firstEditButton)

        expect(screen.queryByText('Choose image')).toBeInTheDocument()

    })

    it('opens EditBioModal when edit button clicked', async () => {
        render(<EditUserModal />, {wrapper: BrowserRouter})

        await userEvent.click(screen.getByRole('button', {name: 'Edit profile'}))
        const editButtons = screen.getAllByRole('button', { name: 'Edit' })
        const firstEditButton = editButtons[1]
        await userEvent.click(firstEditButton)

        expect(screen.queryByText('Save')).toBeInTheDocument()

    })
})

