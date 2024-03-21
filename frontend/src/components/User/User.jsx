import { useState, useEffect } from 'react';
import Comment from '../Comment/Comment.jsx';
import './User.css';
import Post from '../Post/Post.jsx';
import { addFriend, removeFriend } from '../../services/user.js';
import Notification from '../Notification/Notification.jsx';
import Friends from '../Friends/Friends.jsx';

// Component to displays image and information for a user and handle logic for adding / removing user as friend
const User = ({_id, username, email, friends, image, bio, posts, loggedInUserId, token, userPageRender, notifications }) => {
    const [userPosts, setUserPosts] = useState([]) // STate to manage posts for user

    const friendIds = friends.map((friend) => {
        return friend._id
    })


    useEffect(()=> {
        // Sort posts by createdAt timestamp and reverse for latest first
        const sortedPosts = posts.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setUserPosts(sortedPosts.reverse()); // Sets state with posts showing oldest first
    }, [posts])


    const handleAddFriend = () => {
        addFriend(_id, loggedInUserId, username, token) // Attempts to add user as friend for current user
            .then(res => {
                console.log(res) // Logs response
                userPageRender() // Triggers re render of user page
            });
                
    }

    const handleRemoveFriend = () => {
            removeFriend(_id, loggedInUserId, username, token)  // Attempts to remove user as friend for current user
            .then(res => {
                console.log(res) // // Logs response
                userPageRender()  // Triggers re render of user page
            });
    }
    
    // Displays user profile picture, username, email, bio
    return (
    
        <div className="user" key={_id}>
            <div className="profile-image-container">
                <img src={image} alt="Profile Picture" className="user-image"/><br></br>
            </div>

            <div className="user-name">
                {username}
            </div>
            <div className="user-email">
                <p>Email: {email}</p>
            </div>
            <div className="user-bio">
                <p>Bio: {bio}</p>
                
            </div>
            {/* Button is conditional based on if current user is friend with user */}
            <div className="friend-button-container">
            {loggedInUserId !== _id && (friendIds.includes(loggedInUserId) ?
    
                <button className="friend-button"
                    onClick={handleRemoveFriend}>
                        Remove friend
                </button>
            
                : 
            
                <button className="friend-button"
                    onClick={handleAddFriend}>
                        Add friend
                </button> 
            
            )}
            </div>

            
            

        </div>
    )

}
export default User;
