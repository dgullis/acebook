import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import NewPost from "../../components/Post/NewPost";
import Post from "../../components/Post/Post";
import Navbar from "../../components/NavBar/navbar";
import './FeedPage.css'


export const FeedPage = () => {
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

	const handlePostDelete = () => {
		toggleStateChange();
	};
	const handlePostEdit = () => {
		toggleStateChange();
	};

	const [edits, setEdits] = useState(false);

	useEffect(() => {
		if (token) {
			getPosts(token)
				.then((data) => {
					const sortedPosts = data.posts.sort(
						(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
					);
					setPosts(sortedPosts.reverse());
					setToken(data.token);
					window.localStorage.setItem("token", data.token);
				})
				.catch((err) => {
					console.err(err);
				});
		} else {
			navigate("/login");
		}
	}, [stateChange]);


    return (
        <div className="feedpage">
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
                    const liked = post.likes.includes(user._id);
                    console.log(liked)
                    return (
                        <Post
                            key={post._id}
                            post={post}
                            postedBy={post.postedBy}
                            toggleStateChange={toggleStateChange}
                            onDelete={handlePostDelete}
                            loggedInUsername={user.username}
                            token={token}
                            liked={liked}
                            userId={user._id}
onEdit={handlePostEdit}
							edits={edits}
							setEdits={setEdits}
                        />
                    );
                })}
            </div>
            
        </div>
    );

};
