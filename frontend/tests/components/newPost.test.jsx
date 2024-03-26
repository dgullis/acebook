import { expect, describe, it} from 'vitest'
import '@testing-library/jest-dom'
import {render, screen, waitFor} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import NewPost from '../../src/components/Post/NewPost'

describe("NewPost component", () => {
    

    // it('test', () => {
    //     const props = {
    //         token: 'mockToken',
    //         userId: '123',
    //         toggleStateChange: () => {},
    //         userImg: 'mockImageURL'
    //     }

    //     const { container } = render(<NewPost {...props} />, { wrapper: BrowserRouter });
    //     console.log(container.innerHTML);

    // })


    it('renders correctly', () => {

        const props = {
            token: 'mockToken',
            userId: '123',
            toggleStateChange: () => {},
            userImg: 'mockImageURL'
        }

        render(<NewPost {...props}/>, {wrapper: BrowserRouter});

        const userImage = screen.getByRole('img')
        expect(userImage).toBeInTheDocument()
        expect(userImage).toHaveAttribute('src', 'mockImageURL')

        const textbox = screen.getByRole('textbox');
        expect(textbox).toBeInTheDocument()

        const postButton = screen.getByRole('button', {name: 'Post'})
        expect(postButton).toBeInTheDocument()

        const uploadImageButton = screen.getByLabelText('Upload Image')
        expect(uploadImageButton).toBeInTheDocument()

    
        // fireEvent.change(textbox, { target: { value: 'Hello, world!' } });
        // expect(textbox.value).toBe('Hello, world!');
    });

    it('displays error if emty post submitted', async () => {
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        const props = {
            token: 'mockToken',
            userId: '123',
            toggleStateChange: () => {},
            userImg: 'mockImageURL'
        }
        render(<NewPost {...props}/>, {wrapper: BrowserRouter});
        await userEvent.click(screen.getByRole('button', {name: 'Post'}))
        expect(alertMock).toHaveBeenCalledWith('cannot post empty comment');
        alertMock.mockRestore();
    })

    it('text box changes value when user types', async () => {
        const props = {
            token: 'mockToken',
            userId: '123',
            toggleStateChange: () => {},
            userImg: 'mockImageURL'
        }
        render(<NewPost {...props}/>, {wrapper: BrowserRouter});
        const textbox = screen.getByRole('textbox');
        expect(textbox).toBeInTheDocument()
        await userEvent.type(textbox, 'new post!')
        expect(textbox).toHaveValue('new post!')
    })

    it('allows user to upload a photo', async () => {

        const createObjectURLMock = vi.fn().mockReturnValue('mockedURL');
        window.URL.createObjectURL = createObjectURLMock;

        const props = {
            token: 'mockToken',
            userId: '123',
            toggleStateChange: () => {},
            userImg: 'mockImageURL'
        }
        render(<NewPost 
            {...props}
            />, {wrapper: BrowserRouter});

        const input = screen.getByLabelText('Upload Image')
        const file = new File(['mockImage'], 'test.png', { type: 'image/png' });
        await userEvent.upload(input, file);

        expect(screen.getByRole('button', {name: 'Delete Image'})).toBeInTheDocument()
        const images = screen.getAllByRole('img')
        expect(images[1]).toHaveAttribute('src','mockedURL')

    })

});
