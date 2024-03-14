import { useState, useEffect } from "react";
import { createNotification } from "../../services/user";
import { likePost } from "../../services/posts";
import "./LikeButton.css"


const LikeButton = (props) => {


    const handleClick = async () => {
        try {
            await likePost(props.token, props.postId, props.userId);
            props.setUserLikesPost((previousState) => !previousState);
            props.handleLikeUnlike();
            props.toggleStateChange && props.toggleStateChange()
            props.userPageRender && props.userPageRender();
            if (!props.userLikesPost) {
                try {
                    const notificationResult = await createNotification({
                        username: props.loggedInUsername,
                        entity_userId: props.post_userId,
                        token: props.token,
                        notificationType: "post-like",
                    });
                } catch (error) {
                    console.log(
                        "An error occured while creating a notification"
                    );
                }
            } else {
                try {
                    const notificationResult = await createNotification({
                        username: props.loggedInUsername,
                        entity_userId: props.post_userId,
                        token: props.token,
                        notificationType: "post-unlike",
                    });
                } catch (error) {
                    console.log(
                        "An error occured while creating a notification"
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
