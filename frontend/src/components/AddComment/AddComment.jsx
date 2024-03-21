import { useState } from "react";
import { postComment } from "../../services/posts";
import { createNotification } from "../../services/user";
import './AddComment.css'

export default function AddComment({ postId, toggleStateChange, post_userId, userPageRender }) {
	const [commentText, setCommentText] = useState(""); // State for storing the comment text
	const [token, setToken] = useState(window.localStorage.getItem("token")); // State for storing the authentication token
	const [user, setUserId] = useState(
		JSON.parse(window.localStorage.getItem("user")) // State for storing the current user data
	);
	const [errorMessage, setErrorMessage] = useState(""); // State for storing error messages

	const handleChange = (event) => {
		setCommentText(event.target.value); // Update commentText state with input value
	};

	const submitComment = async (event) => {
		event.preventDefault();
		if (commentText.length !== 0) { // Checks if the comment text is not empty
			try {
				const result = await postComment(token, commentText, postId, user._id); // Attempt to post comment
				setCommentText(""); // Clears the comment text input field
				toggleStateChange ? toggleStateChange() : null // Toggles the state change to update the UI for the feed page
				userPageRender ? userPageRender() : null // Toggles the state change to update the UI for the user page

				try {
					const notificationResult = await createNotification({ // Attempt to create a notification for the post owner
                        username: user.username,
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
			setErrorMessage("empty comment"); // Sets error message for empty comment
		}
	};

	return (
		<>
		{errorMessage && <p>{errorMessage}</p>} {/* Rendering error message if present */}
		<form onSubmit={submitComment}>
			<div className="text-area-container">
				<textarea
					className="add-comment-text-area"
					type="text"
					placeholder="make a new comment"
					value={commentText}
					onChange={handleChange}
				/>
			</div>
			<div className="submit-comment-button-container">
				<button className="submit-commit-button" type="submit">Post Comment</button>
			</div>
		</form>

		</>
	);
}
