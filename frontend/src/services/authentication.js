// docs: https://vitejs.dev/guide/env-and-mode.html
let BACKEND_URL;

if (process.env.NODE_ENV === 'development') {
	BACKEND_URL = 'https://13.50.249.236'; 
} else {
	BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
}
// Request to backend api to login a user passing their email and password in body
export const login = async (email, password) => {
	const payload = {
		email: email,
		password: password,
	};

	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	};

	const response = await fetch(`${BACKEND_URL}/tokens`, requestOptions);

	if (response.status === 201) {
		let data = await response.json();
		return data;

	} else {
		const errorData = await response.json();
		throw new Error(errorData.message || `Received status ${response.status} when signing up. Expected 201`
		);
	}
};

// Request to backend api to signup a user passing their username, email, password and default profile image in body
export const signup = async (username, email, password) => {
	const payload = {
		username: username,
		email: email,
		password: password,
		defaultUserImage: "user_3177440.png"
	};

	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	};

	let response = await fetch(`${BACKEND_URL}/users`, requestOptions);


	if (response.ok) {
		return;
	} else {
		const errorData = await response.json();
		throw new Error(errorData.message || `Received status ${response.status} when signing up. Expected 201`
		);
	}
};
