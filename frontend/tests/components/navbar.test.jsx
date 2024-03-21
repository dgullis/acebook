import React from 'react';
import {render, screen} from '@testing-library/react'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom'
import {within} from '@testing-library/dom'
import Navbar from '../../src/components/NavBar/navbar.jsx';


test('renders navbar with correct items when no user logged in', () => {

  render(<Navbar />, {wrapper: BrowserRouter})

  expect(screen.getByRole('button', {name: /Home/i})).toBeInTheDocument()
  expect(screen.getByRole('button', {name: /Log In/i})).toBeInTheDocument()
  expect(screen.getByRole('button', {name: /Sign Up/i})).toBeInTheDocument()
  expect(screen.getByText('aceBook')).toBeInTheDocument()

});

test('renders navbar with correct items when user logged in', () => {
  // Set token in localStorage to simulate user being logged in
  window.localStorage.setItem("token", "mockToken");
  window.localStorage.setItem("user", JSON.stringify({ username: "mockUser" }));

  render(<Navbar />, { wrapper: BrowserRouter });

  expect(screen.getByRole('button', {name: /Home/i})).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /Log out/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /mockUser/i })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: "" })).toBeInTheDocument();
  expect(screen.getByText('aceBook')).toBeInTheDocument()


  // Clean up by removing token and user from localStorage after the test
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
});





