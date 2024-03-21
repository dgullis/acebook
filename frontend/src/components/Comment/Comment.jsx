import './Comment.css'
import timeFromNow from '../../utils/timeFromNow'
import { Link } from 'react-router-dom'

// Returns single comment for the associated post.
// Displays the commenters username, image, time of comment and comment text
export default function Comment({key, _id, message, likes, postedBy, postedAt, user}) {
    
    // Returns friendly representation of postedAt date in terms of time from now e.g. 2 hours ago
    const date = timeFromNow(postedAt)
    
    return (

    <div className="comment-container" key={_id}>
        <div className="comment-header">
            <Link to={`/users/${user?.username}`} className="comment-user-image">
            <div className="comment-user-image-container">
                <img src={user?.image} alt="Profile Picture" />
            </div>
            </Link>
            <div className="comment-username-time">
                <Link to={`/users/${user?.username}`} className="comment-username">
                    {user?.username}
                </Link>
                <div className="comment-time">
                    {date}
                </div>
            </div>
        </div>
        
        <div className="comment-body">
            <div className="comment-message">
                {message}
            </div>
        </div>
    </div>
)

}

