import '@testing-library/jest-dom'
import { expect, describe, it, beforeEach} from 'vitest'
import { vi } from "vitest";
import { login, signup } from "../../src/services/authentication";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

describe('authentication services', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});
	

	it('login returns data on successful login (status 201)', async () => {
		const mockData = { token: 'mockToken' };
		const mockResponse = { status: 201, json: vi.fn().mockResolvedValueOnce(mockData) };
		global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

		const result = await login('test@example.com', 'password');

		expect(result).toEqual(mockData);
		expect(global.fetch).toHaveBeenCalledWith(`${BACKEND_URL}/tokens`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: 'test@example.com', password: 'password' }),
		});

	})

	it('login throws an error on failed login (status not 201)', async () => {
		const mockErrorData = { message: 'Invalid credentials' }
		const mockErrorResponse = { status: 401, json: vi.fn().mockResolvedValueOnce(mockErrorData) };
		global.fetch = vi.fn().mockResolvedValueOnce(mockErrorResponse);

		await expect(login('test@example.com', 'password')).rejects.toThrow(
			new Error(mockErrorData.message || 'Received status 401 when signing up. Expected 201')
		);

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(global.fetch).toHaveBeenCalledWith(`${BACKEND_URL}/tokens`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: 'test@example.com', password: 'password' }),
		});

	})

	it('signup returns data on successful login', async () => {
		const mockData = { message: 'User successfully signed up' };
		const mockResponse = {status: 201, json: vi.fn().mockResolvedValueOnce(mockData)}
		global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

		const response = await signup("testUser", "test@email", "testPassword")

		expect(response).toEqual(mockData);
		expect(global.fetch).toHaveBeenCalledWith(`${BACKEND_URL}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: 'testUser',
				email: 'test@email',
				password: 'testPassword',
				defaultUserImage: "user_3177440.png"
			
			}),
		});
	})

	it('signup throws error on unsuccessful signup', async () => {
		const mockErrorData = { message: 'Error on signup' }
		const mockErrorResponse = { status: 500, json: vi.fn().mockResolvedValueOnce(mockErrorData)};
		global.fetch = vi.fn().mockResolvedValueOnce(mockErrorResponse);

		await expect(signup("testUserError", "error@email", "errorPassword")).rejects.toThrow(
			new Error(mockErrorData.message)
		);

	})

})