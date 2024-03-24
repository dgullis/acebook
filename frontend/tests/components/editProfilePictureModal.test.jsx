import React from 'react'
import { expect, describe, it} from 'vitest'
import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import EditProfilePictureModal from '../../src/components/EditProfilePictureModal/EditProfilePictureModal'

describe('EditProfilePictureModal component', () => {
    it('renders correctly', () => {
        render(<EditProfilePictureModal toggleEditPictureModal={true} image={'mockImageURL'} username={'mockUser'}/>, {wrapper: BrowserRouter})
        expect(screen.queryByText('Choose image')).toBeInTheDocument()
    })

    it('calls handleFileChange when file selected', async () => {
        const handleFileChange = vi.fn();
        render(<EditProfilePictureModal />);

        await userEvent.click(screen.queryByText('Choose image'))
        const file = new File(['mockImage'], 'test.png', { type: 'image/png' });
        await fireEvent.change(fileInput, { target: { files: [file] } });
    
        await expect(handleFileChange).toHaveBeenCalledTimes(1);
        


    })
})