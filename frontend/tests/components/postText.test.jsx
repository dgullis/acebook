import { expect, describe, it} from 'vitest'
import '@testing-library/jest-dom'
import {render, screen, waitFor} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import PostText from '../../src/components/PostText/PostText'

describe('PostText component', () => {
    it('renders correctly', () => {
        render(<PostText postText={'mock post text'}/>, {wrapper: BrowserRouter})

        const textbox = screen.getByRole('textbox')
        expect(textbox).toBeInTheDocument()
        expect(textbox).toHaveValue('mock post text')

    })
})