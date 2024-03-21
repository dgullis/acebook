import { createNotification } from "../../services/user";
import { likePost } from "../../services/posts";
import "./LikeButton.css"

// Component displays like button as a thumbs up icon.
// Responsible for handling like / unlike of a post by current usewr
const LikeButton = (props) => {

    // Handles logic for click event for liking/unliking a post

    const handleClick = async () => {
        try {
            await likePost(props.token, props.postId, props.userId); // Attempts to update like status for post of current user
            props.setUserLikesPost((previousState) => !previousState); // Toggles the state of whether the user likes the post or not
            props.toggleStateChange && props.toggleStateChange() // Triggers re render of feed page
            props.userPageRender && props.userPageRender(); // Triggers re render of user page
            if (!props.userLikesPost) { // If user has liked the post
                try {
                    const notificationResult = await createNotification({ // Attempt to create notification for post owner
                        username: props.loggedInUsername,
                        entity_userId: props.post_userId,
                        token: props.token,
                        notificationType: "post-like",
                    });
                } catch (error) {
                    console.log(
                        "An error occured while creating a notification" // Log error if unable to create notification
                    );
                }
            } else {
                try { // If user has un-liked the post
                    const notificationResult = await createNotification({ // Attempt to create notification for post owner
                        username: props.loggedInUsername,
                        entity_userId: props.post_userId,
                        token: props.token,
                        notificationType: "post-unlike",
                    });
                } catch (error) {
                    console.log(
                        "An error occured while creating a notification" // Log error if unable to create notification
                    );
                }
            }
        } catch (error) {
            console.error("Error liking/unliking post:", error);
        }
    };

    return (
        <button onClick={handleClick}>
            {props.userLikesPost ? (
                <i
                    className="fa-solid fa-thumbs-up"
                    style={{ color: "red" }}></i>
            ) : (
                <i className="fa-regular fa-thumbs-up"></i>
            )}
        </button>
    );
};

export default LikeButton;
