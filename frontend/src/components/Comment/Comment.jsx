
import './Comment.css'
import timeFromNow from '../../utils/TimeFromNow'
import { Link } from 'react-router-dom'

export default function Comment({key, _id, message, likes, postedBy, postedAt, user}) {
    
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

