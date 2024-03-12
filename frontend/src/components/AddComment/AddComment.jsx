import { useState } from "react";
import { postComment } from "../../services/posts";
import { createNotification } from "../../services/user";

import './AddComment.css'

export default function AddComment({ postId, toggleStateChange, post_userId, triggerStateChange }) {
	const [commentText, setCommentText] = useState("");
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const [user, setUserId] = useState(
		JSON.parse(window.localStorage.getItem("user"))
	);
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (event) => {
		setCommentText(event.target.value);
	};

	const submitComment = async (event) => {
		// console.log("comment  userId", userId._id)
		event.preventDefault();
		if (commentText.length !== 0) {
			try {
				const result = await postComment(token, commentText, postId, user._id);
				console.log(result);
				setCommentText("");
				toggleStateChange ? toggleStateChange() : null
				triggerStateChange ? triggerStateChange() : null
				console.log("yes")

				try {
					console.log("try", user.username, post_userId, token);
					const notificationResult = await createNotification({
						username: user.username,
						entity_userId: post_userId,
						token: token,
						notificationType: "post-comment",
					});
				} catch (error) {
					console.log("An error occured while creating a notification");
				}
			} catch (error) {
				setErrorMessage("An error occured while posting comment");
			}
		} else {
			setErrorMessage("empty comment");
		}
	};

	return (
		<>
		{errorMessage && <p>{errorMessage}</p>}
		<form onSubmit={submitComment}>
			<div className="text-area-container">
				<textarea
					className="text-area"
					type="text"
					placeholder="make a new comment"
					value={commentText}
					onChange={handleChange}
				/>
			</div>
			<div className="submit-comment-button-container">
				<button className="submit-commit-button" type="submit">Comment</button>
			</div>
		</form>

		</>
	);
}
