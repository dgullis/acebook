import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../services/user";
import User from "../../components/User/User";
import EditUserModal from "../../components/EditUserModal/EditUserModal";
import Navbar from "../../components/NavBar/navbar";
import Post from "../../components/Post/Post";
import Friends from "../../components/Friends/Friends";
import Notification from "../../components/Notification/Notification";
import "./Userpage.css"


export const UserPage = () => {
    const [user, setUser] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(window.localStorage.getItem("user")))
    const [stateChange, setStateChange] = useState(false)
    
    const { username } = useParams();
    const navigate = useNavigate();

    const triggerStateChange = () => {
        setStateChange(!stateChange)
    }


    useEffect(() => {
        if (token) {
            getUser(token, username)
                .then((data) => {
                    setUser(data.user);
                    setToken(data.token);
                    window.localStorage.setItem("token", data.token)
                })
                .catch((err) => {
                    console.error(err);
                });
            } else {
            navigate("/login");
            } 
        }, [username, stateChange]);
    
        if (!token) {
            navigate("/login")
        }
        
        if (user.length === 0) {
            return(
                <>
                <h1>User not found</h1>
                </>
            )
        }

        return (
            <>
            <Navbar 
                stateChange={stateChange}
            />
            
                <div className="user-page-container">
                    
                    <div className="user-page-left">
                    
                        <div className="user-container">
                            <User 
                                key={user._id}
                                _id={user._id}
                                username={user.username}
                                email={user.email}
                                bio={user.bio}
                                friends={user.friends}
                                image={user.image}
                                posts={user.posts}
                                notifications={user.notifications}
                                loggedInUserId={loggedInUser._id}
                                token={token}
                                triggerStateChange={triggerStateChange}
                            />

                            {loggedInUser._id === user._id && 

                            <EditUserModal 
                                username={username}
                                image={user.image}
                                bio={user.bio}
                                triggerStateChange={triggerStateChange}
                            />

                            }
                        </div>

                        {loggedInUser._id === user._id && 
                        <div className="notifications-container">
                            <div className="notifications-header">
                                <p>Notifications </p>
                            </div>

                            { user.notifications &&
                                user.notifications.map((notification) => 
                                    notification ? 
                                    <div key={notification._id}>
                                    
                                    <Notification 
                                        notification={notification}
                                        username={username}
                                        token={token}
                                        triggerStateChange={triggerStateChange}
                                    />
                                    </div>

                                    : null
                            )}


                        </div>
                        }
                        <div className="friends-container">
                            <div className="friends-header">
                                <p>Friends </p>
                            </div>
                            <Friends 
                                friends={user.friends}
                            />
                        </div>
                    </div>
                    <div className="user-page-right">

                        <div className="posts-header">
                            <p> Posts </p>
                        </div>

                        <div className="posts">
                        {user.posts.map((post) => 
                            post ? 
                            <div key={post._id}>
                                <Post 
                                    key={post._id}
                                    post={post}
                                    postedBy={post.postedBy}
                                    triggerStateChange={triggerStateChange}
                                
                                />
                            </div>  
                                : null
                        )}
                        </div>

    
                    </div>
                </div>
            
            </>
        );

};