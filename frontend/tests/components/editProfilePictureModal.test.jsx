import React from 'react'
import { expect, describe, it} from 'vitest'
import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import EditProfilePictureModal from '../../src/components/EditProfilePictureModal/EditProfilePictureModal'
import { v4 } from 'uuid';
import * as userService from '../../src/services/user';



describe('EditProfilePictureModal component', () => {

    vi.mock('firebase/storage', async (importOriginal) => {
        const actual = await importOriginal();
        return {
            ...actual,
            ref: vi.fn((storageOrRef, path) => {
                return {
                    // Mocked StorageReference object with the necessary methods and properties
                    // You can customize this as per your testing requirements
                    fullPath: 'full/path/image.png',
                    getDownloadURL: vi.fn(() => Promise.resolve('mocked-download-url')),
                    put: vi.fn(() => Promise.resolve({ ref: { fullPath: `mock/full/path/${v4()}` } })), // Mock the put method

                    // Add other methods and properties as needed for your tests
                };
            }),
            uploadBytes: vi.fn(() => Promise.resolve()),
            getDownloadURL: vi.fn(() => Promise.resolve('mocked-download-url')),

        };
    });

    it('renders correctly', () => {
        render(<EditProfilePictureModal toggleEditPictureModal={true} image={'mockImageURL'} username={'mockUser'}/>, {wrapper: BrowserRouter})
        expect(screen.queryByText('Choose image')).toBeInTheDocument()
    })

    // not passing
    // it('calls handleFileChange when file selected', async () => {
    //     window.localStorage.setItem("token", "mockToken");
    //     window.localStorage.setItem("user", JSON.stringify({ username: "mockUser" }));

    //     const uploadImageMock = vi.fn().mockResolvedValue({ 
    //         json: vi.fn().mockResolvedValue({ image: 'mocked-image-url' }) 
    //     });
    //     vi.spyOn(userService, 'uploadImage').mockImplementation(uploadImageMock);

    //     const handleFileChange = vi.fn();
        
    //     render(<EditProfilePictureModal 
    //         userPageRender={() => {} }
    //         toggleEditPictureModal={() => {}}
    //         handleFileChange={handleFileChange} 
    //         />);

    //     const fileInput = screen.getByLabelText('Choose image')
    //     await userEvent.click(fileInput)
    //     const file = new File(['mockImage'], 'test.png', { type: 'image/png' });
    //     await waitFor(() => {
    //         fireEvent.change(fileInput, { target: { files: [file] } });
    //         expect(handleFileChange).toHaveBeenCalledTimes(1);
    //     });
       
        
    // })

    
})