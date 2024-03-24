import React, {useState} from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import AboutModal from '../../src/components/AboutModal/AboutModal.jsx'
import { vi } from 'vitest'


test('clicking button displays modal', async () => {
    render(<AboutModal />, {wrapper: BrowserRouter})

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', {name: /About aceBook/i}))

    await expect(screen.getByText(/Completed during the/)).toBeInTheDocument()

});

test('clicking close button closes modal', async () => {
    render(<AboutModal />, {wrapper: BrowserRouter})

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', {name: /About aceBook/i}))

    await expect(screen.getByText(/Completed during the/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', {name: 'Close'}))

    await expect(screen.getByRole('button', {name: /About aceBook/i})).toBeInTheDocument()


});