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

	const toggleStateChange = () => {
		setStateChange(!stateChange);
	};

	useEffect(() => {
		if (token) {
            setLoading(true)
			getPosts(token)
				.then((data) => {
					const sortedPosts = data.posts.sort(
						(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
					);
					setPosts(sortedPosts.reverse());
					setToken(data.token);
					window.localStorage.setItem("token", data.token);
                    setLoading(false)

				})
				.catch((err) => {
					console.err(err);
                    setLoading(false)

				});
		} else {
			navigate("/login");
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
