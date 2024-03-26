import { expect, describe, it} from 'vitest'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Post from '../../src/components/Post/Post'

describe("Post component", () => {
  window.localStorage.setItem("token", "mockToken");
  window.localStorage.setItem("user", JSON.stringify({ username: "mockUser", _id:'123' }));


  it("renders correctly with props", () => {

    const props = {
    post: {_id: '999', createdAt: "2024-03-26T08:30:45.123Z",  media: 'mockMediaURL', likes: ['123'], message:'mock message', postedBy: {_id:'234'}, comments: [{createdAt: "2024-03-27T08:30:45.123Z"}]},
    postedBy: {username: 'mockPostingUser', image: 'mockPostingUserImageURL'},
    token: 'mockToken',
    loggedInUsername: 'mockedLoggedInUsername',
    userId: '123',
    toggleStateChange: () => {},
    userPageRender: () => {},
    liked: true
    } 

    render(<Post {...props} />, {wrapper: BrowserRouter});

    expect(screen.getByText('mockPostingUser')).toBeInTheDocument()
    const images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute('src', 'mockPostingUserImageURL');
    expect(images[1]).toHaveAttribute('src', 'mockMediaURL');
    expect(screen.getByText('mock message')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()

  });

  it('displays edit button if user owns post and save button when user editting post', async () => {

    window.localStorage.setItem("user", JSON.stringify({ _id: '234', username: "mockUser" }));

    const props = {
      post: {_id: '999', createdAt: "2024-03-26T08:30:45.123Z",  media: 'mockMediaURL', likes: ['123'], message:'mock message', postedBy: {_id:'234'}, comments: [{createdAt: "2024-03-27T08:30:45.123Z"}]},
      postedBy: {_id: '234', username: 'mockPostingUser', image: 'mockPostingUserImageURL'},
      token: 'mockToken',
      loggedInUsername: 'mockedLoggedInUsername',
      userId: '234',
      toggleStateChange: () => {},
      userPageRender: () => {},
      liked: true
      } 
  
      render(<Post {...props} />, {wrapper: BrowserRouter});
      expect(screen.getByRole('button', {name: 'edit'})).toBeInTheDocument()
      await userEvent.click(screen.getByRole('button', {name: 'edit'}))
      expect(screen.getByRole('button', {name: 'save'})).toBeInTheDocument()

      window.localStorage.removeItem("user");
  })

  it('displays see more button if >1 comment and then hide button when see more is clicked', async () => {

    window.localStorage.setItem("user", JSON.stringify({ _id: '234', username: "mockUser" }));

    const props = {
      post: {_id: '999', createdAt: "2024-03-26T08:30:45.123Z",  media: 'mockMediaURL', likes: ['123'], message:'mock message', postedBy: {_id:'234'}, comments: [{message: 'comment 1', createdAt: "2024-03-27T08:30:45.123Z"}, {message: 'comment 2', createdAt: "2024-03-26T08:30:45.123Z"}]},
      postedBy: {_id: '234', username: 'mockPostingUser', image: 'mockPostingUserImageURL'},
      token: 'mockToken',
      loggedInUsername: 'mockedLoggedInUsername',
      userId: '234',
      toggleStateChange: () => {},
      userPageRender: () => {},
      liked: true
      } 
  
      render(<Post {...props} />, {wrapper: BrowserRouter});
      expect(screen.getByRole('button', {name: 'see more'})).toBeInTheDocument()
      await userEvent.click(screen.getByRole('button', {name: 'see more'}))
      expect(screen.getByRole('button', {name: 'hide'})).toBeInTheDocument()

      window.localStorage.removeItem("user");
  })

  it('displays comments in reverse chronological order', async () => {

    window.localStorage.setItem("user", JSON.stringify({ _id: '234', username: "mockUser" }));

    const props = {
      post: {_id: '999', createdAt: "2024-03-26T08:30:45.123Z",  media: 'mockMediaURL', likes: ['123'], message:'mock message', postedBy: {_id:'234'}, comments: [{message: 'comment 1', createdAt: "2024-03-27T08:30:45.123Z"}, {message: 'comment 2', createdAt: "2024-03-26T08:30:45.123Z"}]},
      postedBy: {_id: '234', username: 'mockPostingUser', image: 'mockPostingUserImageURL'},
      token: 'mockToken',
      loggedInUsername: 'mockedLoggedInUsername',
      userId: '234',
      toggleStateChange: () => {},
      userPageRender: () => {},
      liked: true
    } 
  
      render(<Post {...props} />, {wrapper: BrowserRouter});
      expect(screen.getByRole('button', {name: 'see more'})).toBeInTheDocument()
      await userEvent.click(screen.getByRole('button', {name: 'see more'}))
      const comment1 = (screen.getByText('comment 1'))
      const comment2 = (screen.getByText('comment 2'))

      expect(comment1).toBeInTheDocument()
      expect(comment2).toBeInTheDocument()
      //comment 2 displays before comment 1
      expect(comment2.compareDocumentPosition(comment1) & Node.DOCUMENT_POSITION_FOLLOWING).toBeGreaterThan(0);

      window.localStorage.removeItem("user");
  })


});
