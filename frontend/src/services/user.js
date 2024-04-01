// docs: https://vitejs.dev/guide/env-and-mode.html
let BACKEND_URL;

if (process.env.NODE_ENV === 'development') {
	BACKEND_URL = 'https://13.50.249.236'; 
} else {
	BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
}

// Request to backend api returning the document for a specific user (username) from the users collection in the DB
// Requires user authentication token (token) for authorization.
export const getUser = async (token, username) => {
	const requestOptions = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await fetch(
		`${BACKEND_URL}/users/${username}`,
		requestOptions
	);

	if (response.status !== 200) {
		throw new Error("Unable to fetch user");
	}

	const data = await response.json();
	return data;
};

// Request to backend api to search for users based on the provided search query (searchQuery)
export const searchUsers = async (searchQuery) => {
	const requestOptions = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	const response = await fetch(
		`${BACKEND_URL}/users?search=${searchQuery}`,
		requestOptions
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Unable to fetch user");
	}

	if (response.status !== 200) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Unable to fetch user");
	}

	const data = await response.json();
	return data;
};

// Request to backend api updating profile image (imageURL) for a specific user (username)
export const uploadImage = async (username, imageURL) => {
	
	const payload = {
		imageURL: imageURL
	}
	
	const requestOptions = {
		method: "PATCH",
		headers: {"Content-Type": "application/json"},
		body:  JSON.stringify(payload),
	};

	let response = await fetch(
		`${BACKEND_URL}/users/${username}/upload`,
		requestOptions
	);

	if (response.status === 200) {
		return response;
	} else {
		throw new Error(
			`Received status ${response.status} when uploading image up. Expected 200`
		);
	}
};

// Request to backend api updating the bio (bioText) for a specific user (username)
export const editBio = async (bioText, username) => {
	const payload = {
		bio: bioText,
	};

	const requestOptions = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	};

	let response = await fetch(
		`${BACKEND_URL}/users/${username}/edit-bio`,
		requestOptions
	);
	if (response.status === 200) {
		return "bio updated sucessfully";
	} else {
		throw new Error(
			`Received status ${response.status} when changing bio. Expected 200`
		);
	}
};

// Request to the backend api to add a user (receivingUserId) as a friend for a specific user(requestingUserId).
// Requires user authentication token (token) for authorization.
export const addFriend = async (receivingUserId, requestingUserId, username, token) => {
	const payload = {
		receivingUserId: receivingUserId,
		requestingUserId: requestingUserId,
	};

	const requestOptions = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	};

	let response = await fetch(
		`${BACKEND_URL}/users/${username}/friends`,
		requestOptions
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(`Failed to add friend: ${JSON.stringify(errorData)}`);
	}

	const data = await response.json();
	return data;
};

// Request to backend api removing a user (receivingUserId) as a friend from a specific user (requestingUserId).
// Requires user authentication token (token) for authorization.
export const removeFriend = async ( receivingUserId, requestingUserId, username, token) => {
	const payload = {
		receivingUserId: receivingUserId,
		requestingUserId: requestingUserId,
	};

	const requestOptions = {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	};

	let response = await fetch(
		`${BACKEND_URL}/users/${username}/friends`,
		requestOptions
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(`Failed to remove friend: ${JSON.stringify(errorData)}`);
	}

	const data = await response.json();
	return data;
};

// Request to backend api creates a notification for a specific user (entity_userId) indicating an event (notificationType) has occured by another user (username)
// Requires user authentication token (token) for authorization.
export const createNotification = async (username, entity_userId, token, notificationType) => {
	let notificationMessage;

	switch (notificationType) {
		case "post-like":
			notificationMessage = `${username} liked your post`;
			break;

		case "post-unlike":
			notificationMessage = `${username} un-liked your post`;
			break;

		case "post-comment":
			notificationMessage = `${username} commented on your post`;
			break;

		case "friend-request":
			notificationMessage = `${username} sent you a friend request`;
			break;
	}

	const payload = {
		entity_userId: entity_userId,
		notificationMessage: notificationMessage,
	};

	const requestOptions = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	};

	let response = await fetch(
		`${BACKEND_URL}/users/${username}/notifications`,
		requestOptions
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			`Failed to create notification: ${JSON.stringify(errorData)}`
		);
	}

	const data = await response.json();
	return data;
};

// Request to backend api deleting a specific notification (notificationId) for a specific user (username)
// Requires user authentication token (token) for authorization.
export const deleteNotification = async (username, notificationId, token) => {
	const payload = {
		notificationId: notificationId,
	};

	const requestOptions = {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	};

	let response = await fetch(
		`${BACKEND_URL}/users/${username}/notifications`,
		requestOptions
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			`Failed to delete notification: ${JSON.stringify(errorData)}`
		);
	}

	const data = await response.json();
	return data;
};
