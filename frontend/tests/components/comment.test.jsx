import React from 'react'
import '@testing-library/jest-dom'
import { expect, describe, it} from 'vitest'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import Comment from '../../src/components/Comment/Comment'
import timeFromNow from '../../src/utils/timeFromNow.jsx'

vi.mock('../../src/utils/timeFromNow.jsx', () => ({
    default: vi.fn()
}))

describe('Comment component', () => {

    it('renders correcttly', () => {
        timeFromNow.mockReturnValueOnce('1 minute ago')
        
        render(<Comment 
            key={'1'}
            _id={'1'}
            message={'test comment'}
            likes={3}
            postedAt={'2024-02-08T16:34:41.841+00:00'}
            user= {{
                'username': 'test user',
                'image': 'testImageURL'

            }}
            
            />, {wrapper: BrowserRouter})

            expect(screen.getByText('test comment')).toBeInTheDocument()
    })

    it('renders the users username and image as a link', () => {
        timeFromNow.mockReturnValueOnce('1 minute ago')
        
        render(<Comment 
            key={'1'}
            _id={'1'}
            message={'test comment'}
            likes={3}
            postedAt={'2024-02-08T16:34:41.841+00:00'}
            user= {{
                'username': 'testUser',
                'image': 'testImageURL'
            }}
            />, {wrapper: BrowserRouter})

            expect(screen.getByRole('link', {name: /testUser/i})).toBeInTheDocument()
    })

    it('renders the date as time from now', () => {
        timeFromNow.mockReturnValueOnce('1 minute ago')
        
        render(<Comment 
            key={'1'}
            _id={'1'}
            message={'test comment'}
            likes={3}
            postedAt={'2024-02-08T16:34:41.841+00:00'}
            user= {{
                'username': 'testUser',
                'image': 'testImageURL'
            }}
            />, {wrapper: BrowserRouter})

            expect(screen.getByText('1 minute ago')).toBeInTheDocument()
    })

})