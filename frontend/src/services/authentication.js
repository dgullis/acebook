// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

	// docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
	if (response.status === 201) {
		let data = await response.json();

		return data;
	} else {
		const errorData = await response.json();
		throw new Error(errorData.message || `Received status ${response.status} when signing up. Expected 201`
		);
	}
};

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

	// docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
	if (response.ok) {
		return;
	} else {
		const errorData = await response.json();
		throw new Error(errorData.message || `Received status ${response.status} when signing up. Expected 201`
		);
	}
};
