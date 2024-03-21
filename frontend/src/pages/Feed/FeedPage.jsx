import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import NewPost from "../../components/Post/NewPost";
import Post from "../../components/Post/Post";
import Navbar from "../../components/NavBar/navbar";
import LoadingSpinner from "../../components/LoadingSpinner";
import './FeedPage.css'


export const FeedPage = () => {
    const [loading, setLoading] = useState(true)
	const [posts, setPosts] = useState([]);
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const [user, setUser] = useState(
		JSON.parse(window.localStorage.getItem("user"))
	);
	const [stateChange, setStateChange] = useState(false);

	const navigate = useNavigate();
    
    // Function to toggle stateChange to trigger re-render
	const toggleStateChange = () => {
		setStateChange(!stateChange);
	};

    // Effect hook to fetch posts when component mounts or stateChange is triggered
	useEffect(() => {
		if (token) {
            setLoading(true) // Set loading status to true
            // Fetch posts using authentication token
			getPosts(token)
				.then((data) => {
                    // Sort posts by createdAt timestamp and reverse for latest first
					const sortedPosts = data.posts.sort(
						(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
					);
					setPosts(sortedPosts.reverse()); // Update posts state with fetched posts
					setToken(data.token); // Update token state with new token
					window.localStorage.setItem("token", data.token); // Store token in local storage
                    setLoading(false) // Set loading status to false

				})
				.catch((err) => {
					console.err(err); // Log error if fetching posts fails
                    setLoading(false) // Set loading status to false

				});
		} else {
			navigate("/login"); // Redirect to login page if token is not available
		}
	}, [stateChange]);

    // if (loading) {
    //     return <LoadingSpinner loading={loading} />;
    // }


    return (
        <div className="feedpage-container">
            <div className="navbar">
                <Navbar />
            </div>

            <div className="feedpage-new-post-container">
                <NewPost
                    token={token}
                    userId={user._id}
					userImg={user.image}
                    toggleStateChange={toggleStateChange}
                />
            </div>

            <div className="feedpage-posts-container">
                {posts.map((post) => {
                    return (
                        <Post
                            key={post._id}
                            post={post}
                            postedBy={post.postedBy}
                            toggleStateChange={toggleStateChange}
                            loggedInUsername={user.username}
                            token={token}
                            userId={user._id}
                        />
                    );
                })}
            </div>
            
        </div>
    );

};
