import '@testing-library/jest-dom'
import { expect, describe, it, beforeEach} from 'vitest'
import { vi } from "vitest";
import {getUser, searchUsers, uploadImage, editBio, addFriend, removeFriend, createNotification, deleteNotification} from '../../src/services/user'
import { findByLabelText } from '@testing-library/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

describe('user services tests', () => {
    beforeEach(() => {
		vi.resetAllMocks();
	});

    const token = "mockToken"
    const username = "mockUser"

    it('getUser returns data with sucessfull API call (status 200)', async() => {
        const mockData = { message: 'success' };
		const mockResponse = { status: 200, json: vi.fn().mockResolvedValueOnce(mockData) };
		global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

    
        const result = await getUser(token, username)

        expect(result).toEqual(mockData);
    })

    it('getUser throws error with unsuccessful APi call', async () => {
		const mockResponse = { status: 400 };
		global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

        await expect(getUser(token, username)).rejects.toThrow(
			new Error("Unable to fetch user") 
		);
    })

    it('searchUsers returns data with sucessfull API call (status 200)', async() => {
        const mockData = { message: 'success'};
		const mockResponse = { status: 200, ok: true, json: vi.fn().mockResolvedValueOnce(mockData) };
		global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

        const result = await searchUsers('dan')

        expect(result).toEqual(mockData);
    })

    it('searUsers thorws seror with unsuccesfull API call', async () => {
        const mockErrorData = { message: 'unable to fetch user' }
		const mockErrorResponse = { status: 401, json: vi.fn().mockResolvedValueOnce(mockErrorData) };
		global.fetch = vi.fn().mockResolvedValueOnce(mockErrorResponse);

        await expect(searchUsers('error')).rejects.toThrow(
			new Error("unable to fetch user") 
		);
    })

    it('uploadImage returns response on successfull API call (status 200)', async () => {
        const mockData = { image: 'imageURL'};
        const mockResponse = { status: 200, json: vi.fn().mockResolvedValueOnce(mockData) };
        global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

        const response = await uploadImage(username, 'imageURL')
        expect(response).toEqual(mockResponse)
    })

    it('uploadImage throws error on unsuccessfull API call', async () => {
        const mockResponse = { status: 400 };
        global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

        await expect(uploadImage(username, 'errorURL')).rejects.toThrow(
			new Error(`Received status 400 when uploading image up. Expected 200`) 
		);
    })

    it('editBio returns success message on successful API call', async () => {
        const mockResponse = { status: 200 };
        global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

        const response = await editBio('mockText', username)
        expect(response).toEqual("bio updated sucessfully")
    })

    it('editBio throws error on unsuccessfull API call', async() => {
        const mockResponse = { status: 400 };
        global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

        await expect(editBio('errorText', username)).rejects.toThrow(
            new Error(	`Received status 400 when changing bio. Expected 200`)
        )
    })

    it('addFriend returns data on sucessfull API call', async () => {
        const mockData = {message: 'success'}
        const mockResponse = { status: 200, ok: true, json: vi.fn().mockResolvedValueOnce(mockData) };
        global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

        const response = await addFriend('mockId', 'mockId', username, token)
        expect(response).toEqual(mockData)
    })

    it('addFriend throws error on unsuccessfull API calls', async () => {
        const errorData = {message: 'cant add friend'}
        const mockResponse = { status: 400, ok: false, json: vi.fn().mockResolvedValueOnce(errorData) };

        global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

        
        await expect(addFriend('mockId', 'mockId', username, token)).rejects.toThrow(
            new Error(`Failed to add friend: {"message":"cant add friend"}`)
        );

    })

    it('removeFriend returns data on successfull API call', async () => {
        const mockData = {message: 'success'}
        const mockResponse = { status: 200, ok: true, json: vi.fn().mockResolvedValueOnce(mockData) };
        global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

        const response = await removeFriend('mockId', 'mockId', username, token)
        expect(response).toEqual(mockData)
    })

    it('removeFriend throws error on unsuccessfull API call', async () => {
        const mockData = {message: 'unsucessfull'}
        const mockResponse = { status: 400, ok: false, json: vi.fn().mockResolvedValueOnce(mockData) };
        global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

        await expect(removeFriend('mockId', 'mockId', username, token)).rejects.toThrow(
            new Error('Failed to remove friend: {"message":"unsucessfull"}')
        )
    })

    it('createNotification returns data on successfull API call', async() => {
        const mockData = {message: 'success'}
        const mockResponse = {status: 200, ok: true, json: vi.fn().mockResolvedValueOnce(mockData)}
        global.fetch = vi.fn().mockResolvedValueOnce(mockResponse)


        const response = await createNotification(username, 'mockId', token, 'post-like')
        expect(response).toEqual(mockData)
    })

    it('createNotification creates correct notification', async() => {
        const mockData = {message: 'success'}
        const mockResponse = {status: 200, ok: true, json: vi.fn().mockResolvedValueOnce(mockData)}
        global.fetch = vi.fn().mockResolvedValueOnce(mockResponse)

        await createNotification(username, 'mockId', token, 'post-like')

        expect(global.fetch).toHaveBeenCalledWith(`${BACKEND_URL}/users/${username}/notifications`, {
			method: 'POST',
			headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json' },
			body: JSON.stringify({ entity_userId: 'mockId', notificationMessage: `${username} liked your post` }),
		});
    })

    it('createNotificaiton throws error on unsuccessfull API call', async () => {
        const mockData = {message: 'unsucessfull'}
        const mockResponse = { status: 400, ok: false, json: vi.fn().mockResolvedValueOnce(mockData) };
        global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

        await expect(createNotification('mockId', 'mockId', username, token)).rejects.toThrow(
            new Error('Failed to create notification: {"message":"unsucessfull"}')
        )
    })

    it('deleteNotification returns data on successfull API call', async() => {
        const mockData = {message: 'success'}
        const mockResponse = {status: 200, ok: true, json: vi.fn().mockResolvedValueOnce(mockData)}
        global.fetch = vi.fn().mockResolvedValueOnce(mockResponse)


        const response = await deleteNotification(username, 'mockId', token, 'post-like')
        expect(response).toEqual(mockData)
    })

    it('deleteNotificaiton throws error on unsuccessfull API call', async () => {
        const mockData = {message: 'unsucessfull'}
        const mockResponse = { status: 400, ok: false, json: vi.fn().mockResolvedValueOnce(mockData) };
        global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

        await expect(deleteNotification('mockId', 'mockId', username, token)).rejects.toThrow(
            new Error('Failed to delete notification: {"message":"unsucessfull"}')
        )
    })
})