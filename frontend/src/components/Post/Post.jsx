import "./Post.css";
import "../../pages/User/UserPage.css";
import LikeButton from "../LikeButton/LikeButton";
import { useState, useEffect } from "react";
import AddComment from "../AddComment/AddComment";
import Comment from "../Comment/Comment";
import DeleteButton from "../DeleteButton/DeleteButton";
import PostText from "../PostText/PostText";
import timeFromNow from "../../utils/timeFromNow";
import { Link } from "react-router-dom";
import { editPost } from "../../services/posts";

const Post = (props) => {
    const [user, setUser] = useState(null);
    const [post, setPost] = useState(null)
    const [like, setLike] = useState(false);
    const [likes, setLikes] = useState(props.post.likes.length);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [showMoreComments, setShowMoreComments] = useState(false);
    const [hideComments, setHideComments] = useState(false);
    const [deletes, setDeletes] = useState(false);
    const [postText, setPostText] = useState("")
    const [edittingPost, setEdittingPost] = useState(false)
    const [userLikesPost, setUserLikesPost] = useState(false)
    const [userIsOwner, setUserIsOwner] = useState(false)


    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem("user")))
        setPost(props.post)
        setPostText(props.post.message);  
	}, [props.post]);

    useEffect(() => {
        if (user) {
            setUserLikesPost(props.post.likes.includes(user._id));
            setUserIsOwner(props.post.postedBy._id === user._id);
        }
    }, [user, props.post]);


    const handleDelete = () => {
        setDeletes(!deletes);
    };

    const handleEditPost = () => {
        setEdittingPost(!edittingPost)
    }

    const handleLikeUnlike = () => {
        setLike(!like);
        setLikes(props.post.likes.length);
    };

    const checkLikes = (props) => {
        setLikes(props.post.likes.length);
    };

    const addCommentClick = () => {
        setShowCommentBox(!showCommentBox);
    };

    const showMoreCommentsClick = () => {
        setShowMoreComments(true);
        setHideComments(true);
    };

    const hideCommentsClick = () => {
        setShowMoreComments(false);
    };

    const handleSaveEditText = (event) => {
		event.preventDefault();
		const postData = {
			userId: props.userId,
			postId: props.post._id,
			postMessage: postText,
		};
		editPost(props.token, postData)
			.then(() => {
				props.toggleStateChange();
                props.userPageRender()
			})
			.catch((error) => {
				console.log("Error submitting post:", error);
			});
        
        handleEditPost() 
	};

    const sortedComments = props.post.comments.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    return (
        <div key={props.post._id} className="post-container">
            <article>
                {props.postedBy && (
                    <div className="post-header">
                        <div className="post-user-image-container">
                            <Link to={`/users/${props.postedBy.username}`} className="post-user-image">
                                <img src={props.postedBy.image} alt="user image"></img>
                            </Link>
                        </div>
                        <div className="username-time-container">
                            <div className="post-username">
                            <Link to={`/users/${props.postedBy.username}`} className="post-username">
                                {props.postedBy.username}
                            </Link>
                            </div>
                            <div className="date-time">
                                {timeFromNow(props.post.createdAt)}
                            </div>
                        </div>
                    </div>
                )}
                    <div className="post-body">

                    <div className="post-text">
                        <PostText 
                            edittingPost={edittingPost}
                            postText={postText}
                            setPostText={setPostText}
            
                        />
                    </div>
                        
                        {props.post.media  && (
                            <div className="post-image-container">
                                <img src={props.post.media}></img>
                            </div>
                        )}
                    

                    </div>

                    <div className="post-footer"> 
                        <div className="like-container">
                            <div className="like-button-container">
                            <LikeButton
                                postId={props.post._id}
                                like={like}
                                setUserLikesPost={setUserLikesPost}
                                handleLikeUnlike={handleLikeUnlike}
                                token={props.token}
                                toggleStateChange={props.toggleStateChange}
                                userPageRender={props.userPageRender}
                                liked={props.liked}
                                userLikesPost={userLikesPost}
                                post_userId={props.postedBy._id}
                                loggedInUsername={props.loggedInUsername}
                                userId={props.userId}
                            />
                            </div>
                            <div className="like-number">
                                {props.post.likes.length}
                            </div>
                        </div>
                            <div className="delete-post-button-container">
                                {userIsOwner ? ( 
                                    edittingPost ? (
                                        <button onClick={handleSaveEditText}>save</button>
                                    ) : (
                                        <button onClick={handleEditPost}>edit</button>
                                    )
                                ) : null}

                                <DeleteButton
                                    postID={props.post._id}
                                    token={props.token}
                                    toggleStateChange={props.toggleStateChange}
                                    userPageRender={props.userPageRender}
                                    onDelete={props.onDelete}
                                    showButton={userIsOwner}
                                />

                            </div>
                    </div>

                    <div className="add-comment-container">
                        <AddComment
                            postId={props.post._id}
                            toggleStateChange={props.toggleStateChange}
                            post_userId={props.postedBy._id}
                            triggerStateChange={props.triggerStateChange}
                            userPageRender={props.userPageRender}
                        />
                    </div>

                    <div className="comments-container">
                        
                        {sortedComments.length > 0 && (
                            <Comment
                                _id={sortedComments[0]._id}
                                message={sortedComments[0].message}
                                likes={sortedComments[0].likes}
                                // postedBy={comment.user.username}
                                postedAt={sortedComments[0].createdAt}
                                user={sortedComments[0].user}
                            />
                        )}

                        <div className="more-comments-button-container">
                            {sortedComments.length > 1 && !showMoreComments && (
                                <button onClick={showMoreCommentsClick}>see more</button>
                            )}
                        </div>

                        {showMoreComments &&
                            sortedComments
                                .slice(1)
                                .map((comment) => (
                                    <Comment
                                        key={comment._id}
                                        _id={comment._id}
                                        message={comment.message}
                                        likes={comment.likes}
                                        postedAt={comment.createdAt}
                                        user={comment.user}
                                    />
                                ))}

                        <div className="hide-comments-button-container">
                        {showMoreComments && (
                            <button onClick={hideCommentsClick}>hide</button>
                        )}
                        </div>
                </div>
            </article>
        </div>
    );
};

export default Post;
