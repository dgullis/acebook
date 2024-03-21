// docs: https://vitejs.dev/guide/env-and-mode.html
let BACKEND_URL;

if (process.env.NODE_ENV === 'development') {
	BACKEND_URL = 'http://localhost:3000'; 
} else {
	BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
}

// Request to backend api which returns all documents from the posts collection in the DB
// Requires user authentication token (token) for authorization.
export const getPosts = async (token) => {
	const requestOptions = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

	if (response.status !== 200) {
		throw new Error("Unable to fetch posts");
	}

	const data = await response.json();
	return data;
};

// Request to backend api posting a comment (commentText) on a specific post (postId) by a specific user (userId)
// Requires user authentication token (token) for authorization.
export const postComment = async (token, commentText, postId, userId) => {
	const payload = {
		commentText: commentText,
		userId: userId,
	};

	const requestOptions = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	};

	const response = await fetch(
		`${BACKEND_URL}/posts/${postId}/comments`,
		requestOptions
	);

	if (response.status !== 200) {
		throw new Error("Unable to post comment");
	}

	const data = await response.json();
	return data;
};

// Request to backend api creating a new post for specific user (userId).
// Request can contain an imageURL (downloadURL), a message (postMessage) or both
// Requires user authentication token (token) for authorization.
export const createPost = async (token, userId, downloadURL, postMessage) => {
	const payload = {
		userId: userId,
	};

	if (postMessage) {
		payload.postMessage = postMessage;
	}

	if (downloadURL) {
		payload.imageURL = downloadURL;
	}

	const requestOptions = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	};

	const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

	if (response.ok) {
		return "post submitted successfully";
	} else {
		throw new Error(`Received status ${response.status} when creating post.`);
	}
};

// Request to backend api updating the text content (postData.postMessage) of a specific post (postData.postId)
// Requires user authentication token (token) for authorization.
export const editPost = async (token, postData) => {
	const payload = {
		postId: postData.postId,
		message: postData.postMessage,
	};
	const requestOptions = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(payload),
	};
	const response = await fetch(
		`${BACKEND_URL}/posts/${postData.postId}`,
		requestOptions
	);

	if (response.ok) {
		return "post edited successfully";
	} else {
		throw new Error(`Received status ${response.status} when editing post.`);
	}
};

// Request to backend api deleting a specific post (postId)
// Requires user authentication token (token) for authorization.
export const deleteThePost = async (postId, token) => {
	try {
		const requestOptions = {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ postID: postId }),
		};
		const response = await fetch(
			`${BACKEND_URL}/posts/${postId}`,
			requestOptions
		);

		if (response.ok) {
			return "post deleted";
		} else {
			throw new Error(`delete post HTTP error! Status: ${response.status}`);
		}
	} catch (error) {
		console.error("Error deleting post:", error);
	}
};

// Request to backend api indicating a specific user (userId) has liked a specific post (postId)
// Requires user authentication token (token) for authorization.

export const likePost = async (token, postId, userId) => {
    try {
        const response = await fetch("http://localhost:3000/posts/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + `${token}`,
            },
            body: JSON.stringify({ 
                postId: postId,
                userId: userId
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
